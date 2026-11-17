export const FontLoader = ({ href }) => {
  // the site font is Inter (docs.json); option B needs Titillium Web, loaded once per page
  useEffect(() => {
    if (document.querySelector(`link[data-hx-font="${href}"]`)) return;
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href;
    l.setAttribute('data-hx-font', href);
    document.head.appendChild(l);
  }, [href]);
  return null;
};
