import { Scene } from "../../modules/core/index.js"

/**
 * @param {Array<Scene>} scenes
 */
export function saveUtil(scenes) {
  const button = document.getElementById("savebtn")
  button.addEventListener("click", () => {
    const res = {}
    res.scenes = scenes.map((scene) => scene.toJSON())
    const file = new Blob([JSON.stringify(res, null, 2)], {
      type: "application/json"
    })
    const a = document.createElement("a")
    a.href = URL.createObjectURL(file)
    a.download = "scene.json"
    a.click()
  })
}
