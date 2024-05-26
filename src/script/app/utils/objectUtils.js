import { DEGTORAD, RADTODEG } from "../../modules/math/index.js"
import { Vector3 } from "../../modules/math/index.js"
import { Color } from "../../modules/materials/index.js"
import { PhongMaterial, BasicMaterial } from "../../modules/materials/index.js"

export function objectTransformations(object) {
  var color = new Color()

  var rotateX = document.getElementById("rotateX")
  var rotateY = document.getElementById("rotateY")
  var rotateZ = document.getElementById("rotateZ")

  var scaleX = document.getElementById("scaleX")
  var scaleY = document.getElementById("scaleY")
  var scaleZ = document.getElementById("scaleZ")

  var translateX = document.getElementById("translateX")
  var translateY = document.getElementById("translateY")
  var translateZ = document.getElementById("translateZ")

  var ambientColorPicker = document.getElementById("ambientcolor")
  var diffuseColorPicker = document.getElementById("diffusecolor")
  var specularColorPicker = document.getElementById("specularcolor")
  var basicColorPicker = document.getElementById("basiccolor")

  ambientColorPicker.oninput = function () {
    object.material.uniforms.ambient = color.setHex(this.value)
  }
  diffuseColorPicker.oninput = function () {
    object.material.uniforms.diffuse = color.setHex(this.value)
  }
  specularColorPicker.oninput = function () {
    object.material.uniforms.specular = color.setHex(this.value)
  }
  basicColorPicker.oninput = function () {
    object.material.uniforms.color = color.setHex(this.value)
  }

  var ambientClass = document.getElementsByClassName("ambient-color")[0]
  var diffuseClass = document.getElementsByClassName("diffuse-color")[0]
  var specularClass = document.getElementsByClassName("specular-color")[0]
  var basicClass = document.getElementsByClassName("basic-color")[0]

  const radioButtons = document.querySelectorAll('input[name="optradio"]')

  if (object.material instanceof PhongMaterial) {
    radioButtons[0].checked = true
    ambientClass.style.display = "block"
    ambientColorPicker.value = object.material.uniforms.ambient.hex
    diffuseClass.style.display = "block"
    diffuseColorPicker.value = object.material.uniforms.diffuse.hex
    specularClass.style.display = "block"
    specularColorPicker.value = object.material.uniforms.specular.hex
    basicClass.style.display = "none"
  }
  if (object.material instanceof BasicMaterial) {
    radioButtons[1].checked = true
    ambientClass.style.display = "none"
    diffuseClass.style.display = "none"
    specularClass.style.display = "none"
    basicClass.style.display = "block"
    basicColorPicker.value = object.material.uniforms.color.hex
  }

  function getCheckedRadioValue() {
    for (const radioButton of radioButtons) {
      if (radioButton.checked) {
        return radioButton.value
      }
    }
  }

  radioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", () => {
      const checkedValue = getCheckedRadioValue()
      console.log(checkedValue)
      if (checkedValue === "Phong") {
        object.material = new PhongMaterial({})
        ambientClass.style.display = "block"
        diffuseClass.style.display = "block"
        specularClass.style.display = "block"
        basicClass.style.display = "none"
      }
      if (checkedValue === "Basic") {
        object.material = new BasicMaterial({})
        ambientClass.style.display = "none"
        diffuseClass.style.display = "none"
        specularClass.style.display = "none"
        basicClass.style.display = "block"
      }
    })
  })

  rotateX.value = Math.round(object.rotation.x * RADTODEG)
  rotateY.value = Math.round(object.rotation.y * RADTODEG)
  rotateZ.value = Math.round(object.rotation.z * RADTODEG)

  scaleX.value = object.scale.x
  scaleY.value = object.scale.y
  scaleZ.value = object.scale.z

  translateX.value = object.position.x
  translateY.value = object.position.y
  translateZ.value = object.position.z

  rotateX.oninput = function () {
    const value = parseInt(this.value, 10)
    if (!isNaN(value)) {
      object.rotation = new Vector3(
        DEGTORAD * value,
        object.rotation.y,
        object.rotation.z
      )
    }
  }

  rotateY.oninput = function () {
    const value = parseInt(this.value, 10)
    if (!isNaN(value)) {
      object.rotation = new Vector3(
        object.rotation.x,
        DEGTORAD * value,
        object.rotation.z
      )
    }
  }

  rotateZ.oninput = function () {
    const value = parseInt(this.value, 10)
    if (!isNaN(value)) {
      object.rotation = new Vector3(
        object.rotation.x,
        object.rotation.y,
        DEGTORAD * value
      )
    }
  }

  translateX.oninput = function () {
    const value = parseInt(this.value, 10)
    if (!isNaN(value)) object.position.x = value
  }

  translateY.oninput = function () {
    const value = parseInt(this.value, 10)
    if (!isNaN(value)) object.position.y = value
  }

  translateZ.oninput = function () {
    const value = parseInt(this.value, 10)
    if (!isNaN(value)) object.position.z = value
  }

  scaleX.oninput = function () {
    const value = parseInt(this.value, 10)
    if (!isNaN(value)) object.scale.x = value
  }

  scaleY.oninput = function () {
    const value = parseInt(this.value, 10)
    if (!isNaN(value)) object.scale.y = value
  }

  scaleZ.oninput = function () {
    const value = parseInt(this.value, 10)
    if (!isNaN(value)) object.scale.z = value
  }
}
