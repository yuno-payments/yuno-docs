// PathCards — beautiful integration path cards for homepage
// Icon + title + one-liner, hover lift effect

const paths = [
  {
    href: '/docs/sdks/overview/quickstart',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'SDK checkout',
    desc: 'Pre-built UI, no PCI scope',
  },
  {
    href: '/docs/direct-integration-use-cases/direct-flow',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Direct API',
    desc: 'Full control, PCI required',
  },
  {
    href: '/docs/using-yuno/dashboard-overview/connections',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    title: 'Connect & route',
    desc: 'Providers, routing, methods',
  },
  {
    href: '/setup-mcp',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="12" cy="5" r="3" />
        <path d="M12 8v3" />
        <line x1="8" y1="16" x2="8" y2="16" />
        <line x1="16" y1="16" x2="16" y2="16" />
      </svg>
    ),
    title: 'Agents',
    desc: 'MCP, skill.md, llms.txt',
  },
];

export const PathCards = () => (
  <div className="yuno-paths">
    {paths.map((p) => (
      <a key={p.href} href={p.href} className="yuno-path-card">
        <span className="yuno-path-card__icon">{p.icon}</span>
        <span className="yuno-path-card__title">{p.title}</span>
        <span className="yuno-path-card__desc">{p.desc}</span>
      </a>
    ))}
  </div>
);

// AgentCallout — elegant info strip for agents
export const AgentCallout = () => (
  <div className="yuno-agent-callout">
    <span className="yuno-agent-callout__icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    </span>
    <span className="yuno-agent-callout__text">
      <strong>Building with an agent?</strong>{' '}
      <a href="/skill.md">skill.md</a> for workflows, <a href="https://docs.y.uno/llms.txt">llms.txt</a> for index. Test cards on <a href="/docs/direct-integration-use-cases/yuno-testing-gateway">Testing Gateway</a> only.
    </span>
  </div>
);

// FooterLinks — compact also links
export const FooterLinks = () => (
  <nav className="yuno-footer-links">
    <a href="/docs/how-yuno-works/what-is-yuno">What is Yuno</a>
    <span className="yuno-footer-links__sep">·</span>
    <a href="/docs/how-yuno-works/how-yuno-payment-flow-works">Payment flow</a>
    <span className="yuno-footer-links__sep">·</span>
    <a href="/docs/webhooks/index">Webhooks</a>
    <span className="yuno-footer-links__sep">·</span>
    <a href="/docs/how-yuno-works/testing">Testing</a>
    <span className="yuno-footer-links__sep">·</span>
    <a href="/changelog">Changelog</a>
  </nav>
);
