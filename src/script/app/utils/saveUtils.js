import { Scene } from "../../modules/core/Scene.js"

/**
 * @param {Array<Scene>} scenes
 */
export function saveUtil(scenes) {
  const res = {}
  // res.scene = Array.from({ length: scenes.length }, (_, i) => i)
  res.scenes = scenes.map((scene) => scene.toJSON())
  // download to json
  const a = document.createElement("a")
  const file = new Blob([JSON.stringify(res, null, 2)], { type: "application/json" })
  a.href = URL.createObjectURL(file)
  a.download = "scene.json"
  a.click()
}
