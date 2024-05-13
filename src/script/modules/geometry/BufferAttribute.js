import { WebGLTypes } from "../core"

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
    this.#data = new Float32Array(data)
    this.#size = size
    this.#dtype = options.dtype || this.#dtype
    this.normalize = options.normalize || this.normalize
    this.stride = options.stride || this.stride
    this.offset = options.offset || this.offset
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

  convertToJson() {
    return {
      data: Array.from(this.#data),
      type: this.type,
      size: this.#size,
      options: {
        ...(this.dtype !== WebGLTypes.FLOAT ? { dtype: this.dtype } : {}),
        ...(this.normalize ? { normalize: this.normalize } : {}),
        ...(this.stride ? { stride: this.stride } : {}),
        ...(this.offset ? { offset: this.offset } : {})
      }
    }
  }

  static convertFromJson(json, obj = null) {
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
