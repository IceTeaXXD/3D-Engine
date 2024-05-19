import { BufferAttribute } from "./BufferAttribute.js"
import { BufferGeometry } from "./BufferGeometry.js"
import { BoxGeometry } from "./BoxGeometry.js"
import { HollowBoxGeometry } from "./HollowBoxGeometry.js"
import { HollowPrismGeometry } from "./HollowPrismGeometry.js"
import { HollowPyramidGeometry } from "./HollowPyramidGeometry.js"
import { PlaneGeometry } from "./PlaneGeometry.js"
import { TubeGeometry } from "./TubeGeometry.js"

const GeometryDeserializer = (json) => {
  switch (json.type) {
    case "BufferAttribute":
      return BufferAttribute.fromJSON(json)
    case "BufferGeometry":
      return BufferGeometry.fromJSON(json)
    case "BoxGeometry":
      return BoxGeometry.fromJSON(json)
    case "HollowBoxGeometry":
      return HollowBoxGeometry.fromJSON(json)
    case "HollowPrismGeometry":
      return HollowPrismGeometry.fromJSON(json)
    case "HollowPyramidGeometry":
      return HollowPyramidGeometry.fromJSON(json)
    case "PlaneGeometry":
      return PlaneGeometry.fromJSON(json)
    case "TubeGeometry":
      return TubeGeometry.fromJSON(json)
  }
}

export {
  BufferAttribute,
  BufferGeometry,
  BoxGeometry,
  HollowBoxGeometry,
  HollowPrismGeometry,
  HollowPyramidGeometry,
  PlaneGeometry,
  TubeGeometry,
  GeometryDeserializer
}
