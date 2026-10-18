export const FirstPayment = () => {
  const [lang, setLang] = useState('curl');
  const [amount, setAmount] = useState(25);
  const [stage, setStage] = useState('idle'); // idle | sending | done
  const [copied, setCopied] = useState(false);

  const value = Number.isFinite(Number(amount)) && Number(amount) > 0 ? Number(amount) : 25;

  const code = {
    curl: `curl --request POST \\
  https://api-sandbox.y.uno/v1/payments \\
  --header "public-api-key: $YUNO_PUBLIC_API_KEY" \\
  --header "private-secret-key: $YUNO_PRIVATE_SECRET_KEY" \\
  --header "X-Idempotency-Key: $(uuidgen)" \\
  --header 'content-type: application/json' \\
  --data '{
    "account_id": "'"$YUNO_ACCOUNT_ID"'",
    "merchant_order_id": "order-0001",
    "description": "First test payment",
    "country": "US",
    "amount": { "currency": "USD", "value": ${value} },
    "workflow": "DIRECT",
    "payment_method": {
      "type": "CARD",
      "detail": { "card": { "card_data": {
        "number": "4111111111111111",
        "expiration_month": 12,
        "expiration_year": 2030,
        "security_code": "123",
        "holder_name": "JOHN DOE"
      } } }
    }
  }'`,
    node: `const res = await fetch("https://api-sandbox.y.uno/v1/payments", {
  method: "POST",
  headers: {
    "public-api-key": process.env.YUNO_PUBLIC_API_KEY,
    "private-secret-key": process.env.YUNO_PRIVATE_SECRET_KEY,
    "X-Idempotency-Key": crypto.randomUUID(),
    "content-type": "application/json",
  },
  body: JSON.stringify({
    account_id: process.env.YUNO_ACCOUNT_ID,
    merchant_order_id: "order-0001",
    description: "First test payment",
    country: "US",
    amount: { currency: "USD", value: ${value} },
    workflow: "DIRECT",
    payment_method: {
      type: "CARD",
      detail: { card: { card_data: {
        number: "4111111111111111",
        expiration_month: 12,
        expiration_year: 2030,
        security_code: "123",
        holder_name: "JOHN DOE",
      } } },
    },
  }),
});
const payment = await res.json();
console.log(payment.status); // SUCCEEDED`,
    python: `import os, uuid, requests

res = requests.post(
    "https://api-sandbox.y.uno/v1/payments",
    headers={
        "public-api-key": os.environ["YUNO_PUBLIC_API_KEY"],
        "private-secret-key": os.environ["YUNO_PRIVATE_SECRET_KEY"],
        "X-Idempotency-Key": str(uuid.uuid4()),
    },
    json={
        "account_id": os.environ["YUNO_ACCOUNT_ID"],
        "merchant_order_id": "order-0001",
        "description": "First test payment",
        "country": "US",
        "amount": {"currency": "USD", "value": ${value}},
        "workflow": "DIRECT",
        "payment_method": {
            "type": "CARD",
            "detail": {"card": {"card_data": {
                "number": "4111111111111111",
                "expiration_month": 12,
                "expiration_year": 2030,
                "security_code": "123",
                "holder_name": "JOHN DOE",
            }}},
        },
    },
)
print(res.json()["status"])  # SUCCEEDED`,
  };

  const response = `{
  "id": "7413f716-3223-41a6-868d-c9b27ba730bd",
  "status": "SUCCEEDED",
  "sub_status": "APPROVED",
  "amount": { "currency": "USD", "value": ${value} }
}`;

  const langs = [['curl', 'cURL'], ['node', 'Node.js'], ['python', 'Python']];

  const highlight = (src) =>
    src.split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|#.*$|\/\/.*$)/gm).map((part, i) => {
      if (!part) return null;
      if (/^(#|\/\/)/.test(part)) return <span key={i} className="yd-fp-c">{part}</span>;
      if (/^["']/.test(part)) return <span key={i} className="yd-fp-s">{part}</span>;
      return <span key={i}>{part}</span>;
    });

  const copy = () => {
    const ok = () => { setCopied(true); setTimeout(() => setCopied(false), 1600); };
    try { navigator.clipboard.writeText(code[lang]).then(ok, ok); } catch (e) { ok(); }
  };

  const send = () => {
    setStage('sending');
    setTimeout(() => setStage('done'), 900);
  };

  return (
    <div className="yd-fp">
      <div className="yd-fp-top">
        <span className="yd-fp-title">Your first payment</span>
        <span className="yd-fp-method"><b>POST</b> /v1/payments</span>
      </div>

      <div className="yd-fp-bar">
        <div className="yd-fp-tabs" role="tablist" aria-label="Language">
          {langs.map(([id, label]) => (
            <button key={id} type="button" role="tab" aria-selected={lang === id}
              className={'yd-fp-tab' + (lang === id ? ' is-active' : '')}
              onClick={() => setLang(id)}>{label}</button>
          ))}
        </div>
        <button type="button" className="yd-fp-copy" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
      </div>

      <pre className="yd-fp-code" tabIndex={0}><code>{highlight(code[lang])}</code></pre>

      <div className="yd-fp-controls">
        <label className="yd-fp-field">
          <span>Amount (USD)</span>
          <input type="number" min="1" step="1" value={amount}
            onChange={(e) => { setAmount(e.target.value); setStage('idle'); }} />
        </label>
        <button type="button" className="yd-fp-send" onClick={send} disabled={stage === 'sending'}>
          {stage === 'sending' ? <span className="yd-fp-spin" aria-hidden="true" /> : null}
          {stage === 'sending' ? 'Sending' : stage === 'done' ? 'Send again' : 'Send request'}
        </button>
      </div>

      {stage === 'done' && (
        <div className="yd-fp-res" aria-live="polite">
          <div className="yd-fp-res-head">
            <span className="yd-fp-badge">201 Created</span>
            <span className="yd-fp-steps">
              <span>CREATED</span><span className="yd-fp-arrow">→</span><span className="is-ok">SUCCEEDED</span>
            </span>
          </div>
          <pre className="yd-fp-code yd-fp-code-res"><code>{highlight(response)}</code></pre>
          <div className="yd-fp-res-foot">Example sandbox response, abridged. Nothing is sent from this page.</div>
        </div>
      )}

      <div className="yd-fp-foot">
        <span>Sandbox only. Needs a card connection and a route. In production, collect cards with the SDK.</span>
        <a href="/reference/payments/create-payment">Try it in the API playground →</a>
      </div>
    </div>
  );
};
