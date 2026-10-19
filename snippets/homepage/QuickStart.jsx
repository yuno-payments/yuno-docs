export const QuickStart = () => {
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

  const H = '"public-api-key": "<PUBLIC_API_KEY>",\n    "private-secret-key": "<PRIVATE_SECRET_KEY>"';
  const STEPS = [
    { n: '01', title: 'Set up your account', body: 'Get sandbox keys, connect the test gateway, and publish a route.', cta: 'Get ready', href: '/docs/quickstart', file: '.env',
      code: { all: '# Dashboard > Developers > Credentials\nYUNO_ACCOUNT_ID=<ACCOUNT_ID>\nYUNO_PUBLIC_API_KEY=<PUBLIC_API_KEY>\nYUNO_PRIVATE_SECRET_KEY=<PRIVATE_SECRET_KEY>\nYUNO_API_URL=https://api-sandbox.y.uno' } },
    { n: '02', title: 'Build your checkout', body: 'Create a session on your server and collect details with the SDK.', cta: 'Start building', href: '/docs/quickstart', file: 'create-session',
      code: {
        curl: 'curl -X POST https://api-sandbox.y.uno/v1/checkout/sessions \\\n  -H "public-api-key: $YUNO_PUBLIC_API_KEY" \\\n  -H "private-secret-key: $YUNO_PRIVATE_SECRET_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d \'{\n    "account_id": "\'$YUNO_ACCOUNT_ID\'",\n    "merchant_order_id": "order-0001",\n    "payment_description": "Test order",\n    "country": "US",\n    "amount": { "currency": "USD", "value": 25 }\n  }\'',
        node: 'const res = await fetch(`${YUNO_API_URL}/v1/checkout/sessions`, {\n  method: "POST",\n  headers: {\n    ' + H + ',\n    "Content-Type": "application/json"\n  },\n  body: JSON.stringify({\n    account_id: YUNO_ACCOUNT_ID,\n    merchant_order_id: "order-0001",\n    payment_description: "Test order",\n    country: "US",\n    amount: { currency: "USD", value: 25 }\n  })\n});\nconst { checkout_session } = await res.json();',
        python: 'import requests\n\nres = requests.post(\n    f"{YUNO_API_URL}/v1/checkout/sessions",\n    headers={\n        "public-api-key": PUBLIC_API_KEY,\n        "private-secret-key": PRIVATE_SECRET_KEY,\n    },\n    json={\n        "account_id": ACCOUNT_ID,\n        "merchant_order_id": "order-0001",\n        "payment_description": "Test order",\n        "country": "US",\n        "amount": {"currency": "USD", "value": 25},\n    },\n)\ncheckout_session = res.json()["checkout_session"]' } },
    { n: '03', title: 'Confirm the outcome', body: 'Complete required actions and verify the payment on your server.', cta: 'Test the flow', href: '/docs/direct-integration-use-cases/yuno-testing-gateway', file: 'get-payment',
      code: {
        curl: 'curl https://api-sandbox.y.uno/v1/payments/$PAYMENT_ID \\\n  -H "public-api-key: $YUNO_PUBLIC_API_KEY" \\\n  -H "private-secret-key: $YUNO_PRIVATE_SECRET_KEY"',
        node: 'const res = await fetch(`${YUNO_API_URL}/v1/payments/${paymentId}`, {\n  headers: {\n    ' + H + '\n  }\n});\nconst { payment } = await res.json();\n\nif (payment.status === "SUCCEEDED") {\n  fulfillOrder(payment.merchant_order_id);\n}',
        python: 'res = requests.get(\n    f"{YUNO_API_URL}/v1/payments/{payment_id}",\n    headers={\n        "public-api-key": PUBLIC_API_KEY,\n        "private-secret-key": PRIVATE_SECRET_KEY,\n    },\n)\npayment = res.json()["payment"]\n\nif payment["status"] == "SUCCEEDED":\n    fulfill_order(payment["merchant_order_id"])' } },
    { n: '04', title: 'Get production ready', body: 'Test webhooks, retries, and failures before enabling live payments.', cta: 'Set up webhooks', href: '/docs/webhooks/index', file: 'webhook',
      code: {
        curl: '# Send a test event to your own endpoint\ncurl -X POST https://your-app.example/webhooks/yuno \\\n  -H "Content-Type: application/json" \\\n  -d \'{\n    "type": "payment",\n    "type_event": "payment.purchase",\n    "version": 2,\n    "data": { "payment": { "status": "SUCCEEDED" } }\n  }\'',
        node: 'app.post("/webhooks/yuno", express.json(), (req, res) => {\n  const event = req.body;\n\n  if (event.type_event === "payment.purchase") {\n    updateOrder(event.data.payment);\n  }\n\n  // Respond fast; Yuno retries on failure\n  res.sendStatus(200);\n});',
        python: '@app.post("/webhooks/yuno")\ndef yuno_webhook():\n    event = request.get_json()\n\n    if event["type_event"] == "payment.purchase":\n        update_order(event["data"]["payment"])\n\n    # Respond fast; Yuno retries on failure\n    return "", 200' } },
  ];
  const LANGS = [['curl', 'cURL'], ['node', 'Node.js'], ['python', 'Python']];
  const KEY = 'yuno-docs-home-done';

  const [step, setStep] = useState(1);
  const [lang, setLang] = useState('curl');
  const [done, setDone] = useState({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try { setDone(JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}
  }, []);

  const toggle = (i) => {
    const next = { ...done, [i]: !done[i] };
    setDone(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch (e) {}
  };
  const count = STEPS.filter((_, i) => done[i]).length;
  const cur = STEPS[step];
  const text = cur.code.all || cur.code[lang];
  const copy = () => {
    const ok = () => { setCopied(true); setTimeout(() => setCopied(false), 1600); };
    try { navigator.clipboard.writeText(text).then(ok, ok); } catch (e) { ok(); }
  };

  return (
    <div>
      <div className="yd-progress" aria-live="polite">
        <span>{count} of 4 complete</span>
        <span className="yd-progress-bar"><span style={{ width: (count / 4) * 100 + '%' }} /></span>
      </div>
      <div className="yd-qs">
        <ol className="yd-steps">
          {STEPS.map((s, i) => (
            <li key={s.n} className={'yd-step' + (i === step ? ' is-active' : '') + (done[i] ? ' is-done' : '')}>
              <button type="button" className="yd-step-check" aria-pressed={!!done[i]} aria-label={'Mark step ' + s.n + ' complete'} onClick={() => toggle(i)}>
                <Ic n={done[i] ? 'checkCircle' : 'circle'} size={22} />
              </button>
              <button type="button" className="yd-step-main" aria-current={i === step} onClick={() => setStep(i)}>
                <span className="yd-step-title"><code>{s.n}</code> {s.title}</span>
                <span className="yd-step-body">{s.body}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="yd-code">
          <div className="yd-code-head">
            <span className="yd-code-file">{cur.file}</span>
            <span className="yd-code-tools">
              {!cur.code.all && (
                <span className="yd-tabs" role="tablist">
                  {LANGS.map(([k, label]) => (
                    <button key={k} type="button" role="tab" aria-selected={lang === k} className={'yd-tab' + (lang === k ? ' is-active' : '')} onClick={() => setLang(k)}>{label}</button>
                  ))}
                </span>
              )}
              <button type="button" className="yd-copy" onClick={copy}>
                <Ic n={copied ? 'check' : 'copy'} size={13} /> {copied ? 'Copied' : 'Copy'}
              </button>
            </span>
          </div>
          <pre tabIndex={0}><code>{text}</code></pre>
          <div className="yd-code-foot">
            <span>Sandbox · illustrative values</span>
            <a href={cur.href}>{cur.cta} <Ic n="arrowRight" size={14} /></a>
          </div>
        </div>
      </div>
    </div>
  );
};
