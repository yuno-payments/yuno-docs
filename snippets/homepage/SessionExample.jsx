export const SessionExample = () => {
  const [language, setLanguage] = useState("Node.js");
  const [copyState, setCopyState] = useState("Copy");
  const samples = {
    "Node.js": `// Run on your server. Keep secret keys here.\nconst response = await fetch(\n  'https://api-sandbox.y.uno/v1/checkout/sessions',\n  {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json',\n      'public-api-key': process.env.YUNO_PUBLIC_KEY,\n      'private-secret-key': process.env.YUNO_SECRET_KEY\n    },\n    body: JSON.stringify({\n      account_id: process.env.YUNO_ACCOUNT_ID,\n      merchant_order_id: 'order_001',\n      payment_description: 'My first Yuno payment',\n      country: 'US',\n      amount: { currency: 'USD', value: 25 }\n    })\n  }\n);\nif (!response.ok) throw new Error(await response.text());\nconst session = await response.json();`,
    cURL: `curl --request POST \\\n  'https://api-sandbox.y.uno/v1/checkout/sessions' \\\n  --header 'Content-Type: application/json' \\\n  --header "public-api-key: $YUNO_PUBLIC_KEY" \\\n  --header "private-secret-key: $YUNO_SECRET_KEY" \\\n  --data '{\n    "account_id": "YOUR_ACCOUNT_ID",\n    "merchant_order_id": "order_001",\n    "payment_description": "My first Yuno payment",\n    "country": "US",\n    "amount": { "currency": "USD", "value": 25 }\n  }'`,
    Python: `# Run on your server. Requires requests.\nimport os\nimport requests\n\nresponse = requests.post(\n  'https://api-sandbox.y.uno/v1/checkout/sessions',\n  headers={\n    'public-api-key': os.environ['YUNO_PUBLIC_KEY'],\n    'private-secret-key': os.environ['YUNO_SECRET_KEY'],\n  },\n  json={\n    'account_id': os.environ['YUNO_ACCOUNT_ID'],\n    'merchant_order_id': 'order_001',\n    'payment_description': 'My first Yuno payment',\n    'country': 'US',\n    'amount': { 'currency': 'USD', 'value': 25 },\n  },\n  timeout=60,\n)\nresponse.raise_for_status()\nsession = response.json()`,
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(samples[language]);
      setCopyState("Copied!");
    } catch {
      setCopyState("Select code to copy");
    }
    setTimeout(() => setCopyState("Copy"), 2000);
  };
  const highlight = (line) =>
    line
      .split(
        /('.*?'|".*?"|\b(?:const|await|import|from|if|throw|new|25|60)\b|\/\/.*|#.*)/g,
      )
      .map((part, i) => (
        <span
          key={i}
          className={
            /^\/\/|^#/.test(part)
              ? "yd-code-comment"
              : /^['"]/.test(part)
                ? "yd-code-string"
                : /^(const|await|import|from|if|throw|new)$/.test(part)
                  ? "yd-code-keyword"
                  : ""
          }
        >
          {part}
        </span>
      ));
  return (
    <div className="yd-code-window">
      <div className="yd-code-title">
        <span>
          <i />
          <i />
          <i />
        </span>
        <span>create-checkout-session</span>
        <span className="yd-sandbox">SANDBOX</span>
      </div>
      <div className="yd-code-toolbar">
        <div role="group" aria-label="Code language">
          {Object.keys(samples).map((name) => (
            <button
              type="button"
              key={name}
              aria-pressed={name === language}
              onClick={() => {
                setLanguage(name);
                setCopyState("Copy");
              }}
            >
              {name}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="yd-copy"
          onClick={copy}
          aria-label="Copy checkout session code"
        >
          {copyState}
        </button>
      </div>
      <pre tabIndex={0} aria-label={`${language} checkout session example`}>
        <code>
          {samples[language].split("\n").map((line, i) => (
            <span className="yd-code-line" key={i}>
              <span className="yd-line-number" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              {highlight(line)}
              {"\n"}
            </span>
          ))}
        </code>
      </pre>
      <div className="yd-code-foot">
        <span>
          <span className="yd-code-dot" /> Server-side request · USD 25.00
        </span>
        <a href="/reference/checkout-sessions/create-checkout-session">
          View reference ↗
        </a>
      </div>
      <span className="yd-sr-only" aria-live="polite">
        {copyState === "Copy" ? "" : copyState}
      </span>
    </div>
  );
};
