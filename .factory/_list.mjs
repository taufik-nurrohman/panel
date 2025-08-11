import {D, getAria, getElements, getNext, getParent, getPrev, hasClass, letAria, letClass, setAria, setClass} from '@taufik-nurrohman/document';
import {forEachArray} from '@taufik-nurrohman/f';
import {fireEvent, offEventDefault, onEvent} from '@taufik-nurrohman/event';
import {toCount} from '@taufik-nurrohman/to';

import {
    EVENT_CLICK,
    EVENT_KEY_DOWN,
    EVENT_KEY_UP,
    KEY_ARROW_DOWN,
    KEY_ARROW_UP,
    KEY_SPACE,
    TOKEN_CLASS_CAN_MARK,
    TOKEN_CLASS_HAS_MARK,
    TOKEN_CLASS_LIST_ITEM,
    TOKEN_CLASS_LIST_ITEMS,
    TOKEN_DISABLED,
    TOKEN_HIDDEN,
    TOKEN_SELECTED,
    TOKEN_TABINDEX,
    log
} from './_.mjs';

let keyIsCtrl;

function clearListItemMarks(item) {
    let items = getElements('.' + TOKEN_CLASS_HAS_MARK + '.' + TOKEN_CLASS_LIST_ITEM);
    toCount(items) && forEachArray(items, v => {
        if (v !== item) {
            letAria(v, TOKEN_SELECTED);
            letClass(v, TOKEN_CLASS_HAS_MARK);
        }
    });
}

function getNextValid(current) {
    while (current = getNext(current)) {
        if (!current[TOKEN_HIDDEN] && !getAria(current, TOKEN_DISABLED)) {
            return current;
        }
    }
}

function getPrevValid(current) {
    while (current = getPrev(current)) {
        if (!current[TOKEN_HIDDEN] && !getAria(current, TOKEN_DISABLED)) {
            return current;
        }
    }
}

function onClickDocumentFindListItem(e) {
    let {target} = e,
        item = getParent(target, '.' + TOKEN_CLASS_CAN_MARK + '.' + TOKEN_CLASS_LIST_ITEM);
    if (!item) {
        return clearListItemMarks();
    }
    let itemParent = getParent(item, '.' + TOKEN_CLASS_LIST_ITEMS);
    if (!itemParent) {
        return clearListItemMarks();
    }
    if (hasClass(item, TOKEN_CLASS_HAS_MARK)) {
        letAria(item, TOKEN_SELECTED);
        letClass(item, TOKEN_CLASS_HAS_MARK);
    } else {
        setAria(item, TOKEN_SELECTED, true);
        setClass(item, TOKEN_CLASS_HAS_MARK);
    }
    if (!keyIsCtrl) {
        clearListItemMarks(item);
    }
    offEventDefault(e);
}

function onKeyDownDocument(e) {
    keyIsCtrl = e.ctrlKey;
}

function onKeyDownDocumentFindListItem(e) {
    let {key, target} = e,
        item = getParent(target, '.' + TOKEN_CLASS_LIST_ITEM + '[' + TOKEN_TABINDEX + ']');
    if (!item) {
        return;
    }
    let itemNext, itemPrev;
    if (KEY_ARROW_DOWN === key) {
        if (itemNext = getNextValid(item)) {
            itemNext.focus(), offEventDefault(e);
        } else {
            log('Rewind?');
        }
    } else if (KEY_ARROW_UP === key) {
        if (itemPrev = getPrevValid(item)) {
            itemPrev.focus(), offEventDefault(e);
        } else {
            log('Rewind?');
        }
    } else if (KEY_SPACE === key) {
        fireEvent(EVENT_CLICK, item);
        offEventDefault(e);
    }
}

function onKeyUpDocument(e) {
    keyIsCtrl = e.ctrlKey;
}

export function watchList(nodes) {
    onEvent(EVENT_CLICK, D, onClickDocumentFindListItem, true);
    onEvent(EVENT_KEY_DOWN, D, onKeyDownDocument, true);
    onEvent(EVENT_KEY_DOWN, D, onKeyDownDocumentFindListItem, true);
    onEvent(EVENT_KEY_UP, D, onKeyUpDocument, true);
}