const script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://cdn.weglot.com/weglot.min.js';
script.onload = function () {
    Weglot.initialize({
        api_key: 'wg_74ea5f282828370b0c827c288f63f15e2'
    });
};
document.head.appendChild(script);
