(function () {
    'use strict';
    var hoverTimeout = null;
    var closeAll = function closeAll(except) {
        document.querySelectorAll(':where(.menu-arrow,.menu-link)[aria-expanded="true"]').forEach(function (v) {
            var current = except;
            var keepOpen = false;
            while (current) {
                if (v === current) {
                    keepOpen = true;
                    break;
                }
                if (current.matches && current.matches('.menu')) {
                    var parentLink = current.previousElementSibling;
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
    var closeChildren = function closeChildren(v) {
        return v.querySelectorAll(':scope :where(.menu-arrow,.menu-link)[aria-expanded="true"]').forEach(function (v) {
            v.classList.remove('is-active');
            v.closest('.menu-item').classList.remove('is-open');
            v.setAttribute('aria-expanded', 'false');
            v.blur();
        });
    };

    function leaveItem() {
        var _this = this;
        this.removeEventListener('mouseleave', leaveItem);
        var link = this.querySelector(':scope>.menu-link');
        if (!link) return;
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(function () {
            link.classList.remove('is-active');
            link.closest('.menu-item').classList.remove('is-open');
            link.setAttribute('aria-expanded', 'false');
            link.blur();
            closeChildren(_this);
            hoverTimeout = null;
        }, 300);
    }

    function leaveItemToCancel() {
        this.removeEventListener('mouseleave', leaveItemToCancel);
        var link = this.querySelector(':scope>.menu-link[aria-expanded="false"]');
        if (!link) return;
        clearTimeout(hoverTimeout);
    }
    document.addEventListener('click', function (e) {
        var arrow = e.target.closest('.menu-arrow');
        if (!arrow) return closeAll();
        var item = arrow.closest('.menu-item');
        if (!item) return;
        var menu = item.querySelector(':scope>.menu');
        if (menu) {
            var wasOpen = 'true' === arrow.getAttribute('aria-expanded');
            arrow.classList[wasOpen ? 'remove' : 'add']('is-active');
            arrow.setAttribute('aria-expanded', wasOpen ? 'false' : 'true');
            item.classList[wasOpen ? 'remove' : 'add']('is-open');
            closeAll(arrow);
            e.preventDefault();
        }
    }, true);
    document.addEventListener('mouseenter', function (e) {
        var link = e.target.closest('.menu-link');
        if (!link) return;
        var item = link.closest('.menu-item');
        if (!item.querySelector(':scope>.menu') || !link.hasAttribute('aria-expanded')) return;
        item.addEventListener('mouseleave', leaveItemToCancel);
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(function () {
            closeAll(link);
            item.addEventListener('mouseleave', leaveItem);
            item.classList.add('is-open');
            link.classList.add('is-active');
            link.setAttribute('aria-expanded', 'true');
        }, 300);
    }, true);
})();