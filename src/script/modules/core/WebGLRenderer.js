import { Listener } from "./Listener.js"
import {
  createProgram,
  createShader,
  setAttributes,
  setUniforms
} from "./WebGLUtils.js"
import { Mesh } from "./Mesh.js"
import { ShaderMaterial } from "../materials/ShaderMaterial.js"
import { ShaderTypes } from "./GLTypes.js"

export class WebGLRenderer extends Listener {
  /** @type {WebGLRenderingContext?} */
  #gl
  /** @type {HTMLCanvasElement} */
  #canvas
  /** @type {Object<string, ProgramInfo>} */
  #shaderCache = {}
  /** @type {ProgramInfo} */
  #currentProgram = null

  constructor(canvas = null) {
    super()
    this.#canvas = canvas
    if (typeof canvas === "string" || canvas instanceof String)
      this.#canvas = document.querySelector(canvas)
    this.#gl = this.#canvas.getContext("webgl")
    if (!this.#gl) {
      alert("Unable to initialize WebGL.")
    }
    this.setViewport(0, 0, this.#canvas.clientWidth, this.#canvas.clientHeight)
    this.adjustCanvas()
    const ro = new ResizeObserver(this.adjustCanvas.bind(this))
    ro.observe(this.#canvas, { box: "content-box" })
  }

  setViewport(x, y, width, height) {
    this.#gl.viewport(x, y, width, height)
  }

  adjustCanvas() {
    const canvas = this.#canvas
    const dw = canvas.clientWidth
    const dh = canvas.clientHeight
    if (canvas.width !== dw || canvas.height !== dh) {
      this.dispatchEvent({ type: "resize", width: dw, height: dh })
      canvas.width = dw
      canvas.height = dh
      this.setViewport(0, 0, dw, dh)
    }
  }

  createOrGetMaterial(material) {
    if (material instanceof ShaderMaterial) {
      const progId = material.id
      if (!(progId in this.#shaderCache)) {
        this.#shaderCache[progId] = createProgram(
          this.#gl,
          createShader(this.#gl, material.vertexShader, ShaderTypes.VERTEX),
          createShader(this.#gl, material.fragmentShader, ShaderTypes.FRAGMENT)
        )
      }
      return this.#shaderCache[progId]
    } else {
      throw new Error("Unsupported material type.")
    }
  }

  setProgramInfo(ProgramInfo) {
    if (this.#currentProgram !== ProgramInfo) {
      this.#gl.useProgram(ProgramInfo.program)
      this.#currentProgram = ProgramInfo
    }
  }

  configureTexture(url) {
    const gl = this.#gl;
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);    
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 0, 0])
    );
    const image = new Image();
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image
      );
      // WebGL1 has different requirements for power of 2 images
      // vs non power of 2 images so check if the image is a
      // power of 2 in both dimensions.
      if (this.isPowerOf2(image.width) && this.isPowerOf2(image.height)) {
        // Yes, it's a power of 2. Generate mips.
        gl.generateMipmap(gl.TEXTURE_2D);
      } else {
        // No, it's not a power of 2. Turn off mips and set
        // wrapping to clamp to edge
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }
    };
    image.src = url;

    return texture;
  }

  isPowerOf2(value) {
    return (value & (value - 1)) === 0;
  }

  render(Scene, Camera) {
    let gl = this.#gl
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.enable(gl.CULL_FACE)
    gl.enable(gl.DEPTH_TEST)

    const defaultUniform = {
      cameraPosition: Camera.worldPosition,
      viewMatrix: Camera.getProjectionMatrix()
    }

    // console.log(defaultUniform);

    this.renderObject(Scene, defaultUniform)
  }

  /**
     * Render object recursively.
     * 
     * @param {Node} object Object to render.
     * @param {{resolution: [number, number], time: number, viewMatrix: M4}} uniforms Default uniforms for every object to use.
     */
  renderObject(object, uniforms) {
    if (!object.visible) return
    object.computeWorldMatrix(false, true)
    if (object instanceof Mesh && object.geometry.getAttribute("position")) {
      /** @type {ShaderMaterial} */
      const material = object.material
      /** @type {ProgramInfo} */
      const info = this.createOrGetMaterial(material)
      this.setProgramInfo(info)
      setAttributes(this.#currentProgram, object.geometry.attributes)
      setUniforms(this.#currentProgram, {
        ...object.material.uniforms,
        ...uniforms,
        worldMatrix: object.worldMatrix,
        useVertexColor: object.geometry.useVertexColors
      })
      this.#gl.drawArrays(
        this.#gl.TRIANGLES,
        0,
        object.geometry.getAttribute("position").count
      )
    }
    for (let key in object.children) {
      this.renderObject(object.children[key], uniforms)
    }
  }
}