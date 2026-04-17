/**
 * Shared Diagram Logic
 * Handles scaling, lightbox signaling, and initialization.
 */

function initDiagram(diagramWidth, diagramHeight, srcPath, srcTitle) {
  const run = () => {
    const vp = document.querySelector('.viewport');
    const diagram = document.querySelector('.diagram');

    if (!vp || !diagram) return;

    // Apply dimensions dynamically to remove inline CSS needs
    diagram.style.width = diagramWidth + 'px';
    diagram.style.height = diagramHeight + 'px';
    
    // Check if loaded inside lightbox
    const isLightbox = new URLSearchParams(window.location.search).get('lightbox') === 'true';
    if (isLightbox) {
      document.body.classList.add('in-lightbox');
    }

    function scale() {
      const vw = vp.clientWidth;
      const vh = vp.clientHeight;
      
      if (vw === 0 || vh === 0) {
        setTimeout(scale, 50);
        return;
      }

      const scaleX = vw / diagramWidth;
      const scaleY = vh / diagramHeight;
      const s = Math.min(scaleX, scaleY);
      
      diagram.style.transform = `scale(${s})`;
      
      const offsetX = (vw - (diagramWidth * s)) / 2;
      const offsetY = (vh - (diagramHeight * s)) / 2;
      
      diagram.style.left = offsetX + 'px';
      diagram.style.top = offsetY + 'px';
    }

    vp.addEventListener('click', () => {
      if (isLightbox) return;
      window.parent.postMessage({ 
        type: 'diagram-expand', 
        src: srcPath, 
        title: srcTitle 
      }, '*');
    });

    window.addEventListener('resize', scale);
    scale();
    // Ensure scaling is correct after font loading or layout shifts
    setTimeout(scale, 150);
    setTimeout(scale, 500);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
}
