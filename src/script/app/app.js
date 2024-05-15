import { Vector3 } from "../modules/math/Vector3.js"
import { WebGLRenderer } from "../modules/core/WebGLRenderer.js"
import { Scene } from "../modules/core/Scene.js"
import { Mesh } from "../modules/core/Mesh.js"
import { PlaneGeometry } from "../modules/geometry/PlaneGeometry.js"
import { BoxGeometry } from "../modules/geometry/BoxGeometry.js"
import { BasicMaterial } from "../modules/materials/BasicMaterial.js"
import { Color } from "../modules/materials/Color.js"
import { PerspectiveCamera } from "../modules/camera/PerspectiveCamera.js"

const v = new Vector3()
const canvas = document.getElementById("canvas")
canvas.style.backgroundColor = "green"
const gl = new WebGLRenderer(canvas)

const plane = new Mesh(
  new PlaneGeometry(1000, 1000),
  new BasicMaterial({ color: Color.white() })
)

const box = new Mesh(
  new BoxGeometry(500, 500),
  new BasicMaterial( {color: Color.black()})
)

const scene = new Scene()
plane.position.y = -300
plane.scale.z = -1
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

function render() {
  requestAnimationFrame(render)
  gl.render(scene, camera)
}
render()
