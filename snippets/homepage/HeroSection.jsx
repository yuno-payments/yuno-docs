export const HeroSection = () => (
  <>
    <style>{`
      @keyframes yunoFadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @media (prefers-reduced-motion: reduce) {
        .yuno-welcome, .yuno-title, .yuno-desc, .yuno-ctas {
          animation: none !important;
        }
      }
      .yuno-welcome { animation: yunoFadeInUp 0.6s ease-out 0.1s backwards; }
      .yuno-title   { animation: yunoFadeInUp 0.6s ease-out 0.2s backwards; }
      .yuno-desc    { animation: yunoFadeInUp 0.6s ease-out 0.3s backwards; }
      .yuno-ctas    { animation: yunoFadeInUp 0.6s ease-out 0.4s backwards; }
      @media (max-width: 768px) {
        .yuno-hero { padding: 50px 20px 60px !important; }
        .yuno-welcome { font-size: 14px !important; letter-spacing: 1px !important; }
        .yuno-title   { font-size: 36px !important; line-height: 1.25 !important; }
        .yuno-desc    { font-size: 17px !important; }
        .yuno-ctas { flex-direction: column !important; gap: 12px !important; }
        .yuno-ctas a { width: 100% !important; justify-content: center !important; }
      }
    `}</style>

    <div className="yuno-hero w-full relative overflow-hidden text-center px-5 py-16 pb-20" style={{ backgroundColor: 'var(--yuno-blue, #3E4FE0)' }}>
      <div className="max-w-[800px] mx-auto relative z-[2]">
        <div className="yuno-welcome text-white/80 text-[16px] font-medium mb-5 tracking-[1.2px] uppercase">
          Yuno Developer Docs
        </div>

        <h1 className="yuno-title text-white text-[48px] font-bold leading-[1.15] mb-5 tracking-[-0.5px]">
          Accept payments globally
        </h1>

        <p className="yuno-desc text-white/90 text-[18px] leading-relaxed mb-8 max-w-[600px] mx-auto">
          Connect to any payment provider through one API. Start with a sandbox payment, then explore our SDKs, Direct API, or MCP integration.
        </p>

        <div className="yuno-ctas flex flex-wrap items-center justify-center gap-4">
          <a
            href="/docs/how-yuno-works/step-1-set-up-your-account"
            className="inline-flex items-center gap-2 bg-white px-7 py-3.5 font-semibold text-[15px] no-underline rounded-lg shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            style={{ color: 'var(--yuno-blue, #3E4FE0)' }}
          >
            Make a sandbox payment
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </a>
          <a
            href="/reference/getting-started/api-reference-overview"
            className="inline-flex items-center gap-2 bg-white/15 border border-white/30 text-white px-6 py-3.5 font-medium text-[15px] no-underline rounded-lg transition-all duration-200 hover:bg-white/25 hover:border-white/50"
          >
            API reference
          </a>
          <a
            href="/setup-mcp"
            className="inline-flex items-center gap-2 bg-white/15 border border-white/30 text-white px-6 py-3.5 font-medium text-[15px] no-underline rounded-lg transition-all duration-200 hover:bg-white/25 hover:border-white/50"
          >
            Setup MCP
          </a>
        </div>
      </div>
    </div>
  </>
);
