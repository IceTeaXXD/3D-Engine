import { Camera } from "./index.js"
import { M4 } from "../math/index.js"

export class ObliqueCamera extends Camera {
  top
  bottom
  left
  right
  near
  far
  angle

  constructor(top, bottom, left, right, near, far, theta, phi) {
    super()
    this.top = top
    this.bottom = bottom
    this.left = left
    this.right = right
    this.near = near
    this.far = far
    this.theta = theta
    this.phi = phi
    this.computeProjectionMatrix()
  }

  get type() {
    return "ObliqueCamera"
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
    this.projectionMatrix = M4.oblique(
      ...edge,
      this.near,
      this.far,
      this.theta,
      this.phi,
      0.5
    )
  }
}
