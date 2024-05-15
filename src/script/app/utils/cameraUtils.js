export function cameraUtils(camera) {
    var radiusCamera = document.getElementById("radiusCamera");
    camera.position.z = radiusCamera.value;

    radiusCamera.oninput = function() {
        camera.position.z = this.value;
    }
}