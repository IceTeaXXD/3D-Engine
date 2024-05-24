import { ArticulatedModel } from "../../modules/objects/ArticulatedModel/index.js"
import fox from "./fox.js"

const model = ArticulatedModel.fromModelDefinition(fox)
model.scale.mul(5)

export default model
