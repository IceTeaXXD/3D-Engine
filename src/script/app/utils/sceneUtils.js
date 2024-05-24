import { Scene } from "../../modules/core/index.js"

/**
 *
 * @param {HTMLCanvasElement} canvas
 */
export function SceneColorPicker(canvas) {
  canvas.width = window.innerWidth - 610
  canvas.height = window.innerHeight - 70
  canvas.style.backgroundColor = "black"
  const sceneColorPicker = document.getElementById("scenecolor")
  sceneColorPicker.oninput = function () {
    canvas.style.backgroundColor = this.value
  }
}

/**
 * @param {Scene} scene
 */
export function SceneComponentController(scene) {
  const SceneObjects = []
  // add all scene objects to SceneObjects array
  scene.children.forEach((child) => {
    SceneObjects.push(child)
  })
  // update component tree
  const updateComponentTree = () => {
    const tree = document.getElementById("component-tree")
    SceneObjects.forEach((object) => {
      const li = document.createElement("li")
      li.innerText = object.name
      tree.appendChild(li)
    })
  }
  updateComponentTree()
}