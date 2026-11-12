/**
 * WebMCP tools for AI agents browsing docs.y.uno.
 *
 * Registers read-only tools through the WebMCP API (document.modelContext, with navigator.modelContext as a
 * fallback) so an agent running in the browser can search the docs and read pages as markdown without scraping
 * the rendered HTML. Every tool only reads public pages from this site (llms.txt and the .md version of each page).
 * Browsers without WebMCP skip this file silently.
 */
(function () {
  if (typeof window === 'undefined' || window.__yunoWebMcpRegistered) return;

  var modelContext = (typeof document !== 'undefined' && document.modelContext) || (typeof navigator !== 'undefined' && navigator.modelContext);
  if (!modelContext) return;
  window.__yunoWebMcpRegistered = true;

  var MAX_PAGE_CHARS = 30000;
  var indexCache = null;

  function text(value) {
    return { content: [{ type: 'text', text: value }] };
  }

  function fetchText(path) {
    return fetch(path, { headers: { Accept: 'text/plain, text/markdown' } }).then(function (res) {
      if (!res.ok) throw new Error('GET ' + path + ' returned ' + res.status);
      return res.text();
    });
  }

  // Docs index: llms.txt links to one file per section (Documentation, API Reference, SDKs...), each listing its
  // pages as "- [Title](url): description".
  function loadIndex() {
    if (indexCache) return indexCache;
    indexCache = fetchText('/llms.txt').then(function (root) {
      var sections = [];
      var re = /\]\((https:\/\/docs\.y\.uno\/_llms\/[^)]+\.txt)\)/g;
      var m;
      while ((m = re.exec(root))) {
        var section = new URL(m[1]).pathname;
        if (sections.indexOf(section) === -1) sections.push(section);
      }
      return Promise.all(sections.map(function (p) { return fetchText(p).catch(function () { return ''; }); })).then(function (files) {
        var entries = [];
        var seen = {};
        // The root file also lists some pages directly (for example the SDK section).
        [root].concat(files).join('\n').split('\n').forEach(function (line) {
          var e = /^\s*-\s*\[([^\]]+)\]\(([^)]+)\)(?::\s*(.*))?$/.exec(line);
          if (e && !seen[e[2]]) {
            seen[e[2]] = true;
            entries.push({ title: e[1], url: e[2], description: e[3] || '' });
          }
        });
        return { root: root, entries: entries };
      });
    });
    indexCache.catch(function () { indexCache = null; });
    return indexCache;
  }

  function toPagePath(input) {
    var raw = String(input || '').trim();
    if (!raw) throw new Error('Give a page path such as docs/quickstart or a docs.y.uno URL.');
    var url = new URL(raw, window.location.origin);
    if (url.origin !== window.location.origin) throw new Error('Only pages on ' + window.location.origin + ' can be read.');
    var path = url.pathname.replace(/\/+$/, '').replace(/\.(md|mdx)$/, '');
    return (path || '/index') + '.md';
  }

  var tools = [
    {
      name: 'search_yuno_docs',
      description: 'Search the Yuno documentation (guides, SDKs, API reference) by keywords. Returns the best matching pages with their title, URL and short description. Use get_yuno_doc_page to read one.',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Keywords to look for, for example "create payment idempotency" or "3DS".' },
          limit: { type: 'integer', minimum: 1, maximum: 20, default: 8, description: 'How many pages to return.' }
        },
        required: ['query'],
        additionalProperties: false
      },
      annotations: { readOnlyHint: true },
      execute: function (args) {
        var terms = String((args && args.query) || '').toLowerCase().split(/\s+/).filter(Boolean);
        var limit = Math.min(Math.max(parseInt((args && args.limit) || 8, 10) || 8, 1), 20);
        if (!terms.length) return Promise.resolve(text('Give at least one keyword.'));
        return loadIndex().then(function (index) {
          var scored = index.entries.map(function (e) {
            var title = e.title.toLowerCase();
            var hay = (title + ' ' + e.description + ' ' + e.url).toLowerCase();
            var score = 0;
            terms.forEach(function (t) {
              if (title.indexOf(t) !== -1) score += 3;
              else if (hay.indexOf(t) !== -1) score += 1;
            });
            return { e: e, score: score };
          }).filter(function (s) { return s.score > 0; });
          scored.sort(function (a, b) { return b.score - a.score; });
          var top = scored.slice(0, limit);
          if (!top.length) return text('No pages matched "' + args.query + '". Try other keywords, or read /llms.txt for the full index.');
          return text(top.map(function (s) {
            return '- ' + s.e.title + ': ' + s.e.url + (s.e.description ? '\n  ' + s.e.description : '');
          }).join('\n'));
        });
      }
    },
    {
      name: 'get_yuno_doc_page',
      description: 'Read one page of the Yuno documentation as markdown. Accepts a path (docs/quickstart) or a full docs.y.uno URL. Long pages are cut at 30,000 characters.',
      inputSchema: {
        type: 'object',
        properties: {
          page: { type: 'string', description: 'Page path or URL, for example "docs/quickstart" or "https://docs.y.uno/reference/payments/create-payment".' }
        },
        required: ['page'],
        additionalProperties: false
      },
      annotations: { readOnlyHint: true },
      execute: function (args) {
        var path;
        try { path = toPagePath(args && args.page); } catch (err) { return Promise.resolve(text(err.message)); }
        return fetchText(path).then(function (md) {
          if (md.length > MAX_PAGE_CHARS) md = md.slice(0, MAX_PAGE_CHARS) + '\n\n[Truncated. Full page: ' + window.location.origin + path + ']';
          return text(md);
        }, function (err) { return text('Could not read ' + path + ': ' + err.message); });
      }
    },
    {
      name: 'list_yuno_doc_sections',
      description: 'List the sections of the Yuno documentation (Documentation, API Reference, SDKs, Changelog and others) with what each covers, from llms.txt. Use it to orient before searching.',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true },
      execute: function () {
        return loadIndex().then(function (index) {
          var lines = index.root.split('\n').filter(function (l, i, all) {
            return /^#{1,2}\s|\/_llms\//.test(l) && all.indexOf(l) === i;
          });
          return text((lines.length ? lines.join('\n') : index.root.slice(0, MAX_PAGE_CHARS)) +
            '\n\nFull index: ' + window.location.origin + '/llms.txt');
        });
      }
    }
  ];

  try {
    if (typeof modelContext.registerTool === 'function') {
      tools.forEach(function (tool) { modelContext.registerTool(tool); });
    } else if (typeof modelContext.provideContext === 'function') {
      modelContext.provideContext({ tools: tools });
    }
  } catch (err) {
    if (window.console) console.warn('[webmcp] could not register the Yuno docs tools:', err);
  }
})();
