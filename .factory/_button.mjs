import {forEachArray} from '@taufik-nurrohman/f';
import {getElements, getName, hasAttribute, hasClass} from '@taufik-nurrohman/document';
import {hasValue} from '@taufik-nurrohman/has';
import {toCount} from '@taufik-nurrohman/to';

export default function () {
    const elements = getElements('.button');
    toCount(elements) && forEachArray(elements, element => {
        if ('button' === getName(element)) {
            if (hasAttribute(element, 'disabled') && !hasClass(element, 'not-active')) {
                console.warn(['Missing `not-active` class', element]);
                return 0;
            }
            if (hasClass(element, 'not-active') && !hasAttribute(element, 'disabled')) {
                console.warn(['Missing `disabled` attribute', element]);
                return 0;
            }
            return 1;
        }
        if ('input' === getName(element) && hasValue(element.type, ['button', 'image', 'reset', 'submit'])) {
            if (hasAttribute(element, 'disabled') && !hasClass(element, 'not-active')) {
                console.warn(['Missing `not-active` class', element]);
                return 0;
            }
            if (hasClass(element, 'not-active') && !hasAttribute(element, 'disabled')) {
                console.warn(['Missing `disabled` attribute', element]);
                return 0;
            }
            return 1;
        }
        console.warn(['Missing `role="button"` attribute', element]);
    });
};