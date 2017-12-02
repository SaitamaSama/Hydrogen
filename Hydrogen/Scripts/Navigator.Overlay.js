(() => {
    "use strict";

    class NavigatorOverlay {
        /**
         * @param {HTMLElement} loaderOverlay
         */
        constructor(loaderOverlay) {
            this.loaderOverlay = loaderOverlay;
            this.innerContent = loaderOverlay.innerHTML;
            loaderOverlay.innerHTML = '';
        }

        show(pageTitle) {
            this.loaderOverlay.innerHTML = this.innerContent.replace('{page}', `DAV Model School - ${pageTitle}`);
            this.loaderOverlay.classList.add('active');
        }

        remove() {
            document.querySelector('[data-page-content]').scrollTop = 0;
            this.loaderOverlay.innerHTML = '';
            this.loaderOverlay.classList.remove('active');
        }
    }

    window.NavigatorOverlay = NavigatorOverlay;
})();