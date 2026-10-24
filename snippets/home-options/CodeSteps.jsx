export const CodeSteps = () => {
  const steps = [
    {
      title: 'Create a customer',
      call: 'POST /v1/customers',
      request: 'POST /v1/customers\n{\n  "merchant_customer_id": "customer-0001",\n  "email": "john.doe@example.com"\n}',
      response: '201  { "id": "...", "merchant_customer_id": "customer-0001" }',
    },
    {
      title: 'Create a checkout session',
      call: 'POST /v1/checkout/sessions',
      request: 'POST /v1/checkout/sessions\n{\n  "account_id": "...",\n  "merchant_order_id": "order-0001",\n  "payment_description": "First test payment",\n  "country": "US",\n  "customer_id": "...",\n  "amount": { "currency": "USD", "value": 25 },\n  "workflow": "SDK_CHECKOUT"\n}',
      response: '200  { "checkout_session": "..." }',
    },
    {
      title: 'Collect the card',
      call: 'Web SDK',
      request: 'transaction.start({\n  paymentMethod: { type: "CARD" }\n})\n// the shopper enters the test card',
      response: 'createPayment(oneTimeToken)  // token + checkout_session',
    },
    {
      title: 'Create the payment',
      call: 'POST /v1/payments',
      request: 'POST /v1/payments\n{\n  "account_id": "...",\n  "merchant_order_id": "order-0001",\n  "description": "First test payment",\n  "country": "US",\n  "amount": { "currency": "USD", "value": 25 },\n  "customer_payer": { "id": "..." },\n  "payment_method": { "token": "<oneTimeToken>" },\n  "checkout": { "session": "..." }\n}',
      response: '201  { "status": "SUCCEEDED" }',
    },
  ];
  const [active, setActive] = useState(3);
  const s = steps[active];
  return (
    <div className="hxb-code">
      <div className="hxb-code-bar">
        <span>sandbox · api-sandbox.y.uno</span>
        <span className="hxb-code-call">{s.call}</span>
      </div>
      <div className="hxb-code-steps" role="tablist" aria-label="First payment steps">
        {steps.map((st, i) => (
          <button
            key={st.title}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={i === active ? 'hxb-step is-on' : 'hxb-step'}
            onClick={() => setActive(i)}
          >
            <span className="hxb-step-num">0{i + 1}</span>{st.title}
          </button>
        ))}
      </div>
      <pre className="hxb-code-req" tabIndex={0}><code>{s.request}</code></pre>
      <div className="hxb-code-res">
        <span className="hxb-code-label">Response</span>
        <pre><code>{s.response}</code></pre>
      </div>
    </div>
  );
};
