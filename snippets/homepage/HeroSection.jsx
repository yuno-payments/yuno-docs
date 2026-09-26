// HeroSection — premium hero for homepage
// Tailwind-first for Mintlify CSS generation + subtle gradient glow

export const HeroSection = () => (
  <section className="relative pt-8 pb-6 -mt-4 mb-4 overflow-hidden">
    {/* Soft gradient glow - visible brand presence */}
    <div 
      className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
      style={{ background: 'radial-gradient(circle, #3E4FE0 0%, #6B78EB 40%, transparent 70%)' }}
      aria-hidden="true" 
    />
    <div className="relative z-10 max-w-2xl">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-3" style={{ letterSpacing: '-0.03em' }}>
        Integrate Yuno
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 max-w-xl leading-relaxed">
        One API to any payment provider. Create a checkout session, collect details with our SDK, process the payment.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <a 
          href="/docs/sdks/overview/quickstart" 
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold text-white no-underline transition-all hover:-translate-y-0.5"
          style={{ backgroundColor: '#3E4FE0', boxShadow: '0 2px 8px rgba(62,79,224,0.25)' }}
        >
          Quickstart <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </a>
        <a 
          href="/reference/getting-started/api-reference-overview" 
          className="inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 no-underline hover:border-slate-400 dark:hover:border-slate-500 transition-colors"
        >
          API reference
        </a>
        <span className="flex items-center gap-4 ml-2">
          <a href="/setup-mcp" className="text-sm text-slate-500 dark:text-slate-400 no-underline hover:text-[#3E4FE0] dark:hover:text-[#6B78EB] transition-colors">MCP</a>
          <a href="/skill.md" className="text-sm text-slate-500 dark:text-slate-400 no-underline hover:text-[#3E4FE0] dark:hover:text-[#6B78EB] transition-colors">skill.md</a>
        </span>
      </div>
    </div>
  </section>
);

// CodeCardHeader — renders above a normal MDX code fence (not wrapping it)
export const CodeCardHeader = ({ title }) => (
  <div 
    className="max-w-3xl px-4 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-b-0 border-slate-200 dark:border-slate-700 rounded-t-xl"
    style={{ marginBottom: '-1px' }}
  >
    {title}
  </div>
);

// CodeCardWrapper — wraps the code fence for styling (border continuation)
export const CodeCardWrapper = ({ children }) => (
  <div className="max-w-3xl [&>pre]:!rounded-t-none [&>pre]:!border-t-0 [&>pre]:!mt-0 [&>pre]:rounded-b-xl [&>pre]:border [&>pre]:border-slate-200 [&>pre]:dark:border-slate-700 mb-1">
    {children}
  </div>
);

// CodeCaption — muted caption under code
export const CodeCaption = ({ children }) => (
  <p className="max-w-3xl text-sm text-slate-500 dark:text-slate-400 mt-2 mb-8">{children}</p>
);
