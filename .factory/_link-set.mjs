import {forEachArray, getValueInMap, setValueInMap} from '@taufik-nurrohman/f';
import {W, getAria, getChildFirst, getChildren, getElement, getElements, getRole, hasClass, isElement, letAria, letClass, setAria, setClass, toggleClass} from '@taufik-nurrohman/document';
import {toCount} from '@taufik-nurrohman/to';

import {
    TOKEN_ARIA_DISABLED,
    TOKEN_ATTRIBUTES,
    TOKEN_CHILD_LIST,
    TOKEN_CLASS,
    TOKEN_CLASS_HAS_ITEMS,
    TOKEN_CLASS_LINK,
    TOKEN_CLASS_LINK_SET,
    TOKEN_CLASS_NOT_ACTIVE,
    TOKEN_DISABLED,
    TOKEN_ROLE_GROUP,
    warn,
} from './_.mjs';

const observed = new WeakMap;
const observer = new MutationObserver(function (list, self) {
    forEachArray(list, v => {
        let {addedNodes, attributeName, target, type} = v;
        if (TOKEN_ATTRIBUTES === type) {
            if (TOKEN_CLASS === attributeName) {
                if (hasClass(target, TOKEN_CLASS_HAS_ITEMS)) {
                    if (!getChildFirst(target)) {
                        warn('Missing child nodes in ', target);
                        return 1;
                    }
                    let children = getChildren(target).filter(v => isElement(v) && hasClass(v, TOKEN_CLASS_LINK));
                    if (!toCount(children)) {
                        warn('Child nodes can only be `.' + TOKEN_CLASS_LINK + '` in ', target);
                        return 1;
                    }
                }
                if (hasClass(target, TOKEN_CLASS_NOT_ACTIVE)) {
                    setAria(target, TOKEN_DISABLED, true);
                    forEachArray(getChildren(target), v => {
                        setClass(v, TOKEN_CLASS_NOT_ACTIVE);
                    });
                } else {
                    letAria(target, TOKEN_DISABLED);
                    forEachArray(getChildren(target), v => {
                        letClass(v, TOKEN_CLASS_NOT_ACTIVE);
                    });
                }
            } else if (TOKEN_ARIA_DISABLED === attributeName) {
                toggleClass(target, TOKEN_CLASS_NOT_ACTIVE, getAria(target, TOKEN_DISABLED));
            }
            return 1;
        }
        if (TOKEN_CHILD_LIST === type) {
            forEachArray(addedNodes, node => {
                if (!isElement(node) || !hasClass(node, TOKEN_CLASS_LINK)) {
                    warn('Invalid node ', node, ' has been inserted to ', target);
                }
            });
            let hasItems = toCount(getChildren(target).filter(v => isElement(v) && hasClass(v, TOKEN_CLASS_LINK))) > 0;
            target.hidden = !hasItems;
            toggleClass(target, TOKEN_CLASS_HAS_ITEMS, hasItems);
            return 1;
        }
    });
    // console.log(list);
});

export function watchLinkSet(nodes) {
    nodes = nodes || getElements('.' + TOKEN_CLASS_LINK_SET);
    if (!toCount(nodes)) {
        return;
    }
    forEachArray(nodes, node => {
        if (TOKEN_ROLE_GROUP !== getRole(node)) {
            warn('Missing `role="' + TOKEN_ROLE_GROUP + '"` attribute at ', node);
        }
        if (!getValueInMap(node, observed)) {
            observer.observe(node, {
                attributes: true,
                childList: true
            });
            setValueInMap(node, 1, observed);
        }
    });
}