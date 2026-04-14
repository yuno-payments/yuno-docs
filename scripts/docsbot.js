
(function () {
  function setup() {
    window.DocsBotAI = window.DocsBotAI || {};

    DocsBotAI.init = function (e) {
      return new Promise((t, r) => {
        var n = document.createElement("script");
        n.type = "text/javascript";
        n.async = true;
        n.src = "https://widget.docsbot.ai/chat.js";
        let o = document.getElementsByTagName("script")[0];
        o.parentNode.insertBefore(n, o);
        n.addEventListener("load", () => {
          Promise.all([
            new Promise((t, r) => {
              window.DocsBotAI.mount(Object.assign({}, e)).then(t).catch(r);
            }),
            (function e(t) {
              return new Promise((e) => {
                if (document.querySelector(t)) return e(document.querySelector(t));
                let r = new MutationObserver((n) => {
                  if (document.querySelector(t))
                    return e(document.querySelector(t)), r.disconnect();
                });
                r.observe(document.body, { childList: true, subtree: true });
              });
            })("#docsbotai-root"),
          ])
            .then(() => t())
            .catch(r);
        });
        n.addEventListener("error", (e) => {
          r(e.message);
        });
      });
    };

    DocsBotAI.init({ id: "kt3kQQ36OPdxGR171DX9/Rn7KueLwOWNLimA1gKYM" });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup);
  } else {
    setup();
  }
})();


