import { Object } from "../core"
import { M4 } from "../math"

export class Camera extends Object {
  projectionMatrix = M4.identity()
  #invWorldMatrix = M4.identity()
  zoom = 1

  get projectionMatrix() {
    this.updateLocalMatrix()
    return this.projectionMatrix.premul(this.#invWorldMatrix)
  }

  get type() {
    return "Camera"
  }

  get isCamera() {
    return true
  }

  updateWorldMatrix() {
    super.updateWorldMatrix()
    this.#invWorldMatrix.invert(this.worldMatrix)
  }
  updateProjectionMatrix() {
    throw new Error("Method not implemented.")
  }
}
