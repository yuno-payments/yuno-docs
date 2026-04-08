// Diagram lightbox – creates its own DOM at body level to avoid layout traps
(function () {
  function setup() {
    if (window.__diagLbReady) return;
    window.__diagLbReady = true;

    /* ── Build lightbox DOM ── */
    var lb = document.createElement('div');
    lb.id = '__diag_lb__';
    lb.style.cssText = [
      'display:none',
      'position:fixed',
      'top:0', 'left:0', 'right:0', 'bottom:0',
      'z-index:99999',
      'background:rgba(0,0,0,0.85)',
      'align-items:center',
      'justify-content:center',
      'backdrop-filter:blur(8px)',
      '-webkit-backdrop-filter:blur(8px)',
      'cursor:zoom-out',
    ].join(';');

    var frame = document.createElement('iframe');
    frame.id = '__diag_lb_frame__';
    frame.setAttribute('frameborder', '0');
    frame.setAttribute('allow', 'fullscreen');
    frame.style.cssText = [
      'width:92vw',
      'height:86vh',
      'border:none',
      'border-radius:16px',
      'box-shadow:0 24px 80px rgba(0,0,0,0.55)',
      'background:#f5f5f5',
      'cursor:default',
      'display:block',
    ].join(';');

    var closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close diagram');
    closeBtn.style.cssText = [
      'position:absolute',
      'top:20px',
      'right:24px',
      'background:rgba(255,255,255,0.14)',
      'border:1.5px solid rgba(255,255,255,0.28)',
      'color:#fff',
      'border-radius:50%',
      'width:40px',
      'height:40px',
      'font-size:24px',
      'line-height:1',
      'cursor:pointer',
      'display:flex',
      'align-items:center',
      'justify-content:center',
      'padding:0',
    ].join(';');

    lb.appendChild(frame);
    lb.appendChild(closeBtn);
    document.body.appendChild(lb);

    /* ── Helpers ── */
    function openLb(src) {
      frame.src = src;
      lb.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    function closeLb() {
      lb.style.display = 'none';
      frame.src = '';
      document.body.style.overflow = '';
    }

    window.__diagOpen  = openLb;
    window.__diagClose = closeLb;

    /* ── Events ── */
    lb.addEventListener('click', function (e) {
      if (e.target === lb) closeLb();
    });
    closeBtn.addEventListener('click', function () {
      closeLb();
    });
    window.addEventListener('message', function (e) {
      // Only accept messages from the same origin as the docs site
      if (e.origin !== window.location.origin) return;
      if (e.data && e.data.type === 'diagram-expand') openLb(e.data.src);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLb();
    });
  }

  // Run after DOM is ready (handles script-in-head and SPA scenarios)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
