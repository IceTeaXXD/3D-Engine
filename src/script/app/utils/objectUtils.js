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

  object.rotateX(rotateX.value)
  object.rotateY(rotateY.value)
  object.rotateZ(rotateZ.value)

  object.scale.x = scaleX.value
  object.scale.y = scaleY.value
  object.scale.z = scaleZ.value

  object.position.x = translateX.value
  object.position.y = translateY.value
  object.position.z = translateZ.value

  rotateX.oninput = function () {
    console.log(this.value)
    object.rotateX(this.value)
  }

  rotateY.oninput = function () {
    object.rotateY(this.value)
  }

  rotateZ.oninput = function () {
    object.rotateZ(this.value)
  }

  scaleX.oninput = function () {
    object.scale.x = this.value
  }

  scaleY.oninput = function () {
    object.scale.y = this.value
  }

  scaleZ.oninput = function () {
    object.scale.z = this.value
  }

  translateX.oninput = function () {
    object.position.x = this.value
  }

  translateY.oninput = function () {
    object.position.y = this.value
  }

  translateZ.oninput = function () {
    object.position.z = this.value
  }
}
