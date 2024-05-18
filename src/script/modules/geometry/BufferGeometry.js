import { Vector3 } from "../math/Vector3.js"
import { BufferAttribute } from "./BufferAttribute.js"

export class BufferGeometry {
  #attributes
  #indices
  useVertexColors = false;

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

  get attributes() {
    return this.#attributes
  }

  getAttribute(name) {
    return this.#attributes[name]
  }

  deleteAttribute(name) {
    delete this.#attributes[name]
    return this
  }

  calculateNormals(newAttribute=false) {
    const position = this.getAttribute('position');
    if (!position) return;
    let normal = this.getAttribute('normal');
    if (newAttribute || !normal)
        normal = new BufferAttribute(new Float32Array(position.length), position.size);

    const pA = new Vector3(), pB = new Vector3(), pC = new Vector3();
    for (let i = 0; i < position.length; i += 3) {
        pA.fromBufferAttribute(position, i);
        pB.fromBufferAttribute(position, i+1);
        pC.fromBufferAttribute(position, i+2);

        pC.sub(pB);
        pB.sub(pA);
        pB.cross(pC);

        const d = pB.normalize().toArray();
        normal.set(i, d);
        normal.set(i+1, d);
        normal.set(i+2, d);
    }
    this.setAttribute('normal', normal);
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
