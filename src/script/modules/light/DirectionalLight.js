import { Vector3 } from "../math/index.js";
import { Light } from "./Light.js";
import { Node } from "../core/index.js";

export class DirectionalLight extends Light {
    /**@type {Node} */
    target
    #_target = new Vector3(0,0,0)
    /**@type {boolean} */
    isDirectional
    /**@type {Vector3} */
    #_direction

    constructor (options = {}){
        const { color, uniform, target, ...other } = options || {};
        super({
            color,
            uniform,
        })
        this.target = target || this.#_target
        this.isDirectional = true
    }

    get direction() {
        // direction = target.pos -  this.pos (in world space)
        if (this.target) {
            this._direction
                .setVector(this.target.worldPosition)
                .sub(this.worldPosition).normalize();
        } else {
            // Asumsi target = (0,0,0), direction = -this.pos
            this._direction
                .setVector(this.worldPosition)
                .mul(-1).normalize();
        }
        return this._direction;
    }

    get type(){
        return "DirectionalLight"
    }

    get uniforms() {
        return {
            ...super.uniforms,
            lightDirection: this.direction,
            lightIsDirectional: true, // menandakan directional light di shader
        }
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