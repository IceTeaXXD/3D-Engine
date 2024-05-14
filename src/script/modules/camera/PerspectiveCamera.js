import { M4 } from "../math/Matrix4.js"
import { Camera } from "./Camera.js"

export class PerspectiveCamera extends Camera {
  fov
  aspect
  near
  far

  constructor(fov, aspect, near, far) {
    super()
    this.fov = fov
    this.aspect = aspect
    this.near = near
    this.far = far
    this.computeProjectionMatrix()
  }

  get type() {
    return "PerspectiveCamera"
  }

  computeProjectionMatrix() {
    this.projectionMatrix = M4.perspective(
      this.fov,
      this.aspect,
      this.near,
      this.far
    )
  }
}
