import { Vector3 } from '../modules/math/Vector3.js';
import { WebGLRenderer } from '../modules/core/WebGLRenderer.js';
import { Scene } from '../modules/core/Scene.js';
import { Mesh } from '../modules/core/Mesh.js';
import { PlaneGeometry } from '../modules/geometry/PlaneGeometry.js';
import { BasicMaterial } from '../modules/materials/BasicMaterial.js';
import { Color } from '../modules/materials/Color.js';
import { PerspectiveCamera } from '../modules/camera/PerspectiveCamera.js';

const v = new Vector3();
const canvas = document.getElementById('canvas');
// set canvas color
canvas.style.backgroundColor = 'green';
const gl = new WebGLRenderer(canvas);

const plane = new Mesh(
    new PlaneGeometry(1000, 1000),
    new BasicMaterial({ color: Color.blue() })
);

const scene = new Scene();
plane.position.y = -300;
plane.scale.z = -1;
scene.add(plane);

const camera = new PerspectiveCamera(45, gl.width/gl.height, 0.1, 1000);

// render loop
function render() {
    requestAnimationFrame(render);
    gl.render(scene, camera);
}
render();