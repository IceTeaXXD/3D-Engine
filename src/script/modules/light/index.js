import { DirectionalLight } from "./DirectionalLight.js"
import { Light } from "./Light.js"

const JSONDeserializer = (json) => {
  switch (json.type) {
    case "Light":
      return Light.fromJSON(json)
    case "DirectionalLight":
      return DirectionalLight.fromJSON(json)
  }
}

export {
  Light,
  DirectionalLight,
  JSONDeserializer,
}
