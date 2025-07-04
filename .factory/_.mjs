import {D, fromElement, getChildFirst, hasState, setAttribute, setChildLast, setElement, setID} from '@taufik-nurrohman/document';
import {forEachArray, forEachObject} from '@taufik-nurrohman/f';
import {isArray, isFloat, isInteger, isObject, isSet, isString} from '@taufik-nurrohman/is';
import {toCount, toJSON, toSetCount} from '@taufik-nurrohman/to';

export const {info, log, warn} = console;

export const TOKEN_ATTRIBUTES = 'attributes';
export const TOKEN_BUTTON = 'button';
export const TOKEN_CHILD_LIST = 'childList';
export const TOKEN_CLASS = 'class';
export const TOKEN_CONTENTEDITABLE = 'contenteditable';
export const TOKEN_CONTENT_EDITABLE = 'contentEditable';
export const TOKEN_DISABLED = 'disabled';
export const TOKEN_HIDDEN = 'hidden';
export const TOKEN_INPUT = 'input';
export const TOKEN_PRESSED = 'pressed';
export const TOKEN_READONLY = 'readonly';
export const TOKEN_READ_ONLY = 'readOnly';
export const TOKEN_SELECTED = 'selected';
export const TOKEN_SUBTREE = 'subtree';
export const TOKEN_TABINDEX = 'tabindex';
export const TOKEN_TAB_INDEX = 'tabIndex';

export const TOKEN_ARIA = 'aria-';
export const TOKEN_CLASS_FOR = 'for-';
export const TOKEN_CLASS_FROM = 'from-';
export const TOKEN_CLASS_HAS = 'has-';
export const TOKEN_CLASS_IS = 'is-';
export const TOKEN_CLASS_NOT = 'not-';
export const TOKEN_CLASS_OF = 'of-';
export const TOKEN_CLASS_TO = 'to-';

export const TOKEN_ARIA_DISABLED = TOKEN_ARIA + TOKEN_DISABLED;
export const TOKEN_ARIA_PRESSED = TOKEN_ARIA + TOKEN_PRESSED;
export const TOKEN_ARIA_READONLY = TOKEN_ARIA + TOKEN_READONLY;
export const TOKEN_ARIA_SELECTED = TOKEN_ARIA + TOKEN_SELECTED;

export const TOKEN_CLASS_ACTIVE = 'active';
export const TOKEN_CLASS_ARROW = 'arrow';
export const TOKEN_CLASS_BUTTON = TOKEN_BUTTON;
export const TOKEN_CLASS_BUTTONS = TOKEN_CLASS_BUTTON + 's';
export const TOKEN_CLASS_ICON = 'icon';
export const TOKEN_CLASS_ICONS = TOKEN_CLASS_ICON + 's';
export const TOKEN_CLASS_ITEM = 'item';
export const TOKEN_CLASS_ITEMS = TOKEN_CLASS_ITEM + 's';
export const TOKEN_CLASS_LINK = 'link';
export const TOKEN_CLASS_LINKS = TOKEN_CLASS_LINK + 's';
export const TOKEN_CLASS_SET = 'set';
export const TOKEN_CLASS_TITLE = 'title';

