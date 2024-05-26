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
  PlaneGeometry,
  HollowPyramidGeometry
} from "../modules/geometry/index.js"
import {
  saveUtil,
  objectTransformations,
  cameraController,
  Interface
} from "./utils/index.js"
import {
  OrtographicCamera,
  PerspectiveCamera,
  ObliqueCamera,
  OrbitControl
} from "../modules/camera/index.js"
import * as SC from "./utils/sceneUtils.js"
// import model from "./models/index.js"

/* CANVAS */
const canvas = document.getElementById("canvas")
canvas.width = window.innerWidth - 610
canvas.height = window.innerHeight - 70
canvas.style.backgroundColor = "black"
const gl = new WebGLRenderer(canvas)
document.getElementById("scenecolor").oninput = function () {
  canvas.style.backgroundColor = this.value
}
gl.loadTexture()

/* CAMERA */
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
cameraController(cameras)

const orbitControl = {
  perspective: new OrbitControl(cameras.perspective, canvas),
  ortographic: new OrbitControl(cameras.ortographic, canvas),
  oblique: new OrbitControl(cameras.oblique, canvas)
}

/* SCENE */
const scene = new Scene()
const selectedObject = { object: null }

const uiInterface = new Interface(scene);

saveUtil(scene)
function render() {
  requestAnimationFrame(render)
  orbitControl[cameras.current].update()
  gl.render(scene, cameras[cameras.current])
}
render()
