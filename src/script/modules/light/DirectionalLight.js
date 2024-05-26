import { Vector3 } from "../math/index.js";
import { Light } from "./Light.js";
import { Node } from "../core/index.js";

export class DirectionalLight extends Light {
    /**@type {Node} */
    target
    /**@type {boolean} */
    isDirectional
    /**@type {Vector3} */
    #_direction

    constructor (options = {}){
        const { color, isDirectional, target, ...other } = options || {};
        super({
            color,
            uniform: {
                lightIsDirectional: isDirectional || true,
                lightDirection: target || new Vector3(0,0,0),
            }
        })
        this.target = this.uniforms["target"]
        this.#_direction = new Vector3(0,0,0)
        this.isDirectional = this.uniforms["isDirectional"]
    }

    get direction() {
        // direction = target.pos -  this.pos (in world space)
        if (this.target) {
            this.#_direction
                .setVector(this.target.worldPosition)
                .sub(this.worldPosition).normalize();
        } else {
            // Asumsi target = (0,0,0), direction = -this.pos
            this.#_direction
                .setVector(this.worldPosition)
                .mul(-1).normalize();
        }
        return this.#_direction;
    }

    get type(){
        return "DirectionalLight"
    }

    toJSON() {
        const { target, isDirectional, ...other } = super.toJSON()
        return {
          ...other,
          target: this.target,
          isDirectional: this.isDirectional,
        }
      }
    
    static fromJSON(json) {
      const obj = new DirectionalLight(json)
      Light.fromJSON(json, obj)
      return obj
    }
}