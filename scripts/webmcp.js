/**
 * WebMCP tools for AI agents browsing docs.y.uno.
 *
 * Registers read-only tools through the WebMCP API (document.modelContext, with navigator.modelContext as a
 * fallback) so an agent running in the browser can search the docs and read pages as markdown without scraping
 * the rendered HTML. Every tool only reads public pages from this site (llms.txt and the .md version of each page).
 * Browsers without WebMCP skip this file silently.
 */
(() => {
  if (typeof window === 'undefined' || window.__yunoWebMcpRegistered) return;

  const modelContext =
    (typeof document !== 'undefined' && document.modelContext) ||
    (typeof navigator !== 'undefined' && navigator.modelContext);
  if (!modelContext) return;
  window.__yunoWebMcpRegistered = true;

  const MAX_PAGE_CHARS = 30000;
  const SECTION_LINK = /\]\((https:\/\/docs\.y\.uno\/_llms\/[^)]+\.txt)\)/g;
  const PAGE_LINE = /^\s*-\s*\[([^\]]+)\]\(([^)]+)\)(?::\s*(.*))?$/;
  let indexPromise = null;

  const toolResult = (value) => ({ content: [{ type: 'text', text: value }] });

  const fetchText = async (path) => {
    const res = await fetch(path, { headers: { Accept: 'text/plain, text/markdown' } });
    if (!res.ok) throw new Error(`GET ${path} returned ${res.status}`);
    return res.text();
  };

  const parseEntries = (files) => {
    const entries = [];
    const seen = new Set();
    for (const line of files.join('\n').split('\n')) {
      const match = PAGE_LINE.exec(line);
      const url = match ? new URL(match[2], window.location.origin).href : null;
      if (url && !seen.has(url)) {
        seen.add(url);
        entries.push({ title: match[1], url, description: match[3] || '' });
      }
    }
    return entries;
  };

  // Docs index: llms.txt lists some pages directly (for example the SDK section) and links to one file per
  // section (Documentation, API Reference), each listing its pages as "- [Title](url): description".
  const buildIndex = async () => {
    const root = await fetchText('/llms.txt');
    const sections = [...new Set([...root.matchAll(SECTION_LINK)].map((m) => new URL(m[1]).pathname))];
    const results = await Promise.allSettled(sections.map(fetchText));
    const files = results.filter((r) => r.status === 'fulfilled').map((r) => r.value);
    const complete = files.length === sections.length;
    return { root, entries: parseEntries([root, ...files]), complete };
  };

  // Cache the index only when every section loaded, so a transient failure is retried on the next call.
  const loadIndex = () => {
    if (!indexPromise) {
      indexPromise = buildIndex().then(
        (index) => {
          if (!index.complete) indexPromise = null;
          return index;
        },
        (err) => {
          indexPromise = null;
          throw err;
        },
      );
    }
    return indexPromise;
  };

  const toMarkdownPath = (input) => {
    const raw = String(input || '').trim();
    if (!raw) throw new Error('Give a page path such as docs/quickstart or a docs.y.uno URL.');
    const url = new URL(raw, window.location.origin);
    if (url.origin !== window.location.origin) throw new Error(`Only pages on ${window.location.origin} can be read.`);
    const path = url.pathname.replace(/\/+$/, '').replace(/\.(md|mdx)$/, '');
    return `${path || '/index'}.md`;
  };

  const searchDocs = async (args) => {
    const query = String((args && args.query) || '');
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const limit = Math.min(Math.max(Number.parseInt((args && args.limit) || 8, 10) || 8, 1), 20);
    if (!terms.length) return toolResult('Give at least one keyword.');

    const { entries } = await loadIndex();
    const scored = entries
      .map((entry) => {
        const title = entry.title.toLowerCase();
        const haystack = `${title} ${entry.description} ${entry.url}`.toLowerCase();
        const termScore = terms.reduce((sum, term) => {
          if (title.includes(term)) return sum + 3;
          return haystack.includes(term) ? sum + 1 : sum;
        }, 0);
        // Prefer readable doc pages (.md) over raw spec files, and titles that contain the whole query.
        const bonus = (title.includes(query.toLowerCase()) ? 2 : 0) + (entry.url.endsWith('.md') ? 1 : 0);
        return { entry, score: termScore ? termScore + bonus : 0 };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    if (!scored.length) return toolResult(`No pages matched "${query}". Try other keywords, or read /llms.txt for the full index.`);
    return toolResult(
      scored
        .map(({ entry }) => `- ${entry.title}: ${entry.url}${entry.description ? `\n  ${entry.description}` : ''}`)
        .join('\n'),
    );
  };

  const getDocPage = async (args) => {
    let path;
    try {
      path = toMarkdownPath(args && args.page);
    } catch (err) {
      return toolResult(err.message);
    }
    try {
      let markdown = await fetchText(path);
      if (markdown.length > MAX_PAGE_CHARS) {
        markdown = `${markdown.slice(0, MAX_PAGE_CHARS)}\n\n[Truncated. Full page: ${window.location.origin}${path}]`;
      }
      return toolResult(markdown);
    } catch (err) {
      return toolResult(`Could not read ${path}: ${err.message}`);
    }
  };

  const listDocSections = async () => {
    const { root } = await loadIndex();
    const lines = [...new Set(root.split('\n').filter((line) => /^#{1,2}\s|\/_llms\//.test(line)))];
    const body = lines.length ? lines.join('\n') : root.slice(0, MAX_PAGE_CHARS);
    return toolResult(`${body}\n\nFull index: ${window.location.origin}/llms.txt`);
  };

  const tools = [
    {
      name: 'search_yuno_docs',
      description:
        'Search the Yuno documentation (guides, SDKs, API reference) by keywords. Returns the best matching pages with their title, URL and short description. Use get_yuno_doc_page to read one.',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Keywords to look for, for example "create payment idempotency" or "3DS".' },
          limit: { type: 'integer', minimum: 1, maximum: 20, default: 8, description: 'How many pages to return.' },
        },
        required: ['query'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: searchDocs,
    },
    {
      name: 'get_yuno_doc_page',
      description:
        'Read one page of the Yuno documentation as markdown. Accepts a path (docs/quickstart) or a full docs.y.uno URL. Long pages are cut at 30,000 characters.',
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'string',
            description: 'Page path or URL, for example "docs/quickstart" or "https://docs.y.uno/reference/payments/create-payment".',
          },
        },
        required: ['page'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: getDocPage,
    },
    {
      name: 'list_yuno_doc_sections',
      description:
        'List the sections of the Yuno documentation (Documentation, API Reference, SDK, Changelog and others) from llms.txt. Use it to orient before searching.',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true },
      execute: listDocSections,
    },
  ];

  try {
    if (typeof modelContext.registerTool === 'function') {
      for (const tool of tools) modelContext.registerTool(tool);
    } else if (typeof modelContext.provideContext === 'function') {
      modelContext.provideContext({ tools });
    }
  } catch (err) {
    if (window.console) window.console.warn('[webmcp] could not register the Yuno docs tools:', err);
  }
})();
