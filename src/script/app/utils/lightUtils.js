export function lightTransformations (object){
    var translateX = document.getElementById("translateLightX")
    var translateY = document.getElementById("translateLightY")
    var translateZ = document.getElementById("translateLightZ")

    translateX.value = object.position.x
    translateY.value = object.position.y
    translateZ.value = object.position.z

    translateX.oninput = function () {
        const value = parseInt(this.value, 10)
        if (!isNaN(value)) object.position.x = value;
    }

    translateY.oninput = function () {
        const value = parseInt(this.value, 10)
        if (!isNaN(value)) object.position.y = value
    }

    translateZ.oninput = function () {
        const value = parseInt(this.value, 10)
        if (!isNaN(value)) object.position.z = value
    }
}