import { Color } from "./Color.js"
import { ShaderMaterial } from "./ShaderMaterial.js"
import basicFrag from "./shaders/basic.frag.js"
import basicVert from "./shaders/basic.vert.js"

export class BasicMaterial extends ShaderMaterial {
  /** @type {Color} */
  #color

  constructor(options) {
    const { name, color } = options || {}
    super({
      name: name,
      vertexShader: basicVert,
      fragmentShader: basicFrag,
      uniforms: {
        color: color || Color.white()
      }
    })
    this.#color = this.uniforms["color"]
  }

  get id() {
    return "Basic"
  }

  get color() {
    return this.#color
  }

  get type() {
    return "BasicMaterial"
  }

  toJSON() {
    const { vertexShader, fragmentShader, ...other } = super.toJSON()
    return {
      ...other,
      type: this.type
    }
  }

  static fromJSON(json) {
    const obj = new BasicMaterial(json)
    ShaderMaterial.fromJson(json, obj)
    return obj
  }
}
