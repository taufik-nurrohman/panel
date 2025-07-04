import {D, fromElement, getChildFirst, hasState, setAttribute, setChildLast, setElement, setID} from '@taufik-nurrohman/document';
import {forEachArray, forEachObject} from '@taufik-nurrohman/f';
import {isArray, isFloat, isInteger, isObject, isSet, isString} from '@taufik-nurrohman/is';
import {toCount, toJSON, toSetCount} from '@taufik-nurrohman/to';

export const {info, log, warn} = console;

export const TOKEN_ATTRIBUTES = 'attributes';
export const TOKEN_BUTTON = 'button';
export const TOKEN_CHILD_LIST = 'childList';
export const TOKEN_CONTENTEDITABLE = 'contenteditable';
export const TOKEN_CONTENT_EDITABLE = 'contentEditable';
export const TOKEN_DISABLED = 'disabled';
export const TOKEN_HEIGHT = 'height';
export const TOKEN_HIDDEN = 'hidden';
export const TOKEN_INPUT = 'input';
export const TOKEN_LINK = 'link';
export const TOKEN_MAX = 'max';
export const TOKEN_MIN = 'min';
export const TOKEN_PLACEHOLDER = 'placeholder';
export const TOKEN_PRESSED = 'pressed';
export const TOKEN_READONLY = 'readonly';
export const TOKEN_READ_ONLY = 'readOnly';
export const TOKEN_REQUIRED = 'required';
export const TOKEN_SELECTED = 'selected';
export const TOKEN_SUBTREE = 'subtree';
export const TOKEN_TABINDEX = 'tabindex';
export const TOKEN_TAB_INDEX = 'tabIndex';
export const TOKEN_WIDTH = 'width';

export const TOKEN_ARIA = 'aria';
export const TOKEN_CLASS = 'class';
export const TOKEN_DATA = 'data';
export const TOKEN_STYLE = 'style';

export const TOKEN_ACTIVE = 'active';
export const TOKEN_ARE = 'are';
export const TOKEN_AS = 'as';
export const TOKEN_CAN = 'can';
export const TOKEN_CONTENT = 'content';
export const TOKEN_CURRENT = 'current';
export const TOKEN_DESCRIPTION = 'description';
export const TOKEN_FIX = 'fix';
export const TOKEN_FLEX = 'flex';
export const TOKEN_GAP = 'gap';
export const TOKEN_HAS = 'has';
export const TOKEN_HINT = 'hint';
export const TOKEN_HORIZONTAL = 'horizontal';
export const TOKEN_IS = 'is';
export const TOKEN_KEY = 'key';
export const TOKEN_LABEL = 'label';
export const TOKEN_LEVEL = 'level';
export const TOKEN_LOT = 'lot';
export const TOKEN_MARK = 'mark';
export const TOKEN_NOT = 'not';
export const TOKEN_OF = 'of';
export const TOKEN_ORIENTATION = 'orientation';
export const TOKEN_STACK = 'stack';
export const TOKEN_TITLE = 'title';
export const TOKEN_VALUE = 'value';
export const TOKEN_VERTICAL = 'vertical';
export const TOKEN_VITAL = 'vital';
export const TOKEN_WITH = 'with';

export const TOKEN_ARIA_DISABLED = TOKEN_ARIA + '-' + TOKEN_DISABLED;
export const TOKEN_ARIA_PRESSED = TOKEN_ARIA + '-' + TOKEN_PRESSED;
export const TOKEN_ARIA_READONLY = TOKEN_ARIA + '-' + TOKEN_READONLY;
export const TOKEN_ARIA_SELECTED = TOKEN_ARIA + '-' + TOKEN_SELECTED;

export const TOKEN_CLASS_ACTIVE = TOKEN_ACTIVE;
export const TOKEN_CLASS_ARROW = 'arrow';
export const TOKEN_CLASS_BUTTON = TOKEN_BUTTON;
export const TOKEN_CLASS_BUTTONS = TOKEN_CLASS_BUTTON + 's';
export const TOKEN_CLASS_CONTENT = TOKEN_CONTENT;
export const TOKEN_CLASS_DESCRIPTION = TOKEN_DESCRIPTION;
export const TOKEN_CLASS_HINT = TOKEN_HINT;
export const TOKEN_CLASS_ICON = 'icon';
export const TOKEN_CLASS_ICONS = TOKEN_CLASS_ICON + 's';
export const TOKEN_CLASS_ITEM = 'item';
export const TOKEN_CLASS_ITEMS = TOKEN_CLASS_ITEM + 's';
export const TOKEN_CLASS_LINK = TOKEN_LINK;
export const TOKEN_CLASS_LINKS = TOKEN_CLASS_LINK + 's';
export const TOKEN_CLASS_LOT = TOKEN_LOT;
export const TOKEN_CLASS_SET = 'set';
export const TOKEN_CLASS_TITLE = TOKEN_TITLE;

