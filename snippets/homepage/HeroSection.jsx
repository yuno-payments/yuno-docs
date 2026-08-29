export const HeroSection = () => {
  const svg = (children, size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );

  const iconCard   = svg(<><rect x="2" y="5" width="20" height="14" rx="2.5" /><line x1="2" y1="10" x2="22" y2="10" /></>, 26);
  const iconWallet = svg(<><path d="M3 8a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v2" /><path d="M3 8v9a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-2" /><path d="M21 11h-4a2 2 0 0 0 0 4h4z" /></>, 26);
  const iconBank   = svg(<><line x1="3" y1="21" x2="21" y2="21" /><path d="m12 3 8 5H4z" /><line x1="6" y1="11" x2="6" y2="17" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /><line x1="18" y1="11" x2="18" y2="17" /></>, 26);
  const iconShield = svg(<><path d="M12 21s7-3.5 7-9V6l-7-3-7 3v6c0 5.5 7 9 7 9z" /><path d="m9 12 2 2 4-4" /></>, 26);
  const iconBolt   = svg(<polygon points="13 2 4 14 12 14 11 22 20 10 12 10 13 2" />, 22);
  const iconDollar = svg(<><circle cx="12" cy="12" r="9" /><path d="M12 7v10" /><path d="M14.5 9.3a2.6 2.6 0 0 0-2.5-1.3c-1.4 0-2.5.8-2.5 2s1.1 1.8 2.5 2 2.5.9 2.5 2-1.1 2-2.5 2a2.6 2.6 0 0 1-2.5-1.3" /></>, 22);
  const iconQr     = svg(<><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><line x1="14" y1="14" x2="14" y2="17" /><line x1="17.5" y1="14" x2="21" y2="14" /><line x1="21" y1="17.5" x2="21" y2="21" /><line x1="14" y1="21" x2="17.5" y2="21" /></>, 22);

  const edge = {
    top:    { left: "50%",  top: "0" },
    right:  { left: "100%", top: "50%" },
    bottom: { left: "50%",  top: "100%" },
    left:   { left: "0",    top: "50%" },
  };

  const outerNode = (pos, icon) => (
    <div style={{ position: "absolute", left: edge[pos].left, top: edge[pos].top, transform: "translate(-50%,-50%)" }}>
      <div className="yn-node-outer" style={{ transformOrigin: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
          {icon}
        </div>
      </div>
    </div>
  );

  const innerNode = (pos, icon) => (
    <div style={{ position: "absolute", left: edge[pos].left, top: edge[pos].top, transform: "translate(-50%,-50%)" }}>
      <div className="yn-node-inner" style={{ transformOrigin: "center" }}>
        <div style={{ width: 46, height: 46, borderRadius: 12, background: "rgba(62,79,224,0.22)", border: "1px solid rgba(124,137,239,0.5)", display: "flex", alignItems: "center", justifyContent: "center", color: "#BDC3F6" }}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes ynSpin    { to { transform: rotate(360deg); } }
        @keyframes ynSpinRev { to { transform: rotate(-360deg); } }
        @keyframes ynFadeUp  { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes ynCoreGlow { 0%, 100% { box-shadow: 0 0 0 10px rgba(62,79,224,0.12), 0 20px 50px rgba(18,39,173,0.55); } 50% { box-shadow: 0 0 0 14px rgba(62,79,224,0.18), 0 20px 60px rgba(18,39,173,0.7); } }

        .yn-wordmark { animation: ynFadeUp 0.8s ease-out 0.15s backwards; }
        .yn-title    { animation: ynFadeUp 0.8s ease-out 0.30s backwards; }
        .yn-desc     { animation: ynFadeUp 0.8s ease-out 0.45s backwards; }
        .yn-cta      { animation: ynFadeUp 0.8s ease-out 0.60s backwards; }
        .yn-caption  { animation: ynFadeUp 0.8s ease-out 0.75s backwards; }
        .yn-orbit    { animation: ynFadeUp 1s ease-out 0.35s backwards; }

        .yn-ring-outer { animation: ynSpin 60s linear infinite; }
        .yn-node-outer { animation: ynSpinRev 60s linear infinite; }
        .yn-ring-inner { animation: ynSpinRev 42s linear infinite; }
        .yn-node-inner { animation: ynSpin 42s linear infinite; }
        .yn-core       { animation: ynCoreGlow 4s ease-in-out infinite; }

        @media (max-width: 980px) {
          .yn-hero  { flex-direction: column; text-align: center; padding: 56px 24px 64px !important; gap: 8px; }
          .yn-copy  { max-width: 560px !important; align-items: center !important; }
          .yn-orbit { transform: scale(0.82); margin: -24px 0 -32px; }
        }
        @media (max-width: 560px) {
          .yn-title { font-size: 30px !important; }
          .yn-orbit { transform: scale(0.6); margin: -70px 0 -90px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .yn-ring-outer, .yn-node-outer, .yn-ring-inner, .yn-node-inner, .yn-core,
          .yn-wordmark, .yn-title, .yn-desc, .yn-cta, .yn-caption, .yn-orbit { animation: none !important; }
        }
      `}</style>

      <div
        className="yn-hero w-full relative overflow-hidden flex items-center justify-between gap-10"
        style={{ padding: "72px 64px 80px", background: "radial-gradient(90% 90% at 70% 40%, #141A4A 0%, #050717 65%)" }}
      >
        {/* Left — copy */}
        <div className="yn-copy relative z-[2] flex flex-col items-start" style={{ maxWidth: 460 }}>
          <img src="/logo/dark.svg" alt="Yuno" className="yn-wordmark" style={{ height: 30, width: "auto", marginBottom: 22 }} />

          <div className="yn-title" style={{ fontSize: 40, fontWeight: 600, color: "#fff", lineHeight: 1.15, letterSpacing: "-0.015em" }}>
            AI Financial Infrastructure for Global Operations
          </div>

          <div className="yn-desc" style={{ fontSize: 17, color: "#9aa0c4", marginTop: 18, lineHeight: 1.55, maxWidth: 440 }}>
            Integrate Yuno to access every payment method, processor, and fraud prevention system worldwide with a single platform.
          </div>

          <a
            href="/docs/how-yuno-works/what-is-yuno"
            className="yn-cta inline-flex items-center gap-2 no-underline"
            style={{ marginTop: 28, background: "#fff", color: "#1227AD", padding: "13px 26px", borderRadius: 999, fontSize: 15, fontWeight: 600, boxShadow: "0 8px 30px rgba(18,39,173,0.35)" }}
          >
            Get started →
          </a>

          <div className="yn-caption" style={{ fontSize: 13, color: "#7d82a8", letterSpacing: "0.04em", marginTop: 32 }}>
            190+ countries · 1,000+ payment methods
          </div>
        </div>

        {/* Right — orbit system */}
        <div className="yn-orbit relative z-[2] shrink-0" style={{ width: 460, height: 460 }}>
          <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(189,195,246,0.14)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", inset: 70, border: "1px solid rgba(189,195,246,0.20)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", inset: 140, border: "1px solid rgba(189,195,246,0.28)", borderRadius: "50%" }} />

          <div
            className="yn-core"
            style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 120, height: 120, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #3E4FE0, #1227AD)", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <img src="/logo/dark.svg" alt="Yuno" style={{ height: 34, width: "auto" }} />
          </div>

          <div className="yn-ring-outer" style={{ position: "absolute", inset: 0 }}>
            {outerNode("top", iconCard)}
            {outerNode("right", iconWallet)}
            {outerNode("bottom", iconBank)}
            {outerNode("left", iconShield)}
          </div>

          <div className="yn-ring-inner" style={{ position: "absolute", inset: 70 }}>
            {innerNode("top", iconBolt)}
            {innerNode("right", iconDollar)}
            {innerNode("bottom", iconQr)}
          </div>
        </div>
      </div>
    </>
  );
};
