import { Mesh } from "./Mesh.js"
import { Node } from "./Node.js"
import { ShaderTypes, WebGLTypes, WebGLTypeSetter } from "./GLTypes.js"
import { Scene } from "./Scene.js"
import { WebGLRenderer } from "./WebGLRenderer.js"

const JSONDeserializer = (json) => {
  switch (json.type) {
    case "Node":
      return Node.fromJSON(json)
    case "Mesh":
      return Mesh.fromJSON(json)
    case "Scene":
      return Scene.fromJSON(json)
  }
}

export {
  ShaderTypes,
  WebGLTypes,
  WebGLTypeSetter,
  Node,
  Scene,
  WebGLRenderer,
  Mesh,
  JSONDeserializer
}
