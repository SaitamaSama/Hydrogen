"use strict";

// Global script

let menuHandler = document.querySelector('[data-menu-handle]'),
    sidebar = document.querySelector('.sidebar-link-container'),
    overlay = document.querySelector('.js-overlay'),
    enterButton = document.querySelector('.js-enter-button'),
    introOverlay = document.querySelector('.js-intro-overlay'),
    rememberIntroRemoval = document.querySelector('[data-remember-intro-removal]');

function closeSidebar() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
}
function showSidebar() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
}

menuHandler.addEventListener('click', (ev) => {
    if(!sidebar.classList.contains('active')) {
        showSidebar();
    } else {
        closeSidebar();
    }
});

overlay.addEventListener('click', (ev) => {
    closeSidebar();
});

if(window.localStorage.getItem('intro-no')) {
    introOverlay.parentNode.removeChild(introOverlay);
}

enterButton.addEventListener('click', (ev) => {
    introOverlay.classList.add('removed');
    if(rememberIntroRemoval.checked) {
        window.localStorage.setItem('intro-no', true);
    }
    setTimeout(() => introOverlay.parentNode.removeChild(introOverlay), 500);
});