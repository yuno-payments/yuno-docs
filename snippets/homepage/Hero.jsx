export const Hero = () => {
const Ic = ({ n, size = 20 }) => {
  const P = {
    arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
    arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
    arrowDown: <path d="M12 5v14M6 13l6 6 6-6" />,
    flask: <path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9V3M7.5 15h9" />,
    squares: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
    sliders: <path d="M4 7h9M17 7h3M4 17h3M11 17h9M13 4v6M7 14v6" />,
    server: <path d="M4 4h16v6H4zM4 14h16v6H4zM7.5 7h.01M7.5 17h.01" />,
    card: <path d="M3 6h18v12H3zM3 10h18M6.5 15h3" />,
    wallet: <path d="M4 7a2 2 0 0 1 2-2h12v4M4 7v10a2 2 0 0 0 2 2h14V9H6a2 2 0 0 1-2-2zM16.5 14h.01" />,
    check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
    checkCircle: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8 12.5l3 3 5-6" />,
    circle: <circle cx="12" cy="12" r="9" />,
    copy: <path d="M8 8h11v12H8zM5 16V4h11" />,
    globe: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9S9.500 5.500 12 3z" />,
    split: <path d="M12 21v-8M12 13 6 6M12 13l6-7M4 8V4h4M16 4h4v4" />,
    refresh: <path d="M20 12a8 8 0 0 0-14-5.3L4 9M4 4v5h5M4 12a8 8 0 0 0 14 5.3L20 15M20 20v-5h-5" />,
    shield: <path d="M12 3 4.500 6v5.500c0 4.500 3 8 7.500 9.500 4.500-1.500 7.500-5 7.500-9.500V6zM8.500 12l2.500 2.500 4.500-5" />,
    store: <path d="M4 9.500 5.500 4h13L20 9.500M4 9.500c0 1.400 1.100 2.500 2.500 2.500S9 10.900 9 9.500c0 1.400 1.100 2.500 3 2.500s3-1.100 3-2.500c0 1.400 1.100 2.500 2.500 2.500S20 10.900 20 9.500M5.500 12v8h13v-8M10 20v-4.500h4V20" />,
    chart: <path d="M4 20V4M4 20h16M8 17v-5M12 17V7M16 17v-8M20 17v-3" />,
  };
  return (
    <svg className="yd-ic" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {P[n]}
    </svg>
  );
};

return (

  <section className="yd-hero">
    <div className="yd-hero-copy">
      <div className="yd-eyebrow">
        <span className="yd-eyebrow-accent">Yuno for developers</span>
        <span className="yd-eyebrow-rule" />
        <span className="yd-eyebrow-muted">Build beyond borders</span>
      </div>
      <div className="yd-h1"><span className="yd-h1-line">One integration.</span> <span className="yd-h1-line">A world of payments.</span></div>
      <p className="yd-lead">
        Connect your business to global payments. Build your checkout, route transactions, and reach more customers with Yuno.
      </p>
      <div className="yd-cta-row">
        <a className="yd-btn yd-btn-primary" href="#quickstart">
          Make your first payment <Ic n="arrowDown" size={16} />
        </a>
        <a className="yd-btn yd-btn-secondary" href="#paths">
          Find your integration <Ic n="arrowRight" size={16} />
        </a>
      </div>
    </div>
    <div className="yd-hero-art">
      <img src="/images/home/cover-spheres.webp" alt="" width="1400" height="788" />
      <div className="yd-flow">
        <span className="yd-flow-chip">Your app</span>
        <Ic n="arrowRight" size={12} />
        <span className="yd-flow-chip yd-flow-chip-hot">Yuno</span>
        <Ic n="arrowRight" size={12} />
        <span className="yd-flow-chip">Your providers</span>
      </div>
    </div>
  </section>

);
};
