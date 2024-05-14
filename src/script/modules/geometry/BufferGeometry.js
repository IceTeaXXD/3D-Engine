import { Vector3 } from "../math/Vector3.js"
import { BufferAttribute } from "./BufferAttribute.js"

export class BufferGeometry {
  #attributes
  #indices

  constructor() {
    this.#attributes = {}
    this.#indices = null
  }

  setIndices(indices) {
    this.#indices = indices
    return this
  }

  removeIndices() {
    this.#indices = null
    return this
  }

  setAttribute(name, attribute) {
    this.#attributes[name] = attribute
    return this
  }

  getAttribute(name) {
    return this.#attributes[name]
  }

  deleteAttribute(name) {
    delete this.#attributes[name]
    return this
  }

  calculateNormals() {
    const position = this.#attributes.position
    if (position === undefined) {
      console.error("BufferGeometry: No position attribute found.")
      return
    }

    const normal = new BufferAttribute(new Float32Array(position.count * 3), 3)
    const pA = new Vector3(),
      pB = new Vector3(),
      pC = new Vector3()
    const cb = new Vector3(),
      ab = new Vector3()

    for (let i = 0; i < position.count; i += 3) {
      pA.fromBufferAttribute(position, i * 3)
      pB.fromBufferAttribute(position, (i + 1) * 3)
      pC.fromBufferAttribute(position, (i + 2) * 3)

      cb.sub(pC, pB)
      ab.sub(pA, pB)
      cb.cross(ab).normalize()

      normal.set(i, cb.x, cb.y, cb.z)
      normal.set(i + 1, cb.x, cb.y, cb.z)
      normal.set(i + 2, cb.x, cb.y, cb.z)
    }

    this.setAttribute("normal", normal)
  }

  toJson() {
    const attributes = {}
    for (const key in this.#attributes) {
      attributes[key] = this.#attributes[key].toJson()
    }

    return {
      attributes,
      indices: this.#indices ? this.#indices.array : null
    }
  }

  static fromJson(data) {
    const geometry = new BufferGeometry()
    for (const key in data.attributes) {
      geometry.setAttribute(key, BufferAttribute.fromJson(data.attributes[key]))
    }

    if (data.indices) {
      geometry.setIndices(BufferAttribute.fromJson(data.indices))
    }

    return geometry
  }
}
