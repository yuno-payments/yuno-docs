// PathCards — Tailwind-first for Mintlify CSS generation
// Beautiful integration path cards with hover lift

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
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mb-8">
    {paths.map((p) => (
      <a 
        key={p.href} 
        href={p.href} 
        className="group flex flex-col gap-1 p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 no-underline transition-all duration-200 hover:border-[#3E4FE0] hover:shadow-lg hover:shadow-[#3E4FE0]/10 hover:-translate-y-0.5"
      >
        <span className="w-6 h-6 mb-1" style={{ color: '#3E4FE0' }}>{p.icon}</span>
        <span className="text-base font-semibold text-slate-900 dark:text-slate-100">{p.title}</span>
        <span className="text-sm text-slate-500 dark:text-slate-400 leading-snug">{p.desc}</span>
      </a>
    ))}
  </div>
);

// AgentCallout — Tailwind-first elegant info strip
export const AgentCallout = () => (
  <div 
    className="flex items-start gap-3 max-w-3xl p-4 mb-6 rounded-xl border bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-900"
    style={{ borderColor: '#3E4FE0' }}
  >
    <span className="flex-shrink-0 w-5 h-5 mt-0.5" style={{ color: '#3E4FE0' }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    </span>
    <span className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
      <strong className="text-slate-900 dark:text-white">Building with an agent?</strong>{' '}
      <a href="/skill.md" className="font-medium no-underline hover:underline" style={{ color: '#3E4FE0' }}>skill.md</a> for workflows,{' '}
      <a href="https://docs.y.uno/llms.txt" className="font-medium no-underline hover:underline" style={{ color: '#3E4FE0' }}>llms.txt</a> for index. Test cards on{' '}
      <a href="/docs/direct-integration-use-cases/yuno-testing-gateway" className="font-medium no-underline hover:underline" style={{ color: '#3E4FE0' }}>Testing Gateway</a> only.
    </span>
  </div>
);

// FooterLinks — Tailwind-first compact links
export const FooterLinks = () => (
  <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
    <a href="/docs/how-yuno-works/what-is-yuno" className="text-slate-600 dark:text-slate-300 no-underline hover:text-[#3E4FE0] dark:hover:text-[#6B78EB] transition-colors">What is Yuno</a>
    <span className="text-slate-300 dark:text-slate-600">·</span>
    <a href="/docs/how-yuno-works/how-yuno-payment-flow-works" className="text-slate-600 dark:text-slate-300 no-underline hover:text-[#3E4FE0] dark:hover:text-[#6B78EB] transition-colors">Payment flow</a>
    <span className="text-slate-300 dark:text-slate-600">·</span>
    <a href="/docs/webhooks/index" className="text-slate-600 dark:text-slate-300 no-underline hover:text-[#3E4FE0] dark:hover:text-[#6B78EB] transition-colors">Webhooks</a>
    <span className="text-slate-300 dark:text-slate-600">·</span>
    <a href="/docs/how-yuno-works/testing" className="text-slate-600 dark:text-slate-300 no-underline hover:text-[#3E4FE0] dark:hover:text-[#6B78EB] transition-colors">Testing</a>
    <span className="text-slate-300 dark:text-slate-600">·</span>
    <a href="/changelog" className="text-slate-600 dark:text-slate-300 no-underline hover:text-[#3E4FE0] dark:hover:text-[#6B78EB] transition-colors">Changelog</a>
  </nav>
);
