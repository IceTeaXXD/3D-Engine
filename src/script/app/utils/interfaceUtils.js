import { Scene } from "../../modules/core/index.js"
import { objectTransformations } from "./objectUtils.js"

/**
 *
 * @param {string} name
 * @param {Scene} scene
 * @param {Node} selectedObject
 */
export function createComponent(name, scene, selectedObject) {
  let component = document.createElement("div")
  component.classList.add("component")
  component.id = scene.children.length
  component.innerHTML = `<a>${name}</a>`
  document.querySelector(".components").appendChild(component)

  component.addEventListener("click", function () {
    let components = document.querySelectorAll(".component")
    components.forEach((c) => c.classList.remove("active"))
    this.classList.add("active")
    selectedObject = scene.children[this.id - 1]
    objectTransformations(selectedObject)
  })
}
