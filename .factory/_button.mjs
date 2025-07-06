import {forEachArray, getValueInMap, setValueInMap} from '@taufik-nurrohman/f';
import {W, getElement, getElements, getName, hasAttribute, hasClass, setClass, toggleClass} from '@taufik-nurrohman/document';
import {hasValue} from '@taufik-nurrohman/has';
import {toCount} from '@taufik-nurrohman/to';

import {
    TOKEN_ATTRIBUTES,
    TOKEN_BUTTON,
    TOKEN_CHILD_LIST,
    TOKEN_CLASS,
    TOKEN_CLASS_ARROW,
    TOKEN_CLASS_BUTTON,
    TOKEN_CLASS_BUTTON_ARROW,
    TOKEN_CLASS_BUTTON_ICON,
    TOKEN_CLASS_BUTTON_TITLE,
    TOKEN_CLASS_HAS_ARROW,
    TOKEN_CLASS_HAS_ICON,
    TOKEN_CLASS_HAS_TITLE,
    TOKEN_CLASS_ICON,
    TOKEN_CLASS_NOT_ACTIVE,
    TOKEN_CLASS_TITLE,
    TOKEN_DISABLED,
    TOKEN_INPUT,
    TOKEN_SELECTOR_SCOPE,
    warn,
} from './_.mjs';

const observed = new WeakMap;
const observer = new MutationObserver(function (list, self) {
    forEachArray(list, v => {
        let {attributeName, target, type} = v;
        if (TOKEN_ATTRIBUTES === type) {
            if (TOKEN_CLASS === attributeName) {
                target[TOKEN_DISABLED] = hasClass(target, TOKEN_CLASS_NOT_ACTIVE);
            } else if (TOKEN_DISABLED === attributeName) {
                toggleClass(target, TOKEN_CLASS_NOT_ACTIVE, target.disabled);
            }
            return 1;
        }
        if (TOKEN_CHILD_LIST === type) {
            let arrow = getElement(TOKEN_SELECTOR_SCOPE + '.' + TOKEN_CLASS_BUTTON_ARROW, target),
                icon = getElement(TOKEN_SELECTOR_SCOPE + '.' + TOKEN_CLASS_BUTTON_ICON, target),
                title = getElement(TOKEN_SELECTOR_SCOPE + '.' + TOKEN_CLASS_BUTTON_TITLE, target);
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

export function watchButton(nodes) {
    nodes = nodes || getElements('.' + TOKEN_CLASS_BUTTON);
    if (!toCount(nodes)) {
        return;
    }
    forEachArray(nodes, node => {
        if (TOKEN_BUTTON === getName(node) || TOKEN_INPUT === getName(node) && hasValue(node.type, [TOKEN_BUTTON, 'image', 'reset', 'submit'])) {
            if (node.disabled && !hasClass(node, TOKEN_CLASS_NOT_ACTIVE)) {
                warn('Missing `' + TOKEN_CLASS_NOT_ACTIVE + '` class at ', node);
            } else if (hasClass(node, TOKEN_CLASS_NOT_ACTIVE) && !node.disabled) {
                warn('Missing `' + TOKEN_DISABLED + '` attribute at ', node);
            }
        } else {
            warn('Missing `role="' + TOKEN_BUTTON + '"` attribute at ', node);
        }
        if (!getValueInMap(node, observed)) {
            observer.observe(node, {
                attributes: true,
                childList: true
            });
            setValueInMap(node, 1, observed);
        }
    });
    return nodes;
}