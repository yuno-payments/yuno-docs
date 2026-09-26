// HeroSection — premium hero for homepage
// Subtle gradient glow, tight H1, CTAs, elegant layout

export const HeroSection = () => (
  <section className="yuno-hero">
    <div className="yuno-hero__glow" aria-hidden="true" />
    <div className="yuno-hero__content">
      <h1 className="yuno-hero__title">Integrate Yuno</h1>
      <p className="yuno-hero__lede">
        One API to any payment provider. Create a checkout session, collect details with our SDK, process the payment.
      </p>
      <div className="yuno-hero__ctas">
        <a href="/docs/sdks/overview/quickstart" className="yuno-hero__cta yuno-hero__cta--primary">
          Quickstart
          <span className="yuno-hero__cta-arrow">→</span>
        </a>
        <a href="/reference/getting-started/api-reference-overview" className="yuno-hero__cta yuno-hero__cta--secondary">
          API reference
        </a>
        <span className="yuno-hero__links">
          <a href="/setup-mcp" className="yuno-hero__link">MCP</a>
          <a href="/skill.md" className="yuno-hero__link">skill.md</a>
        </span>
      </div>
    </div>
  </section>
);

// CodeCard — framed code block with header bar
export const CodeCard = ({ title, children }) => (
  <div className="yuno-code-card">
    {title && <div className="yuno-code-card__header">{title}</div>}
    <div className="yuno-code-card__body">{children}</div>
  </div>
);

// CodeCaption — muted caption under code
export const CodeCaption = ({ children }) => (
  <p className="yuno-code-caption">{children}</p>
);
