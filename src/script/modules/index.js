import * as Camera from './camera/index.js';
import * as Core from './core/index.js';
import * as Materials from './materials/index.js';
import * as Math from './math/index.js';
import * as Geometry from './geometry/index.js';

globalThis.TRID = {
    ...Camera,
    ...Core,
    ...Materials,
    ...Math,
    ...Geometry
}

export default globalThis.TRID;