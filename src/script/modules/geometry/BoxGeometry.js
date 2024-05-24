
import { BufferAttribute, BufferGeometry } from "./index.js";

export class BoxGeometry extends BufferGeometry {
    constructor(width=1, height=1, depth=1) {
        super();
        this.width = width;
        this.height = height;
        this.depth = depth;
        const hw = width/2, hh = height/2, hd = depth/2;
        const vertices = new Float32Array([
            // Front face
            -hw, -hh, -hd,
            -hw, hh, -hd,
            hw,  -hh, -hd,
            -hw,  hh, -hd,
            hw, hh, -hd,
            hw,  -hh, -hd,
            // Back face
            -hw, -hh,  hd,
            hw,  -hh, hd,
            -hw, hh, hd,
            -hw,  hh,  hd,
            hw,  -hh, hd,
            hw, hh, hd,
            // Top face
            -hw, hh,  -hd,
            -hw, hh,  hd,
            hw,  hh, -hd,
            -hw,  hh,  hd,
            hw, hh,  hd,
            hw,  hh, -hd,
            // Bottom face
            -hw, -hh, -hd,
            hw,  -hh, -hd,
            -hw, -hh, hd,
            -hw,  -hh, hd,
            hw, -hh, -hd,
            hw,  -hh, hd,
            // Left face
            -hw, -hh, -hd,
            -hw, -hh,  hd,
            -hw, hh,  -hd,
            -hw, -hh, hd,
            -hw, hh, hd,
            -hw, hh, -hd,
            // Right face
            hw,  -hh, -hd,
            hw,  hh, -hd,
            hw,  -hh, hd,
            hw,  -hh, hd,
            hw,  hh, -hd,
            hw,  hh, hd,
        ]);
        this.setAttribute('position', new BufferAttribute(vertices, 3));
        const textureCoordinates = new Float32Array([
            // select the top left image
            0   , 0  ,
            0   , 0.5,
            0.25, 0  ,
            0   , 0.5,
            0.25, 0.5,
            0.25, 0  ,
            // select the top middle image
            0.25, 0  ,
            0.5 , 0  ,
            0.25, 0.5,
            0.25, 0.5,
            0.5 , 0  ,
            0.5 , 0.5,
            // select to top right image
            0.5 , 0  ,
            0.5 , 0.5,
            0.75, 0  ,
            0.5 , 0.5,
            0.75, 0.5,
            0.75, 0  ,
            // select the bottom left image
            0   , 0.5,
            0.25, 0.5,
            0   , 1  ,
            0   , 1  ,
            0.25, 0.5,
            0.25, 1  ,
            // select the bottom middle image
            0.25, 0.5,
            0.25, 1  ,
            0.5 , 0.5,
            0.25, 1  ,
            0.5 , 1  ,
            0.5 , 0.5,
            // select the bottom right image
            0.5 , 0.5,
            0.75, 0.5,
            0.5 , 1  ,
            0.5 , 1  ,
            0.75, 0.5,
            0.75, 1  ,
        ]);
        this.setAttribute('textureCoord', new BufferAttribute(textureCoordinates, 2));
        this.calculateNormals();
    }

    get type() {
        return "BoxGeometry";
    }

    toJSON() {
        const data = super.toJSON();
        return {
            ...data,
            width: this.width,
            height: this.height,
            depth: this.depth,
            type: this.type,
        };
    }

    static fromJson(json, geom) {
        if(!geom) geom = new BoxGeometry(json.width, json.height, json.depth);
        BufferGeometry.fromJSON(json, geom);
        return geom;
    }
}
