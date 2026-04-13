// Diagram lightbox – creates its own DOM at body level to avoid layout traps
(function () {
  function setup() {
    if (window.__diagLbReady) return;
    window.__diagLbReady = true;

    /* ── Hide Weglot and Mintlify UI ── */
    var style = document.createElement('style');
    style.innerHTML = [
      'body.__diag_lb_active__ .weglot-container,',
      'body.__diag_lb_active__ #weglot-switcher,',
      'body.__diag_lb_active__ header,',
      'body.__diag_lb_active__ nav,',
      'body.__diag_lb_active__ .mintlify-search,',
      'body.__diag_lb_active__ #mintlify-search-modal {',
      '  display: none !important;',
      '}'
    ].join('\n');
    document.head.appendChild(style);

    /* ── Build lightbox DOM ── */
    var lb = document.createElement('div');
    lb.id = '__diag_lb__';
    lb.style.cssText = [
      'display:none',
      'position:fixed',
      'top:0', 'left:0', 'right:0', 'bottom:0',
      'z-index:999999', // Extra high
      'background:rgba(0,0,0,0.85)',
      'align-items:center',
      'justify-content:center',
      'backdrop-filter:blur(8px)',
      '-webkit-backdrop-filter:blur(8px)',
      'cursor:zoom-out',
      'user-select:none',
    ].join(';');

    var frame = document.createElement('iframe');
    frame.id = '__diag_lb_frame__';
    frame.setAttribute('frameborder', '0');
    frame.setAttribute('allow', 'fullscreen');
    frame.style.cssText = [
      'width:90vw',
      'height:85vh',
      'border:none',
      'outline:none',
      'border-radius:16px',
      'box-shadow:0 24px 80px rgba(0,0,0,0.55)',
      'background:#f5f5f5',
      'cursor:default',
      'display:block',
      'z-index:1',
    ].join(';');

    var closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close diagram');
    closeBtn.style.cssText = [
      'position:absolute',
      'top:30px',
      'right:30px',
      'background:rgba(255,255,255,0.15)',
      'border:1px solid rgba(255,255,255,0.3)',
      'color:#fff',
      'border-radius:50%',
      'width:44px',
      'height:44px',
      'font-size:32px',
      'line-height:1',
      'cursor:pointer',
      'display:flex',
      'align-items:center',
      'justify-content:center',
      'padding:0',
      'z-index:99999999', // Ensure it is above the iframe
      'transition: background 0.2s',
      'box-shadow: 0 4px 12px rgba(0,0,0,0.3)', // Better visibility over white
    ].join(';');

    lb.appendChild(frame);
    lb.appendChild(closeBtn);
    document.body.appendChild(lb);

    /* ── Helpers ── */
    function openLb(src) {
      // Append lightbox flag
      var finalSrc = src + (src.indexOf('?') > -1 ? '&' : '?') + 'lightbox=true';
      frame.src = finalSrc;
      lb.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      document.body.classList.add('__diag_lb_active__');
      
      // Safety: if the frame fails to load or something, allow escape
      lb.focus();
    }

    function closeLb() {
      lb.style.display = 'none';
      frame.src = 'about:blank'; // Clear to stop animations/logic
      document.body.style.overflow = '';
      document.body.classList.remove('__diag_lb_active__');
    }

    window.__diagOpen  = openLb;
    window.__diagClose = closeLb;

    /* ── Events ── */
    lb.addEventListener('click', function (e) {
      // Close if clicking the background backdrop
      if (e.target === lb) closeLb();
    });
    
    closeBtn.addEventListener('click', closeLb);
    closeBtn.addEventListener('mouseover', function() { this.style.background = 'rgba(255,255,255,0.25)'; });
    closeBtn.addEventListener('mouseout', function() { this.style.background = 'rgba(255,255,255,0.15)'; });

    window.addEventListener('message', function (e) {
      if (e.origin !== window.location.origin) return;
      if (e.data && e.data.type === 'diagram-expand') {
        if (lb.style.display === 'flex') return;
        openLb(e.data.src);
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lb.style.display === 'flex') closeLb();
    });
  }

  // Run or wait
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
