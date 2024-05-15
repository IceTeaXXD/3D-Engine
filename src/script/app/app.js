import { Vector3 } from "../modules/math/Vector3.js"
import { WebGLRenderer } from "../modules/core/WebGLRenderer.js"
import { Scene } from "../modules/core/Scene.js"
import { Mesh } from "../modules/core/Mesh.js"
import { PlaneGeometry } from "../modules/geometry/PlaneGeometry.js"
import { BasicMaterial } from "../modules/materials/BasicMaterial.js"
import { Color } from "../modules/materials/Color.js"
import { ObliqueCamera } from "../modules/camera/ObliqueCamera.js"
import { PerspectiveCamera } from "../modules/camera/PerspectiveCamera.js"
import { BoxGeometry } from "../modules/geometry/BoxGeometry.js"
import { cameraUtils } from "./utils/cameraUtils.js"
import { objectUtils } from "./utils/objectUtils.js"
import { OrbitControl } from "../modules/camera/OrbitControl.js"

const v = new Vector3()
const canvas = document.getElementById("canvas")
canvas.style.backgroundColor = "white"
const gl = new WebGLRenderer(canvas)

const plane = new Mesh(
  new PlaneGeometry(1000, 1000),
  new BasicMaterial({ color: Color.green() })
)

const scene = new Scene()
plane.position.y = -300
plane.scale.z = -2
scene.add(plane)

const perspectiveCamera = new PerspectiveCamera(
  60,
  canvas.clientWidth / canvas.clientHeight,
  0.01,
  9999
)

const obliqueCamera = new ObliqueCamera(
  -canvas.clientWidth / 2,
  canvas.clientWidth / 2,
  canvas.clientHeight / 2,
  -canvas.clientHeight / 2,
  -1000,
  1000,
  45
)

const box = new Mesh(
  new BoxGeometry(1, 1, 1),
  new BasicMaterial({ color: Color.red() })
)
scene.add(box)

cameraUtils(perspectiveCamera)
objectUtils(box)
const cameraControl = new OrbitControl(perspectiveCamera, canvas)

function render() {
  requestAnimationFrame(render)
  cameraControl.update()
  gl.render(scene, perspectiveCamera)
}
render()
