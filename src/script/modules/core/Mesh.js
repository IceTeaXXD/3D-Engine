import { Node } from "./Node.js"
import { BufferGeometry, HollowBoxGeometry } from "../geometry/index.js"
import {
  BasicMaterial,
  PhongMaterial,
  ShaderMaterial
} from "../materials/index.js"
export class Mesh extends Node {
  /** @type {BufferGeometry} */
  geometry
  /** @type {ShaderMaterial|PhongMaterial|BasicMaterial} */
  material

  /**
   * Creates an instance of Model.
   * @param {ShaderMaterial|PhongMaterial|BasicMaterial} material
   * @memberof Model
   */
  constructor(geometry, material) {
    super()
    this.geometry = geometry
    this.material = material
  }

  get type() {
    return "Mesh"
  }

  toJSON() {
    return {
      ...super.toJSON(),
      geometry: this.geometry.toJSON(),
      material: this.material.toJSON(),
      type: this.type
    }
  }

  static fromJSON(json, obj = null) {
    if (!obj) obj = new Mesh()
    super.fromJSON(json, obj)

    // Geometry
    if (json.type == "HollowBoxGeometry") {
      obj.geometry = HollowBoxGeometry.fromJSON(json.geometry)
    }

    return obj
  }
}
