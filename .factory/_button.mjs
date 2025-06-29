import {forEachArray, getValueInMap, setValueInMap} from '@taufik-nurrohman/f';
import {W, getElement, getElements, getName, hasAttribute, hasClass, setClass, toggleClass} from '@taufik-nurrohman/document';
import {hasValue} from '@taufik-nurrohman/has';
import {toCount} from '@taufik-nurrohman/to';

const {warn} = W.console;

const observed = new WeakMap;
const observer = new MutationObserver(function (list, self) {
    forEachArray(list, v => {
        let {attributeName, target, type} = v;
        if ('attributes' === type) {
            if ('class' === attributeName) {
                target.disabled = hasClass(target, 'not-active');
            } else if ('disabled' === attributeName) {
                toggleClass(target, 'not-active', target.disabled);
            }
            return 1;
        }
        if ('childList' === type) {
            let arrow = getElement(':scope>.button-arrow', target),
                icon = getElement(':scope>.button-icon', target),
                title = getElement(':scope>.button-title', target);
            arrow && setClass(arrow, 'arrow');
            icon && setClass(icon, 'icon');
            title && setClass(title, 'title');
            toggleClass(target, 'has-arrow', !!arrow);
            toggleClass(target, 'has-icon', !!icon);
            toggleClass(target, 'has-title', !!title);
            return 1;
        }
    });
    // console.log(list);
});

export default function (watch, nodes) {
    nodes = nodes || getElements('.button');
    if (!toCount(nodes)) {
        return;
    }
    forEachArray(nodes, node => {
        if ('button' === getName(node) || 'input' === getName(node) && hasValue(node.type, ['button', 'image', 'reset', 'submit'])) {
            if (node.disabled && !hasClass(node, 'not-active')) {
                warn('Missing `not-active` class at ', node);
            } else if (hasClass(node, 'not-active') && !node.disabled) {
                warn('Missing `disabled` attribute at ', node);
            }
        } else {
            warn('Missing `role="button"` attribute at ', node);
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