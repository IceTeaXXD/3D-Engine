import { Mesh, WebGLRenderer, Scene, Animator } from "../modules/core/index.js"
import {
  Color,
  BasicMaterial,
  ShaderMaterial,
  PhongMaterial
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
  saveAnimatorUtil,
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

saveUtil(scene)

let lastRenderTime = 0
let targetFPS = 10

const animator = new Animator()
saveAnimatorUtil(animator)
const uiInterface = new Interface(scene, animator)

/* ANIMATOR */
document.getElementById("fps").oninput = function () {
  targetFPS = this.value
  animator.fps = this.value
}

document.getElementById("play").addEventListener("click", () => {
  animator.play()
})

document.getElementById("next").addEventListener("click", () => {
  animator.switchFrameToNext()
})

document.getElementById("prev").addEventListener("click", () => {
  animator.switchFrameToPrevious()
})

document.getElementById("start").addEventListener("click", () => {
  animator.switchFrameToStart()
})

document.getElementById("end").addEventListener("click", () => {
  animator.switchFrameToEnd()
})

document.getElementById("reverse").addEventListener("click", () => {
  animator.reverse()
})

document.getElementById("loop").addEventListener("click", () => {
  animator.loop()
})

document.getElementById("add-frame").addEventListener("click", () => {
  animator.addNewFrame()
})

document.getElementById("delete-frame").addEventListener("click", () => {
  animator.removeFrame()
})

document.getElementById("swap-prev").addEventListener("click", () => {
  animator.swapCurrentFrameToPrevious()
})

document.getElementById("swap-next").addEventListener("click", () => {
  animator.swapCurrentFrameToNext()
})

document.getElementById("record").addEventListener("click", () => {
  animator.editFrame(
    uiInterface.selectedObject.object.position,
    uiInterface.selectedObject.object.rotation,
    uiInterface.selectedObject.object.scale
  )
})

document.getElementById("tweening").addEventListener("change", () => {
  animator.setEasingFunction(document.getElementById("tweening").value)
})

document.getElementById("reset-cam").addEventListener("click", () => {
  orbitControl[cameras.current].reset()
})

function render(currentTime) {
  const deltaTime = currentTime - lastRenderTime
  lastRenderTime = currentTime
  animator.update(deltaTime, uiInterface.selectedObject.object)
  orbitControl[cameras.current].update()
  gl.render(scene, cameras[cameras.current])

  requestAnimationFrame(render)
}
requestAnimationFrame(render)
