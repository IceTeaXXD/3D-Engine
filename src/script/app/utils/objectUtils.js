import { DEGTORAD } from "../../modules/math/index.js"

export function objectTransformations(object) {
  var rotateX = document.getElementById("rotateX")
  var rotateY = document.getElementById("rotateY")
  var rotateZ = document.getElementById("rotateZ")

  var scaleX = document.getElementById("scaleX")
  var scaleY = document.getElementById("scaleY")
  var scaleZ = document.getElementById("scaleZ")

  var translateX = document.getElementById("translateX")
  var translateY = document.getElementById("translateY")
  var translateZ = document.getElementById("translateZ")

  // object.rotateX(parseInt(rotateX.value, 10))
  // object.rotateY(parseInt(rotateY.value, 10))
  // object.rotateZ(parseInt(rotateZ.value, 10))

  // object.scale.x = parseInt(scaleX.value, 10)
  // object.scale.y = parseInt(scaleY.value, 10)
  // object.scale.z = parseInt(scaleZ.value, 10)

  // object.position.x = parseInt(translateX.value, 10)
  // object.position.y = parseInt(translateY.value, 10)
  // object.position.z = parseInt(translateZ.value, 10)

  rotateX.oninput = function () {
    object.rotateX(DEGTORAD * parseInt(this.value, 10))
  }

  rotateY.oninput = function () {
    object.rotateY(DEGTORAD * parseInt(this.value, 10))
  }

  rotateZ.oninput = function () {
    object.rotateZ(DEGTORAD * parseInt(this.value, 10))
  }

  scaleX.oninput = function () {
    object.scale.x = parseInt(this.value, 10)
  }

  scaleY.oninput = function () {
    object.scale.y = parseInt(this.value, 10)
  }

  scaleZ.oninput = function () {
    object.scale.z = parseInt(this.value, 10)
  }

  translateX.oninput = function () {
    object.position.x = parseInt(this.value, 10)
  }

  translateY.oninput = function () {
    object.position.y = parseInt(this.value, 10)
  }

  translateZ.oninput = function () {
    object.position.z = parseInt(this.value, 10)
  }
}
