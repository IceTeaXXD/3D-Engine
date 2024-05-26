import { WebGLTypes } from "../core/index.js"

export class BufferAttribute {
  /** @type {Float32Array} */
  #data
  /** @type {number} */
  #size
  /** @type {float} */
  #dtype = WebGLTypes.FLOAT
  /** @type {boolean} */
  normalize = false
  /** @type {number} */
  stride = 0
  /** @type {number} */
  offset = 0

  constructor(data, size, options = {}) {
    const { dtype, normalize, stride, offset } = options
    this.#data = new Float32Array(data)
    this.#size = size
    this.#dtype = dtype || this.#dtype
    this.normalize = normalize || this.normalize
    this.stride = stride || this.stride
    this.offset = offset || this.offset
  }

  get data() {
    return this.#data
  }

  get size() {
    return this.#size
  }

  get dtype() {
    return this.#dtype
  }

  get length() {
    return this.#data.length
  }

  get count() {
    return this.#data.length / this.#size
  }

  get(idx, size = null) {
    idx *= this.#size
    size = size || this.#size
    const data = new Float32Array(size)
    for (let i = 0; i < size; i++) {
      data[i] = this.#data[idx + i]
    }
    return data
  }

  get type() {
    return "BufferAttribute"
  }

  set(idx, data) {
    idx *= this.#size
    for (let i = 0; i < this.#size; i++) {
      this.#data[idx + i] = data[i]
    }
  }

  toJSON() {
    const options = {}
    if (this.#dtype !== WebGLTypes.FLOAT) {
      options.dtype = this.#dtype
    }
    if (this.normalize) {
      options.normalize = this.normalize
    }
    if (this.stride) {
      options.stride = this.stride
    }
    if (this.offset) {
      options.offset = this.offset
    }
    return {
      data: Array.from(this.#data),
      type: this.type,
      size: this.#size,
      options: options
    }
  }

  static fromJSON(json, obj = null) {
    if (!obj) {
      obj = new BufferAttribute(
        new Float32Array(json.data),
        json.size,
        json.options
      )
    }
    return obj
  }
}
