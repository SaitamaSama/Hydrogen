;(() => {
    "use strict";

    class PageNavigator {
        constructor() {}

        static eventHandlerForLink(ev) {
            ev.preventDefault();
            /**
             * @type {HTMLAnchorElement}
             */
            let anchor = this;
            let href = anchor.getAttribute('href');
            fetch(href)
                .then((response) => {
                    return response.text();
                })
                .then((pageContent) => {
                    PageNavigator.processContent(anchor, pageContent);
                });
        }

        static processContent(anchor, content) {
            let title = anchor.getAttribute('data-page-anchor'), pageUri = anchor.getAttribute('href').replace('.html', '');
            document.querySelector('[data-page-content]').innerHTML = content;
        }
    }

    Array.from(document.querySelectorAll('a[data-page-anchor]')).forEach((a) => {
        a.addEventListener('click', PageNavigator.eventHandlerForLink.bind(a));
    });

    document.querySelector('a.sidebar-link.js-auto-init').click();

    Array.from(document.querySelectorAll('a.sidebar-link')).forEach((a) => {
        a.addEventListener('click', (ev) => {
            if(document.querySelector('a.sidebar-link.active') !== null) {
                document.querySelector('a.sidebar-link.active').classList.remove('active');
            }
            a.classList.add('active');
        });
    });
})();