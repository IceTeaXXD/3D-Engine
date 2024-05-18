import { Node } from "./Node.js"
import { BufferGeometry } from "../geometry/BufferGeometry.js"
import { BasicMaterial } from "../materials/BasicMaterial.js"
import { PhongMaterial } from "../materials/PhongMaterial.js"
import { ShaderMaterial } from "../materials/ShaderMaterial.js"

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

  static fromJson(json, obj = null) {
    if (!obj) obj = new Mesh()
    super.fromJson(json, obj)
    return obj
  }
}
