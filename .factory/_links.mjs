import {forEachArray, getValueInMap, setValueInMap} from '@taufik-nurrohman/f';
import {W, getAria, getChildFirst, getChildren, getElement, getElements, getRole, hasClass, isElement, letAria, letClass, setAria, setClass, toggleClass} from '@taufik-nurrohman/document';
import {toCount} from '@taufik-nurrohman/to';

const {warn} = W.console;

const observed = new WeakMap;
const observer = new MutationObserver(function (list, self) {
    forEachArray(list, v => {
        let {addedNodes, attributeName, target, type} = v;
        if ('attributes' === type) {
            if ('class' === attributeName) {
                if (hasClass(target, 'has-items')) {
                    if (!getChildFirst(target)) {
                        warn('Missing child nodes in ', node);
                        return 1;
                    }
                    let children = getChildren(target).filter(v => isElement(v) && (hasClass(v, 'link') || hasClass(v, 'link-set')));
                    if (!toCount(children)) {
                        warn('Child nodes can only be `.link` and/or `.link-set` in ', node);
                        return 1;
                    }
                }
                if (hasClass(target, 'not-active')) {
                    setAria(target, 'disabled', true);
                    forEachArray(getChildren(target), v => {
                        setClass(v, 'not-active');
                    });
                } else {
                    letAria(target, 'disabled');
                    forEachArray(getChildren(target), v => {
                        letClass(v, 'not-active');
                    });
                }
            } else if ('aria-disabled' === attributeName) {
                toggleClass(target, 'not-active', getAria(target, 'disabled'));
            }
            return 1;
        }
        if ('childList' === type) {
            forEachArray(addedNodes, node => {
                if (!isElement(node) || (!hasClass(node, 'link') && !hasClass(node, 'link-set'))) {
                    warn('Invalid node ', node, ' has been inserted to ', target);
                }
            });
            let hasItems = toCount(getChildren(target).filter(v => isElement(v) && (hasClass(v, 'link') || hasClass(v, 'link-set')))) > 0;
            target.hidden = !hasItems;
            toggleClass(target, 'has-items', hasItems);
            return 1;
        }
    });
    // console.log(list);
});

export default function (watch, nodes) {
    nodes = nodes || getElements('.links');
    if (!toCount(nodes)) {
        return;
    }
    forEachArray(nodes, node => {
        if ('group' !== getRole(node)) {
            warn('Missing `role="group"` attribute at ', node);
        }
        if (watch && !getValueInMap(node, observed)) {
            observer.observe(node, {
                attributes: true,
                childList: true
            });
            setValueInMap(node, 1, observed);
        }
    });
};