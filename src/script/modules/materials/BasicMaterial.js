import { Color, ShaderMaterial } from "./index.js"
import basicVert from "./shaders/basic.vert.js"
import basicFrag from "./shaders/basic.frag.js"

export class BasicMaterial extends ShaderMaterial {
  /** @type {Color} */
  #color

  constructor(options) {
    const { color } = options || {}
    super({
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
    ShaderMaterial.fromJSON(json, obj)
    return obj
  }
}
