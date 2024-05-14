import { Color } from "./Color.js"
import { ShaderMaterial } from "./ShaderMaterial.js"
import phongFrag from "./shaders/phong.frag.js"
import phongVert from "./shaders/phong.vert.js"

export class PhongMaterial extends ShaderMaterial {
  /**
   * Creates an instance of PhongMaterial.
   * @param {{name: string, ambient: Color, diffuse: Color, specular: Color, shininess: number}} options
   * @memberof PhongMaterial
   */
  constructor(options = {}) {
    const { name, ambient, diffuse, specular, shininess } = options
    super({
      name,
      vertexShader: phongVert,
      fragmentShader: phongFrag,
      uniforms: {
        ambient: ambient || Color.white(),
        diffuse: diffuse || Color.white(),
        specular: specular || Color.white(),
        shininess: shininess || 30
      }
    })
  }

  get id() {
    return "Phong"
  }

  /** @type {Color} */
  get ambient() {
    return this.uniforms["ambient"]
  }

  /** @type {Color} */
  get diffuse() {
    return this.uniforms["diffuse"]
  }

  /** @type {Color} */
  get specular() {
    return this.uniforms["specular"]
  }

  /** @type {number} */
  get shininess() {
    return this.uniforms["shininess"]
  }

  set shininess(val) {
    this.uniforms["shininess"] = val
  }

  get type() {
    return "PhongMaterial"
  }

  toJSON() {
    const { vertexShader, fragmentShader, ...other } = super.toJson()
    return {
      ...other,
      type: this.type
    }
  }

  static fromJSON(json) {
    const obj = new PhongMaterial(json)
    ShaderMaterial.fromJson(json, obj)
    return obj
  }
}
