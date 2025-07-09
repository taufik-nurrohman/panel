import {D} from '@taufik-nurrohman/document';
import {fromStates} from '@taufik-nurrohman/from';
import {getReference, setObjectAttributes, setObjectMethods, setReference} from '@taufik-nurrohman/f';
import {hook} from '@taufik-nurrohman/hook';
import {isInstance} from '@taufik-nurrohman/is';

import {watchButtonSet} from './_button-set.mjs';
import {watchButtons} from './_buttons.mjs';
import {watchButton} from './_button.mjs';
import {watchLinkSet} from './_link-set.mjs';
import {watchLinks} from './_links.mjs';
import {watchLink} from './_link.mjs';
import {watchMenu} from './_menu.mjs';

function Panel(self, state) {
    const $ = this;
    if (!self) {
        return $;
    }
    // Return new instance if `Panel` was called without the `new` operator
    if (!isInstance($, Panel)) {
        return new Panel(self, state);
    }
    setReference(self, hook($, Panel._));
    return $.attach(self, fromStates({}, Panel.state, state || {}));
}

function PanelAlert(of) {
    const $ = this;
    // Return new instance if `PanelAlert` was called without the `new` operator
    if (!isInstance($, PanelAlert)) {
        return new PanelAlert(of);
    }
    $.of = of;
    return $;
}

function PanelAsset(of) {
    const $ = this;
    // Return new instance if `PanelAsset` was called without the `new` operator
    if (!isInstance($, PanelAsset)) {
        return new PanelAsset(of);
    }
    $.of = of;
    return $;
}

function PanelIcon(of) {
    const $ = this;
    // Return new instance if `PanelIcon` was called without the `new` operator
    if (!isInstance($, PanelIcon)) {
        return new PanelIcon(of);
    }
    $.of = of;
    return $;
}

function PanelLayout(of) {
    const $ = this;
    // Return new instance if `PanelLayout` was called without the `new` operator
    if (!isInstance($, PanelLayout)) {
        return new PanelLayout(of);
    }
    $.of = of;
    return $;
}

function PanelType(panel) {
    const $ = this;
    // Return new instance if `PanelType` was called without the `new` operator
    if (!isInstance($, PanelType)) {
        return new PanelType(of);
    }
    $.of = of;
    return $;
}

Panel.from = function (self, state) {
    return new Panel(self, state);
};

Panel.of = getReference;

Panel.state = {
    0: null,
    1: "",
    2: {},
    are: {},
    as: {},
    author: null,
    base: null,
    can: {},
    chunk: 20,
    content: null,
    count: 0,
    deep: 0,
    description: null,
    has: {},
    hash: null,
    is: {},
    kick: null,
    lot: {},
    not: {},
    of: {},
    part: 0,
    path: null,
    query: null,
    sort: [1, 'path'],
    status: 404,
    task: null,
    title: null,
    token: null,
    with: {},
    x: null
};

Panel.version = '%(version)';

setObjectAttributes(Panel, {
    name: {
        value: 'Panel'
    }
}, 1);

setObjectAttributes(Panel, {
    alert: {
        get: function () {
            return new PanelAlert(this);
        },
        set: function () {}
    },
    asset: {
        get: function () {
            return new PanelAsset(this);
        },
        set: function () {}
    },
    icon: {
        get: function () {
            return new PanelIcon(this);
        },
        set: function () {}
    },
    layout: {
        get: function () {
            return new PanelLayout(this);
        },
        set: function () {}
    },
    type: {
        get: function () {
            return new PanelType(this);
        },
        set: function () {}
    },
});

Panel._ = setObjectMethods(Panel, {
    attach: function () {},
    detach: function () {}
});

const panel = new Panel(D.body);

watchButton();
watchButtonSet();
watchButtons();
watchLink();
watchLinkSet();
watchLinks();
watchMenu();

export default panel;