import {watchButtonSet} from './_button-set.mjs';
import {watchButtons} from './_buttons.mjs';
import {watchButton} from './_button.mjs';
import {watchLinkSet} from './_link-set.mjs';
import {watchLinks} from './_links.mjs';
import {watchLink} from './_link.mjs';
import {watchMenu} from './_menu.mjs';

const panel = {};

watchButton();
watchButtonSet();
watchButtons();
watchLink();
watchLinkSet();
watchLinks();
watchMenu();

export default panel;