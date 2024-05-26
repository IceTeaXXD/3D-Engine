import { ShaderMaterial } from "./ShaderMaterial.js"
import { PhongMaterial } from "./PhongMaterial.js"
import { BasicMaterial } from "./BasicMaterial.js"
import { Color } from "./Color.js"

const MaterialDeserializer = (json) => {
  switch (json.type) {
    case "ShaderMaterial":
      return ShaderMaterial.fromJSON(json)
    case "PhongMaterial":
      return PhongMaterial.fromJSON(json)
    case "BasicMaterial":
      return BasicMaterial.fromJSON(json)
    case "Color":
      return Color.fromJSON(json)
  }
}

export {
  ShaderMaterial,
  PhongMaterial,
  BasicMaterial,
  Color,
  MaterialDeserializer
}
