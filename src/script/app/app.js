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
  loadUtil,
  objectTransformations,
  cameraController,
  createComponent
} from "./utils/index.js"
import {
  OrtographicCamera,
  PerspectiveCamera,
  ObliqueCamera,
  OrbitControl
} from "../modules/camera/index.js"
import * as SC from "./utils/sceneUtils.js"
import model from "./models/index.js"

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

document.getElementById("Box").addEventListener("click", () => {
  const box = new Mesh(new BoxGeometry(2, 2, 2), new PhongMaterial())
  scene.add(box)
  selectedObject.object = box
  objectTransformations(selectedObject.object)
  createComponent("Box-" + scene.children.length, scene, selectedObject.object)
})

document.getElementById("Cube").addEventListener("click", () => {
  const cube = new Mesh(
    new HollowBoxGeometry(2, 2, 2, 0.2, 10),
    new PhongMaterial()
  )
  scene.add(cube)
  selectedObject.object = cube
  objectTransformations(selectedObject.object)
  createComponent("Cube-" + scene.children.length, scene, selectedObject.object)
})

document.getElementById("Tube").addEventListener("click", () => {
  const tube = new Mesh(new TubeGeometry(1, 2, 2, 10, 10), new PhongMaterial())
  scene.add(tube)
  selectedObject.object = tube
  objectTransformations(selectedObject.object)
  createComponent("Tube-" + scene.children.length, scene, selectedObject.object)
})

document.getElementById("Prism").addEventListener("click", () => {
  const prism = new Mesh(
    new HollowPrismGeometry(2, 2, 2, 0.3, 5),
    new PhongMaterial()
  )
  scene.add(prism)
  selectedObject.object = prism
  objectTransformations(selectedObject.object)
  createComponent("Prism-" + scene.children.length, scene, selectedObject.object)
})

document.getElementById("Pyramid").addEventListener("click", () => {
  const pyramid = new Mesh(
    new HollowPyramidGeometry(2, 2, 2, 0.2),
    new PhongMaterial()
  )
  scene.add(pyramid)
  selectedObject.object = pyramid
  objectTransformations(selectedObject.object)
  createComponent("Pyramid-" + scene.children.length, scene, selectedObject.object)
})

document.getElementById("Brick").addEventListener("click", () => {
  const brick = new Mesh(
    new BoxGeometry(2, 2, 2),
    new PhongMaterial({ useTexture: true, texture: "brick" })
  )
  scene.add(brick)
  selectedObject.object = brick
  objectTransformations(selectedObject.object)
  createComponent("Brick-" + scene.children.length, scene, selectedObject.object)
})

document.getElementById("Wood").addEventListener("click", () => {
  const wood = new Mesh(
    new BoxGeometry(2, 2, 2),
    new PhongMaterial({ useTexture: true, texture: "wood" })
  )
  scene.add(wood)
  selectedObject.object = wood
  objectTransformations(selectedObject.object)
  createComponent("Wood-" + scene.children.length, scene, selectedObject.object)
})

document.getElementById("Glass").addEventListener("click", () => {
  const glass = new Mesh(
    new BoxGeometry(2, 2, 2),
    new PhongMaterial({ useTexture: true, texture: "glass" })
  )
  scene.add(glass)
  selectedObject.object = glass
  objectTransformations(selectedObject.object)
  createComponent("Glass-" + scene.children.length, scene, selectedObject.object)
})

saveUtil(scene)
loadUtil(scene, selectedObject.object)
function render() {
  requestAnimationFrame(render)
  orbitControl[cameras.current].update()
  gl.render(scene, cameras[cameras.current])
}
render()
