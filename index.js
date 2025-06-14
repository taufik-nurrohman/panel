(function () {
    'use strict'; // Add a delay before expanding the menu on hover, and cancel it if the mouse leaves early
    var hoverTimeout = null;

    function onMouseLeaveMenuItem(e) {
        var _this = this;
        this.removeEventListener('mouseleave', onMouseLeaveMenuItem, false);
        var menuLink = this.querySelector(':scope>.menu-link');
        if (!menuLink) {
            return;
        }
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            hoverTimeout = null;
        }
        if (menuLink.hasAttribute('aria-expanded')) {
            hoverTimeout = setTimeout(function () {
                menuLink.setAttribute('aria-expanded', 'false');
                closeChildSubmenus(_this);
                hoverTimeout = null;
            }, 300);
        }
    }

    function handleEarlyLeave(menuItem) {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            hoverTimeout = null;
        }
        var currentMenuLink = menuItem.querySelector(':scope>.menu-link');
        if (currentMenuLink && currentMenuLink.getAttribute('aria-expanded') === 'true') {
            hoverTimeout = setTimeout(function () {
                currentMenuLink.setAttribute('aria-expanded', 'false');
                closeChildSubmenus(menuItem);
                hoverTimeout = null;
            }, 300);
        }
        menuItem.removeEventListener('mouseleave', handleEarlyLeave, false);
    }

    function closeChildSubmenus(menuItem) {
        var childLinks = menuItem.querySelectorAll(':scope .menu-link[aria-expanded="true"]');
        childLinks.forEach(function (link) {
            link.setAttribute('aria-expanded', 'false');
        });
    }

    function onDocumentMouseEnter(e) {
        var menuLink = e.target.closest('.menu-link');
        if (!menuLink) {
            return;
        }
        var menuItem = menuLink.parentNode;
        if (!menuItem) {
            return;
        }
        var menu = menuItem.querySelector(':scope>.menu');
        if (!menu) {
            return;
        }
        if (menuLink.hasAttribute('aria-expanded')) {
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
            }
            hoverTimeout = setTimeout(function () {
                menuItem.addEventListener('mouseleave', onMouseLeaveMenuItem, false);
                menuLink.setAttribute('aria-expanded', 'true');
            }, 300);
            menuItem.addEventListener('mouseleave', function earlyLeaveHandler() {
                handleEarlyLeave(menuItem);
            }, false);
        }
    }
    document.addEventListener('mouseenter', onDocumentMouseEnter, true);
})();