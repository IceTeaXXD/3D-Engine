import { Listener } from "../core/Listener.js"
import { M4, Vector3 } from "./index.js"

export class Quaternion extends Listener {
  /** @type {number} */
  #x
  /** @type {number} */
  #y
  /** @type {number} */
  #z
  /** @type {number} */
  #w

  constructor(x = 0, y = 0, z = 0, w = 1) {
    super()
    this.set(x, y, z, w)
  }

  get x() {
    return this.#x
  }

  set x(value) {
    this.#x = value
    this.dispatchEvent({ type: "change", target: this })
  }

  get y() {
    return this.#y
  }

  set y(value) {
    this.#y = value
    this.dispatchEvent({ type: "change", target: this })
  }

  get z() {
    return this.#z
  }

  set z(value) {
    this.#z = value
    this.dispatchEvent({ type: "change", target: this })
  }

  get w() {
    return this.#w
  }

  set w(value) {
    this.#w = value
    this.dispatchEvent({ type: "change", target: this })
  }

  set onChange(callback) {
    this.addEventListener("change", callback)
  }

  set(x = 0, y = 0, z = 0, w = 1) {
    this.#x = x
    this.#y = y
    this.#z = z
    this.#w = w
    this.dispatchEvent({ type: "change", target: this })
    return this
  }

  setScalar(scalar) {
    return this.set(scalar, scalar, scalar, scalar)
  }

  clone() {
    return new Quaternion(this.x, this.y, this.z, this.w)
  }

  copy(q) {
    this.set(q.x, q.y, q.z, q.w)
    return this
  }
  setEuler(x, y, z, update = true) {
    if (x instanceof Vector3) {
      y = x.y
      z = x.z
      x = x.x
    }
    const c1 = Math.cos(x / 2)
    const c2 = Math.cos(y / 2)
    const c3 = Math.cos(z / 2)
    const s1 = Math.sin(x / 2)
    const s2 = Math.sin(y / 2)
    const s3 = Math.sin(z / 2)

    this.#x = s1 * c2 * c3 + c1 * s2 * s3
    this.#y = c1 * s2 * c3 - s1 * c2 * s3
    this.#z = c1 * c2 * s3 + s1 * s2 * c3
    this.#w = c1 * c2 * c3 - s1 * s2 * s3

    if (update) this.dispatchEvent({ type: "change", target: this })
    return this
  }

  setAxisAngle(axis, angle) {
    const halfAngle = angle / 2
    const s = Math.sin(halfAngle)
    this.set(axis.x * s, axis.y * s, axis.z * s, Math.cos(halfAngle))
    return this
  }

  setMatrix(m) {
    const [
      m11,
      m12,
      m13,
      m14,
      m21,
      m22,
      m23,
      m24,
      m31,
      m32,
      m33,
      m34,
      m41,
      m42,
      m43,
      m44
    ] = m.data
    const trace = m11 + m22 + m33
    let s

    if (trace > 0) {
      s = 0.5 / Math.sqrt(trace + 1.0)
      this.set((m32 - m23) * s, (m13 - m31) * s, (m21 - m12) * s, 0.25 / s)
    } else if (m11 > m22 && m11 > m33) {
      s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33)
      this.set(0.25 * s, (m12 + m21) * s, (m13 + m31) * s, (m32 - m23) * s)
    } else if (m22 > m33) {
      s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33)
      this.set((m12 + m21) * s, 0.25 * s, (m23 + m32) * s, (m13 - m31) * s)
    } else {
      s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22)
      this.set((m13 + m31) * s, (m23 + m32) * s, 0.25 * s, (m21 - m12) * s)
    }
    return this
  }

  mul(q) {
    const { x, y, z, w } = this
    const { x: qx, y: qy, z: qz, w: qw } = q
    this.set(
      x * qw + y * qz - z * qy + w * qx,
      -x * qz + y * qw + z * qx + w * qy,
      x * qy - y * qx + z * qw + w * qz,
      -x * qx - y * qy - z * qz + w * qw
    )
    return this
  }

  add(q) {
    this.set(this.x + q.x, this.y + q.y, this.z + q.z, this.w + q.w)
    return this
  }

  sub(q) {
    this.set(this.x - q.x, this.y - q.y, this.z - q.z, this.w - q.w)
    return this
  }

  scale(s) {
    this.set(this.x * s, this.y * s, this.z * s, this.w * s)
    return this
  }

  normalize() {
    this.scale(1 / this.length)
    return this
  }

  inv() {
    this.scale(1 / this.lengthSq)
    return this
  }

  get length() {
    return Math.sqrt(this.lengthSq)
  }

  get lengthSq() {
    const { x, y, z, w } = this
    return x * x + y * y + z * z + w * w
  }

  toEuler(v = null) {
    const { x, y, z, w } = this
    const sqw = w * w
    const sqx = x * x
    const sqy = y * y
    const sqz = z * z
    const unit = sqx + sqy + sqz + sqw
    const test = x * y + z * w

    v = v || new Vector3()
    if (test > 0.499 * unit) {
      v.set(0, 2 * Math.atan2(y, w), Math.PI / 2)
    } else if (test < -0.499 * unit) {
      v.set(0, -2 * Math.atan2(y, w), -Math.PI / 2)
    } else {
      v.set(
        Math.atan2(2 * x * w - 2 * y * z, sqx - sqy - sqz + sqw),
        Math.atan2(2 * y * w - 2 * x * z, -sqx + sqy - sqz + sqw),
        Math.asin((2 * test) / unit)
      )
    }
    return v
  }

  toMatrix() {
    const { x, y, z, w } = this
    const xx = x * x
    const xy = x * y
    const xz = x * z
    const xw = x * w
    const yy = y * y
    const yz = y * z
    const yw = y * w
    const zz = z * z
    const zw = z * w
    return new M4([
      1 - 2 * (yy + zz),
      2 * (xy + zw),
      2 * (xz - yw),
      0,
      2 * (xy - zw),
      1 - 2 * (xx + zz),
      2 * (yz + xw),
      0,
      2 * (xz + yw),
      2 * (yz - xw),
      1 - 2 * (xx + yy),
      0,
      0,
      0,
      0,
      1
    ])
  }

  static fromMatrix(m) {
    return new Quaternion().setMatrix(m)
  }

  static fromEuler(v) {
    return new Quaternion().setEuler(v)
  }

  static fromAxisAngle(v, a) {
    return new Quaternion().setAxisAngle(v, a)
  }

  toJSON() {
    return [...this]
  }

  static fromJSON(json, obj = null) {
    return (obj || new Quaternion()).set(...json)
  }

  *[Symbol.iterator]() {
    yield this.x
    yield this.y
    yield this.z
    yield this.w
  }
}
