export const MarkAsComplete = () => {
  const LESSON_COMPLETE_EVENT = "lesson-complete-change";
  const BADGE_ID = "mark-as-complete-badge";
  const WRAPPER_ID = "mark-as-complete-badge-wrapper";

  const toKebabCase = (value) =>
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const getStorageKey = () => {
    if (typeof window === "undefined") return "lesson-complete:unknown";

    const titleEl = document.getElementById("page-title");
    const slug = titleEl?.textContent ? toKebabCase(titleEl.textContent) : toKebabCase(window.location.pathname);

    return `lesson-complete:${slug}`;
  };

  const checkIconMarkup =
    '<svg class="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">' +
    '<circle cx="10" cy="10" r="10"></circle>' +
    '<path d="M6 10.5l2.5 2.5L14 7.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>' +
    "</svg>";

  const renderBadge = (el, completed) => {
    el.type = "button";
    el.id = BADGE_ID;
    el.setAttribute("aria-pressed", String(completed));
    el.className =
      "not-prose inline-flex items-center gap-1.5 text-sm font-medium transition-colors " +
      (completed ? "text-green-500" : "text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-300");
    el.innerHTML =
      (completed
        ? checkIconMarkup
        : '<span class="h-4 w-4 flex-shrink-0 rounded-full border border-gray-500"></span>') +
      (completed ? "Complete" : "Mark as complete");
  };

  const [badgeEl] = useState(() => (typeof document !== "undefined" ? document.createElement("button") : null));
  const [completed, setCompleted] = useState(false);

  const toggle = () => {
    const key = getStorageKey();
    setCompleted((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(key, String(next));
      } catch (e) {
        // ignore write failures
      }
      if (badgeEl) renderBadge(badgeEl, next);
      window.dispatchEvent(new CustomEvent(LESSON_COMPLETE_EVENT, { detail: { key, value: next } }));
      return next;
    });
  };

  useEffect(() => {
    if (!badgeEl) return;

    const key = getStorageKey();
    let initial = false;
    try {
      initial = window.localStorage.getItem(key) === "true";
    } catch (e) {
      // localStorage unavailable (e.g. privacy mode) - fall back to unmarked state
    }
    setCompleted(initial);
    renderBadge(badgeEl, initial);
    badgeEl.addEventListener("click", toggle);

    const existing = document.getElementById(BADGE_ID);
    if (existing && existing !== badgeEl) existing.remove();

    let wrapper = document.getElementById(WRAPPER_ID);
    if (!wrapper) {
      wrapper = document.createElement("div");
      wrapper.id = WRAPPER_ID;
      wrapper.className = "flex justify-start mt-2";
    }
    wrapper.appendChild(badgeEl);

    const headerEl = document.getElementById("header");
    if (headerEl) {
      headerEl.appendChild(wrapper);
    } else {
      const titleEl = document.getElementById("page-title");
      if (titleEl) titleEl.insertAdjacentElement("afterend", wrapper);
    }

    const onChange = (event) => {
      if (event.detail?.key === key) {
        setCompleted(event.detail.value);
        renderBadge(badgeEl, event.detail.value);
      }
    };
    window.addEventListener(LESSON_COMPLETE_EVENT, onChange);

    return () => {
      badgeEl.removeEventListener("click", toggle);
      window.removeEventListener(LESSON_COMPLETE_EVENT, onChange);
      badgeEl.remove();
      if (wrapper && wrapper.childElementCount === 0) wrapper.remove();
    };
  }, [badgeEl]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={completed}
      className={
        "not-prose flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors " +
        (completed ? "mint-border-green-500/60 mint-text-green-500" : "mint-border-gray-700 hover:mint-border-gray-500")
      }
    >
      {completed ? (
        <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <circle cx="10" cy="10" r="10" />
          <path
            d="M6 10.5l2.5 2.5L14 7.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      ) : (
        <span className="h-5 w-5 flex-shrink-0 rounded-full border border-gray-500" />
      )}
      {completed ? "Completed" : "Mark lesson as complete"}
    </button>
  );
};

export default MarkAsComplete;
