export const ConfigBuilder = () => {
  const PLATFORMS = [
    { id: 'ios', label: 'iOS' },
    { id: 'android', label: 'Android' },
    { id: 'web', label: 'Web' },
  ];
  const DECISIONS = [
    { id: 'enrollment', step: 1, name: 'Save a payment method instead of charging', off: 'Payment', on: 'Enrollment', href: '/docs/yuno-sdk/features/enrollment', label: 'customerSession' },
    { id: 'create-payment', step: 2, name: 'Your backend creates the payment', off: 'SDK', on: 'Yours', href: '/docs/yuno-sdk/controllers/create-payment', label: 'createPayment' },
    { id: 'transaction-data', step: 3, name: 'You collect the payment data', off: 'SDK forms', on: 'Yours', href: '/docs/yuno-sdk/reference/objects-you-pass#transaction-data', label: 'transactionData' },
    { id: 'show-view', step: 4, name: 'You embed the form in your layout', off: 'Full-screen', on: 'Yours', href: '/docs/yuno-sdk/controllers/show-view', label: 'showView', platforms: ['ios', 'android'] },
    { id: 'show-loading', step: 5, name: 'You show your own loader', off: 'SDK', on: 'Yours', href: '/docs/yuno-sdk/controllers/show-loading', label: 'showLoading' },
    { id: 'status-screen', step: 6, name: 'The SDK shows a result screen', off: 'No', on: 'Yes', href: '/docs/yuno-sdk/reference/objects-you-pass#transaction-config', label: 'showStatusScreen' },
  ];
  const ANCHORS = {
    ios: { config: (l) => /^\s*controller: self/.test(l), selected: (l) => /let paymentSelected =/.test(l), configStart: (l) => /let config =/.test(l), blockEnd: (l) => /^ {8}\)\s*$/.test(l) },
    android: { config: (l) => /^\s*controller = this/.test(l), selected: (l) => /val paymentSelected =/.test(l), configStart: (l) => /val config =/.test(l), blockEnd: (l) => /^ {8}\)\s*$/.test(l) },
    web: { config: (l) => /^\s*onStatus:/.test(l), selected: (l) => /const paymentMethod =/.test(l), configStart: (l) => /sdkPayments\.transaction\(\{/.test(l), blockEnd: (l) => /^\}\)\s*$/.test(l) },
  };

  const [platform, setPlatform] = useState('ios');
  const [on, setOn] = useState({});
  const [fragments, setFragments] = useState(null);
  const [focus, setFocus] = useState(null);
  const [copied, setCopied] = useState(false);
  const preRef = useRef(null);

  useEffect(() => {
    const map = {};
    document.querySelectorAll('[data-fragment]').forEach((el) => {
      const pre = el.querySelector('pre');
      if (!pre) return;
      map[el.getAttribute('data-fragment') + ':' + el.getAttribute('data-platform')] = pre.textContent.replace(/\n+$/, '');
    });
    if (!(map['base:ios'] && map['base:android'] && map['base:web'])) return;
    setFragments(map);

    const cleanups = [];
    DECISIONS.forEach((d) => {
      const host = document.querySelector('[data-toggle="' + d.id + '"]');
      if (!host) return;
      const id = 'ysdk-qs-' + d.id;
      host.innerHTML =
        '<div class="ysdk-qs-toggle">' +
        '<input type="checkbox" id="' + id + '" class="ysdk-sw-input">' +
        '<label class="ysdk-sw-toggle" for="' + id + '">' +
        '<span class="ysdk-sw-side ysdk-sw-off">' + d.off + '</span><span class="ysdk-sw-track"></span><span class="ysdk-sw-side ysdk-sw-on">' + d.on + '</span>' +
        '</label>' +
        '<a class="ysdk-sw-link" href="' + d.href + '">' + d.label + ' →</a>' +
        '</div>';
      const input = host.querySelector('input');
      const handler = (e) => setOn((prev) => ({ ...prev, [d.id]: e.target.checked }));
      input.addEventListener('change', handler);
      cleanups.push(() => input.removeEventListener('change', handler));
    });

    const sections = Array.from(document.querySelectorAll('[data-decision]'));
    if (sections.length && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setFocus(visible[0].target.getAttribute('data-decision'));
      }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
      sections.forEach((s) => io.observe(s));
      cleanups.push(() => io.disconnect());
    }
    return () => cleanups.forEach((f) => f());
  }, []);

  useEffect(() => {
    const hide = (id, hidden) => {
      const host = document.querySelector('[data-toggle="' + id + '"]');
      if (host) host.style.display = hidden ? 'none' : '';
    };
    hide('show-view', platform === 'web');
    hide('create-payment', !!on.enrollment);
  }, [platform, on.enrollment]);

  useEffect(() => {
    const pre = preRef.current;
    if (!pre) return;
    const first = pre.querySelector('.is-focus');
    if (first) pre.scrollTop = Math.max(0, first.offsetTop - pre.clientHeight / 3);
  }, [focus, on, platform, fragments]);

  const tag = (src, text) => text.split('\n').map((t) => ({ t, src }));
  const replaceBlock = (ls, startMatcher, endMatcher, block, singleLine) => {
    const s = ls.findIndex((l) => startMatcher(l.t));
    if (s < 0) return ls;
    let e = s;
    if (!singleLine) { e = s + 1; while (e < ls.length && !endMatcher(ls[e].t)) e++; }
    return ls.slice(0, s).concat(block, ls.slice(e + 1));
  };
  const insertBefore = (ls, matcher, block) => {
    const i = ls.findIndex((l) => matcher(l.t));
    if (i < 0) return ls;
    return ls.slice(0, i).concat(block, ls.slice(i));
  };
  const insertBeforeLastBrace = (ls, block) => {
    let i = ls.length - 1;
    while (i >= 0 && ls[i].t.trim() !== '}') i--;
    if (i < 0) return ls;
    return ls.slice(0, i).concat([{ t: '', src: block[0].src }], block, ls.slice(i));
  };
  const isActive = (id) => !!on[id] && !!fragments[id + ':' + platform] && !(id === 'create-payment' && on.enrollment) && !(id === 'show-view' && platform === 'web');
  const compose = () => {
    const a = ANCHORS[platform];
    const frag = (id) => tag(id, fragments[id + ':' + platform]);
    let ls = tag('base', fragments['base:' + platform]);
    if (isActive('enrollment')) ls = replaceBlock(ls, a.configStart, a.blockEnd, frag('enrollment'), false);
    if (isActive('transaction-data')) ls = replaceBlock(ls, a.selected, a.blockEnd, frag('transaction-data'), platform === 'web');
    if (isActive('status-screen')) ls = insertBefore(ls, a.config, frag('status-screen'));
    ['create-payment', 'show-view', 'show-loading'].forEach((id) => {
      if (!isActive(id)) return;
      ls = platform === 'web' ? insertBefore(ls, a.config, frag(id)) : insertBeforeLastBrace(ls, frag(id));
    });
    return ls;
  };

  if (!fragments) return null;
  const lines = compose();
  const focused = DECISIONS.find((d) => d.id === focus);
  const focusHidden = focused && ((focused.platforms && !focused.platforms.includes(platform)) || (focused.id === 'create-payment' && on.enrollment));
  const sessionHint = on.enrollment
    ? 'Create a customer session on your backend and pass it as customerSession.'
    : on['create-payment']
      ? 'Create the checkout session with the default workflow (SDK_CHECKOUT): your backend creates the payment.'
      : 'Create the checkout session with workflow: "SDK_SEAMLESS" so the SDK can create the payment.';
  const copy = () => {
    navigator.clipboard.writeText(lines.map((l) => l.t).join('\n')).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };

  return (
    <div className="ysdk-qs-side">
      <div className="ysdk-cb-bar">
        <div className="ysdk-cb-plat" role="tablist" aria-label="Platform">
          {PLATFORMS.map((p) => (
            <button type="button" key={p.id} role="tab" aria-selected={platform === p.id} className={'ysdk-cb-btn' + (platform === p.id ? ' is-on' : '')} onClick={() => setPlatform(p.id)}>{p.label}</button>
          ))}
        </div>
        <button type="button" className="ysdk-cb-copy" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
      </div>
      <pre className="ysdk-qs-code" ref={preRef}><code>
        {lines.map((l, i) => (
          <span key={i} className={'ysdk-qs-line' + (l.src !== 'base' ? ' is-added' : '') + (focus && l.src === focus ? ' is-focus' : '')}>{l.t + '\n'}</span>
        ))}
      </code></pre>
      <div className="ysdk-qs-status">
        {focused && !focusHidden && !on[focused.id] && (
          <span className="ysdk-qs-focus">Step {focused.step}: flip the switch to add <code>{focused.label}</code> here.</span>
        )}
        {focused && !focusHidden && on[focused.id] && (
          <span className="ysdk-qs-focus">Step {focused.step}: the highlighted lines are <code>{focused.label}</code>.</span>
        )}
      </div>
      <div className="ysdk-cb-hint">{sessionHint}</div>
    </div>
  );
};
