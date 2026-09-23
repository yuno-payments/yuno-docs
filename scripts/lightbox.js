/**
 * Lightbox Controller for Animated Diagrams
 * 
 * listens for 'diagram-expand' messages from diagram iframes
 * and displays them in a full-screen overlay.
 */

(function() {
  const LIGHTBOX_ID = 'yuno-diagram-lightbox';

  function createLightbox() {
    if (document.getElementById(LIGHTBOX_ID)) return document.getElementById(LIGHTBOX_ID);

    const overlay = document.createElement('div');
    overlay.id = LIGHTBOX_ID;
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(15, 23, 42, 0.9);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      display: none;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
      position: absolute;
      top: 24px;
      right: 24px;
      width: 48px;
      height: 48px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      color: white;
      font-size: 32px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      z-index: 100000;
    `;
    closeBtn.onmouseenter = () => closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    closeBtn.onmouseleave = () => closeBtn.style.background = 'rgba(255, 255, 255, 0.1)';
    closeBtn.onclick = hideLightbox;

    const iframeContainer = document.createElement('div');
    iframeContainer.style.cssText = `
      width: 90%;
      height: 85%;
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      position: relative;
      transform: scale(0.95);
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    `;

    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'width: 100%; height: 100%; border: none;';
    iframe.id = 'yuno-lightbox-iframe';

    iframeContainer.appendChild(iframe);
    overlay.appendChild(closeBtn);
    overlay.appendChild(iframeContainer);
    document.body.appendChild(overlay);

    overlay.onclick = (e) => {
      if (e.target === overlay) hideLightbox();
    };

    return overlay;
  }

  function toggleExternalWidgets(visible) {
    const STYLE_ID = 'yuno-hide-widgets-style';
    let styleEl = document.getElementById(STYLE_ID);
    
    if (!visible) {
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = STYLE_ID;
        styleEl.innerHTML = `
          .weglot_switcher, 
          #docsbot-chat-container,
          [class*="floating-button"],
          [id*="docsbot"] { 
            display: none !important; 
            visibility: hidden !important;
            opacity: 0 !important; 
            pointer-events: none !important; 
          }
        `;
        document.head.appendChild(styleEl);
      }
    } else {
      if (styleEl) styleEl.remove();
    }

    // Direct JS manipulation for Shadow DOM components
    try {
      const docsbot = document.querySelector('#docsbot-chat-container');
      if (docsbot && docsbot.shadowRoot) {
        const launcher = docsbot.shadowRoot.querySelector('.floating-button');
        if (launcher) {
          launcher.style.setProperty('display', visible ? '' : 'none', 'important');
          launcher.style.setProperty('opacity', visible ? '1' : '0', 'important');
        }
      }
    } catch (e) {
      console.error('Error hiding DocsBot:', e);
    }
  }

  function showLightbox(src, title) {
    const overlay = createLightbox();
    const iframe = document.getElementById('yuno-lightbox-iframe');
    const container = iframe.parentElement;

    // Append lightbox query param to hide UI elements inside diagram
    const url = new URL(src, window.location.origin);
    url.searchParams.set('lightbox', 'true');

    iframe.src = url.toString();
    
    overlay.style.display = 'flex';
    // Allow display to take effect before opacity transition
    setTimeout(() => {
      overlay.style.visibility = 'visible';
      overlay.style.opacity = '1';
      overlay.style.pointerEvents = 'auto';
      container.style.transform = 'scale(1)';
      
      toggleExternalWidgets(false);
    }, 10);
    
    document.body.style.overflow = 'hidden';
  }

  function hideLightbox() {
    const overlay = document.getElementById(LIGHTBOX_ID);
    if (!overlay) return;

    toggleExternalWidgets(true);

    const container = overlay.querySelector('div');
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    container.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
      overlay.style.visibility = 'hidden';
      overlay.style.display = 'none';
      document.getElementById('yuno-lightbox-iframe').src = 'about:blank';
      document.body.style.overflow = '';
    }, 300);
  }

  window.addEventListener('message', (event) => {
    // Security check: only allow same origin and the official diagrams github pages origin
    const allowedOrigins = [window.location.origin, 'https://writechoiceorg.github.io'];
    if (!allowedOrigins.includes(event.origin)) return;

    if (event.data && event.data.type === 'diagram-expand') {
      showLightbox(event.data.src, event.data.title);
    }
  });

  // Handle Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideLightbox();
  });

})();
