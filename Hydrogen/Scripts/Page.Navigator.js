;((showSidebar, closeSidebar) => {
    "use strict";

    class PageNavigator {
        /**
         * @param {NavigatorOverlay} navOverlay
         */
        constructor(navOverlay) {
            this.navOverlay = navOverlay;
            this.firstNav = true;
        }

        eventHandlerForLink(ev) {
            ev.preventDefault();
            /**
             * @type {HTMLAnchorElement}
             */
            let anchor = this[0];
            let href = anchor.getAttribute('href'),
                title = anchor.getAttribute('data-page-anchor');

            if(!this[1].firstNav) {
                this[1].navOverlay.show(title);
            }

            fetch(href)
                .then((response) => {
                    return response.text();
                })
                .then((pageContent) => {
                    this[1].processContent(anchor, pageContent);
                });
        }

        processContent(anchor, content) {
            closeSidebar();

            let title = anchor.getAttribute('data-page-anchor'), pageUri = anchor.getAttribute('href').replace('.html', '');

            if(!this.firstNav) {
                setTimeout(() => {
                    this.navOverlay.remove();
                    window.location.hash = `#page=${pageUri}`;
                }, 5000);
            } else {
                this.firstNav = false;
            }

            window.location.hash = `#page=...`;

            document.querySelector('.js-route').textContent = `/${pageUri}`;
            document.querySelector('title').textContent = `DAV Model School - ${title}`;

            setTimeout(() => document.querySelector('[data-page-content]').innerHTML = content, 500);
        }
    }

    let navOverlay = new NavigatorOverlay(document.querySelector('.js-loader-overlay')),
        pageNavigator = new PageNavigator(navOverlay);

    Array.from(document.querySelectorAll('a[data-page-anchor]')).forEach((a) => {
        a.addEventListener('click', pageNavigator.eventHandlerForLink.bind([a, pageNavigator]));
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
})(showSidebar, closeSidebar);