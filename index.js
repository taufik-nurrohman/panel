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
    var getParent = function getParent(node, query) {
        if (query) {
            return node.closest(query) || null;
        }
        return node.parentNode || null;
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
    Menu();
})();