export const TOKEN_CLASS_BUTTON_ARROW = TOKEN_CLASS_BUTTON + '-' + TOKEN_CLASS_ARROW;
export const TOKEN_CLASS_BUTTON_ICON = TOKEN_CLASS_BUTTON + '-' + TOKEN_CLASS_ICON;
export const TOKEN_CLASS_BUTTON_SET = TOKEN_CLASS_BUTTON + '-' + TOKEN_CLASS_SET;
export const TOKEN_CLASS_BUTTON_TITLE = TOKEN_CLASS_BUTTON + '-' + TOKEN_CLASS_TITLE;
export const TOKEN_CLASS_ENTRY = 'entry';
export const TOKEN_CLASS_ENTRY_SET = TOKEN_CLASS_ENTRY + '-' + TOKEN_CLASS_SET;
export const TOKEN_CLASS_HAS_ARROW = TOKEN_CLASS_HAS + TOKEN_CLASS_ARROW;
export const TOKEN_CLASS_HAS_ICON = TOKEN_CLASS_HAS + TOKEN_CLASS_ICON;
export const TOKEN_CLASS_HAS_ITEMS = TOKEN_CLASS_HAS + TOKEN_CLASS_ITEMS;
export const TOKEN_CLASS_HAS_LINK = TOKEN_CLASS_HAS + TOKEN_CLASS_LINK;
export const TOKEN_CLASS_HAS_TITLE = TOKEN_CLASS_HAS + TOKEN_CLASS_TITLE;
export const TOKEN_CLASS_IS_ACTIVE = TOKEN_CLASS_IS + TOKEN_CLASS_ACTIVE;
export const TOKEN_CLASS_LINK_ARROW = TOKEN_CLASS_LINK + '-' + TOKEN_CLASS_ARROW;
export const TOKEN_CLASS_LINK_ICON = TOKEN_CLASS_LINK + '-' + TOKEN_CLASS_ICON;
export const TOKEN_CLASS_LINK_SET = TOKEN_CLASS_LINK + '-' + TOKEN_CLASS_SET;
export const TOKEN_CLASS_LINK_TITLE = TOKEN_CLASS_LINK + '-' + TOKEN_CLASS_TITLE;
export const TOKEN_CLASS_NOT_ACTIVE = TOKEN_CLASS_NOT + TOKEN_CLASS_ACTIVE;

export const TOKEN_ROLE_GROUP = 'group';
export const TOKEN_ROLE_LINK = 'link';

export const TOKEN_SELECTOR_SCOPE = ':scope>';

export function dataToIcon(data) {
    let n = 'http://www.w3.org/2000/svg';
    const icon = D.createElementNS(n, 'svg');
    const iconPath = D.createElementNS(n, 'path');
    setAttribute(icon, 'height', data.h ?? data.height ?? 24);
    setAttribute(icon, 'viewBox', '0 0 24 24');
    setAttribute(icon, 'width', data.w ?? data.width ?? 24);
    if (isArray(data.tags)) {
        data.tags.push('icon');
    } else if (!isObject(data.tags)) {
        data.tags = {};
        data.tags.icon = 1;
    } else {
        data.tags.icon = 1;
    }
    setAttribute(icon, 'class', dataToNodeClassValue(data.tags));
    setAttribute(iconPath, 'd', data.icon);
    setChildLast(icon, iconPath);
    setID(icon, data.id, 'icon:');
    return icon;
}

