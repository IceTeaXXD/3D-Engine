import { Listener } from "../core/Listener.js"
import { BufferAttribute } from "../geometry/BufferAttribute.js"

export class Vector3 extends Listener {
  /** @type {number} */
  #x
  /** @type {number} */
  #y
  /** @type {number} */
  #z

  constructor(x = 0, y = 0, z = 0) {
    super()
    this.set(x, y, z)
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

  set onChange(callback) {
    this.addEventListener("change", callback)
  }

  set(x = 0, y = 0, z = 0) {
    this.#x = x
    this.#y = y
    this.#z = z
    this.dispatchEvent({ type: "change", target: this })
    return this
  }

  setScalar(scalar) {
    return this.set(scalar, scalar, scalar)
  }

  clone() {
    return new Vector3(this.x, this.y, this.z)
  }

  setVector(v, update = true) {
    this.#x = v.x
    this.#y = v.y
    this.#z = v.z
    if (update) this.dispatchEvent({ type: "change", target: this })
    return this
  }

  add(val) {
    if (val instanceof Vector3) {
      return this.set(this.x + val.x, this.y + val.y, this.z + val.z)
    } else if (typeof val === "number") {
      return this.set(this.x + val, this.y + val, this.z + val)
    } else {
      throw new Error("Invalid argument type")
    }
  }

  sub(val) {
    if (val instanceof Vector3) {
      return this.set(this.x - val.x, this.y - val.y, this.z - val.z)
    } else if (typeof val === "number") {
      return this.set(this.x - val, this.y - val, this.z - val)
    } else {
      throw new Error("Invalid argument type")
    }
  }

  mul(val) {
    if (val instanceof Vector3) {
      return this.set(this.x * val.x, this.y * val.y, this.z * val.z)
    } else if (typeof val === "number") {
      return this.set(this.x * val, this.y * val, this.z * val)
    } else {
      throw new Error("Invalid argument type")
    }
  }

  div(val) {
    if (val instanceof Vector3) {
      return this.set(this.x / val.x, this.y / val.y, this.z / val.z)
    } else if (typeof val === "number") {
      return this.mul(1 / val)
    } else {
      throw new Error("Invalid argument type")
    }
  }

  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z
  }

  get lengthSq() {
    return this.dot(this)
  }

  get length() {
    return Math.sqrt(this.lengthSq)
  }

  set length(length) {
    return this.normalize().mul(length)
  }

  normalize() {
    // in case length is 0, return 1 to not divide by 0
    return this.div(this.length || 1)
  }

  cross(v) {
    return this.set(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    )
  }

  distanceTo(v) {
    return Math.sqrt(this.distanceToSquared(v))
  }

  distanceToSquared(v) {
    const dx = this.x - v.x
    const dy = this.y - v.y
    const dz = this.z - v.z
    return dx * dx + dy * dy + dz * dz
  }

  toArray(arr = null) {
    if (arr === null) arr = [0, 0, 0]
    arr[0] = this.x
    arr[1] = this.y
    arr[2] = this.z
    return arr
  }

  toDict() {
    return {
      x: this.x,
      y: this.y,
      z: this.z
    }
  }

  equals(v) {
    return v.x === this.x && v.y === this.y && v.z === this.z
  }

  toJSON() {
    return this.toArray()
  }

  static fromJSON(arr) {
    return new Vector3(...arr)
  }

  static mulMat(v, m, isPoint = true) {
    return v.clone().mulMat(m, isPoint)
  }

  mulMat(m, isPoint = true) {
    const v = this
    return this.set(
      v.x * m.get(0, 0) +
        v.y * m.get(1, 0) +
        v.z * m.get(2, 0) +
        (isPoint ? m.get(3, 0) : 0),
      v.x * m.get(0, 1) +
        v.y * m.get(1, 1) +
        v.z * m.get(2, 1) +
        (isPoint ? m.get(3, 1) : 0),
      v.x * m.get(0, 2) +
        v.y * m.get(1, 2) +
        v.z * m.get(2, 2) +
        (isPoint ? m.get(3, 2) : 0)
    )
  }

  fromBufferAttribute(attribute, index) {
    console.log(attribute)
    return this.set(
      ...attribute.get(index, attribute.size),
      ...[0, 0, 0].slice(attribute.size)
    )
  }

  static get up() {
    return new Vector3(0, 1, 0)
  }

  *[Symbol.iterator]() {
    yield this.x
    yield this.y
    yield this.z
  }
}