export const TOKEN_CLASS_BUTTON_ARROW = TOKEN_CLASS_BUTTON + '-' + TOKEN_CLASS_ARROW;
export const TOKEN_CLASS_BUTTON_ICON = TOKEN_CLASS_BUTTON + '-' + TOKEN_CLASS_ICON;
export const TOKEN_CLASS_BUTTON_SET = TOKEN_CLASS_BUTTON + '-' + TOKEN_CLASS_SET;
export const TOKEN_CLASS_BUTTON_TITLE = TOKEN_CLASS_BUTTON + '-' + TOKEN_CLASS_TITLE;
export const TOKEN_CLASS_ENTRY = 'entry';
export const TOKEN_CLASS_ENTRY_SET = TOKEN_CLASS_ENTRY + '-' + TOKEN_CLASS_SET;
export const TOKEN_CLASS_HAS_ARROW = TOKEN_HAS + '-' + TOKEN_CLASS_ARROW;
export const TOKEN_CLASS_HAS_ICON = TOKEN_HAS + '-' + TOKEN_CLASS_ICON;
export const TOKEN_CLASS_HAS_ITEMS = TOKEN_HAS + '-' + TOKEN_CLASS_ITEMS;
export const TOKEN_CLASS_HAS_LINK = TOKEN_HAS + '-' + TOKEN_CLASS_LINK;
export const TOKEN_CLASS_HAS_TITLE = TOKEN_HAS + '-' + TOKEN_CLASS_TITLE;
export const TOKEN_CLASS_IS_ACTIVE = TOKEN_IS + '-' + TOKEN_CLASS_ACTIVE;
export const TOKEN_CLASS_LINK_ARROW = TOKEN_CLASS_LINK + '-' + TOKEN_CLASS_ARROW;
export const TOKEN_CLASS_LINK_ICON = TOKEN_CLASS_LINK + '-' + TOKEN_CLASS_ICON;
export const TOKEN_CLASS_LINK_SET = TOKEN_CLASS_LINK + '-' + TOKEN_CLASS_SET;
export const TOKEN_CLASS_LINK_TITLE = TOKEN_CLASS_LINK + '-' + TOKEN_CLASS_TITLE;
export const TOKEN_CLASS_NOT_ACTIVE = TOKEN_NOT + '-' + TOKEN_CLASS_ACTIVE;

export const TOKEN_ROLE_APPLICATION = 'application';
export const TOKEN_ROLE_GROUP = 'group';
export const TOKEN_ROLE_LINK = TOKEN_LINK;

export const TOKEN_SELECTOR_SCOPE = ':scope>';

export function dataToIcon(data) {
    let n = 'http://www.w3.org/2000/svg';
    const icon = D.createElementNS(n, 'svg');
    const iconPath = D.createElementNS(n, 'path');
    setAttribute(icon, TOKEN_HEIGHT, data[TOKEN_HEIGHT[0]] ?? data[TOKEN_HEIGHT] ?? 24);
    setAttribute(icon, 'viewBox', '0 0 24 24');
    setAttribute(icon, TOKEN_WIDTH, data[TOKEN_WIDTH[0]] ?? data[TOKEN_WIDTH] ?? 24);
    if (isArray(data.tags)) {
        data.tags.push(TOKEN_CLASS_ICON);
    } else if (!isObject(data.tags)) {
        data.tags = {};
        data.tags[TOKEN_CLASS_ICON] = 1;
    } else {
        data.tags[TOKEN_CLASS_ICON] = 1;
    }
    setAttribute(icon, TOKEN_CLASS, dataToNodeClassValue(data.tags));
    setAttribute(iconPath, 'd', data.icon);
    setChildLast(icon, iconPath);
    setID(icon, data.id, TOKEN_CLASS_ICON + ':');
    return icon;
}

