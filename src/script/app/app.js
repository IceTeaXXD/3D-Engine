import { Vector3 } from "../modules/math/Vector3.js"
import { WebGLRenderer } from "../modules/core/WebGLRenderer.js"
import { Scene } from "../modules/core/Scene.js"
import { Mesh } from "../modules/core/Mesh.js"
import { PlaneGeometry } from "../modules/geometry/PlaneGeometry.js"
import { BoxGeometry } from "../modules/geometry/BoxGeometry.js"
import { BasicMaterial } from "../modules/materials/BasicMaterial.js"
import { Color } from "../modules/materials/Color.js"
import { PerspectiveCamera } from "../modules/camera/PerspectiveCamera.js"
import { BoxGeometry } from "../modules/geometry/BoxGeometry.js"

const v = new Vector3()
const canvas = document.getElementById("canvas")
canvas.style.backgroundColor = "white"
const gl = new WebGLRenderer(canvas)

const plane = new Mesh(
  new PlaneGeometry(1000, 1000),
  new BasicMaterial({ color: Color.green() })
)

const box = new Mesh(
  new BoxGeometry(500, 500),
  new BasicMaterial( {color: Color.black()})
)

const scene = new Scene()
plane.position.y = -300
plane.scale.z = -2
box.position.y = -150
box.scale.z = -1
scene.add(plane)
scene.add(box)

const camera = new PerspectiveCamera(
  60,
  canvas.clientWidth / canvas.clientHeight,
  0.01,
  9999
)
camera.position.z = 700

const box = new Mesh(
  new BoxGeometry(100, 100, 100),
  new BasicMaterial({ color: Color.red() })
)
box.position.set(0, 150, 100)
scene.add(box)

let direction = 1;
function render() {
  requestAnimationFrame(render)

  // Update box position
  box.position.x += direction;
  box.position.y += direction;
  box.position.z += direction;

  // Check if box position hits 100, 150, 100
  if (box.position.x >= 50 && box.position.y >= 50 && box.position.z >= 50) {
    direction = -1;
  }

  // Check if box position hits 0, 0, 0
  if (box.position.x <= 0 && box.position.y <= 0 && box.position.z <= 0) {
    direction = 1;
  }

  gl.render(scene, camera)
}
// render()
