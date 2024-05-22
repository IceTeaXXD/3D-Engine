import { Texture, Color, ShaderMaterial } from "./index.js"
import { Vector3 } from "../math/index.js"
import phongFrag from "./shaders/phong.frag.js"
import phongVert from "./shaders/phong.vert.js"

export class PhongMaterial extends ShaderMaterial {
  /**
   * Creates an instance of PhongMaterial.
   * @param {{name: string, ambient: Color, diffuse: Color, specular: Color, shininess: number, lightPosition: Vector3, useDiffuseTexture, diffuseTexture, useSpecularTexture, specularTexture }} options
   * @memberof PhongMaterial
   */
  constructor(options = {}) {
    const { name, ambient, diffuse, specular, shininess, lightPosition, useDiffuseTexture, diffuseTexture, useSpecularTexture, specularTexture } = options
    super({
      name,
      vertexShader: phongVert,
      fragmentShader: phongFrag,
      uniforms: {
        ambient: ambient || Color.white(),
        diffuse: diffuse || Color.white(),
        specular: specular || Color.white(),
        shininess: shininess || 30,
        lightPosition: lightPosition || new Vector3(20,100, 300),
        useDiffuseTexture: useDiffuseTexture || false,
        diffuseTexture: diffuseTexture || {},
        useSpecularTexture: useSpecularTexture || false,
        specularTexture: specularTexture || {},
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

  /** @type {Vector3} */
  get lightPosition() {
    return this.uniforms["lightPosition"]
  }

  set lightPosition(val) {
    this.uniforms["lightPosition"] = val
  }

  get type() {
    return "PhongMaterial"
  }

  toJSON() {
    const { vertexShader, fragmentShader, ...other } = super.toJSON()
    return {
      ...other,
      type: this.type
    }
  }

  static fromJSON(json) {
    const obj = new PhongMaterial(json)
    ShaderMaterial.fromJSON(json, obj)
    return obj
  }
}
