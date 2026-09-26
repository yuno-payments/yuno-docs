export const FeatureCards = () => {
  const FeatureItem = ({ href, title, desc, ai = false }) => (
    <li className="flex gap-2 items-start mb-4 text-sm leading-relaxed">
      <span className={`shrink-0 mt-0.5 text-base ${ai ? "text-[#fbbf24]" : "text-[#111827] dark:text-[#d4d5da]"}`}>
        ✓
      </span>
      <a href={href} className={`no-underline ${ai ? "!text-white" : "text-[#111827] dark:text-[#d4d5da]"}`}>
        <span className={`font-semibold ${ai ? "!text-white" : "text-[#111827] dark:text-[#ededf0]"}`}>{title}</span>
        <span className={ai ? "!text-white/80" : "text-[#6b7280] dark:text-[#9899a3]"}>{desc}</span>
      </a>
    </li>
  );

  const CardIcon = ({ children, ai = false }) => (
    <div
      className={`w-10 h-10 flex items-center justify-center shrink-0 rounded-lg ${
        ai ? "bg-white/20 text-white" : "bg-[#f0f2ff] dark:bg-[rgba(62,79,224,0.15)]"
      }`}
      style={{ color: ai ? undefined : 'var(--yuno-blue, #3E4FE0)' }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className="w-6 h-6 block">
        {children}
      </svg>
    </div>
  );

  const Card = ({ children, ai = false, className = "" }) => (
    <div
      className={`relative p-8 rounded-xl transition-all duration-300 ${
        ai
          ? "hover:shadow-[0_10px_40px_rgba(0,0,0,0.2),0_0_0_1px_white]"
          : "bg-white border border-gray-200 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:bg-[#1E293B] dark:border-[#334155] dark:hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
      } ${className}`}
      style={ai ? { backgroundColor: 'var(--yuno-blue, #3E4FE0)' } : undefined}
    >
      {children}
    </div>
  );

  const CardCta = ({ href, children, ai = false }) => (
    <a
      href={href}
      className={`yuno-cta block px-6 py-3 mb-6 text-sm font-medium text-center no-underline w-full transition-all duration-300 rounded-lg ${
        ai
          ? "yuno-cta-ai bg-white/20 !text-white border border-white/30 hover:bg-white"
          : "yuno-cta-default bg-gray-100 !text-[#111827] dark:bg-[#334155] dark:!text-[#d4d5da]"
      }`}
      style={!ai ? { '--hover-bg': 'var(--yuno-blue, #3E4FE0)' } : undefined}
    >
      {children}
    </a>
  );

  return (
    <>
      <style>{`
        a.yuno-cta-ai:hover { color: var(--yuno-blue, #3E4FE0) !important; text-decoration: none !important; }
        a.yuno-cta-default:hover { background: var(--yuno-blue, #3E4FE0) !important; color: white !important; text-decoration: none !important; }
      `}</style>
      <div className="bg-[#f8f9fa] dark:bg-[#0F172A] py-20 px-5">
        <div className="max-w-[1200px] mx-auto">
          {/* Path Chooser Section */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#111827] dark:text-[#ededf0] mb-3">Choose your integration path</h2>
            <p className="text-[#6b7280] dark:text-[#9899a3] text-base max-w-xl mx-auto">
              Use our SDKs for the fastest integration, Direct API for full control, or connect existing providers to Yuno's routing.
            </p>
          </div>
          
          <div className="grid gap-8 mb-16" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
            {/* ── SDK Checkout ── */}
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <CardIcon>
                  <path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z" />
                </CardIcon>
                <div className="text-xl font-semibold text-[#111827] dark:text-[#ededf0]">SDK checkout</div>
              </div>
              <CardCta href="/docs/sdks/overview/quickstart">Start with SDK</CardCta>
              <ul className="list-none p-0 m-0">
                <FeatureItem
                  href="/docs/sdks/overview/quickstart"
                  title="Web, iOS, Android SDKs"
                  desc=" - Pre-built checkout UI with automatic payment method display."
                />
                <FeatureItem
                  href="/docs/sdks/overview/choose-integration"
                  title="Choose your flow"
                  desc=" - Full checkout, Lite, Headless, or Secure Fields."
                />
                <FeatureItem
                  href="/docs/how-yuno-works/step-2-your-first-payment"
                  title="Sample project"
                  desc=" - Run the demo app and process a test payment."
                />
              </ul>
            </Card>

            {/* ── Direct API / Testing ── */}
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <CardIcon>
                  <path d="M208,224H48a8,8,0,0,1,0-16H208a8,8,0,0,1,0,16ZM48,176a8,8,0,0,0,8-8V88a8,8,0,0,0-16,0v80A8,8,0,0,0,48,176Zm32,0a8,8,0,0,0,8-8V88a8,8,0,0,0-16,0v80A8,8,0,0,0,80,176Zm40,0a8,8,0,0,0,8-8V40a8,8,0,0,0-16,0V168A8,8,0,0,0,120,176Zm32,0a8,8,0,0,0,8-8V40a8,8,0,0,0-16,0V168A8,8,0,0,0,152,176Zm40,0a8,8,0,0,0,8-8V88a8,8,0,0,0-16,0v80A8,8,0,0,0,192,176Zm32,0a8,8,0,0,0,8-8V88a8,8,0,0,0-16,0v80A8,8,0,0,0,224,176Z" />
                </CardIcon>
                <div className="text-xl font-semibold text-[#111827] dark:text-[#ededf0]">Direct API</div>
              </div>
              <CardCta href="/docs/direct-integration-use-cases/direct-flow">View Direct API guides</CardCta>
              <ul className="list-none p-0 m-0">
                <FeatureItem
                  href="/docs/direct-integration-use-cases/direct-flow"
                  title="Server-to-server integration"
                  desc=" - Full API control for custom implementations."
                />
                <FeatureItem
                  href="/docs/direct-integration-use-cases/yuno-testing-gateway"
                  title="Yuno Testing Gateway"
                  desc=" - Test cards, scenarios, and 3DS flows in sandbox."
                />
                <FeatureItem
                  href="/reference/getting-started/api-reference-overview"
                  title="API reference"
                  desc=" - Full endpoint documentation with examples."
                />
              </ul>
            </Card>

            {/* ── Connect Providers ── */}
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <CardIcon>
                  <path d="M149.66,122.34a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32-11.32L124.69,136H24a8,8,0,0,1,0-16H124.69L98.34,93.66a8,8,0,0,1,11.32-11.32ZM192,32H96a8,8,0,0,0,0,16h96a8,8,0,0,1,8,8V200a8,8,0,0,1-8,8H96a8,8,0,0,0,0,16h96a24,24,0,0,0,24-24V56A24,24,0,0,0,192,32Z" />
                </CardIcon>
                <div className="text-xl font-semibold text-[#111827] dark:text-[#ededf0]">Connect providers</div>
              </div>
              <CardCta href="/docs/using-yuno/dashboard-overview/connections">Set up connections</CardCta>
              <ul className="list-none p-0 m-0">
                <FeatureItem
                  href="/docs/using-yuno/dashboard-overview/connections"
                  title="Add payment providers"
                  desc=" - Connect Stripe, Adyen, dLocal, or any supported provider."
                />
                <FeatureItem
                  href="/docs/using-yuno/dashboard-overview/routing"
                  title="Configure routing"
                  desc=" - Route payments by country, method, or custom rules."
                />
                <FeatureItem
                  href="/docs/using-yuno/dashboard-overview/checkout-builder"
                  title="Checkout builder"
                  desc=" - Enable payment methods and customize checkout."
                />
              </ul>
            </Card>

            {/* ── AI / MCP (blue card) ── */}
            <Card ai>
              <div className="absolute top-4 right-4 bg-emerald-500 text-white px-2 py-1 text-xs font-semibold rounded">
                NEW
              </div>
              <div className="flex items-center gap-3 mb-4">
                <CardIcon ai>
                  <path d="M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48Zm16,144a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V80A16,16,0,0,1,56,64H200a16,16,0,0,1,16,16Zm-128-4a12,12,0,1,1-12-12A12,12,0,0,1,88,188Zm104,0a12,12,0,1,1-12-12A12,12,0,0,1,192,188Zm0-68a8,8,0,0,1-8,8H72a8,8,0,0,1,0-16H184A8,8,0,0,1,192,120Z" />
                </CardIcon>
                <div className="text-xl font-semibold text-white">AI & MCP</div>
              </div>
              <CardCta href="/setup-mcp" ai>Setup MCP</CardCta>
              <ul className="list-none p-0 m-0">
                <FeatureItem
                  href="/setup-mcp"
                  title="MCP integration"
                  desc=" - Connect Yuno docs to Cursor, Windsurf, or Claude."
                  ai
                />
                <FeatureItem
                  href="/docs/ai-capabilities/maia-ai-technical-account-manager"
                  title="Maia AI"
                  desc=" - Get answers about your payments from an AI account manager."
                  ai
                />
                <FeatureItem
                  href="/docs/ai-capabilities/building-ai-integrations-with-yunos-llms-and-mcp"
                  title="Build with AI"
                  desc=" - LLMs, remote MCP server, and agent toolkit."
                  ai
                />
              </ul>
            </Card>
          </div>

          {/* Additional Resources */}
          <div className="grid gap-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            {/* ── Get Started ── */}
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <CardIcon>
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z" />
                </CardIcon>
                <div className="text-xl font-semibold text-[#111827] dark:text-[#ededf0]">Get started</div>
              </div>
              <CardCta href="/docs/how-yuno-works/what-is-yuno">Learn about Yuno</CardCta>
              <ul className="list-none p-0 m-0">
                <FeatureItem
                  href="/docs/how-yuno-works/what-is-yuno"
                  title="What is Yuno"
                  desc=" - Orchestration platform overview."
                />
                <FeatureItem
                  href="/docs/how-yuno-works/step-1-set-up-your-account"
                  title="Set up your account"
                  desc=" - Create credentials and configure sandbox."
                />
                <FeatureItem
                  href="/docs/how-yuno-works/how-yuno-payment-flow-works"
                  title="Payment flow"
                  desc=" - Understand sessions, payments, and transactions."
                />
                <FeatureItem
                  href="/docs/basic-concepts/index"
                  title="Core concepts"
                  desc=" - Customers, tokens, webhooks, and more."
                />
              </ul>
            </Card>

            {/* ── Payment Features ── */}
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <CardIcon>
                  <path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16V88H32V64Zm0,128H32V104H224v88Zm-16-24a8,8,0,0,1-8,8H176a8,8,0,0,1,0-16h24A8,8,0,0,1,208,168Zm-64,0a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h16A8,8,0,0,1,144,168Z" />
                </CardIcon>
                <div className="text-xl font-semibold text-[#111827] dark:text-[#ededf0]">Payment features</div>
              </div>
              <CardCta href="/docs/payment-features/stored-credentials">Explore features</CardCta>
              <ul className="list-none p-0 m-0">
                <FeatureItem
                  href="/docs/wallets/index"
                  title="Digital wallets"
                  desc=" - Apple Pay, Google Pay, Click to Pay."
                />
                <FeatureItem
                  href="/docs/payment-features/installments/index"
                  title="Installments"
                  desc=" - Flexible payment plans."
                />
                <FeatureItem
                  href="/docs/payment-features/subscriptions/index"
                  title="Subscriptions"
                  desc=" - Recurring billing."
                />
                <FeatureItem
                  href="/docs/webhooks/index"
                  title="Webhooks"
                  desc=" - Real-time event notifications."
                />
              </ul>
            </Card>

            {/* ── Security ── */}
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <CardIcon>
                  <path d="M208,40H48A16,16,0,0,0,32,56v58.77c0,89.61,75.82,119.34,91,124.39a15.53,15.53,0,0,0,10,0c15.2-5.05,91-34.78,91-124.39V56A16,16,0,0,0,208,40Zm0,74.79c0,78.42-66.35,104.62-80,109.46-13.53-4.79-80-30.69-80-109.46V56H208Z" />
                </CardIcon>
                <div className="text-xl font-semibold text-[#111827] dark:text-[#ededf0]">Security</div>
              </div>
              <CardCta href="/docs/security-and-compliance/pci-compliance">View security docs</CardCta>
              <ul className="list-none p-0 m-0">
                <FeatureItem
                  href="/docs/security-and-compliance/3d-secure"
                  title="3D Secure"
                  desc=" - Authentication and fraud prevention."
                />
                <FeatureItem
                  href="/docs/security-and-compliance/pci-compliance"
                  title="PCI compliance"
                  desc=" - DSS standards and regulations."
                />
                <FeatureItem
                  href="/docs/security-and-compliance/network-tokens"
                  title="Network tokens"
                  desc=" - Secure, up-to-date card data."
                />
              </ul>
            </Card>

            {/* ── Changelog ── */}
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <CardIcon>
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z" />
                </CardIcon>
                <div className="text-xl font-semibold text-[#111827] dark:text-[#ededf0]">Changelog</div>
              </div>
              <CardCta href="/changelog">View updates</CardCta>
              <ul className="list-none p-0 m-0">
                <FeatureItem
                  href="/changelog/api"
                  title="API"
                  desc=" - REST API updates."
                />
                <FeatureItem
                  href="/changelog/web"
                  title="Web SDK"
                  desc=" - Web and Secure Fields releases."
                />
                <FeatureItem
                  href="/changelog/ios"
                  title="iOS SDK"
                  desc=" - iOS releases."
                />
                <FeatureItem
                  href="/changelog/android"
                  title="Android SDK"
                  desc=" - Android releases."
                />
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
