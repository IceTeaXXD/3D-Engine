import { Vector3 } from "../modules/math/Vector3.js"
import { WebGLRenderer } from "../modules/core/WebGLRenderer.js"
import { Scene } from "../modules/core/Scene.js"
import { Mesh } from "../modules/core/Mesh.js"
import { PlaneGeometry } from "../modules/geometry/PlaneGeometry.js"
import { BoxGeometry } from "../modules/geometry/BoxGeometry.js"
import { BasicMaterial } from "../modules/materials/BasicMaterial.js"
import { ShaderMaterial } from "../modules/materials/ShaderMaterial.js"
import { Color } from "../modules/materials/Color.js"
import { ObliqueCamera } from "../modules/camera/ObliqueCamera.js"
import { PerspectiveCamera } from "../modules/camera/PerspectiveCamera.js"
import { cameraController } from "./utils/cameraUtils.js"
import { objectTransformations } from "./utils/objectUtils.js"
import { OrbitControl } from "../modules/camera/OrbitControl.js"
import { HollowBoxGeometry } from "../modules/geometry/HollowBoxGeometry.js"
import { PhongMaterial } from "../modules/materials/PhongMaterial.js"
import { OrtographicCamera } from "../modules/camera/OrtographicCamera.js"
import { TubeGeometry } from "../modules/geometry/TubeGeometry.js"
import { DEGTORAD } from "../modules/math/index.js"
import { saveUtil } from "./utils/saveUtils.js"
import { HollowPrismGeometry } from "../modules/geometry/HollowPrismGeometry.js"

const v = new Vector3()
const canvas = document.getElementById("canvas")
canvas.width = 800
canvas.height = 600
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

// const box = new Mesh(
//   new BoxGeometry(1, 1, 1),
//   new BasicMaterial({ color: Color.red() })
// )
// scene.add(box)
const hollow_box = new Mesh(
  new HollowBoxGeometry(2, 2, 2, 0.1),
  new PhongMaterial({ color: Color.blue() })
)
scene.add(hollow_box)
objectTransformations(hollow_box)

const cameras = {
  perspective: new PerspectiveCamera(
    60,
    canvas.clientWidth / canvas.clientHeight,
    0.01,
    9999
  ),
  ortographic: new OrtographicCamera(
    -canvas.clientWidth / 100,
    canvas.clientWidth / 100,
    canvas.clientHeight / 100,
    -canvas.clientHeight / 100,
    -1000,
    1000
  ),
  oblique: new ObliqueCamera(
    -canvas.clientWidth / 100,
    canvas.clientWidth / 100,
    canvas.clientHeight / 100,
    -canvas.clientHeight / 100,
    -1000,
    1000,
    30,
    30
  ),
  current: "perspective"
}

const orbitControl = {
  perspective: new OrbitControl(cameras.perspective, canvas),
  ortographic: new OrbitControl(cameras.ortographic, canvas),
  oblique: new OrbitControl(cameras.oblique, canvas)
}

cameraController(cameras)
// scene array
let sceneArr = []
sceneArr.push(scene)
saveUtil(sceneArr)

function render() {
  requestAnimationFrame(render)
  orbitControl[cameras.current].update()
  gl.render(scene, cameras[cameras.current])
}
render()
