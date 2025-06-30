import {forEachArray, getValueInMap, setValueInMap} from '@taufik-nurrohman/f';
import {W, getAria, getElement, getElements, getName, hasAttribute, hasClass, letAria, setAria, setClass, toggleClass} from '@taufik-nurrohman/document';
import {hasValue} from '@taufik-nurrohman/has';
import {toCount} from '@taufik-nurrohman/to';

import {
    TOKEN_ARIA_DISABLED,
    TOKEN_ATTRIBUTES,
    TOKEN_CHILD_LIST,
    TOKEN_CLASS,
    TOKEN_CLASS_ARROW,
    TOKEN_CLASS_HAS_ARROW,
    TOKEN_CLASS_HAS_ICON,
    TOKEN_CLASS_HAS_TITLE,
    TOKEN_CLASS_ICON,
    TOKEN_CLASS_LINK,
    TOKEN_CLASS_LINK_ARROW,
    TOKEN_CLASS_LINK_ICON,
    TOKEN_CLASS_LINK_TITLE,
    TOKEN_CLASS_NOT_ACTIVE,
    TOKEN_CLASS_TITLE,
    TOKEN_DISABLED,
    TOKEN_ROLE_LINK,
    TOKEN_SELECTOR_SCOPE,
    warn,
} from './_.mjs';

const observed = new WeakMap;
const observer = new MutationObserver(function (list, self) {
    forEachArray(list, v => {
        let {attributeName, target, type} = v;
        if (TOKEN_ATTRIBUTES === type) {
            if (TOKEN_CLASS === attributeName) {
                if (hasClass(target, TOKEN_CLASS_NOT_ACTIVE)) {
                    setAria(target, TOKEN_DISABLED, true);
                } else {
                    letAria(target, TOKEN_DISABLED);
                }
            } else if (TOKEN_ARIA_DISABLED === attributeName) {
                toggleClass(target, TOKEN_CLASS_NOT_ACTIVE, getAria(target, TOKEN_DISABLED));
            }
            return 1;
        }
        if (TOKEN_CHILD_LIST === type) {
            let arrow = getElement(TOKEN_SELECTOR_SCOPE + '.' + TOKEN_CLASS_LINK_ARROW, target),
                icon = getElement(TOKEN_SELECTOR_SCOPE + '.' + TOKEN_CLASS_LINK_ICON, target),
                title = getElement(TOKEN_SELECTOR_SCOPE + '.' + TOKEN_CLASS_LINK_TITLE, target);
            arrow && setClass(arrow, TOKEN_CLASS_ARROW);
            icon && setClass(icon, TOKEN_CLASS_ICON);
            title && setClass(title, TOKEN_CLASS_TITLE);
            toggleClass(target, TOKEN_CLASS_HAS_ARROW, !!arrow);
            toggleClass(target, TOKEN_CLASS_HAS_ICON, !!icon);
            toggleClass(target, TOKEN_CLASS_HAS_TITLE, !!title);
            return 1;
        }
    });
    // console.log(list);
});

export default function (watch, nodes) {
    nodes = nodes || getElements('.' + TOKEN_CLASS_LINK);
    if (!toCount(nodes)) {
        return;
    }
    forEachArray(nodes, node => {
        if ('a' === getName(node)) {
            if (getAria(node, TOKEN_DISABLED) && !hasClass(node, TOKEN_CLASS_NOT_ACTIVE)) {
                warn('Missing `' + TOKEN_CLASS_NOT_ACTIVE + '` class at ', node);
            } else if (hasClass(node, TOKEN_CLASS_NOT_ACTIVE) && !getAria(node, TOKEN_DISABLED)) {
                warn('Missing `' + TOKEN_ARIA_DISABLED + '` attribute at ', node);
            }
        } else {
            warn('Missing `role="' + TOKEN_ROLE_LINK + '"` attribute at ', node);
        }
        if (watch && !getValueInMap(node, observed)) {
            observer.observe(node, {
                attributes: true,
                childList: true
            });
            setValueInMap(node, 1, observed);
        }
    });
    return nodes;
};