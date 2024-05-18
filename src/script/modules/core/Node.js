import { Vector3, Quaternion, M4 } from "../math/index.js"

const _events = {
  added: {
    type: "added"
  },
  removed: {
    type: "removed"
  }
}
const _v1 = new Vector3(),
  _xAxis = new Vector3(1, 0, 0),
  _yAxis = Vector3.up,
  _zAxis = new Vector3(0, 0, 1)
const _q1 = new Quaternion()

export class Node {
  /** @type {Vector3} */
  #position
  /** @type {Vector3} */
  #rotation
  /** @type {Vector3} */
  #scale
  /** @type {Quaternion} */
  #quaternion
  /** @type {M4} */
  #localMatrix
  /** @type {M4} */
  #worldMatrix
  /** @type {Node} */
  #parent
  /** @type {Array<Node>} */
  children
  /** @type 
  /** @type {Boolean} */
  visible = true

  constructor() {
    /** @type {string} */
    this.name = ""
    /** @type {Node} */
    this.#parent = null
    /** @type {Array<Node>} */
    this.children = []
    this.#position = new Vector3()
    this.#rotation = new Vector3()
    this.#scale = new Vector3(1, 1, 1)
    this.#quaternion = new Quaternion()
    this.#localMatrix = M4.identity()
    this.#worldMatrix = M4.identity()
    this.#quaternion.onChange = () => {
      _v1.setVector(this.#rotation)
      this.#quaternion.toEuler(_v1)
      this.#rotation.setVector(_v1, false)
    }
    this.#rotation.onChange = () => {
      this.#quaternion.setEuler(this.#rotation, 0, 0, false)
    }
  }

  get type() {
    return "Node"
  }

  get isNode() {
    return true
  }

  get position() {
    return this.#position
  }

  get worldPosition() {
    this.computeWorldMatrix(true, false)
    return M4.getTranslation(this.#worldMatrix)
  }

  get quaternion() {
    return this.#quaternion
  }

  get worldQuaternion() {
    this.computeWorldMatrix(true, false)
    return M4.decompose(this.#worldMatrix).quaternion
  }

  get rotation() {
    return this.#rotation
  }

  get worldRotation() {
    this.computeWorldMatrix(true, false)
    return M4.getRotation(this.#worldMatrix)
  }

  get scale() {
    return this.#scale
  }

  get worldScale() {
    this.computeWorldMatrix(true, false)
    return M4.decompose(this.#worldMatrix).scale
  }

  get parent() {
    return this.#parent
  }

  set parent(parent) {
    if (this.#parent !== parent) {
      this.#parent = parent
      this.computeWorldMatrix()
    }
  }

  get localMatrix() {
    return this.#localMatrix
  }

  get worldMatrix() {
    return this.#worldMatrix
  }

  computeLocalMatrix() {
    this.#localMatrix = M4.compose(
      this.#position,
      this.#quaternion,
      this.#scale
    )
  }

  computeWorldMatrix(updateParent = true, updateChildren = true) {
    if (updateParent && this.parent) {
      this.parent.computeWorldMatrix(true, false)
    }
    this.computeLocalMatrix()
    if (this.parent) {
      this.#worldMatrix = this.parent.#worldMatrix.premul(this.#localMatrix)
    } else {
      this.#worldMatrix = this.#localMatrix.clone()
    }
    if (updateChildren) {
      for (let i = 0; i < this.children.length; i++) {
        this.children[i].computeWorldMatrix(false, true)
      }
    }
  }

  add(...Nodes) {
    if (Nodes.length > 1) {
      Nodes.forEach((obj) => this.add(obj))
      return this
    }
    
    if (Nodes.length === 0) return this

    const obj = Nodes[0]
    if (obj && obj.isNode) {
      if (obj.parent !== this) {
        obj.removeFromParent()
        obj.parent = this
      }
      this.children.push(obj)
    }
    return this
  }

  remove(...Nodes) {
    if (Nodes.length > 1) {
      Nodes.forEach((obj) => this.remove(obj))
      return this
    }
    if (Nodes.length === 0) return this
    const Node = Nodes[0]
    if (Node && Node.isNode) {
      const index = this.children.indexOf(Node)
      if (index !== -1) {
        Node.parent = null
        this.children.splice(index, 1)
        Node.dispatchEvent(_events.removed)
      }
    }
    return this
  }

  removeFromParent() {
    if (this.parent !== null) this.parent.remove(this)
    return this
  }

  clear() {
    this.children.forEach((child) => {
      child.parent = null
      child.dispatchEvent(_events.removed)
    })
    this.children.length = 0
    return this
  }

  lookAt(target, up = Vector3.up) {
    if (target.isNode) target = target.worldPosition

    let m
    if (this.isCamera) m = M4.lookAt(this.worldPosition, target, up)
    else m = M4.lookAt(target, this.worldPosition, up)

    _q1.setMatrix(m)
    if (this.parent) {
      const q = this.parent.worldQuaternion
      this.quaternion.copy(q.inv().mul(_q1))
    } else {
      this.quaternion.copy(_q1)
    }
  }

  localToWorld(vector) {
    this.computeWorldMatrix(true, false)
    return Vector3.mulMat(vector, this.#worldMatrix)
  }

  worldToLocal(vector) {
    this.computeWorldMatrix(true, false)
    return Vector3.mulMat(vector, M4.inv(this.#worldMatrix))
  }

  applyMatrix(matrix) {
    this.computeLocalMatrix()
    this.#localMatrix = matrix.premul(this.#localMatrix)
    M4.decompose(
      this.#localMatrix,
      this.#position,
      this.#quaternion,
      this.#scale
    )
  }

  rotateOnWorldAxis(axis, angle) {
    _q1.setAxisAngle(axis, angle)
    _q1.mul(this.#quaternion)
    this.quaternion.copy(_q1)
  }

  rotateX(angle) {
    this.rotateOnWorldAxis(_xAxis, angle)
  }

  rotateY(angle) {
    this.rotateOnWorldAxis(_yAxis, angle)
  }

  rotateZ(angle) {
    this.rotateOnWorldAxis(_zAxis, angle)
  }

  traverse(onLeaf = null) {
    const traverse = (obj) => {
      onLeaf?.(obj)
      obj.children.forEach((child) => {
        traverse(child)
      })
    }
    traverse(this)
  }

  toJSON() {
    return {
      type: this.type,
      position: this.position.toJSON(),
      quaternion: this.quaternion.toJSON(),
      scale: this.scale.toJSON(),
      children: this.children.map((child) => child.toJSON())
    }
  }

  static fromJSON(json, obj = null) {
    if (!obj) obj = new Node()
    obj.position.set(...json.position)
    obj.quaternion.set(...json.quaternion)
    obj.scale.set(...json.scale)
    return obj
  }
}