export function dataToNode(data, state) {
    if (!isObject(data[2])) {
        data[2] = {};
    }
    if (!data[2].aria) {
        data[2].aria = {};
    }
    if (!data[2].class) {
        data[2].class = {};
    }
    if (!data[2].data) {
        data[2].data = {};
    }
    if (!data[2].style) {
        data[2].style = {};
    }
    const tags = data.tags || {};
    const tones = data.tones || {};
    if (isArray(tags)) {
        forEachArray(tags, tag => {
            data.tags[tag] = true;
        });
    } else if (!isObject(tags)) {
        data.tags = {};
    }
    tags = data.tags;
    const hasGap = data.gap ?? false;
    const hasHeight = data.h ?? data.height ?? 0;
    const hasMark = data.mark ?? false;
    const hasWidth = data.w ?? data.width ?? 0;
    const isActive = !hasState(data, 'active') || data.active;
    const isCurrent = data.current ?? false;
    const isFix = data.fix ?? false;
    const isFlex = data.flex ?? false;
    const isVital = data.vital ?? false;
    hasGap && (tags['has-gap'] = hasGap);
    if (hasHeight) {
        tags['has-height'] = true;
        if (isArray(hasHeight)) {
            hasHeight[0] = hasHeight[0] ?? '0%';
            hasHeight[1] = hasHeight[1] ?? 0;
            hasHeight[2] = hasHeight[2] ?? '100%';
            tones['height'] = hasHeight[1];
            tones['max-height'] = hasHeight[2];
            tones['min-height'] = hasHeight[0];
        } else {
            tones['height'] = hasHeight;
        }
    }
    if (hasMark) {
        data[2]['aria']['selected'] = true;
        tags['has-mark'] = true;
        if (isString(hasMark)) {
            tags['has-mark-' + hasMark] = true;
        }
    }
    if (hasWidth) {
        tags['has-width'] = true;
        if (isArray(hasWidth)) {
            hasWidth[0] = hasWidth[0] ?? '0%';
            hasWidth[1] = hasWidth[1] ?? 0;
            hasWidth[2] = hasWidth[2] ?? '100%';
            tones['width'] = hasWidth[1];
            tones['max-width'] = hasWidth[2];
            tones['min-width'] = hasWidth[0];
        } else {
            tones['width'] = hasWidth;
        }
    }
    if (isActive) {
        tags['is-active'] = true;
    } else {
        data[2]['aria']['disabled'] = true;
        tags['not-active'] = true;
    }
    if (isCurrent) {
        data[2]['aria']['current'] = true;
        tags['is-current'] = true;
        if (isString(isCurrent)) {
            tags['is-current-' + isCurrent] = true;
        }
    }
    if (isFix) {
        data[2]['aria']['readonly'] = true;
        tags['is-fix'] = true;
    }
    if (isFlex) {
        data[2]['aria']['orientation'] = 'horizontal';
        tags['is-flex'] = true;
    } else {
        data[2]['aria']['orientation'] = 'vertical';
    }
    if (isVital) {
        data[2]['aria']['required'] = true;
        tags['is-vital'] = true;
    }
    data[2]['data']['key'] = data.key ?? null;
    data[2]['data']['stack'] = data.stack ?? null;
    if (data.description) {
        data[2]['aria']['description'] = data.description;
        tags['has-description'] = true;
    }
    if (data.hint) {
        data[2]['aria']['placeholder'] = data.hint;
        tags['has-hint'] = true;
    }
    if (data.id) {
        data[2]['id'] = data.id;
    }
    if (data.level && isInteger(data.level)) {
        data[2]['aria']['level'] = data.level;
    }
    if (data.title) {
        tags['has-title'] = true;
        data[2]['aria']['label'] = data.title;
    }
    forEachArray(['chunk', 'count', 'deep', 'part', 'sort'], key => {
        if (data[key] && hasState(data[2]['data'], key)) {
            data[2]['data'][key] = toJSON(data[key]);
        }
    });
    forEachArray(['are', 'as', 'can', 'has', 'is', 'not', 'of', 'with'], key => {
        if (isArray(data[key])) {
            forEachArray(data[key], k => {
                tags[key + '-' + k] = true;
            });
        } else if (isObject(data[key])) {
            forEachObject(data[key], (v, k) => {
                k && v && (tags[key + '-' + k] = v);
            });
        }
    });
    data.tags = tags;
    data.tones = tones;
    if (hasState(data, 'content')) {
        data[1] = toJSON(data.content);
    } else if (hasState(data, 'lot') && isArray(data.lot)) {
        // TODO
    }
    info(data);
    return setElement(data[0] ?? 'div', data[1] ?? "", data[2] || {}, state);
}

export function dataToNodeClassValue(data) {
    const values = {};
    if (isArray(data)) {
        forEachArray(data.sort(), v => {
            values[v] = true;
        });
    }
    return values;
}

export function dataToNodeStyleValue(data) {
    return data;
}

export function nodeToData(node) {
    if (isString(node)) {
        node = getChildFirst((new DOMParser).parseFromString(node, 'text/html').body);
    }
    return fromElement(node);
}