export const LivePayment = ({ steps = [], interval = 2500 }) => {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [shown, setShown] = useState(false);

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
    if (reduced || paused || steps.length < 2) return;
    const t = setTimeout(() => setI((n) => (n + 1) % steps.length), interval);
    return () => clearTimeout(t);
  }, [i, paused, reduced, steps.length, interval]);

  useEffect(() => {
    if (reduced) { setShown(true); return; }
    setShown(false);
    const t = setTimeout(() => setShown(true), 900);
    return () => clearTimeout(t);
  }, [i, reduced]);

  if (!steps.length) return null;
  const cur = steps[i];
  const hold = () => setPaused(true);
  const release = () => setPaused(false);

  return (
    <div className="yd-live" onMouseEnter={hold} onMouseLeave={release} onFocus={hold} onBlur={release}>
      <ol className="yd-live-steps">
        {steps.map((s, k) => (
          <li key={s.title}>
            <button type="button" className={'yd-live-step' + (k === i ? ' is-active' : '')} aria-pressed={k === i} aria-label={'Step ' + (k + 1) + ': ' + s.title} onClick={() => setI(k)}>
              <span className="yd-live-num">{k + 1}</span>
              <span className="yd-live-text">
                <span className="yd-live-title">{s.title}</span>
                <span className="yd-live-call">{s.call}</span>
              </span>
              {k === i && !reduced && <span key={i} className={'yd-live-bar' + (paused ? ' is-paused' : '')} style={{ animationDuration: interval + 'ms' }} />}
            </button>
          </li>
        ))}
      </ol>
      <div className="yd-live-term" aria-live="polite">
        <div className="yd-live-term-head">
          <span>{cur.call}</span>
          {cur.final && <span className={'yd-live-pill' + (shown ? ' is-on' : '')}>SUCCEEDED</span>}
        </div>
        <pre><code>{cur.request}</code></pre>
        <pre className={'yd-live-res' + (shown ? ' is-on' : '')}><code>{shown ? cur.response : ''}</code></pre>
      </div>
      {reduced && (
        <button type="button" className="yd-live-next" onClick={() => setI((i + 1) % steps.length)}>Next step →</button>
      )}
    </div>
  );
};
