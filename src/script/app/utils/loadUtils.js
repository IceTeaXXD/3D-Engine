import { JSONDeserializer } from "../../modules/core/index.js"

export function loadUtil(scene, selectedObject, Interface) {
  const loadButton = document.getElementById("load")
  loadButton.addEventListener("click", () => {
    var input = document.createElement("input")
    input.type = "file"
    input.accept = "application/json"
    document.body.appendChild(input);
    input.style.display = 'none';
    input.click()
    input.addEventListener("change", () => {
        const file = input.files[0]
        const reader = new FileReader()
        reader.onload = function (e) {
          const json = JSON.parse(e.target.result)
          const res = JSONDeserializer(json.scene)
          res.children.forEach((child) => {
            scene.add(child)
            selectedObject = child
            Interface.createComponent(child.type + "-" + scene.children.length, scene, selectedObject)
          })
        }
        reader.readAsText(file)
    })
  })
}