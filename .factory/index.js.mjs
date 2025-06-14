let hoverTimeout = null;

const closeAll = except => {
    document.querySelectorAll(':where(.menu-arrow,.menu-link)[aria-expanded="true"]').forEach(v => {
        let current = except;
        let keepOpen = false;
        while (current) {
            if (v === current) {
                keepOpen = true;
                break;
            }
            if (current.matches && current.matches('.menu')) {
                const parentLink = current.previousElementSibling;
                if (parentLink && parentLink.getAttribute('aria-expanded') === 'true') {
                    if (v === parentLink) {
                        keepOpen = true;
                        break;
                    }
                }
            }
            current = current.parentNode;
        }
        if (!keepOpen) {
            v.classList.remove('is-active');
            v.closest('.menu-item').classList.remove('is-open');
            v.setAttribute('aria-expanded', 'false');
            v.blur();
        }
    });
};

const closeChildren = v =>
    v.querySelectorAll(':scope :where(.menu-arrow,.menu-link)[aria-expanded="true"]').forEach(v => {
        v.classList.remove('is-active');
        v.closest('.menu-item').classList.remove('is-open');
        v.setAttribute('aria-expanded', 'false');
        v.blur();
    });

function leaveItem() {
    this.removeEventListener('mouseleave', leaveItem);
    const link = this.querySelector(':scope>.menu-link');
    if (!link) return;
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
        link.classList.remove('is-active');
        link.closest('.menu-item').classList.remove('is-open');
        link.setAttribute('aria-expanded', 'false');
        link.blur();
        closeChildren(this);
        hoverTimeout = null;
    }, 300);
}

function leaveItemToCancel() {
    this.removeEventListener('mouseleave', leaveItemToCancel);
    const link = this.querySelector(':scope>.menu-link[aria-expanded="false"]');
    if (!link) return;
    clearTimeout(hoverTimeout);
}

document.addEventListener('click', e => {
    const arrow = e.target.closest('.menu-arrow');
    if (!arrow) return closeAll();
    const item = arrow.closest('.menu-item');
    if (!item) return;
    const menu = item.querySelector(':scope>.menu');
    if (menu) {
        let wasOpen = 'true' === arrow.getAttribute('aria-expanded');
        arrow.classList[wasOpen ? 'remove' : 'add']('is-active');
        arrow.setAttribute('aria-expanded', wasOpen ? 'false' : 'true');
        item.classList[wasOpen ? 'remove' : 'add']('is-open');
        closeAll(arrow);
        e.preventDefault();
    }
}, true);

document.addEventListener('mouseenter', e => {
    const link = e.target.closest('.menu-link');
    if (!link) return;
    const item = link.closest('.menu-item');
    if (!item.querySelector(':scope>.menu') || !link.hasAttribute('aria-expanded')) return;
    item.addEventListener('mouseleave', leaveItemToCancel);
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
        closeAll(link);
        item.addEventListener('mouseleave', leaveItem);
        item.classList.add('is-open');
        link.classList.add('is-active');
        link.setAttribute('aria-expanded', 'true');
    }, 300);
}, true);