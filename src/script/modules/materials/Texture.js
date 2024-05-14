export class Texture {
    /**@type {HTMLImageElement} */
    image
    
    /**@type {number} */
    wrapS

    /**@type {number} */
    wrapT

    /**@type {number} */
    magFilter

    /**@type {number} */
    minFilter

    /**@type {WebGLTextureType} */
    format

    /** @type {WebGLType} */
    dtype

    /**@type {boolean} */
    generateMipmaps


    constructor() {
        this.wrapS = 33071
        this.wrapT = 33071
        this.magFilter = 9729
        this.minFilter = 9729
        this.format = 6408
        this.dtype = 5121
        this.generateMipmaps = true
    }

    // set(index, data)

    // get(index, size): number[]
}