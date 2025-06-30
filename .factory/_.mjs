import {W} from '@taufik-nurrohman/document';

export const {info, log, warn} = W.console;

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