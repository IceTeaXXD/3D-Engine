import { Node } from "../core/index.js"
import { DEGTORAD } from "../math/index.js"

export class OrbitControl {
  #canvas
  #camera
  target
  radius = 700
  #center = new Node()
  #isPanning = false
  #isMoving = false
  #isZooming = false

  constructor(camera, canvas) {
    this.#camera = camera
    this.#canvas = canvas
    this.#center.name = "Camera"
    this.#init()
  }

  get canvas() {
    return this.#canvas
  }

  get camera() {
    return this.#camera
  }

  get center() {
    return this.#center
  }

  #init() {
    this.#center.add(this.#camera)
    this.#canvas.addEventListener("mousedown", this.#onMouseDown.bind(this))
    this.#canvas.addEventListener("mousemove", this.#onMouseMove.bind(this))
    this.#canvas.addEventListener("mouseup", this.#onMouseUp.bind(this))
    this.#canvas.addEventListener("wheel", this.#onMouseWheel.bind(this))
  }

  #onMouseDown(event) {
    if (event.shiftKey) this.#isPanning = true
    else this.#isMoving = true
  }

  #onMouseUp() {
    this.#isMoving = false
    this.#isPanning = false
  }

  #onMouseMove(event) {
    const dx = event.movementX,
      dy = event.movementY
    if (this.#isMoving) {
      this.#center.rotateX(-dy * DEGTORAD)
      this.#center.rotateY(-dx * DEGTORAD)
    } else if (this.#isPanning) {
      this.#center.position.x -= dx
      this.#center.position.y += dy
    }
  }

  #onMouseWheel(event) {
    if (!this.#isZooming) return
    const delta = event.deltaY
    this.#camera.zoom += delta
  }

  update() {
    this.#center.computeLocalMatrix()
  }

  destroy() {
    this.#canvas.removeEventListener("mousedown", this.#onMouseDown)
    this.#canvas.removeEventListener("mousemove", this.#onMouseMove)
    this.#canvas.removeEventListener("mouseup", this.#onMouseUp)
    this.#canvas.removeEventListener("wheel", this.#onMouseWheel)
  }
}
