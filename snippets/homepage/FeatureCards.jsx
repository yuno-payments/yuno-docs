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
      className={`w-10 h-10 flex items-center justify-center shrink-0 ${
        ai ? "bg-white/20 text-white" : "bg-[#f0f2ff] text-[#3d4fdf] dark:bg-[rgba(62,79,224,0.15)] dark:text-[#7a8aef]"
      }`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className="w-6 h-6 block">
        {children}
      </svg>
    </div>
  );

  const Card = ({ children, ai = false, className = "" }) => (
    <div
      className={`relative p-8 transition-all duration-300 ${
        ai
          ? "bg-[#3d4fdf] hover:shadow-[0_10px_40px_rgba(0,0,0,0.2),0_0_0_1px_white]"
          : "bg-white border border-gray-200 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1),0_0_0_1px_#3d4fdf] hover:border-[#3d4fdf] dark:bg-[#282a30] dark:border-[#3a3c44] dark:hover:border-[#7a8aef] dark:hover:shadow-[0_10px_40px_rgba(0,0,0,0.4),0_0_0_1px_#7a8aef]"
      } ${className}`}
    >
      {children}
    </div>
  );

  const CardCta = ({ href, children, ai = false }) => (
    <a
      href={href}
      className={`yuno-cta block px-6 py-3 mb-6 text-sm font-medium text-center no-underline w-full transition-all duration-300 ${
        ai
          ? "yuno-cta-ai bg-white/20 !text-white border border-white/30 hover:bg-white"
          : "yuno-cta-default bg-gray-100 !text-[#111827] hover:bg-[#3d4fdf] dark:bg-[#32353c] dark:!text-[#d4d5da] dark:hover:bg-[#3d4fdf]"
      }`}
    >
      {children}
    </a>
  );
  return (
    <>
      <style>{`
      a.yuno-cta-ai:hover    { color: #3d4fdf !important; text-decoration: none !important; }
      a.yuno-cta-default:hover { color: white !important; text-decoration: none !important; }
    `}</style>
      <div className="bg-[#f8f9fa] dark:bg-[#1a1b20] py-20 px-5">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid gap-8 mb-16" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
            {/* ── Get Started ── */}
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <CardIcon>
                  <path d="M149.66,122.34a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32-11.32L124.69,136H24a8,8,0,0,1,0-16H124.69L98.34,93.66a8,8,0,0,1,11.32-11.32ZM192,32H96a8,8,0,0,0,0,16h96a8,8,0,0,1,8,8V200a8,8,0,0,1-8,8H96a8,8,0,0,0,0,16h96a24,24,0,0,0,24-24V56A24,24,0,0,0,192,32Z" />
                </CardIcon>
                <div className="text-xl font-semibold text-[#111827] dark:text-[#ededf0]">Get started with Yuno</div>
              </div>
              <CardCta href="/docs/how-yuno-works/what-is-yuno">Learn about Yuno</CardCta>
              <ul className="list-none p-0 m-0">
                <FeatureItem
                   href="/docs/how-yuno-works/how-yuno-payment-flow-works"
                  title="How the Yuno Payment Process Works"
                  desc=" - Learn the step-by-step payment flow and key elements involved."
                />
                <FeatureItem
                  href="/docs/sdks/overview/quickstart"
                  title="Set up your account"
                  desc=" - Create your Yuno account and configure your first environment."
                />
                <FeatureItem
                  href="/docs/sdks/overview/quickstart"
                  title="Create your first payment"
                  desc=" - Follow our quickstart guide to process your first transaction."
                />
                <FeatureItem
                   href="/docs/basic-concepts/index"
                  title="Basic concepts"
                  desc=" - Understand customers, sessions, payments, and tokens."
                />
              </ul>
            </Card>

            {/* ── Integration Methods ── */}
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <CardIcon>
                  <path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z" />
                </CardIcon>
                <div className="text-xl font-semibold text-[#111827] dark:text-[#ededf0]">Integration methods</div>
              </div>
               <CardCta href="/docs/sdks/overview/choose-integration">Choose your integration</CardCta>
              <ul className="list-none p-0 m-0">
                 <FeatureItem
                  href="/docs/sdks/overview/quickstart"
                  title="SDKs"
                  desc=" - Ready-made SDKs for Web, Android, and iOS platforms."
                />
                 <FeatureItem
                  href="/docs/direct-integration-use-cases/direct-flow"
                  title="Direct Flow Integration"
                  desc=" - Server-to-server API integration for custom implementations."
                />
                 <FeatureItem
                  href="/docs/sdks/customization/secure-fields/index"
                  title="Secure Fields"
                  desc=" - PCI-compliant payment forms with customizable styling."
                />
                 <FeatureItem
                  href="/docs/direct-integration-use-cases/yuno-testing-gateway"
                  title="Testing Gateway"
                  desc=" - Test your integration with Yuno's testing environment."
                />
              </ul>
            </Card>

            {/* ── API Reference ── */}
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <CardIcon>
                  <path d="M208,224H48a8,8,0,0,1,0-16H208a8,8,0,0,1,0,16ZM48,176a8,8,0,0,0,8-8V88a8,8,0,0,0-16,0v80A8,8,0,0,0,48,176Zm32,0a8,8,0,0,0,8-8V88a8,8,0,0,0-16,0v80A8,8,0,0,0,80,176Zm40,0a8,8,0,0,0,8-8V40a8,8,0,0,0-16,0V168A8,8,0,0,0,120,176Zm32,0a8,8,0,0,0,8-8V40a8,8,0,0,0-16,0V168A8,8,0,0,0,152,176Zm40,0a8,8,0,0,0,8-8V88a8,8,0,0,0-16,0v80A8,8,0,0,0,192,176Zm32,0a8,8,0,0,0,8-8V88a8,8,0,0,0-16,0v80A8,8,0,0,0,224,176Z" />
                </CardIcon>
                <div className="text-xl font-semibold text-[#111827] dark:text-[#ededf0]">API reference</div>
              </div>
              <CardCta href="/reference/getting-started/api-reference-overview">View API docs</CardCta>
              <ul className="list-none p-0 m-0">
                 <FeatureItem
                  href="/reference/getting-started/authentication"
                  title="API Basics"
                  desc=" - Get started with API main concepts, authentication, and environments."
                />
                <FeatureItem
                  href="/reference/getting-started/api-reference-overview"
                  title="Discover all our APIs"
                  desc=" - Including payments, subscriptions, reports, and so much more."
                />
                <FeatureItem
                  href="/reference/getting-started/api-reference-overview"
                  title="Reference"
                  desc=" - Essential data to get the most of our APIs."
                />
                 <FeatureItem
                  href="/reference/getting-started/postman-collections"
                  title="Postman Collections"
                  desc=" - Ready-to-use Postman collections for testing and development."
                />
              </ul>
            </Card>

            {/* ── Advanced Features ── */}
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <CardIcon>
                  <path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16V88H32V64Zm0,128H32V104H224v88Zm-16-24a8,8,0,0,1-8,8H176a8,8,0,0,1,0-16h24A8,8,0,0,1,208,168Zm-64,0a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h16A8,8,0,0,1,144,168Z" />
                </CardIcon>
                <div className="text-xl font-semibold text-[#111827] dark:text-[#ededf0]">Advanced features</div>
              </div>
               <CardCta href="/docs/payment-features/stored-credentials">Explore capabilities</CardCta>
              <ul className="list-none p-0 m-0">
                <FeatureItem
                   href="/docs/payment-features/installments/index"
                  title="Installments"
                  desc=" - Offer flexible payment plans and recurring billing."
                />
                <FeatureItem
                   href="/docs/payment-features/split-payments-marketplace"
                  title="Split marketplace payments"
                  desc=" - Enable revenue sharing for marketplace platforms."
                />
                <FeatureItem
                   href="/docs/payouts-and-disputes/chargeback-management"
                  title="Payouts & disputes"
                  desc=" - Manage payouts, handle disputes, and chargeback management."
                />
                <FeatureItem
                   href="/docs/using-yuno/dashboard-overview/payment-links"
                  title="Payment links"
                  desc=" - Create payment links and enroll payment methods for future use."
                />
                <FeatureItem
                   href="/docs/webhooks/index"
                  title="Webhooks & automation"
                  desc=" - Receive real-time notifications and automate workflows."
                />
              </ul>
            </Card>

            {/* ── Digital Wallets & APMs ── */}
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <CardIcon>
                  <path d="M176,16H80A24,24,0,0,0,56,40V216a24,24,0,0,0,24,24h96a24,24,0,0,0,24-24V40A24,24,0,0,0,176,16Zm8,200a8,8,0,0,1-8,8H80a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h96a8,8,0,0,1,8,8ZM140,188a12,12,0,1,1-12-12A12,12,0,0,1,140,188Z" />
                </CardIcon>
                <div className="text-xl font-semibold text-[#111827] dark:text-[#ededf0]">Digital wallets & APMs</div>
              </div>
               <CardCta href="/docs/payment-features/enrollment/enroll-payment-methods">Setup wallets</CardCta>
              <ul className="list-none p-0 m-0">
                <FeatureItem
                   href="/docs/wallets/apple-pay/prerequisites-apple-pay"
                  title="Apple Pay integration"
                  desc=" - Enable secure Apple Pay payments in apps and websites."
                />
                <FeatureItem
                   href="/docs/wallets/google-pay/google-pay-sdk-integration"
                  title="Google Pay setup"
                  desc=" - Accept Google Pay on Android devices and web platforms."
                />
                <FeatureItem
                   href="/docs/wallets/click-to-pay"
                  title="Click to Pay"
                  desc=" - Provide faster checkout with secure card-on-file payments."
                />
                <FeatureItem
                   href="/docs/wallets/nupay"
                  title="NuPay"
                  desc=" - Instant payment solution for seamless transactions."
                />
              </ul>
            </Card>

            {/* ── AI Optimization (blue card) ── */}
            <Card ai className="hover:-translate-y-1">
              <div className="absolute top-4 right-4 bg-emerald-500 text-white px-2 py-1 text-xs font-semibold">
                NEW
              </div>
              <div className="flex items-center gap-3 mb-4">
                <CardIcon ai>
                  <path d="M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48Zm16,144a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V80A16,16,0,0,1,56,64H200a16,16,0,0,1,16,16Zm-128-4a12,12,0,1,1-12-12A12,12,0,0,1,88,188Zm104,0a12,12,0,1,1-12-12A12,12,0,0,1,192,188Zm0-68a8,8,0,0,1-8,8H72a8,8,0,0,1,0-16H184A8,8,0,0,1,192,120Z" />
                </CardIcon>
                <div className="text-xl font-semibold text-white">AI optimization</div>
              </div>
               <CardCta href="/docs/ai-capabilities/aida-ai-agent" ai>
                Discover AI tools
              </CardCta>
              <ul className="list-none p-0 m-0">
                <FeatureItem
                   href="/docs/ai-capabilities/aida-ai-agent"
                  title="Aida AI Agent"
                  desc=" - **Aida AI Agent**: Use **AI-powered assistance** to streamline payment operations."
                  ai
                />
                <FeatureItem
                   href="/docs/ai-capabilities/building-ai-integrations-with-yunos-llms-and-mcp"
                  title="LLM & MCP integrations"
                  desc=" - **LLM & MCP integrations**: Build smarter workflows with **language model integrations**."
                  ai
                />
                <FeatureItem
                   href="/docs/ai-capabilities/remote-yuno-mcp-server"
                  title="Remote Yuno MCP Server"
                  desc=" - **Remote Yuno MCP Server**: **AI-driven routing** to optimize success rates and costs."
                  ai
                />
              </ul>
            </Card>

            {/* ── Using Yuno ── */}
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <CardIcon>
                  <path d="M224,200h-8V40a8,8,0,0,0-8-8H152a8,8,0,0,0-8,8V80H96a8,8,0,0,0-8,8v40H48a8,8,0,0,0-8,8v64H32a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16ZM160,48h40V200H160ZM104,96h40V200H104ZM56,144H88v56H56Z" />
                </CardIcon>
                <div className="text-xl font-semibold text-[#111827] dark:text-[#ededf0]">Using Yuno</div>
              </div>
               <CardCta href="/docs/using-yuno/environments">Learn more</CardCta>
              <ul className="list-none p-0 m-0">
                <FeatureItem
                   href="/docs/using-yuno/environments"
                  title="Environments"
                  desc=" - Manage development, staging, and production environments."
                />
                <FeatureItem
                   href="/docs/using-yuno/dashboard-overview/your-payment-operative-system"
                  title="Dashboard overview"
                  desc=" - Monitor transactions, view analytics, and manage your account."
                />
                <FeatureItem
                   href="/docs/using-yuno/dashboard-overview/risk-conditions"
                  title="Other tools"
                  desc=" - Access additional utilities and management features."
                />
                <FeatureItem
                   href="/docs/using-yuno/settings/security"
                  title="Security settings"
                  desc=" - Configure security policies and access controls."
                />
                <FeatureItem
                   href="/docs/plugins/vtex/index"
                  title="VTEX"
                  desc=" - Integrate with VTEX and other e-commerce platforms."
                />
              </ul>
            </Card>

            {/* ── Security & Compliance ── */}
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <CardIcon>
                  <path d="M208,40H48A16,16,0,0,0,32,56v58.77c0,89.61,75.82,119.34,91,124.39a15.53,15.53,0,0,0,10,0c15.2-5.05,91-34.78,91-124.39V56A16,16,0,0,0,208,40Zm0,74.79c0,78.42-66.35,104.62-80,109.46-13.53-4.79-80-30.69-80-109.46V56H208Z" />
                </CardIcon>
                <div className="text-xl font-semibold text-[#111827] dark:text-[#ededf0]">Security & compliance</div>
              </div>
               <CardCta href="/docs/security-and-compliance/pci-compliance">View security features</CardCta>
              <ul className="list-none p-0 m-0">
                <FeatureItem
                   href="/docs/security-and-compliance/3d-secure"
                  title="3D Secure & fraud prevention"
                  desc=" - Add authentication layers and advanced fraud detection."
                />
                <FeatureItem
                   href="/docs/security-and-compliance/pci-compliance"
                  title="PCI compliance"
                  desc=" - Stay fully compliant with PCI DSS standards and regulations."
                />
                <FeatureItem
                   href="/docs/security-and-compliance/network-tokens"
                  title="Network tokens"
                  desc=" - Process payments with secure, always up-to-date card data."
                />
                <FeatureItem
                   href="/docs/security-and-compliance/data-migration-processes/token-migration-process"
                  title="Data migration"
                  desc=" - Securely migrate tokens and customer data to Yuno."
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
              <CardCta href="/changelog">View recent updates</CardCta>
              <ul className="list-none p-0 m-0">
                <FeatureItem
                   href="/docs/sdks/resources/release-notes/ios"
                  title="iOS release notes"
                  desc=" - Detailed information about iOS SDK updates and platform changes."
                />
                <FeatureItem
                   href="/docs/sdks/resources/release-notes/android"
                  title="Android release notes"
                  desc=" - Detailed information about Android SDK updates and platform changes."
                />
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
