export const AuthOnceFlow = ({ lanes = [], stepMs = 950, holdMs = 3600, label = '' }) => {
  const total = lanes.reduce((m, l) => Math.max(m, (l.steps || []).length), 0);
  const [step, setStep] = useState(total);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    try {
      const m = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReduced(m.matches);
      const on = (e) => setReduced(e.matches);
      if (m.addEventListener) m.addEventListener('change', on);
      return () => { if (m.removeEventListener) m.removeEventListener('change', on); };
    } catch (e) {}
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
    const io = new IntersectionObserver(([en]) => setVisible(en.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playing = visible && !reduced && !paused && total > 1;

  // start the sequence from the first step the first time it plays
  useEffect(() => { if (playing) setStep(0); }, [playing]);

  useEffect(() => {
    if (!playing) return;
    const done = step >= total;
    const t = setTimeout(() => setStep(done ? 0 : step + 1), done ? holdMs : stepMs);
    return () => clearTimeout(t);
  }, [playing, step, total, stepMs, holdMs]);

  const shown = playing ? step : total;

  const icon = (kind) => {
    const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
    if (kind === 'customer') return <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><circle cx="10" cy="7" r="3" {...p} /><path d="M4.5 16.5c.6-3 2.8-4.5 5.5-4.5s4.900 1.500 5.500 4.500" {...p} /></svg>;
    if (kind === 'auth' || kind === 'repeat') return <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M10 2.800 16 5v4.600c0 3.600-2.500 6.300-6 7.600-3.500-1.300-6-4-6-7.600V5l6-2.200Z" {...p} /><path d="m7.500 10 1.800 1.800 3.300-3.600" {...p} /></svg>;
    if (kind === 'declined') return <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><circle cx="10" cy="10" r="7" {...p} /><path d="m7.500 7.500 5 5m0-5-5 5" {...p} /></svg>;
    if (kind === 'approved') return <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><circle cx="10" cy="10" r="7" {...p} /><path d="m6.800 10.200 2.200 2.200 4.200-4.600" {...p} /></svg>;
    return <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><circle cx="5" cy="14" r="2" {...p} /><circle cx="15" cy="6" r="2" {...p} /><path d="M7 14h3.500a2.500 2.500 0 0 0 2.500-2.500v-3A2.500 2.500 0 0 1 15.500 6" {...p} /></svg>;
  };

  return (
    <div className="tds-flow" ref={rootRef} role="img" aria-label={label}>
      <div className="tds-lanes" aria-hidden="true">
        {lanes.map((lane) => {
          const steps = lane.steps || [];
          const laneDone = shown >= steps.length;
          return (
            <div key={lane.title} className={'tds-lane' + (lane.highlight ? ' is-yuno' : '')}>
              <div className="tds-lane-head">
                <span className="tds-lane-eyebrow">{lane.eyebrow}</span>
                <span className="tds-lane-title">{lane.title}</span>
              </div>
              <ol className="tds-steps">
                {steps.map((s, i) => (
                  <li key={s.title + i} className={'tds-step tds-' + (s.kind || 'provider') + (i < shown ? ' is-on' : '') + (i === shown - 1 && playing ? ' is-now' : '')}>
                    <span className="tds-dot">{icon(s.kind)}</span>
                    <span className="tds-text">
                      <span className="tds-title">{s.title}{s.tag ? <span className="tds-tag">{s.tag}</span> : null}</span>
                      {s.body ? <span className="tds-body">{s.body}</span> : null}
                    </span>
                  </li>
                ))}
              </ol>
              <div className={'tds-result' + (laneDone ? ' is-on' : '')}>
                <span className="tds-result-num">{lane.count}</span>
                <span className="tds-result-text">{lane.result}</span>
              </div>
            </div>
          );
        })}
      </div>
      {!reduced && total > 1 ? (
        <button type="button" className="tds-toggle" onClick={() => setPaused((v) => !v)} aria-label={paused ? 'Play the animation' : 'Pause the animation'}>
          {paused ? 'Play' : 'Pause'}
        </button>
      ) : null}
    </div>
  );
};
