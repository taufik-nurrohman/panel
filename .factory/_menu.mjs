import {debounce} from '@taufik-nurrohman/tick';
import {forEachArray} from '@taufik-nurrohman/f';
import {B, D, getAria, getElement, getElements, getParent, hasAria, hasClass, letClass, setAria, setClass} from '@taufik-nurrohman/document';
import {offEvent, offEventDefault, onEvent} from '@taufik-nurrohman/event';
import {toCount} from '@taufik-nurrohman/to';

const [lazyCloseMenuChildren, lazyCloseMenuChildrenCancel] = debounce(function (link, item) {
    closeMenuChildren(link);
    letClass(item, 'is-open');
    letClass(link, 'is-active');
    link.blur();
    setAria(link, 'expanded', false);
});

const [lazyOpenMenu, lazyOpenMenuCancel] = debounce(function (link, item) {
    closeMenuAll(link);
    onEvent('mouseleave', item, onMouseLeaveMenuItem);
    setAria(link, 'expanded', true);
    setClass(item, 'is-open');
    setClass(link, 'is-active');
});

function closeMenuAll(except) {
    const opens = getElements(':where(.menu-arrow,.menu-link)[aria-expanded=true]');
    toCount(opens) && forEachArray(opens, v => {
        let current = except, skip = 0;
        while (current && B !== current) {
            if (v === current) {
                skip = 1;
                break;
            }
            if (hasClass(current, 'menu')) {
                let parent = getParent(current, '.menu-item'),
                    a = parent && getElement(':scope>:where(.menu-arrow,.menu-link)', parent);
                if (a && getAria(a, 'expanded')) {
                    if (v === a) {
                        skip = 1;
                        break;
                    }
                }
            }
            current = getParent(current);
        }
        if (!skip) {
            letClass(getParent(letClass(v, 'is-active'), '.menu-item'), 'is-open');
            setAria(v, 'expanded', false);
            v.blur();
        }
    });
}

function closeMenuChildren(of) {
    let opens = getElements(':scope :where(.menu-arrow,.menu-link)[aria-expanded=true]', of);
    toCount(opens) && forEachArray(opens, v => {
        letClass(getParent(letClass(v, 'is-active'), '.menu-item'), 'is-open');
        setAria(v, 'expanded', false);
        v.blur();
    });
}

function onMouseLeaveMenuItem() {
    let item = this,
        link = getElement(':scope>:where(.menu-arrow,.menu-link)', item);
    offEvent('mouseleave', item, onMouseLeaveMenuItem);
    if (link) {
        lazyCloseMenuChildren(300, link, item);
    }
}

function onMouseLeaveMenuItemToCancel() {
    lazyCloseMenuChildrenCancel();
    lazyOpenMenuCancel();
    offEvent('mouseleave', this, onMouseLeaveMenuItemToCancel);
}

export default function () {
    onEvent('click', D, e => {
        let {target} = e,
            arrow = getParent(target, '.menu-arrow');
        if (!arrow) {
            return closeMenuAll();
        }
        let item = getParent(arrow, '.menu-item');
        if (!item) {
            return;
        }
        let menu = getElement(':scope>.menu', item);
        if (!menu) {
            return;
        }
        let wasOpen = getAria(arrow, 'expanded');
        closeMenuAll(arrow);
        offEventDefault(e);
        setAria(arrow, 'expanded', !wasOpen);
        wasOpen ? letClass(arrow, 'is-active') : setClass(arrow, 'is-active');
        wasOpen ? letClass(item, 'is-open') : setClass(item, 'is-open');
    }, true);
    onEvent('mouseenter', D, e => {
        let {target} = e,
            link = getParent(target, '.menu-link');
        if (!link) {
            return;
        }
        let item = getParent(link, '.menu-item');
        if (!getElement(':scope>.menu', item) || !hasAria(link, 'expanded')) {
            return;
        }
        onEvent('mouseleave', item, onMouseLeaveMenuItemToCancel);
        lazyOpenMenu(300, link, item);
    }, true);
};