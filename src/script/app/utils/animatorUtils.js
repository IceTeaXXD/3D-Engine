import { Node } from "../../modules/core/index.js"
import { Vector3 } from "../../modules/math/Vector3.js"
import { DEGTORAD } from "../../modules/math/index.js"
/**
 *
 * @param {Node} object
 * @param {Array<{position: Vector3, rotation: Vector3}>} animation
 */
export function animator(object, animation, frame) {
  if (!object) return
  object.position.set(
    animation[frame].position.x,
    animation[frame].position.y,
    animation[frame].position.z
  )
  object.rotation = new Vector3(
    DEGTORAD * animation[frame].rotation.x,
    DEGTORAD * animation[frame].rotation.y,
    DEGTORAD * animation[frame].rotation.z
  )
}