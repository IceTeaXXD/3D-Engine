function changeCameraProjection(cameras, projection) {
  cameras.current = projection
  // changeCameraRadius(
  //   cameras,
  //   document.getElementById("radiusCamera").value
  // )
}

// function changeCameraRadius(cameras, radius) {
//   if (cameras.current == "perspective") {
//     cameras[cameras.current].position.z = radius
//   } else {
//     cameras[cameras.current].zoom = radius / 100
//   }
// }

export function cameraController(cameras) {

  var dropdownButton = document.querySelector(".dropdown-toggle")
  var dropdownItems = document.querySelectorAll(".dropdown-item")

  dropdownButton.textContent = dropdownItems[0].textContent

  dropdownItems.forEach(function (item) {
    item.addEventListener("click", function () {
      dropdownButton.textContent = this.textContent
      cameras.current = this.textContent.toLowerCase()
    })
  })

  // camera radius
  // var radiusCamera = document.getElementById("radiusCamera")

  // radiusCamera.oninput = function () {
  //   changeCameraRadius(cameras, this.value)
  // }

  // camera chooser
  // var projectionOptions = document.getElementById("projection-type")
  // projectionOptions.onchange = function () {
  //   changeCameraProjection(cameras, this.value)
  // }
}
