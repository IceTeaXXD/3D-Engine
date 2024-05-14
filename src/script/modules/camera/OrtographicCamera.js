import { M4 } from "../math/Matrix4.js"
import { Camera } from "./Camera.js"

export class OrthographicCamera extends Camera {
  top
  bottom
  left
  right
  near
  far

  constructor(top, bottom, left, right, near, far) {
    super()
    this.top = top
    this.bottom = bottom
    this.left = left
    this.right = right
    this.near = near
    this.far = far
    this.computeProjectionMatrix()
  }

  get type() {
    return "OrthographicCamera"
  }

  computeProjectionMatrix() {
    const d = [
      (this.right - this.left) / (2 * this.zoom),
      (this.top - this.bottom) / (2 * this.zoom),
      (this.right - this.bottom) / 2,
      (this.top - this.bottom) / 2
    ]
    const edge = [
      -(d[2] + d[0]) / 2,
      (d[2] + d[0]) / 2,
      -(d[3] + d[1]) / 2,
      (d[3] + d[1]) / 2
    ]

    this.projectionMatrix = M4.orthographic(...edge, this.near, this.far)
  }
}
