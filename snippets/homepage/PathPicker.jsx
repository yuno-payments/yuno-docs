export const PathPicker = () => {
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

  const [sel, setSel] = useState('seamless');
  const paths = [
    { id: 'seamless', icon: 'squares', tag: 'Recommended', title: 'SDK',
      body: 'One SDK for iOS, Android, and Web. Start with the default checkout and manage payment methods in the Dashboard.',
      chips: ['Web', 'iOS', 'Android'], cta: 'Integrate the SDK', href: '/docs/yuno-sdk/introduction' },
    { id: 'custom', icon: 'sliders', tag: 'More control', title: 'Build your own UI',
      body: 'Keep the SDK and take over what it does by default: views, the loader, or payment creation. Add Secure Fields and your own styling.',
      chips: ['Controllers', 'Secure Fields', 'Styling'], cta: 'Take over the SDK', href: '/docs/yuno-sdk/controllers/take-over-the-sdk' },
    { id: 'api', icon: 'server', tag: 'Server to server', title: 'Direct API',
      body: 'Connect your backend directly to Yuno. Own the payment flow and handle provider-specific requirements.',
      chips: ['REST', 'PCI DSS required'], cta: 'Review PCI requirements', href: '/docs/security-and-compliance/pci-compliance' },
  ];
  const cur = paths.find((p) => p.id === sel);
  return (
    <div>
      <div className="yd-path-cards" role="tablist" aria-label="Integration path">
        {paths.map((p) => (
          <button key={p.id} type="button" role="tab" aria-selected={sel === p.id} aria-controls="yd-path-panel"
            className={'yd-path-card' + (sel === p.id ? ' is-active' : '')} onClick={() => setSel(p.id)}>
            <span className="yd-path-top"><Ic n={p.icon} size={26} /><span className="yd-tag">{p.tag}</span></span>
            <span className="yd-path-title">{p.title}</span>
          </button>
        ))}
      </div>
      <div className="yd-path-panel" id="yd-path-panel" role="tabpanel">
        <div className="yd-path-info">
          <h3 className="yd-h3">{cur.title}</h3>
          <p className="yd-body">{cur.body}</p>
          <div className="yd-chips">{cur.chips.map((c) => <span key={c} className="yd-chip">{c}</span>)}</div>
          <a className="yd-btn yd-btn-primary yd-btn-sm" href={cur.href}>{cur.cta} <Ic n="arrowRight" size={14} /></a>
        </div>
        <div className="yd-path-art" aria-hidden="true">
          {sel === 'seamless' && (
            <div className="yd-mock-card">
              <div className="yd-mock-label">PAYMENT METHOD</div>
              <div className="yd-mock-row is-on"><Ic n="card" size={16} /> Credit or debit card <span className="yd-mock-check"><Ic n="checkCircle" size={16} /></span></div>
              <div className="yd-mock-row"><Ic n="wallet" size={16} /> Digital wallet</div>
              <div className="yd-mock-pay">Pay securely</div>
            </div>
          )}
          {sel === 'custom' && (
            <div className="yd-mock-code">
              <div className="yd-mock-code-head">checkout.jsx</div>
              <pre>{'<YourCheckout>\n  <PaymentMethods />\n  <SecureCardFields />\n</YourCheckout>'}</pre>
            </div>
          )}
          {sel === 'api' && (
            <div className="yd-mock-api">
              <span className="yd-mock-node">Your server</span>
              <span className="yd-mock-wire"><code>POST /v1/payments</code></span>
              <span className="yd-mock-node yd-mock-node-hot">Yuno API</span>
            </div>
          )}
        </div>
      </div>
      <p className="yd-foot">
        Looking for a hosted option? <a href="/docs/using-yuno/dashboard-overview/payment-links">Create a payment link</a>. Or connect an existing store with{' '}
        <a href="/docs/plugins/woocommerce/index">WooCommerce</a> or <a href="/docs/plugins/vtex/index">VTEX</a>.
      </p>
    </div>
  );
};
