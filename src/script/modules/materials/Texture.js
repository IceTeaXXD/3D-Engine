import { ShaderMaterial } from "./ShaderMaterial.js";
import textureFrag from "./shaders/texture.frag.js";
import textureVert from "./shaders/texture.vert.js";

export class Texture extends ShaderMaterial {
    /**
     * Creates an instance of Texture.
     * @param {{name: string, sampler: WebGLTexture}} options
     * @memberof Texture
     */
    constructor(options = {}) {
        const { name, sampler } = options;
        super({
            name,
            vertexShader: textureVert,
            fragmentShader: textureFrag,
            uniforms: {
                sampler: sampler || null,
            }
        });
    }

    get id() {
        return "Texture";
    }

    /** @type {WebGLTexture} */
    get sampler() {
        return this.uniforms['sampler'];
    }

    set sampler(val) {
        this.uniforms['sampler'] = val;
    }

    get type() {
        return 'Texture';
    }

    toJSON() {
        const { vertexShader, fragmentShader, ...other } = super.toJSON();
        return {
            ...other,
            type: this.type,
        };
    }

    static fromJSON(json) {
        const obj = new Texture(json);
        ShaderMaterial.fromJSON(json, obj);
        return obj;
    }
}
