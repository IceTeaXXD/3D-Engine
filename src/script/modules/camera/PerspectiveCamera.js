import { M4 } from "../math"
import { Camera } from "./Camera"

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
    this.updateProjectionMatrix()
  }

  get type() {
    return "PerspectiveCamera"
  }

  updateProjectionMatrix() {
    this.projectionMatrix = M4.perspective(
      this.fov,
      this.aspect,
      this.near,
      this.far
    )
  }
}
