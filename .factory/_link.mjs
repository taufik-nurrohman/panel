import {forEachArray, getValueInMap, setValueInMap} from '@taufik-nurrohman/f';
import {W, getAria, getElement, getElements, getName, hasAttribute, hasClass, setClass, toggleClass} from '@taufik-nurrohman/document';
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
            } else if ('aria-disabled' === attributeName) {
                toggleClass(target, 'not-active', target.disabled);
            }
            return 1;
        }
        if ('childList' === type) {
            let arrow = getElement(':scope>.link-arrow', target),
                icon = getElement(':scope>.link-icon', target),
                title = getElement(':scope>.link-title', target);
            arrow && setClass(arrow, 'arrow');
            icon && setClass(icon, 'icon');
            title && setClass(title, 'title');
            toggleClass(target, 'has-arrow', !!arrow);
            toggleClass(target, 'has-icon', !!icon);
            toggleClass(target, 'has-title', !!title);
        }
    });
    // console.log(list);
});

export default function (watch, nodes) {
    nodes = nodes || getElements('.link');
    if (!toCount(nodes)) {
        return;
    }
    forEachArray(nodes, node => {
        if ('a' === getName(node)) {
            if (getAria(node, 'disabled') && !hasClass(node, 'not-active')) {
                warn('Missing `not-active` class at ', node);
            } else if (hasClass(node, 'not-active') && !getAria(node, 'disabled')) {
                warn('Missing `aria-disabled` attribute at ', node);
            }
        } else {
            warn('Missing `role="link"` attribute at ', node);
        }
        if (watch && !getValueInMap(node, observed)) {
            observer.observe(node, {
                attributes: true,
                childList: true,
                subtree: true
            });
            setValueInMap(node, 1, observed);
        }
    });
    return nodes;
};