export function dataToNode(data, state) {
    isObject(data[2]) || (data[2] = {});
    forEachArray([TOKEN_ARIA, TOKEN_CLASS, TOKEN_DATA, TOKEN_STYLE], key => {
        hasState(data[2], key) || (data[2][key] = {});
    });
    let tags = data.tags || {},
        tones = data.tones || {};
    if (isArray(tags)) {
        forEachArray(tags, tag => {
            data.tags[tag] = true;
        });
    } else if (!isObject(tags)) {
        data.tags = {};
    }
    if (isArray(tones)) {
        forEachArray(tones, tone => {
            data.tones[tone] = true;
        });
    } else if (!isObject(tones)) {
        data.tones = {};
    }
    tags = data.tags;
    tones = data.tones;
    let hasGap = data[TOKEN_GAP] ?? false,
        hasHeight = data[TOKEN_HEIGHT[0]] ?? data[TOKEN_HEIGHT] ?? 0,
        hasMark = data[TOKEN_MARK] ?? false,
        hasWidth = data[TOKEN_WIDTH[0]] ?? data[TOKEN_WIDTH] ?? 0,
        isActive = !hasState(data, TOKEN_ACTIVE) || data[TOKEN_ACTIVE],
        isCurrent = data[TOKEN_CURRENT] ?? false,
        isFix = data[TOKEN_FIX] ?? false,
        isFlex = data[TOKEN_FLEX] ?? false,
        isVital = data[TOKEN_VITAL] ?? false;
    hasGap && (tags[TOKEN_HAS + '-' + TOKEN_GAP] = hasGap);
    if (hasHeight) {
        tags[TOKEN_HAS + '-' + TOKEN_HEIGHT] = true;
        if (isArray(hasHeight)) {
            hasHeight[0] = hasHeight[0] ?? '0%';
            hasHeight[1] = hasHeight[1] ?? 0;
            hasHeight[2] = hasHeight[2] ?? '100%';
            tones[TOKEN_HEIGHT] = hasHeight[1];
            tones[TOKEN_MAX + '-' + TOKEN_HEIGHT] = hasHeight[2];
            tones[TOKEN_MIN + '-' + TOKEN_HEIGHT] = hasHeight[0];
        } else {
            tones[TOKEN_HEIGHT] = hasHeight;
        }
    }
    if (hasMark) {
        data[2][TOKEN_ARIA][TOKEN_SELECTED] = true;
        tags[TOKEN_HAS + '-' + TOKEN_MARK] = true;
        if (isString(hasMark)) {
            tags[TOKEN_HAS + '-' + TOKEN_MARK + '-' + hasMark] = true;
        }
    }
    if (hasWidth) {
        tags[TOKEN_HAS + '-' + TOKEN_WIDTH] = true;
        if (isArray(hasWidth)) {
            hasWidth[0] = hasWidth[0] ?? '0%';
            hasWidth[1] = hasWidth[1] ?? 0;
            hasWidth[2] = hasWidth[2] ?? '100%';
            tones[TOKEN_WIDTH] = hasWidth[1];
            tones[TOKEN_MAX + '-' + TOKEN_WIDTH] = hasWidth[2];
            tones[TOKEN_MIN + '-' + TOKEN_WIDTH] = hasWidth[0];
        } else {
            tones[TOKEN_WIDTH] = hasWidth;
        }
    }
    if (isActive) {
        tags[TOKEN_IS + '-' + TOKEN_ACTIVE] = true;
    } else {
        data[2][TOKEN_ARIA][TOKEN_DISABLED] = true;
        tags[TOKEN_NOT + '-' + TOKEN_ACTIVE] = true;
    }
    if (isCurrent) {
        data[2][TOKEN_ARIA][TOKEN_CURRENT] = true;
        tags[TOKEN_IS + '-' + TOKEN_CURRENT] = true;
        if (isString(isCurrent)) {
            tags[TOKEN_IS + '-' + TOKEN_CURRENT + '-' + isCurrent] = true;
        }
    }
    if (isFix) {
        data[2][TOKEN_ARIA][TOKEN_READONLY] = true;
        tags[TOKEN_IS + '-' + TOKEN_FIX] = true;
    }
    if (isFlex) {
        data[2][TOKEN_ARIA][TOKEN_ORIENTATION] = TOKEN_HORIZONTAL;
        tags[TOKEN_IS + '-' + TOKEN_FLEX] = true;
    } else {
        data[2][TOKEN_ARIA][TOKEN_ORIENTATION] = TOKEN_VERTICAL;
    }
    if (isVital) {
        data[2][TOKEN_ARIA][TOKEN_REQUIRED] = true;
        tags[TOKEN_IS + '-' + TOKEN_VITAL] = true;
    }
    data[2][TOKEN_DATA][TOKEN_KEY] = data[TOKEN_KEY] ?? null;
    data[2][TOKEN_DATA][TOKEN_STACK] = data[TOKEN_STACK] ?? null;
    if (data.description) {
        data[2][TOKEN_ARIA][TOKEN_DESCRIPTION] = data[TOKEN_DESCRIPTION];
        tags[TOKEN_HAS + '-' + TOKEN_DESCRIPTION] = true;
    }
    if (data.hint) {
        data[2][TOKEN_ARIA][TOKEN_PLACEHOLDER] = data[TOKEN_HINT];
        tags[TOKEN_HAS + '-' + TOKEN_HINT] = true;
    }
    if (data.id) {
        data[2].id = data.id;
    }
    if (data[TOKEN_LEVEL] && isInteger(data[TOKEN_LEVEL])) {
        data[2][TOKEN_ARIA][TOKEN_LEVEL] = data[TOKEN_LEVEL];
    }
    if (data[TOKEN_TITLE]) {
        tags[TOKEN_HAS + '-' + TOKEN_TITLE] = true;
        data[2][TOKEN_ARIA][TOKEN_LABEL] = data[TOKEN_TITLE];
    }
    forEachArray(['chunk', 'count', 'deep', 'part', 'sort'], key => {
        if (data[key] && hasState(data[2][TOKEN_DATA], key)) {
            data[2][TOKEN_DATA][key] = toJSON(data[key]);
        }
    });
    forEachArray([TOKEN_ARE, TOKEN_AS, TOKEN_CAN, TOKEN_HAS, TOKEN_IS, TOKEN_NOT, TOKEN_OF, TOKEN_WITH], key => {
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
    if (hasState(data, TOKEN_CONTENT)) {
        data[1] = toJSON(data[TOKEN_CONTENT]);
    } else if (hasState(data, [TOKEN_LOT]) && isArray(data[TOKEN_LOT])) {
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

// test
dataToNode({content: ""});