// Add a delay before expanding the menu on hover, and cancel it if the mouse leaves early

let hoverTimeout = null;

function onMouseLeaveMenuItem(e) {
    this.removeEventListener('mouseleave', onMouseLeaveMenuItem, false);
    let menuLink = this.querySelector(':scope>.menu-link');
    if (!menuLink) {
        return;
    }
    if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        hoverTimeout = null;
    }
    if (menuLink.hasAttribute('aria-expanded')) {
        hoverTimeout = setTimeout(() => {
            menuLink.setAttribute('aria-expanded', 'false');
            closeChildSubmenus(this);
            hoverTimeout = null;
        }, 300);
    }
}

function handleEarlyLeave(menuItem) {
    if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        hoverTimeout = null;
    }
    let currentMenuLink = menuItem.querySelector(':scope>.menu-link');
    if (currentMenuLink && currentMenuLink.getAttribute('aria-expanded') === 'true') {
        hoverTimeout = setTimeout(() => {
            currentMenuLink.setAttribute('aria-expanded', 'false');
            closeChildSubmenus(menuItem);
            hoverTimeout = null;
        }, 300);
    }
    menuItem.removeEventListener('mouseleave', handleEarlyLeave, false);
}

function closeChildSubmenus(menuItem) {
    const childLinks = menuItem.querySelectorAll(':scope .menu-link[aria-expanded="true"]');
    childLinks.forEach(link => {
        link.setAttribute('aria-expanded', 'false');
    });
}

function onDocumentMouseEnter(e) {
    let menuLink = e.target.closest('.menu-link');
    if (!menuLink) {
        return;
    }
    let menuItem = menuLink.parentNode;
    if (!menuItem) {
        return;
    }
    let menu = menuItem.querySelector(':scope>.menu');
    if (!menu) {
        return;
    }
    if (menuLink.hasAttribute('aria-expanded')) {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
        }
        hoverTimeout = setTimeout(() => {
            menuItem.addEventListener('mouseleave', onMouseLeaveMenuItem, false);
            menuLink.setAttribute('aria-expanded', 'true');
        }, 300);

        menuItem.addEventListener('mouseleave', function earlyLeaveHandler() {
            handleEarlyLeave(menuItem);
        }, false);
    }
}

document.addEventListener('mouseenter', onDocumentMouseEnter, true);