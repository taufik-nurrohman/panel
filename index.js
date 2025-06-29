(function () {
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
        } {
            return isSet(of) && isSet(x.constructor) && of === x.constructor;
        }
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
        return isPlain ? isInstance(x, Object) : true;
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
    var toCaseLower = function toCaseLower(x) {
        return x.toLowerCase();
    };
    var toCount = function toCount(x) {
        return x.length;
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
    var hasAria = function hasAria(node, aria) {
        return hasAttribute(node, 'aria-' + aria);
    };
    var hasAttribute = function hasAttribute(node, attribute) {
        return node.hasAttribute(attribute);
    };
    var hasClass = function hasClass(node, value) {
        return node.classList.contains(value);
    };
    var letClass = function letClass(node, value) {
        return node.classList.remove(value), node;
    };
    var setAria = function setAria(node, aria, value) {
        return setAttribute(node, 'aria-' + aria, true === value ? 'true' : value);
    };
    var setAttribute = function setAttribute(node, attribute, value) {
        if (true === value) {
            value = attribute;
        }
        return node.setAttribute(attribute, _fromValue(value)), node;
    };
    var setClass = function setClass(node, value) {
        return node.classList.add(value), node;
    };
    var toggleClass = function toggleClass(node, name, force) {
        return node.classList.toggle(name, force), node;
    };
    var warn$1 = W.console.warn;
    var observed$1 = new WeakMap();
    var observer$1 = new MutationObserver(function (list, self) {
        forEachArray(list, function (v) {
            var attributeName = v.attributeName,
                target = v.target,
                type = v.type;
            if ('attributes' === type) {
                if ('class' === attributeName) {
                    target.disabled = hasClass(target, 'not-active');
                } else if ('disabled' === attributeName) {
                    toggleClass(target, 'not-active', target.disabled);
                }
                return 1;
            }
            if ('childList' === type) {
                var arrow = getElement(':scope>.button-arrow', target),
                    icon = getElement(':scope>.button-icon', target),
                    title = getElement(':scope>.button-title', target);
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

    function Button(watch, nodes) {
        nodes = nodes || getElements('.button');
        if (!toCount(nodes)) {
            return;
        }
        forEachArray(nodes, function (node) {
            if ('button' === getName(node) || 'input' === getName(node) && hasValue(node.type, ['button', 'image', 'reset', 'submit'])) {
                if (node.disabled && !hasClass(node, 'not-active')) {
                    warn$1('Missing `not-active` class at ', node);
                } else if (hasClass(node, 'not-active') && !node.disabled) {
                    warn$1('Missing `disabled` attribute at ', node);
                }
            } else {
                warn$1('Missing `role="button"` attribute at ', node);
            }
            if (!getValueInMap(node, observed$1)) {
                observer$1.observe(node, {
                    attributes: true,
                    childList: true,
                    subtree: true
                });
                setValueInMap(node, 1, observed$1);
            }
        });
        return nodes;
    }

    function ButtonSet() {
        var elements = getElements('.button-set');
        toCount(elements) && forEachArray(elements, function (element) {
            if ('group' !== getRole(element)) {
                console.warn(['Missing `role="group"` attribute', element]);
            }
        });
    }

    function Buttons() {
        var elements = getElements('.buttons');
        toCount(elements) && forEachArray(elements, function (element) {
            if ('group' !== getRole(element)) {
                console.warn(['Missing `role="group"` attribute', element]);
            }
        });
    }
    var warn = W.console.warn;
    var observed = new WeakMap();
    var observer = new MutationObserver(function (list, self) {
        forEachArray(list, function (v) {
            var attributeName = v.attributeName,
                target = v.target,
                type = v.type;
            if ('attributes' === type) {
                if ('class' === attributeName) {
                    target.disabled = hasClass(target, 'not-active');
                } else if ('aria-disabled' === attributeName) {
                    toggleClass(target, 'not-active', target.disabled);
                }
                return 1;
            }
            if ('childList' === type) {
                var arrow = getElement(':scope>.link-arrow', target),
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

    function Link(watch, nodes) {
        nodes = nodes || getElements('.link');
        if (!toCount(nodes)) {
            return;
        }
        forEachArray(nodes, function (node) {
            if ('a' === getName(node)) {
                if (getAria(node, 'disabled') && !hasClass(node, 'not-active')) {
                    warn('Missing `not-active` class at ', node);
                } else if (hasClass(node, 'not-active') && !getAria(node, 'disabled')) {
                    warn('Missing `aria-disabled` attribute at ', node);
                }
            } else {
                warn('Missing `role="link"` attribute at ', node);
            }
            if (!getValueInMap(node, observed)) {
                observer.observe(node, {
                    attributes: true,
                    childList: true,
                    subtree: true
                });
                setValueInMap(node, 1, observed);
            }
        });
        return nodes;
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
    Button();
    ButtonSet();
    Buttons();
    Link();
    Menu();
})();