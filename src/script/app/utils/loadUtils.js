import { JSONDeserializer } from "../../modules/core/index.js"

export function loadUtil(onSceneLoad) {
  const loadButton = document.getElementById("loadbtn")
  loadButton.addEventListener("click", () => {
    var input = document.createElement("input")
    input.type = "file"
    input.accept = "application/json"
    document.body.appendChild(input); // Append input to body
    input.style.display = 'none'; // Hide the input element
    input.click()
    input.addEventListener("change", () => {
        const file = input.files[0]
        const reader = new FileReader()
        reader.onload = function (e) {
          const json = JSON.parse(e.target.result)
          const res = JSONDeserializer(json.scenes[0])
          onSceneLoad(res)
        }
        reader.readAsText(file)
    })
  })
}