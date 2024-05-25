import { Color } from "../materials/index.js"
import { Node } from "../core/Node.js"
import { Vector3 } from "../math/index.js"

export class Light extends Node {
    /** @type {{[key: string]: any}} Uniforms */
    #uniforms
    get uniforms() {
        return this.#uniforms
    }

    /** @type {Color} Uniforms */
    #color
    get color(){
        return this.#color
    }

    constructor(options = {}) {
        super();
        const { color, uniforms, position } = options || {};
        this.#uniforms = uniforms || {};
        this.#color = color || Color.white();
    }
    
    get type() {
        return "Light"
    }
    toJSON() {
        const { uniforms, color, ...other } = super.toJSON()
        return {
          ...other,
          uniforms: this.#uniforms,
          color: this.#color,
        }
      }
    
    static fromJSON(json) {
      const obj = new Light(json)
      Node.fromJSON(json, obj)
      return obj
    }
}
