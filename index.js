var panel = (function () {
    'use strict';

    function _arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
    }

    function _arrayWithHoles(r) {
        if (Array.isArray(r)) return r;
    }

    function _iterableToArrayLimit(r, l) {
        var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
        if (null != t) {
            var e,
                n,
                i,
                u,
                a = [],
                f = true,
                o = false;
            try {
                if (i = (t = t.call(r)).next, 0 === l) {
                    if (Object(t) !== t) return;
                    f = !1;
                } else
                    for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
            } catch (r) {
                o = true, n = r;
            } finally {
                try {
                    if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
                } finally {
                    if (o) throw n;
                }
            }
            return a;
        }
    }

    function _maybeArrayLike(r, a, e) {
        if (a && !Array.isArray(a) && "number" == typeof a.length) {
            var y = a.length;
            return _arrayLikeToArray(a, e < y ? e : y);
        }
        return r(a, e);
    }

    function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    function _slicedToArray(r, e) {
        return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
    }

    function _unsupportedIterableToArray(r, a) {
        if (r) {
            if ("string" == typeof r) return _arrayLikeToArray(r, a);
            var t = {}.toString.call(r).slice(8, -1);
            return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
        }
    }
    var isArray = function isArray(x) {
        return Array.isArray(x);
    };
    var isDefined = function isDefined(x) {
        return 'undefined' !== typeof x;
    };
    var isInstance = function isInstance(x, of, exact) {
        if (!x || 'object' !== typeof x) {
            return false;
        }
        if (exact) {
            return isSet(of) && isSet(x.constructor) && of === x.constructor;
        }
        return isSet(of) && x instanceof of ;
    };
    var isInteger = function isInteger(x) {
        return isNumber(x) && 0 === x % 1;
    };
    var isNull = function isNull(x) {
        return null === x;
    };
    var isNumber = function isNumber(x) {
        return 'number' === typeof x && !Number.isNaN(x);
    };
    var isNumeric = function isNumeric(x) {
        return /^[+-]?(?:\d*\.)?\d+$/.test(x + "");
    };
    var isObject = function isObject(x, isPlain) {
        if (isPlain === void 0) {
            isPlain = true;
        }
        if (!x || 'object' !== typeof x) {
            return false;
        }
        return isPlain ? isInstance(x, Object, 1) : true;
    };
    var isSet = function isSet(x) {
        return isDefined(x) && !isNull(x);
    };
    var isString = function isString(x) {
        return 'string' === typeof x;
    };
    var hasValue = function hasValue(x, data) {
        return -1 !== data.indexOf(x);
    };
    var _fromValue = function fromValue(x) {
        if (isArray(x)) {
            return x.map(function (v) {
                return _fromValue(x);
            });
        }
        if (isObject(x)) {
            for (var k in x) {
                x[k] = _fromValue(x[k]);
            }
            return x;
        }
        if (false === x) {
            return 'false';
        }
        if (null === x) {
            return 'null';
        }
        if (true === x) {
            return 'true';
        }
        return "" + x;
    };
    var toCaseCamel = function toCaseCamel(x) {
        return x.replace(/[-_.](\w)/g, function (m0, m1) {
            return toCaseUpper(m1);
        });
    };
    var toCaseLower = function toCaseLower(x) {
        return x.toLowerCase();
    };
    var toCaseUpper = function toCaseUpper(x) {
        return x.toUpperCase();
    };
    var toCount = function toCount(x) {
        return x.length;
    };
    var toJSON = function toJSON(x) {
        return JSON.stringify(x);
    };
    var toNumber = function toNumber(x, base) {
        if (base === void 0) {
            base = 10;
        }
        return base ? parseInt(x, base) : parseFloat(x);
    };
    var _toValue = function toValue(x) {
        if (isArray(x)) {
            return x.map(function (v) {
                return _toValue(v);
            });
        }
        if (isObject(x)) {
            for (var k in x) {
                x[k] = _toValue(x[k]);
            }
            return x;
        }
        if (isString(x) && isNumeric(x)) {
            if ('0' === x[0] && -1 === x.indexOf('.')) {
                return x;
            }
            return toNumber(x);
        }
        if ('false' === x) {
            return false;
        }
        if ('null' === x) {
            return null;
        }
        if ('true' === x) {
            return true;
        }
        return x;
    };
    var forEachArray = function forEachArray(array, at) {
        for (var i = 0, j = toCount(array), v; i < j; ++i) {
            v = at.call(array, array[i], i);
            if (-1 === v) {
                array.splice(i, 1);
                continue;
            }
            if (0 === v) {
                break;
            }
            if (1 === v) {
                continue;
            }
        }
        return array;
    };
    var forEachObject = function forEachObject(object, at) {
        var v;
        for (var k in object) {
            v = at.call(object, object[k], k);
            if (-1 === v) {
                delete object[k];
                continue;
            }
            if (0 === v) {
                break;
            }
            if (1 === v) {
                continue;
            }
        }
        return object;
    };
    var getValueInMap = function getValueInMap(k, map) {
        return map.get(k);
    };
    var setValueInMap = function setValueInMap(k, v, map) {
        return map.set(k, v);
    };

    function _toArray$1(iterable) {
        return Array.from(iterable);
    }
    var D = document;
    var W = window;
    var B = D.body;
    var getAria = function getAria(node, aria, parseValue) {
        if (parseValue === void 0) {
            parseValue = true;
        }
        return getAttribute(node, 'aria-' + aria, parseValue);
    };
    var getAttribute = function getAttribute(node, attribute, parseValue) {
        if (parseValue === void 0) {
            parseValue = true;
        }
        if (!hasAttribute(node, attribute)) {
            return null;
        }
        var value = node.getAttribute(attribute);
        return parseValue ? _toValue(value) : value;
    };
    var getChildFirst = function getChildFirst(parent, anyNode) {
        return parent['first' + ('Element') + 'Child'] || null;
    };
    var getChildren = function getChildren(parent, index, anyNode) {
        var children = _toArray$1(parent['child' + ('ren')]);
        return isNumber(index) ? children[index] || null : children;
    };
    var getElement = function getElement(query, scope) {
        return (scope || D).querySelector(query);
    };
    var getElements = function getElements(query, scope) {
        return _toArray$1((scope || D).querySelectorAll(query));
    };
    var getName = function getName(node) {
        return toCaseLower(node && node.nodeName || "") || null;
    };
    var getParent = function getParent(node, query) {
        if (query) {
            return node.closest(query) || null;
        }
        return node.parentNode || null;
    };
    var getRole = function getRole(node) {
        return getAttribute(node, 'role');
    };
    var getType = function getType(node) {
        return node && node.nodeType || null;
    };
    var hasAria = function hasAria(node, aria) {
        return hasAttribute(node, 'aria-' + aria);
    };
    var hasAttribute = function hasAttribute(node, attribute) {
        return node.hasAttribute(attribute);
    };
    var hasClass = function hasClass(node, value) {
        return node.classList.contains(value);
    };
    var hasState = function hasState(node, state) {
        return state in node;
    };
    var isElement = function isElement(node) {
        return isNode(node) && /* Node.ELEMENT_NODE */ 1 === getType(node);
    };
    var isNode = function isNode(node) {
        return isInstance(node, Node);
    };
    var letAria = function letAria(node, aria) {
        return letAttribute(node, 'aria-' + aria);
    };
    var letAttribute = function letAttribute(node, attribute) {
        return node.removeAttribute(attribute), node;
    };
    var letClass = function letClass(node, value) {
        return node.classList.remove(value), node;
    };
    var letDatum = function letDatum(node, datum) {
        return letAttribute(node, 'data-' + datum);
    };
    var letHTML = function letHTML(node) {
        var state = 'innerHTML';
        return hasState(node, state) && (node[state] = ""), node;
    };
    var letStyle = function letStyle(node, style) {
        return node.style[toCaseCamel(style)] = null, node;
    };
    var setAria = function setAria(node, aria, value) {
        return setAttribute(node, 'aria-' + aria, true === value ? 'true' : value);
    };
    var setArias = function setArias(node, data) {
        return forEachObject(data, function (v, k) {
            v || "" === v || 0 === v ? setAria(node, k, v) : letAria(node, k);
        }), node;
    };
    var setAttribute = function setAttribute(node, attribute, value) {
        if (true === value) {
            value = attribute;
        }
        return node.setAttribute(attribute, _fromValue(value)), node;
    };
    var setAttributes = function setAttributes(node, attributes) {
        return forEachObject(attributes, function (v, k) {
            if ('aria' === k && isObject(v)) {
                return setArias(node, v), 1;
            }
            if ('class' === k) {
                return setClasses(node, v), 1;
            }
            if ('data' === k && isObject(v)) {
                return setData(node, v), 1;
            }
            if ('style' === k && isObject(v)) {
                return setStyles(node, v), 1;
            }
            v || "" === v || 0 === v ? setAttribute(node, k, v) : letAttribute(node, k);
        }), node;
    };
    var setChildLast = function setChildLast(parent, node) {
        return parent.append(node), node;
    };
    var setClass = function setClass(node, value) {
        return node.classList.add(value), node;
    };
    var setClasses = function setClasses(node, classes) {
        if (isArray(classes)) {
            return forEachArray(classes, function (k) {
                return setClass(node, k);
            }), node;
        }
        if (isObject(classes)) {
            return forEachObject(classes, function (v, k) {
                return v ? setClass(node, k) : letClass(node, k);
            }), node;
        }
        return node.className = classes, node;
    };
    var setData = function setData(node, data) {
        return forEachObject(data, function (v, k) {
            v || "" === v || 0 === v ? setDatum(node, k, v) : letDatum(node, k);
        }), node;
    };
    var setDatum = function setDatum(node, datum, value) {
        if (isArray(value) || isObject(value)) {
            value = toJSON(value);
        }
        return setAttribute(node, 'data-' + datum, true === value ? 'true' : value);
    };
    var setElement = function setElement(node, content, attributes, options) {
        node = isString(node) ? D.createElement(node, isString(options) ? {
            is: options
        } : options) : node;
        if (isArray(content) && toCount(content)) {
            letHTML(node);
            forEachArray(content, function (v) {
                return setChildLast(isString(v) ? setElementText(v) : v);
            });
        } else if (isObject(content)) {
            attributes = content;
            content = false;
        }
        if (isString(content)) {
            setHTML(node, content);
        }
        if (isObject(attributes)) {
            return setAttributes(node, attributes), node;
        }
        return node;
    };
    var setElementText = function setElementText(text) {
        return isString(text) ? text = D.createTextNode(text) : text, text;
    };
    var setHTML = function setHTML(node, content, trim) {
        if (trim === void 0) {
            trim = true;
        }
        if (null === content) {
            return node;
        }
        var state = 'innerHTML';
        return hasState(node, state) && (node[state] = trim ? content.trim() : content), node;
    };
    var setStyle = function setStyle(node, style, value) {
        if (isNumber(value)) {
            value += 'px';
        }
        return node.style[toCaseCamel(style)] = _fromValue(value), node;
    };
    var setStyles = function setStyles(node, styles) {
        return forEachObject(styles, function (v, k) {
            v || "" === v || 0 === v ? setStyle(node, k, v) : letStyle(node, k);
        }), node;
    };
    var toggleClass = function toggleClass(node, name, force) {
        return node.classList.toggle(name, force), node;
    };
    var _console = console,
        info = _console.info,
        warn = _console.warn;
    var TOKEN_ATTRIBUTES = 'attributes';
    var TOKEN_BUTTON = 'button';
    var TOKEN_CHILD_LIST = 'childList';
    var TOKEN_DISABLED = 'disabled';
    var TOKEN_HEIGHT = 'height';
    var TOKEN_HIDDEN = 'hidden';
    var TOKEN_INPUT = 'input';
    var TOKEN_LINK = 'link';
    var TOKEN_MAX = 'max';
    var TOKEN_MIN = 'min';
    var TOKEN_PLACEHOLDER = 'placeholder';
    var TOKEN_READONLY = 'readonly';
    var TOKEN_REQUIRED = 'required';
    var TOKEN_SELECTED = 'selected';
    var TOKEN_WIDTH = 'width';
    var TOKEN_ARIA = 'aria';
    var TOKEN_CLASS = 'class';
    var TOKEN_DATA = 'data';
    var TOKEN_STYLE = 'style';
    var TOKEN_ACTIVE = 'active';
    var TOKEN_ARE = 'are';
    var TOKEN_AS = 'as';
    var TOKEN_CAN = 'can';
    var TOKEN_CONTENT = 'content';
    var TOKEN_CURRENT = 'current';
    var TOKEN_DESCRIPTION = 'description';
    var TOKEN_FIX = 'fix';
    var TOKEN_FLEX = 'flex';
    var TOKEN_GAP = 'gap';
    var TOKEN_HAS = 'has';
    var TOKEN_HINT = 'hint';
    var TOKEN_HORIZONTAL = 'horizontal';
    var TOKEN_IS = 'is';
    var TOKEN_KEY = 'key';
    var TOKEN_LABEL = 'label';
    var TOKEN_LEVEL = 'level';
    var TOKEN_LOT = 'lot';
    var TOKEN_MARK = 'mark';
    var TOKEN_NOT = 'not';
    var TOKEN_OF = 'of';
    var TOKEN_ORIENTATION = 'orientation';
    var TOKEN_STACK = 'stack';
    var TOKEN_TITLE = 'title';
    var TOKEN_VERTICAL = 'vertical';
    var TOKEN_VITAL = 'vital';
    var TOKEN_WITH = 'with';
    var TOKEN_ARIA_DISABLED = TOKEN_ARIA + '-' + TOKEN_DISABLED;
    var TOKEN_CLASS_ACTIVE = TOKEN_ACTIVE;
    var TOKEN_CLASS_ARROW = 'arrow';
    var TOKEN_CLASS_BUTTON = TOKEN_BUTTON;
    var TOKEN_CLASS_BUTTONS = TOKEN_CLASS_BUTTON + 's';
    var TOKEN_CLASS_ICON = 'icon';
    var TOKEN_CLASS_ITEM = 'item';
    var TOKEN_CLASS_ITEMS = TOKEN_CLASS_ITEM + 's';
    var TOKEN_CLASS_LINK = TOKEN_LINK;
    var TOKEN_CLASS_LINKS = TOKEN_CLASS_LINK + 's';
    var TOKEN_CLASS_SET = 'set';
    var TOKEN_CLASS_TITLE = TOKEN_TITLE;
    var TOKEN_CLASS_BUTTON_ARROW = TOKEN_CLASS_BUTTON + '-' + TOKEN_CLASS_ARROW;
    var TOKEN_CLASS_BUTTON_ICON = TOKEN_CLASS_BUTTON + '-' + TOKEN_CLASS_ICON;
    var TOKEN_CLASS_BUTTON_SET = TOKEN_CLASS_BUTTON + '-' + TOKEN_CLASS_SET;
    var TOKEN_CLASS_BUTTON_TITLE = TOKEN_CLASS_BUTTON + '-' + TOKEN_CLASS_TITLE;
    var TOKEN_CLASS_ENTRY = 'entry';
    var TOKEN_CLASS_ENTRY_SET = TOKEN_CLASS_ENTRY + '-' + TOKEN_CLASS_SET;
    var TOKEN_CLASS_HAS_ARROW = TOKEN_HAS + '-' + TOKEN_CLASS_ARROW;
    var TOKEN_CLASS_HAS_ICON = TOKEN_HAS + '-' + TOKEN_CLASS_ICON;
    var TOKEN_CLASS_HAS_ITEMS = TOKEN_HAS + '-' + TOKEN_CLASS_ITEMS;
    var TOKEN_CLASS_HAS_TITLE = TOKEN_HAS + '-' + TOKEN_CLASS_TITLE;
    var TOKEN_CLASS_LINK_ARROW = TOKEN_CLASS_LINK + '-' + TOKEN_CLASS_ARROW;
    var TOKEN_CLASS_LINK_ICON = TOKEN_CLASS_LINK + '-' + TOKEN_CLASS_ICON;
    var TOKEN_CLASS_LINK_SET = TOKEN_CLASS_LINK + '-' + TOKEN_CLASS_SET;
    var TOKEN_CLASS_LINK_TITLE = TOKEN_CLASS_LINK + '-' + TOKEN_CLASS_TITLE;
    var TOKEN_CLASS_NOT_ACTIVE = TOKEN_NOT + '-' + TOKEN_CLASS_ACTIVE;
    var TOKEN_ROLE_GROUP = 'group';
    var TOKEN_ROLE_LINK = TOKEN_LINK;
    var TOKEN_SELECTOR_SCOPE = ':scope>';

    function dataToNode(data, state) {
        var _data$TOKEN_GAP, _ref3, _data$TOKEN_HEIGHT$2, _data$TOKEN_MARK, _ref4, _data$TOKEN_WIDTH$2, _data$TOKEN_CURRENT, _data$TOKEN_FIX, _data$TOKEN_FLEX, _data$TOKEN_VITAL, _data$TOKEN_KEY, _data$TOKEN_STACK, _data$, _data$2;
        isObject(data[2]) || (data[2] = {});
        forEachArray([TOKEN_ARIA, TOKEN_CLASS, TOKEN_DATA, TOKEN_STYLE], function (key) {
            hasState(data[2], key) || (data[2][key] = {});
        });
        var tags = data.tags || {},
            tones = data.tones || {};
        if (isArray(tags)) {
            forEachArray(tags, function (tag) {
                data.tags[tag] = true;
            });
        } else if (!isObject(tags)) {
            data.tags = {};
        }
        if (isArray(tones)) {
            forEachArray(tones, function (tone) {
                data.tones[tone] = true;
            });
        } else if (!isObject(tones)) {
            data.tones = {};
        }
        tags = data.tags;
        tones = data.tones;
        var hasGap = (_data$TOKEN_GAP = data[TOKEN_GAP]) != null ? _data$TOKEN_GAP : false,
            hasHeight = (_ref3 = (_data$TOKEN_HEIGHT$2 = data[TOKEN_HEIGHT[0]]) != null ? _data$TOKEN_HEIGHT$2 : data[TOKEN_HEIGHT]) != null ? _ref3 : 0,
            hasMark = (_data$TOKEN_MARK = data[TOKEN_MARK]) != null ? _data$TOKEN_MARK : false,
            hasWidth = (_ref4 = (_data$TOKEN_WIDTH$2 = data[TOKEN_WIDTH[0]]) != null ? _data$TOKEN_WIDTH$2 : data[TOKEN_WIDTH]) != null ? _ref4 : 0,
            isActive = !hasState(data, TOKEN_ACTIVE) || data[TOKEN_ACTIVE],
            isCurrent = (_data$TOKEN_CURRENT = data[TOKEN_CURRENT]) != null ? _data$TOKEN_CURRENT : false,
            isFix = (_data$TOKEN_FIX = data[TOKEN_FIX]) != null ? _data$TOKEN_FIX : false,
            isFlex = (_data$TOKEN_FLEX = data[TOKEN_FLEX]) != null ? _data$TOKEN_FLEX : false,
            isVital = (_data$TOKEN_VITAL = data[TOKEN_VITAL]) != null ? _data$TOKEN_VITAL : false;
        hasGap && (tags[TOKEN_HAS + '-' + TOKEN_GAP] = hasGap);
        if (hasHeight) {
            tags[TOKEN_HAS + '-' + TOKEN_HEIGHT] = true;
            if (isArray(hasHeight)) {
                var _hasHeight$, _hasHeight$2, _hasHeight$3;
                hasHeight[0] = (_hasHeight$ = hasHeight[0]) != null ? _hasHeight$ : '0%';
                hasHeight[1] = (_hasHeight$2 = hasHeight[1]) != null ? _hasHeight$2 : 0;
                hasHeight[2] = (_hasHeight$3 = hasHeight[2]) != null ? _hasHeight$3 : '100%';
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
                var _hasWidth$, _hasWidth$2, _hasWidth$3;
                hasWidth[0] = (_hasWidth$ = hasWidth[0]) != null ? _hasWidth$ : '0%';
                hasWidth[1] = (_hasWidth$2 = hasWidth[1]) != null ? _hasWidth$2 : 0;
                hasWidth[2] = (_hasWidth$3 = hasWidth[2]) != null ? _hasWidth$3 : '100%';
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
        data[2][TOKEN_DATA][TOKEN_KEY] = (_data$TOKEN_KEY = data[TOKEN_KEY]) != null ? _data$TOKEN_KEY : null;
        data[2][TOKEN_DATA][TOKEN_STACK] = (_data$TOKEN_STACK = data[TOKEN_STACK]) != null ? _data$TOKEN_STACK : null;
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
        forEachArray(['chunk', 'count', 'deep', 'part', 'sort'], function (key) {
            if (data[key] && hasState(data[2][TOKEN_DATA], key)) {
                data[2][TOKEN_DATA][key] = toJSON(data[key]);
            }
        });
        forEachArray([TOKEN_ARE, TOKEN_AS, TOKEN_CAN, TOKEN_HAS, TOKEN_IS, TOKEN_NOT, TOKEN_OF, TOKEN_WITH], function (key) {
            if (isArray(data[key])) {
                forEachArray(data[key], function (k) {
                    tags[key + '-' + k] = true;
                });
            } else if (isObject(data[key])) {
                forEachObject(data[key], function (v, k) {
                    k && v && (tags[key + '-' + k] = v);
                });
            }
        });
        data.tags = tags;
        data.tones = tones;
        if (hasState(data, TOKEN_CONTENT)) {
            data[1] = toJSON(data[TOKEN_CONTENT]);
        } else if (hasState(data, [TOKEN_LOT]) && isArray(data[TOKEN_LOT]));
        info(data);
        return setElement((_data$ = data[0]) != null ? _data$ : 'div', (_data$2 = data[1]) != null ? _data$2 : "", data[2] || {}, state);
    }
    // test
    dataToNode({
        content: ""
    });
    var observed$5 = new WeakMap();
    var observer$5 = new MutationObserver(function (list, self) {
        forEachArray(list, function (v) {
            var attributeName = v.attributeName,
                target = v.target,
                type = v.type;
            if (TOKEN_ATTRIBUTES === type) {
                if (TOKEN_CLASS === attributeName) {
                    target[TOKEN_DISABLED] = hasClass(target, TOKEN_CLASS_NOT_ACTIVE);
                } else if (TOKEN_DISABLED === attributeName) {
                    toggleClass(target, TOKEN_CLASS_NOT_ACTIVE, target.disabled);
                }
                return 1;
            }
            if (TOKEN_CHILD_LIST === type) {
                var arrow = getElement(TOKEN_SELECTOR_SCOPE + '.' + TOKEN_CLASS_BUTTON_ARROW, target),
                    icon = getElement(TOKEN_SELECTOR_SCOPE + '.' + TOKEN_CLASS_BUTTON_ICON, target),
                    title = getElement(TOKEN_SELECTOR_SCOPE + '.' + TOKEN_CLASS_BUTTON_TITLE, target);
                arrow && setClass(arrow, TOKEN_CLASS_ARROW);
                icon && setClass(icon, TOKEN_CLASS_ICON);
                title && setClass(title, TOKEN_CLASS_TITLE);
                toggleClass(target, TOKEN_CLASS_HAS_ARROW, !!arrow);
                toggleClass(target, TOKEN_CLASS_HAS_ICON, !!icon);
                toggleClass(target, TOKEN_CLASS_HAS_TITLE, !!title);
                return 1;
            }
        });
        // console.log(list);
    });

    function Button(watch, nodes) {
        nodes = nodes || getElements('.' + TOKEN_CLASS_BUTTON);
        if (!toCount(nodes)) {
            return;
        }
        forEachArray(nodes, function (node) {
            if (TOKEN_BUTTON === getName(node) || TOKEN_INPUT === getName(node) && hasValue(node.type, [TOKEN_BUTTON, 'image', 'reset', 'submit'])) {
                if (node.disabled && !hasClass(node, TOKEN_CLASS_NOT_ACTIVE)) {
                    warn('Missing `' + TOKEN_CLASS_NOT_ACTIVE + '` class at ', node);
                } else if (hasClass(node, TOKEN_CLASS_NOT_ACTIVE) && !node.disabled) {
                    warn('Missing `' + TOKEN_DISABLED + '` attribute at ', node);
                }
            } else {
                warn('Missing `role="' + TOKEN_BUTTON + '"` attribute at ', node);
            }
            if (!getValueInMap(node, observed$5)) {
                observer$5.observe(node, {
                    attributes: true,
                    childList: true
                });
                setValueInMap(node, 1, observed$5);
            }
        });
        return nodes;
    }
    var observed$4 = new WeakMap();
    var observer$4 = new MutationObserver(function (list, self) {
        forEachArray(list, function (v) {
            var addedNodes = v.addedNodes,
                attributeName = v.attributeName,
                target = v.target,
                type = v.type;
            if (TOKEN_ATTRIBUTES === type) {
                if (TOKEN_CLASS === attributeName) {
                    if (hasClass(target, TOKEN_CLASS_HAS_ITEMS)) {
                        if (!getChildFirst(target)) {
                            warn('Missing child nodes in ', target);
                            return 1;
                        }
                        var children = getChildren(target).filter(function (v) {
                            return isElement(v) && (hasClass(v, TOKEN_CLASS_BUTTON) || hasClass(v, TOKEN_CLASS_ENTRY));
                        });
                        if (!toCount(children)) {
                            warn('Child nodes can only be `.' + TOKEN_CLASS_BUTTON + '` and/or `.' + TOKEN_CLASS_ENTRY + '` in ', target);
                            return 1;
                        }
                    }
                    if (hasClass(target, TOKEN_CLASS_NOT_ACTIVE)) {
                        setAria(target, TOKEN_DISABLED, true);
                        forEachArray(getChildren(target), function (v) {
                            setClass(v, TOKEN_CLASS_NOT_ACTIVE);
                        });
                    } else {
                        letAria(target, TOKEN_DISABLED);
                        forEachArray(getChildren(target), function (v) {
                            letClass(v, TOKEN_CLASS_NOT_ACTIVE);
                        });
                    }
                } else if (TOKEN_ARIA_DISABLED === attributeName) {
                    toggleClass(target, TOKEN_CLASS_NOT_ACTIVE, getAria(target, TOKEN_DISABLED));
                }
                return 1;
            }
            if (TOKEN_CHILD_LIST === type) {
                forEachArray(addedNodes, function (node) {
                    if (!isElement(node) || !hasClass(node, TOKEN_CLASS_BUTTON) && !hasClass(node, TOKEN_CLASS_ENTRY)) {
                        warn('Invalid node ', node, ' has been inserted to ', target);
                    }
                });
                var hasItems = toCount(getChildren(target).filter(function (v) {
                    return isElement(v) && (hasClass(v, TOKEN_CLASS_BUTTON) || hasClass(v, TOKEN_CLASS_ENTRY));
                })) > 0;
                target.hidden = !hasItems;
                toggleClass(target, TOKEN_CLASS_HAS_ITEMS, hasItems);
                return 1;
            }
        });
        // console.log(list);
    });

    function ButtonSet(watch, nodes) {
        nodes = nodes || getElements('.' + TOKEN_CLASS_BUTTON_SET);
        if (!toCount(nodes)) {
            return;
        }
        forEachArray(nodes, function (node) {
            if (TOKEN_ROLE_GROUP !== getRole(node)) {
                warn('Missing `role="' + TOKEN_ROLE_GROUP + '"` attribute at ', node);
            }
            if (!getValueInMap(node, observed$4)) {
                observer$4.observe(node, {
                    attributes: true,
                    childList: true
                });
                setValueInMap(node, 1, observed$4);
            }
        });
    }
    var observed$3 = new WeakMap();
    var observer$3 = new MutationObserver(function (list, self) {
        forEachArray(list, function (v) {
            var addedNodes = v.addedNodes,
                attributeName = v.attributeName,
                target = v.target,
                type = v.type;
            if (TOKEN_ATTRIBUTES === type) {
                if (TOKEN_CLASS === attributeName) {
                    if (hasClass(target, TOKEN_CLASS_HAS_ITEMS)) {
                        if (!getChildFirst(target)) {
                            warn('Missing child nodes in ', target);
                            return 1;
                        }
                        var children = getChildren(target).filter(function (v) {
                            return isElement(v) && (hasClass(v, TOKEN_CLASS_BUTTON) || hasClass(v, TOKEN_CLASS_BUTTON_SET) || hasClass(v, TOKEN_CLASS_ENTRY) || hasClass(v, TOKEN_CLASS_ENTRY_SET));
                        });
                        if (!toCount(children)) {
                            warn('Child nodes can only be `.' + TOKEN_CLASS_BUTTON + '`, `.' + TOKEN_CLASS_BUTTON_SET + '`, `.' + TOKEN_CLASS_ENTRY + '`, and/or `.' + TOKEN_CLASS_ENTRY_SET + '` in ', target);
                            return 1;
                        }
                    }
                    if (hasClass(target, TOKEN_CLASS_NOT_ACTIVE)) {
                        setAria(target, TOKEN_DISABLED, true);
                        forEachArray(getChildren(target), function (v) {
                            setClass(v, TOKEN_CLASS_NOT_ACTIVE);
                        });
                    } else {
                        letAria(target, TOKEN_DISABLED);
                        forEachArray(getChildren(target), function (v) {
                            letClass(v, TOKEN_CLASS_NOT_ACTIVE);
                        });
                    }
                } else if (TOKEN_ARIA_DISABLED === attributeName) {
                    toggleClass(target, TOKEN_CLASS_NOT_ACTIVE, getAria(target, TOKEN_DISABLED));
                }
                return 1;
            }
            if (TOKEN_CHILD_LIST === type) {
                forEachArray(addedNodes, function (node) {
                    if (!isElement(node) || !hasClass(node, TOKEN_CLASS_BUTTON) && !hasClass(node, TOKEN_CLASS_BUTTON_SET) && !hasClass(node, TOKEN_CLASS_ENTRY) && !hasClass(node, TOKEN_CLASS_ENTRY_SET)) {
                        warn('Invalid node ', node, ' has been inserted to ', target);
                    }
                });
                var hasItems = toCount(getChildren(target).filter(function (v) {
                    return isElement(v) && (hasClass(v, TOKEN_CLASS_BUTTON) || hasClass(v, TOKEN_CLASS_BUTTON_SET) || hasClass(v, TOKEN_CLASS_ENTRY) || hasClass(v, TOKEN_CLASS_ENTRY_SET));
                })) > 0;
                target[TOKEN_HIDDEN] = !hasItems;
                toggleClass(target, TOKEN_CLASS_HAS_ITEMS, hasItems);
                return 1;
            }
        });
        // console.log(list);
    });

    function Buttons(watch, nodes) {
        nodes = nodes || getElements('.' + TOKEN_CLASS_BUTTONS);
        if (!toCount(nodes)) {
            return;
        }
        forEachArray(nodes, function (node) {
            if (TOKEN_ROLE_GROUP !== getRole(node)) {
                warn('Missing `role="' + TOKEN_ROLE_GROUP + '"` attribute at ', node);
            }
            if (!getValueInMap(node, observed$3)) {
                observer$3.observe(node, {
                    attributes: true,
                    childList: true
                });
                setValueInMap(node, 1, observed$3);
            }
        });
    }
    var observed$2 = new WeakMap();
    var observer$2 = new MutationObserver(function (list, self) {
        forEachArray(list, function (v) {
            var attributeName = v.attributeName,
                target = v.target,
                type = v.type;
            if (TOKEN_ATTRIBUTES === type) {
                if (TOKEN_CLASS === attributeName) {
                    if (hasClass(target, TOKEN_CLASS_NOT_ACTIVE)) {
                        setAria(target, TOKEN_DISABLED, true);
                    } else {
                        letAria(target, TOKEN_DISABLED);
                    }
                } else if (TOKEN_ARIA_DISABLED === attributeName) {
                    toggleClass(target, TOKEN_CLASS_NOT_ACTIVE, getAria(target, TOKEN_DISABLED));
                }
                return 1;
            }
            if (TOKEN_CHILD_LIST === type) {
                var arrow = getElement(TOKEN_SELECTOR_SCOPE + '.' + TOKEN_CLASS_LINK_ARROW, target),
                    icon = getElement(TOKEN_SELECTOR_SCOPE + '.' + TOKEN_CLASS_LINK_ICON, target),
                    title = getElement(TOKEN_SELECTOR_SCOPE + '.' + TOKEN_CLASS_LINK_TITLE, target);
                arrow && setClass(arrow, TOKEN_CLASS_ARROW);
                icon && setClass(icon, TOKEN_CLASS_ICON);
                title && setClass(title, TOKEN_CLASS_TITLE);
                toggleClass(target, TOKEN_CLASS_HAS_ARROW, !!arrow);
                toggleClass(target, TOKEN_CLASS_HAS_ICON, !!icon);
                toggleClass(target, TOKEN_CLASS_HAS_TITLE, !!title);
                return 1;
            }
        });
        // console.log(list);
    });

    function Link(watch, nodes) {
        nodes = nodes || getElements('.' + TOKEN_CLASS_LINK);
        if (!toCount(nodes)) {
            return;
        }
        forEachArray(nodes, function (node) {
            if ('a' === getName(node)) {
                if (getAria(node, TOKEN_DISABLED) && !hasClass(node, TOKEN_CLASS_NOT_ACTIVE)) {
                    warn('Missing `' + TOKEN_CLASS_NOT_ACTIVE + '` class at ', node);
                } else if (hasClass(node, TOKEN_CLASS_NOT_ACTIVE) && !getAria(node, TOKEN_DISABLED)) {
                    warn('Missing `' + TOKEN_ARIA_DISABLED + '` attribute at ', node);
                }
            } else {
                warn('Missing `role="' + TOKEN_ROLE_LINK + '"` attribute at ', node);
            }
            if (!getValueInMap(node, observed$2)) {
                observer$2.observe(node, {
                    attributes: true,
                    childList: true
                });
                setValueInMap(node, 1, observed$2);
            }
        });
        return nodes;
    }
    var observed$1 = new WeakMap();
    var observer$1 = new MutationObserver(function (list, self) {
        forEachArray(list, function (v) {
            var addedNodes = v.addedNodes,
                attributeName = v.attributeName,
                target = v.target,
                type = v.type;
            if (TOKEN_ATTRIBUTES === type) {
                if (TOKEN_CLASS === attributeName) {
                    if (hasClass(target, TOKEN_CLASS_HAS_ITEMS)) {
                        if (!getChildFirst(target)) {
                            warn('Missing child nodes in ', target);
                            return 1;
                        }
                        var children = getChildren(target).filter(function (v) {
                            return isElement(v) && hasClass(v, TOKEN_CLASS_LINK);
                        });
                        if (!toCount(children)) {
                            warn('Child nodes can only be `.' + TOKEN_CLASS_LINK + '` in ', target);
                            return 1;
                        }
                    }
                    if (hasClass(target, TOKEN_CLASS_NOT_ACTIVE)) {
                        setAria(target, TOKEN_DISABLED, true);
                        forEachArray(getChildren(target), function (v) {
                            setClass(v, TOKEN_CLASS_NOT_ACTIVE);
                        });
                    } else {
                        letAria(target, TOKEN_DISABLED);
                        forEachArray(getChildren(target), function (v) {
                            letClass(v, TOKEN_CLASS_NOT_ACTIVE);
                        });
                    }
                } else if (TOKEN_ARIA_DISABLED === attributeName) {
                    toggleClass(target, TOKEN_CLASS_NOT_ACTIVE, getAria(target, TOKEN_DISABLED));
                }
                return 1;
            }
            if (TOKEN_CHILD_LIST === type) {
                forEachArray(addedNodes, function (node) {
                    if (!isElement(node) || !hasClass(node, TOKEN_CLASS_LINK)) {
                        warn('Invalid node ', node, ' has been inserted to ', target);
                    }
                });
                var hasItems = toCount(getChildren(target).filter(function (v) {
                    return isElement(v) && hasClass(v, TOKEN_CLASS_LINK);
                })) > 0;
                target.hidden = !hasItems;
                toggleClass(target, TOKEN_CLASS_HAS_ITEMS, hasItems);
                return 1;
            }
        });
        // console.log(list);
    });

    function LinkSet(watch, nodes) {
        nodes = nodes || getElements('.' + TOKEN_CLASS_LINK_SET);
        if (!toCount(nodes)) {
            return;
        }
        forEachArray(nodes, function (node) {
            if (TOKEN_ROLE_GROUP !== getRole(node)) {
                warn('Missing `role="' + TOKEN_ROLE_GROUP + '"` attribute at ', node);
            }
            if (!getValueInMap(node, observed$1)) {
                observer$1.observe(node, {
                    attributes: true,
                    childList: true
                });
                setValueInMap(node, 1, observed$1);
            }
        });
    }
    var observed = new WeakMap();
    var observer = new MutationObserver(function (list, self) {
        forEachArray(list, function (v) {
            var addedNodes = v.addedNodes,
                attributeName = v.attributeName,
                target = v.target,
                type = v.type;
            if (TOKEN_ATTRIBUTES === type) {
                if (TOKEN_CLASS === attributeName) {
                    if (hasClass(target, TOKEN_CLASS_HAS_ITEMS)) {
                        if (!getChildFirst(target)) {
                            warn('Missing child nodes in ', target);
                            return 1;
                        }
                        var children = getChildren(target).filter(function (v) {
                            return isElement(v) && (hasClass(v, TOKEN_CLASS_LINK) || hasClass(v, TOKEN_CLASS_LINK_SET));
                        });
                        if (!toCount(children)) {
                            warn('Child nodes can only be `.' + TOKEN_CLASS_LINK + '` and/or `.' + TOKEN_CLASS_LINK_SET + '` in ', target);
                            return 1;
                        }
                    }
                    if (hasClass(target, TOKEN_CLASS_NOT_ACTIVE)) {
                        setAria(target, TOKEN_DISABLED, true);
                        forEachArray(getChildren(target), function (v) {
                            setClass(v, TOKEN_CLASS_NOT_ACTIVE);
                        });
                    } else {
                        letAria(target, TOKEN_DISABLED);
                        forEachArray(getChildren(target), function (v) {
                            letClass(v, TOKEN_CLASS_NOT_ACTIVE);
                        });
                    }
                } else if (TOKEN_ARIA_DISABLED === attributeName) {
                    toggleClass(target, TOKEN_CLASS_NOT_ACTIVE, getAria(target, TOKEN_DISABLED));
                }
                return 1;
            }
            if (TOKEN_CHILD_LIST === type) {
                forEachArray(addedNodes, function (node) {
                    if (!isElement(node) || !hasClass(node, TOKEN_CLASS_LINK) && !hasClass(node, TOKEN_CLASS_LINK_SET)) {
                        warn('Invalid node ', node, ' has been inserted to ', target);
                    }
                });
                var hasItems = toCount(getChildren(target).filter(function (v) {
                    return isElement(v) && (hasClass(v, TOKEN_CLASS_LINK) || hasClass(v, TOKEN_CLASS_LINK_SET));
                })) > 0;
                target[TOKEN_HIDDEN] = !hasItems;
                toggleClass(target, TOKEN_CLASS_HAS_ITEMS, hasItems);
                return 1;
            }
        });
        // console.log(list);
    });

    function Links(watch, nodes) {
        nodes = nodes || getElements('.' + TOKEN_CLASS_LINKS);
        if (!toCount(nodes)) {
            return;
        }
        forEachArray(nodes, function (node) {
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

    function _toArray(iterable) {
        return Array.from(iterable);
    }
    var clearTimeout = W.clearTimeout,
        setTimeout = W.setTimeout; // For better minification
    var debounce = function debounce(task, time) {
        var stickyTime = isInteger(time) && time >= 0,
            timer;
        return [function () {
            var _this = this;
            timer && clearTimeout(timer);
            var lot = _toArray(arguments);
            if (!stickyTime) {
                time = lot.shift();
            }
            timer = setTimeout(function () {
                return task.apply(_this, lot);
            }, time);
        }, function () {
            timer = clearTimeout(timer);
        }];
    };
    var offEvent = function offEvent(name, node, then) {
        node.removeEventListener(name, then);
    };
    var offEventDefault = function offEventDefault(e) {
        return e && e.preventDefault();
    };
    var onEvent = function onEvent(name, node, then, options) {
        if (options === void 0) {
            options = false;
        }
        node.addEventListener(name, then, options);
    };
    var _debounce = debounce(function (link, item) {
            closeMenuChildren(link);
            letClass(item, 'is-open');
            letClass(link, 'is-active');
            link.blur();
            setAria(link, 'expanded', false);
        }),
        _debounce2 = _maybeArrayLike(_slicedToArray, _debounce, 2),
        lazyCloseMenuChildren = _debounce2[0],
        lazyCloseMenuChildrenCancel = _debounce2[1];
    var _debounce3 = debounce(function (link, item) {
            closeMenuAll(link);
            onEvent('mouseleave', item, onMouseLeaveMenuItem);
            setAria(link, 'expanded', true);
            setClass(item, 'is-open');
            setClass(link, 'is-active');
        }),
        _debounce4 = _maybeArrayLike(_slicedToArray, _debounce3, 2),
        lazyOpenMenu = _debounce4[0],
        lazyOpenMenuCancel = _debounce4[1];

    function closeMenuAll(except) {
        var opens = getElements(':where(.menu-arrow,.menu-link)[aria-expanded=true]');
        toCount(opens) && forEachArray(opens, function (v) {
            var current = except,
                skip = 0;
            while (current && B !== current) {
                if (v === current) {
                    skip = 1;
                    break;
                }
                if (hasClass(current, 'menu')) {
                    var parent = getParent(current, '.menu-item'),
                        a = parent && getElement(':scope>:where(.menu-arrow,.menu-link)', parent);
                    if (a && getAria(a, 'expanded')) {
                        if (v === a) {
                            skip = 1;
                            break;
                        }
                    }
                }
                current = getParent(current);
            }
            if (!skip) {
                letClass(getParent(letClass(v, 'is-active'), '.menu-item'), 'is-open');
                setAria(v, 'expanded', false);
                v.blur();
            }
        });
    }

    function closeMenuChildren(of) {
        var opens = getElements(':scope :where(.menu-arrow,.menu-link)[aria-expanded=true]', of);
        toCount(opens) && forEachArray(opens, function (v) {
            letClass(getParent(letClass(v, 'is-active'), '.menu-item'), 'is-open');
            setAria(v, 'expanded', false);
            v.blur();
        });
    }

    function onMouseLeaveMenuItem() {
        var item = this,
            link = getElement(':scope>:where(.menu-arrow,.menu-link)', item);
        offEvent('mouseleave', item, onMouseLeaveMenuItem);
        if (link) {
            lazyCloseMenuChildren(300, link, item);
        }
    }

    function onMouseLeaveMenuItemToCancel() {
        lazyCloseMenuChildrenCancel();
        lazyOpenMenuCancel();
        offEvent('mouseleave', this, onMouseLeaveMenuItemToCancel);
    }

    function Menu() {
        onEvent('click', D, function (e) {
            var target = e.target,
                arrow = getParent(target, '.menu-arrow');
            if (!arrow) {
                return closeMenuAll();
            }
            var item = getParent(arrow, '.menu-item');
            if (!item) {
                return;
            }
            var menu = getElement(':scope>.menu', item);
            if (!menu) {
                return;
            }
            var wasOpen = getAria(arrow, 'expanded');
            closeMenuAll(arrow);
            offEventDefault(e);
            setAria(arrow, 'expanded', !wasOpen);
            wasOpen ? letClass(arrow, 'is-active') : setClass(arrow, 'is-active');
            wasOpen ? letClass(item, 'is-open') : setClass(item, 'is-open');
        }, true);
        onEvent('mouseenter', D, function (e) {
            var target = e.target,
                link = getParent(target, '.menu-link');
            if (!link) {
                return;
            }
            var item = getParent(link, '.menu-item');
            if (!getElement(':scope>.menu', item) || getElement(':scope>.menu-arrow', item)) {
                return;
            }
            onEvent('mouseleave', item, onMouseLeaveMenuItemToCancel);
            lazyOpenMenu(300, link, item);
            !hasAria(link, 'expanded') && setAria(link, 'expanded', false);
            !hasAria(link, 'haspopup') && setAria(link, 'haspopup', 'menu');
        }, true);
    }
    var panel = {};
    Button();
    ButtonSet();
    Buttons();
    Link();
    LinkSet();
    Links();
    Menu();
    return panel;
})();