import { DEGTORAD, RADTODEG } from "../../modules/math/index.js"
import { Vector3 } from "../../modules/math/index.js"

export function objectTransformations(object) {
  $(document).ready(function () {
    let dragging = false
    let startX, startValue

    $(".draggable-number-input").on("mousedown", function (event) {
      dragging = true
      startX = event.pageX
      startValue = parseInt($(this).val()) || 0
      $("body").addClass("no-select dragging-cursor")
      $(this).addClass("active-drag")
    })

    $(document).on("mousemove", function (event) {
      if (dragging) {
        let change = event.pageX - startX
        let newValue = startValue + change
        let min = parseInt($(".active-drag").attr("min"))
        let max = parseInt($(".active-drag").attr("max"))
        newValue = Math.min(Math.max(newValue, min), max)
        $(".active-drag").val(newValue)
        $(".active-drag").trigger("input")
      }
    })

    $(document).on("mouseup", function () {
      dragging = false
      $("body").removeClass("no-select dragging-cursor")
      $(".draggable-number-input").removeClass("active-drag")
    })
  })

  var rotateX = document.getElementById("rotateX")
  var rotateY = document.getElementById("rotateY")
  var rotateZ = document.getElementById("rotateZ")

  var scaleX = document.getElementById("scaleX")
  var scaleY = document.getElementById("scaleY")
  var scaleZ = document.getElementById("scaleZ")

  var translateX = document.getElementById("translateX")
  var translateY = document.getElementById("translateY")
  var translateZ = document.getElementById("translateZ")

rotateX.value = Math.round(object.rotation.x * RADTODEG);
rotateY.value = Math.round(object.rotation.y * RADTODEG);
rotateZ.value = Math.round(object.rotation.z * RADTODEG);

  scaleX.value = object.scale.x
  scaleY.value = object.scale.y
  scaleZ.value = object.scale.z

  translateX.value = object.position.x
  translateY.value = object.position.y
  translateZ.value = object.position.z

  rotateX.oninput = function () {
    const value = parseInt(this.value, 10)
    if (value)
      object.rotation = new Vector3(
        DEGTORAD * value,
        object.rotation.y,
        object.rotation.z
      )
  }

  rotateY.oninput = function () {
    const value = parseInt(this.value, 10)
    if (value)
      object.rotation = new Vector3(
        object.rotation.x,
        DEGTORAD * value,
        object.rotation.z
      )
  }

  rotateZ.oninput = function () {
    const value = parseInt(this.value, 10)
    if (value)
      object.rotation = new Vector3(
        object.rotation.x,
        object.rotation.y,
        DEGTORAD * value
      )
  }

  scaleX.oninput = function () {
    const value = parseInt(this.value, 10)
    if (value) object.scale.x = value
  }

  scaleY.oninput = function () {
    const value = parseInt(this.value, 10)
    if (value) object.scale.y = value
  }

  scaleZ.oninput = function () {
    const value = parseInt(this.value, 10)
    if (value) object.scale.z = value
  }

  translateX.oninput = function () {
    const value = parseInt(this.value, 10)
    if (value) object.position.x = value
  }

  translateY.oninput = function () {
    const value = parseInt(this.value, 10)
    if (value) object.position.y = value
  }

  translateZ.oninput = function () {
    const value = parseInt(this.value, 10)
    if (value) object.position.z = value
  }
}
