export const Explainer = ({ steps = [], interval = 4500 }) => {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [run, setRun] = useState(0);
  const rootRef = useRef(null);

  useEffect(() => {
    try {
      const m = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReduced(m.matches);
      if (m.matches) setAuto(false);
      const on = (e) => { setReduced(e.matches); if (e.matches) setAuto(false); };
      if (m.addEventListener) m.addEventListener('change', on);
      return () => { if (m.removeEventListener) m.removeEventListener('change', on); };
    } catch (e) {}
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
    const io = new IntersectionObserver(([en]) => setVisible(en.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playing = auto && visible && !reduced && steps.length > 1;

  useEffect(() => { if (playing) setRun((r) => r + 1); }, [playing, active]);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setActive((n) => (n + 1) % steps.length), interval);
    return () => clearTimeout(t);
  }, [playing, active, interval, steps.length]);

  const go = (i) => { setAuto(false); setActive((i + steps.length) % steps.length); };

  return (
    <div className="wy" ref={rootRef}>
      <div className="wy-nav" aria-hidden="true">
        <button type="button" className="wy-nav-btn" onClick={() => go(active - 1)} aria-label="Previous">
          <svg viewBox="0 0 20 20" width="20" height="20"><path d="M12.5 4 6.5 10l6 6" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
        </button>
        <button type="button" className="wy-nav-btn" onClick={() => go(active + 1)} aria-label="Next">
          <svg viewBox="0 0 20 20" width="20" height="20"><path d="M7.5 4l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
        </button>
      </div>
      <div className="wy-cols">
        {steps.map((s, i) => {
          const on = i === active;
          return (
            <button type="button" key={s.title} className={'wy-col' + (on ? ' is-active' : '')} aria-expanded={on} onClick={() => { if (!on) go(i); else setAuto(false); }}>
              <span className="wy-col-top">
                <span className="wy-col-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="wy-col-title">{s.title}</span>
              </span>
              <span className="wy-col-detail">
                <span className="wy-col-body">{s.body}</span>
                <span className="wy-col-chips">{(s.chips || []).map((c) => <span key={c}>{c}</span>)}</span>
              </span>
              {on && (
                <span key={run} className={'wy-col-bar' + (playing ? ' is-running' : '')} style={playing ? { animationDuration: interval + 'ms' } : undefined} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
