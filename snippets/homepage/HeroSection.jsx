export const HeroSection = () => (
  <>
    <style>{`
      @keyframes yunoFadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes yunoPulse {
        0%   { transform: scale(1);   opacity: 0.3; }
        50%  { transform: scale(1.5); opacity: 0.1; }
        100% { transform: scale(2);   opacity: 0;   }
      }
      .yuno-welcome { animation: yunoFadeInUp 0.8s ease-out 0.2s backwards; }
      .yuno-title   { animation: yunoFadeInUp 0.8s ease-out 0.4s backwards; }
      .yuno-desc    { animation: yunoFadeInUp 0.8s ease-out 0.6s backwards; }
      .yuno-cta     { animation: yunoFadeInUp 0.8s ease-out 0.8s backwards; }
      .yuno-pulse {
        position: absolute;
        top: 50%; left: 50%;
        width: 300px; height: 300px;
        margin: -150px 0 0 -150px;
        border-radius: 50% !important;
        border: 2px solid rgba(255,255,255,0.3);
        animation: yunoPulse 3s ease-out infinite;
        pointer-events: none;
      }
      @media (max-width: 1440px) {
        .yuno-hero-bg {
          background-image: url('https://files.readme.io/32593a1500fc4ee83955beb91d7ead18af5c09a61bbc4d1d7fef5691dc66485a-bg_1440.png') !important;
        }
      }
      @media (max-width: 768px) {
        .yuno-hero { padding: 50px 20px 70px !important; }
        .yuno-hero-bg {
          background-image: url('https://files.readme.io/8019470dcd90a44bfd83db57c45218610a09f9a953a7779d750b1f567a6e75d4-bg_360.png') !important;
        }
        .yuno-welcome { font-size: 16px !important; letter-spacing: 1.2px !important; }
        .yuno-title   { font-size: 44px !important; }
        .yuno-desc    { font-size: 18px !important; }
      }
      @media (max-width: 480px) {
        .yuno-welcome { font-size: 14px !important; letter-spacing: 1px !important; }
        .yuno-title   { font-size: 36px !important; line-height: 1.3 !important; }
        .yuno-desc    { font-size: 17px !important; }
      }
    `}</style>

    <div className="yuno-hero w-full relative overflow-hidden text-center bg-[#3d4fdf] px-5 py-[60px] pb-20">
      {/* Background image */}
      <div
        className="yuno-hero-bg absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage:
            "url('https://files.readme.io/19ebb301ba2d965dd7e56db8884b3d5c7b92ac661afacab0d819c9a3e40ba354-bg_1920.png')",
        }}
      />

      {/* Animated pulse ring */}
      <div className="yuno-pulse" />

      {/* Content */}
      <div className="max-w-[800px] mx-auto relative z-[2]">
        <div className="yuno-welcome text-white/80 text-[18px] font-medium mb-7 tracking-[1.5px]">
          Welcome to Yuno Docs
        </div>

        <div className="yuno-title text-white text-[56px] font-bold leading-[1.2] mb-5 tracking-[-1px]">
          The power of global
          <br />
          payment orchestration
        </div>

        <div className="yuno-desc text-white/90 text-[20px] leading-relaxed mb-8 max-w-[700px] mx-auto">
          Integrate Yuno to access every payment method, processor, and fraud prevention system worldwide with a single
          platform.
        </div>

        <a
          href="/docs/how-yuno-works/what-is-yuno"
          className="yuno-cta inline-flex items-center gap-2 bg-white !text-[#3d4fdf] px-8 py-4 mt-2 font-semibold text-base no-underline shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:!text-[#3d4fdf] hover:no-underline dark:bg-[#ededf0] dark:!text-[#3d4fdf] dark:hover:!text-[#3d4fdf]"
        >
          Get started →
        </a>
      </div>
    </div>
  </>
);
