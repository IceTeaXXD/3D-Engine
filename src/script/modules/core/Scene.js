import { Node } from "./Node.js"

export class Scene extends Node {
  isUpdated = false

  constructor() {
    super()
  }

  add(object) {
    super.add(object)
    this.isUpdated = true
  }

  get type() {
    return "Scene"
  }

  setScene(scene) {
    this.scene = scene
  }

  toJSON() {
    return {
      ...super.toJSON(),
      type: this.type
    }
  }

  static fromJSON(json, obj = null) {
    if (!obj) obj = new Scene()
    super.fromJSON(json, obj)
    return obj
  }
}
