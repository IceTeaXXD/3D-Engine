
import { BufferAttribute, BufferGeometry } from "./index.js";

export class HollowBoxGeometry extends BufferGeometry {
    /**
     * @type {float}
     */
    thickness // mendefinisikan ketebalan hollowbox (jarak dari outer vertex dari box dan inner vertex box)

    constructor(width=1, height=1, depth=1, thickness=0) {
        super();
        this.width = width;
        this.height = height;
        this.depth = depth;
        thickness < 0 ? -1 * thickness : thickness;
        const hw = width/2, hh = height/2, hd = depth/2;
        const vertices = new Float32Array([
            // Front face
            -hw, hh,  hd,
            -hw, -hh, hd,
            hw,  -hh, hd,
            hw,  hh,  hd,
            -hw, hh, hd,
            hw,  -hh, hd,
            // Back face
            -hw, hh,  -hd,
            hw,  -hh, -hd,
            -hw, -hh, -hd,
            hw,  hh,  -hd,
            hw,  -hh, -hd,
            -hw, hh, -hd,
            // Top face
            -hw, hh,  -hd,
            -hw, hh,  hd,
            hw,  hh,  hd,
            hw,  hh,  -hd,
            -hw, hh, -hd,
            hw,  hh,  hd,
            // Bottom face
            -hw, -hh, -hd,
            hw,  -hh, -hd,
            hw,  -hh, hd,
            -hw, -hh, hd,
            -hw, -hh, -hd,
            hw,  -hh, hd,
            // Right face
            hw,  -hh, -hd,
            hw,  hh,   hd,
            hw,  -hh,  hd,
            hw,  -hh, -hd,
            hw,  hh,   -hd,
            hw,  hh,   hd,
            // Left face
            -hw, -hh, -hd,
            -hw, hh,  hd,
            -hw, hh,  -hd,
            -hw, -hh, -hd,
            -hw, -hh, hd,
            -hw, hh,  hd,
            
            // Inner Front face
            -hw+thickness, hh-thickness,  hd-thickness,
            -hw+thickness, -hh+thickness, hd-thickness,
            hw-thickness,  -hh+thickness, hd-thickness,
            hw-thickness,  hh-thickness,  hd-thickness,
            -hw+thickness, hh-thickness, hd-thickness,
            hw-thickness,  -hh+thickness, hd-thickness,
            // Inner Back face
            -hw+thickness, hh-thickness,  -hd+thickness,
            hw-thickness,  -hh+thickness, -hd+thickness,
            -hw+thickness, -hh+thickness, -hd+thickness,
            hw-thickness,  hh-thickness,  -hd+thickness,
            hw-thickness,  -hh+thickness, -hd+thickness,
            -hw+thickness, hh+thickness, -hd+thickness,
            // Inner Top face
            -hw+thickness, hh-thickness,  -hd+thickness,
            -hw+thickness, hh-thickness,  hd-thickness,
            hw-thickness,  hh-thickness,  hd-thickness,
            hw-thickness,  hh-thickness,  -hd+thickness,
            -hw+thickness, hh-thickness, -hd+thickness,
            hw-thickness,  hh-thickness,  hd-thickness,
            // Inner Bottom face
            -hw+thickness, -hh+thickness, -hd+thickness,
            hw-thickness,  -hh+thickness, -hd+thickness,
            hw-thickness,  -hh+thickness, hd-thickness,
            -hw+thickness, -hh+thickness, hd-thickness,
            -hw+thickness, -hh+thickness, -hd+thickness,
            hw-thickness,  -hh+thickness, hd-thickness,
            // Inner Right face
            hw-thickness,  -hh+thickness, -hd+thickness,
            hw-thickness,  hh-thickness,   hd-thickness,
            hw-thickness,  -hh+thickness,  hd-thickness,
            hw-thickness,  -hh+thickness, -hd+thickness,
            hw-thickness,  hh-thickness,   -hd+thickness,
            hw-thickness,  hh-thickness,   hd-thickness,
            // Inner Left face
            -hw+thickness, -hh+thickness, -hd+thickness,
            -hw+thickness, hh-thickness,  hd-thickness,
            -hw+thickness, hh-thickness,  -hd+thickness,
            -hw+thickness, -hh+thickness, -hd+thickness,
            -hw+thickness, -hh+thickness, hd-thickness,
            -hw+thickness, hh-thickness,  hd-thickness,
        ]);
        this.setAttribute('position', new BufferAttribute(vertices, 3));
        // this.calculateNormals();
    }

    get type() {
        return "HollowBoxGeometry";
    }

    toJSON() {
        const data = super.toJson();
        delete data.attributes.position;
        return {
            ...data,
            width: this.width,
            height: this.height,
            depth: this.depth,
            type: this.type,
            thickness: this.thickness,
        };
    }

    static fromJSON(json, geom) {
        if(!geom) geom = new HollowBoxGeometry(json.width, json.height, json.depth, json.thickness);
        BufferGeometry.fromJson(json, geom);
        return geom;
    }
}
