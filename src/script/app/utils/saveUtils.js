import { Scene } from "../../modules/core/index.js"

/**
 * @param {Array<Scene>} scenes
 */
export function saveUtil(scenes) {
  const button = document.getElementById("save")
  button.addEventListener("click", () => {
    const res = {}
    res.scenes = scenes.map((scene) => scene.toJSON())
    const file = new Blob([JSON.stringify(res, null, 2)], {
      type: "application/json"
    })
    const a = document.createElement("a")
    a.href = URL.createObjectURL(file)
    a.download = "scene-" + new Date().toLocaleString().replace(/[^0-9]/g, "-") + ".json"
    a.click()
  })
}
