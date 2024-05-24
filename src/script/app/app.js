import { Mesh, WebGLRenderer, Scene } from "../modules/core/index.js"
import {
  Color,
  BasicMaterial,
  ShaderMaterial,
  PhongMaterial,
  Texture
} from "../modules/materials/index.js"
import { Vector3, DEGTORAD } from "../modules/math/index.js"
import {
  BoxGeometry,
  HollowPrismGeometry,
  HollowBoxGeometry,
  TubeGeometry,
  PlaneGeometry
} from "../modules/geometry/index.js"
import {
  saveUtil,
  loadUtil,
  objectTransformations,
  cameraController
} from "./utils/index.js"
import {
  OrtographicCamera,
  PerspectiveCamera,
  ObliqueCamera,
  OrbitControl
} from "../modules/camera/index.js"
import model from "./models/index.js"

const v = new Vector3()
const canvas = document.getElementById("canvas")
canvas.width = window.innerWidth - 610
canvas.height = window.innerHeight - 70

canvas.style.backgroundColor = "black"

var sceneColorPicker = document.getElementById("scenecolor")
sceneColorPicker.oninput = function () {
  canvas.style.backgroundColor = this.value
}
const gl = new WebGLRenderer(canvas)

const cameras = {
  perspective: new PerspectiveCamera(
    60,
    canvas.clientWidth / canvas.clientHeight,
    0.01,
    9999
  ),
  ortographic: new OrtographicCamera(
    canvas.clientWidth / 100,
    -canvas.clientWidth / 100,
    -canvas.clientHeight / 100,
    canvas.clientHeight / 100,
    -1000,
    1000
  ),
  oblique: new ObliqueCamera(
    canvas.clientWidth / 100,
    -canvas.clientWidth / 100,
    -canvas.clientHeight / 100,
    canvas.clientHeight / 100,
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

let scene = new Scene()
// const box = new Mesh(
//   new BoxGeometry(2, 2, 2),
//   new BasicMaterial({ color: Color.red() })
// )
// scene.add(box)
// objectTransformations(box)

// const hollow_box = new Mesh(
//   new HollowBoxGeometry(2, 2, 2, 0.2),
//   new PhongMaterial()
// )
// scene.add(hollow_box)
// objectTransformations(hollow_box)

const hollow_prism = new Mesh(
  new HollowBoxGeometry(2, 2, 2, 0.2, 10),
  new PhongMaterial()
)
scene.add(hollow_prism)
objectTransformations(hollow_prism)

// scene.add(model)
// objectTransformations(model)

// const body = new Mesh(
//   new HollowPrismGeometry(2, 2, 2, 0.2, 100),
//   new PhongMaterial()
// )
// body.position.set(0, -5, 0)
// body.rotateX(90 * DEGTORAD)
// body.scale.z = 4

// const lefthand = new Mesh(
//   new BoxGeometry(1, 1, 1),
//   new PhongMaterial()
// )
// lefthand.position.set(2, 0, 0)

// const righthand = new Mesh(
//   new BoxGeometry(1, 1, 1),
//   new PhongMaterial()
// )
// righthand.position.set(-2, 0, 0)

// const head = new Mesh(
//   new BoxGeometry(2, 2, 2),
//   new PhongMaterial()
// )
// head.scale.z /= 4
// head.position.set(0, 0, -1.2)

// body.add(lefthand)
// body.add(head)
// body.add(righthand)
// objectTransformations(head)
// scene.add(body)

let sceneArr = [scene]

loadUtil((loadedScene) => {
  scene = loadedScene
  sceneArr = [scene]
})

cameraController(cameras)
saveUtil(sceneArr)

function render() {
  requestAnimationFrame(render)
  orbitControl[cameras.current].update()
  gl.render(scene, cameras[cameras.current])
}
render()
