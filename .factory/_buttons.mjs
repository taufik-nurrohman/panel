import {forEachArray} from '@taufik-nurrohman/f';
import {getElements, getRole} from '@taufik-nurrohman/document';
import {toCount} from '@taufik-nurrohman/to';

export default function () {
    const elements = getElements('.buttons');
    toCount(elements) && forEachArray(elements, element => {
        if ('group' !== getRole(element)) {
            console.warn(['Missing `role="group"` attribute', element]);
        }
    });
};