
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

        // menangani thickness agar tidak lebih dari besar objek, atau lebih kecil dari 0
        if (thickness < 0 || thickness > width) {
            this.thickness = 0
        } else {
            this.thickness = thickness
        }
        const hw = width/2, hh = height/2, hd = depth/2, inhw = hw-thickness, inhh = hh-thickness, inhd = hd-thickness;

        // vertex yang digunakan mirip dengan BoxGeometry 
        // dengan tambahan vertex yang membuat objek hollow
        const vertices = new Float32Array([
        // Front cube part
            // Outer part
            //// Right
            inhw, inhh, hd,
            hw, 0, hd,
            hw, hh,  hd,
            inhw, -inhh, hd,
            hw, 0, hd,
            inhw, inhh, hd,
            hw, -hh,  hd,
            hw, 0, hd,
            inhw, -inhh, hd,
            //// Left
            -hw, hh,  hd,
            -hw, 0, hd,
            -inhw, inhh, hd,
            -inhw, inhh, hd,
            -hw, 0, hd,
            -inhw, -inhh, hd,
            -inhw, -inhh, hd,
            -hw, 0, hd,
            -hw, -hh,  hd,

            //// Top
            -inhw, inhh, hd,
            0, hh, hd,
            -hw, hh, hd,
            inhw, inhh, hd,
            0, hh, hd,
            -inhw, inhh, hd,
            hw, hh, hd,
            0, hh, hd,
            inhw, inhh, hd,
            //// Bottom
            -hw, -hh, hd,
            0, -hh, hd,
            -inhw, -inhh, hd,
            -inhw, -inhh, hd,
            0, -hh, hd,
            inhw, -inhh, hd,
            inhw, -inhh, hd,
            0, -hh, hd,
            hw, -hh, hd,

            // // Inner part
            // //// Right
            // hw, hh,  inhd,
            // hw, 0, inhd,
            // inhw, inhh, inhd,
            // inhw, inhh, inhd,
            // hw, 0, inhd,
            // inhw, -inhh, inhd,
            // inhw, -inhh, inhd,
            // hw, 0, inhd,
            // hw, -hh,  inhd,
            // //// Left
            // -inhw, inhh, inhd,
            // -hw, 0, inhd,
            // -hw, hh,  inhd,
            // -inhw, -inhh, inhd,
            // -hw, 0, inhd,
            // -inhw, inhh, inhd,
            // -hw, -hh,  inhd,
            // -hw, 0, inhd,
            // -inhw, -inhh, inhd,
            // //// Top
            // -hw, hh, inhd,
            // 0, hh, inhd,
            // -inhw, inhh, inhd,
            // -inhw, inhh, inhd,
            // 0, hh, inhd,
            // inhw, inhh, inhd,
            // inhw, inhh, inhd,
            // 0, hh, inhd,
            // hw, hh, inhd,
            // //// Bottom
            // -inhw, -inhh, inhd,
            // 0, -hh, inhd,
            // -hw, -hh, inhd,
            // inhw, -inhh, inhd,
            // 0, -hh, inhd,
            // -inhw, -inhh, inhd,
            // hw, -hh, inhd,
            // 0, -hh, inhd,
            // inhw, -inhh, inhd,

            // Hole part
            //// Top
            -inhw, inhh, inhd,
            inhw, inhh, inhd,
            inhw, inhh, hd,    
            -inhw, inhh, inhd,
            inhw, inhh, hd,    
            -inhw, inhh, hd,
            //// Bottom
            inhw, -inhh, hd,
            inhw, -inhh, inhd,
            -inhw, -inhh, inhd,
            -inhw, -inhh, hd,
            inhw, -inhh, hd,
            -inhw, -inhh, inhd,
            //// Right
            inhw, -inhh, inhd,
            inhw, inhh, hd,
            inhw, inhh, inhd,
            inhw, -inhh, hd,
            inhw, inhh, hd,
            inhw, -inhh, inhd,
            //// Left
            -inhw, inhh, inhd,
            -inhw, inhh, hd,
            -inhw, -inhh, inhd,
            -inhw, -inhh, inhd,
            -inhw, inhh, hd,
            -inhw, -inhh, hd,
        // Back cube part
            // Outer part
            //// Left
            -inhw, inhh, -hd,
            -hw, 0, -hd,
            -hw, hh,  -hd,
            -inhw, -inhh, -hd,
            -hw, 0, -hd,
            -inhw, inhh, -hd,
            -hw, -hh,  -hd,
            -hw, 0, -hd,
            -inhw, -inhh, -hd,
            //// Bottom
            -inhw, -inhh, -hd,
            0, -hh, -hd,
            -hw, -hh, -hd,
            inhw, -inhh, -hd,
            0, -hh, -hd,
            -inhw, -inhh, -hd,
            hw, -hh, -hd,
            0, -hh, -hd,
            inhw, -inhh, -hd,
            //// Right
            hw, hh,  -hd,
            hw, 0, -hd,
            inhw, inhh, -hd,
            inhw, inhh, -hd,
            hw, 0, -hd,
            inhw, -inhh, -hd,
            inhw, -inhh, -hd,
            hw, 0, -hd,
            hw, -hh,  -hd,
            //// Top
            -hw, hh, -hd,
            0, hh, -hd,
            -inhw, inhh, -hd,
            -inhw, inhh, -hd,
            0, hh, -hd,
            inhw, inhh, -hd,
            inhw, inhh, -hd,
            0, hh, -hd,
            hw, hh, -hd,
            // Inner part
            // //// Left
            // -hw, hh,  -inhd,
            // -hw, 0, -inhd,
            // -inhw, inhh, -inhd,
            // -inhw, inhh, -inhd,
            // -hw, 0, -inhd,
            // -inhw, -inhh, -inhd,
            // -inhw, -inhh, -inhd,
            // -hw, 0, -inhd,
            // -hw, -hh,  -inhd,
            // //// Bottom
            // -hw, -hh, -inhd,
            // 0, -hh, -inhd,
            // -inhw, -inhh, -inhd,
            // -inhw, -inhh, -inhd,
            // 0, -hh, -inhd,
            // inhw, -inhh, -inhd,
            // inhw, -inhh, -inhd,
            // 0, -hh, -inhd,
            // hw, -hh, -inhd,
            // //// Right
            // inhw, inhh, -inhd,
            // hw, 0, -inhd,
            // hw, hh,  -inhd,
            // inhw, -inhh, -inhd,
            // hw, 0, -inhd,
            // inhw, inhh, -inhd,
            // hw, -hh,  -inhd,
            // hw, 0, -inhd,
            // inhw, -inhh, -inhd,
            // //// Top
            // -inhw, inhh, -inhd,
            // 0, hh, -inhd,
            // -hw, hh, -inhd,
            // inhw, inhh, -inhd,
            // 0, hh, -inhd,
            // -inhw, inhh, -inhd,
            // hw, hh, -inhd,
            // 0, hh, -inhd,
            // inhw, inhh, -inhd,
            // Hole part
            //// Top
            inhw, inhh, -hd,    
            inhw, inhh, -inhd,
            -inhw, inhh, -inhd,
            -inhw, inhh, -hd,
            inhw, inhh, -hd,    
            -inhw, inhh, -inhd,
            //// Bottom
            -inhw, -inhh, -inhd,
            inhw, -inhh, -inhd,
            inhw, -inhh, -hd,
            -inhw, -inhh, -inhd,
            inhw, -inhh, -hd,
            -inhw, -inhh, -hd,
            //// Right
            inhw, inhh, -inhd,
            inhw, inhh, -hd,
            inhw, -inhh, -inhd,
            inhw, -inhh, -inhd,
            inhw, inhh, -hd,
            inhw, -inhh, -hd,
            //// Left
            -inhw, -inhh, -inhd,
            -inhw, inhh, -hd,
            -inhw, inhh, -inhd,
            -inhw, -inhh, -hd,
            -inhw, inhh, -hd,
            -inhw, -inhh, -inhd,
        // Right cube part
            // Outer part
            //// Left
            hw, hh,  hd,
            hw, 0, hd,
            hw, inhh, inhd,
            hw, inhh, inhd,
            hw, 0, hd,
            hw, -inhh, inhd,
            hw, -inhh, inhd,
            hw, 0, hd,
            hw, -hh,  hd,
            //// Right
            hw, inhh, -inhd,
            hw, 0, -hd,
            hw, hh,  -hd,
            hw, -inhh, -inhd,
            hw, 0, -hd,
            hw, inhh, -inhd,
            hw, -hh,  -hd,
            hw, 0, -hd,
            hw, -inhh, -inhd,
            //// Top
            hw, hh, -hd,
            hw, hh, 0,
            hw, inhh, -inhd,
            hw, inhh, -inhd,
            hw, hh, 0,
            hw, inhh, inhd,
            hw, inhh, inhd,
            hw, hh, 0,
            hw, hh, hd,
            //// Bottom
            hw, -inhh, -inhd,
            hw, -hh, 0,
            hw, -hh, -hd,
            hw, -inhh, inhd,
            hw, -hh, 0,
            hw, -inhh, -inhd,
            hw, -hh, hd,
            hw, -hh, 0,
            hw, -inhh, inhd,
            // Inner part
            //// TODO?
            // Hole part
            //// Top
            inhw, inhh, inhd,
            inhw, inhh, -inhd,
            hw, inhh, inhd,    
            hw, inhh, inhd,    
            inhw, inhh, -inhd,
            hw, inhh, -inhd,
            //// Bottom
            hw, -inhh, inhd,    
            inhw, -inhh, -inhd,
            inhw, -inhh, inhd,
            hw, -inhh, -inhd,
            inhw, -inhh, -inhd,
            hw, -inhh, inhd,    
            //// Right
            inhw, -inhh, -inhd,
            hw, inhh, -inhd,
            inhw, inhh, -inhd,
            hw, -inhh, -inhd,
            hw, inhh, -inhd,
            inhw, -inhh, -inhd,
            //// Left
            inhw, inhh, inhd,
            hw, inhh, inhd,
            inhw, -inhh, inhd,
            inhw, -inhh, inhd,
            hw, inhh, inhd,
            hw, -inhh, inhd,
        // Left cube part
            // Outer part
            //// Left
            -hw, inhh, inhd,
            -hw, 0, hd,
            -hw, hh,  hd,
            -hw, -inhh, inhd,
            -hw, 0, hd,
            -hw, inhh, inhd,
            -hw, -hh,  hd,
            -hw, 0, hd,
            -hw, -inhh, inhd,
            //// Right
            -hw, hh,  -hd,
            -hw, 0, -hd,
            -hw, inhh, -inhd,
            -hw, inhh, -inhd,
            -hw, 0, -hd,
            -hw, -inhh, -inhd,
            -hw, -inhh, -inhd,
            -hw, 0, -hd,
            -hw, -hh,  -hd,
            //// Top
            -hw, inhh, -inhd,
            -hw, hh, 0,
            -hw, hh, -hd,
            -hw, inhh, inhd,
            -hw, hh, 0,
            -hw, inhh, -inhd,
            -hw, hh, hd,
            -hw, hh, 0,
            -hw, inhh, inhd,
            //// Bottom
            -hw, -hh, -hd,
            -hw, -hh, 0,
            -hw, -inhh, -inhd,
            -hw, -inhh, -inhd,
            -hw, -hh, 0,
            -hw, -inhh, inhd,
            -hw, -inhh, inhd,
            -hw, -hh, 0,
            -hw, -hh, hd,
            // Inner part
            //// TODO?
            // Hole part
            //// Top
            -hw, inhh, inhd,    
            -inhw, inhh, -inhd,
            -inhw, inhh, inhd,
            -hw, inhh, -inhd,
            -inhw, inhh, -inhd,
            -hw, inhh, inhd,    
            //// Bottom
            -inhw, -inhh, inhd,
            -inhw, -inhh, -inhd,
            -hw, -inhh, inhd,    
            -hw, -inhh, inhd,    
            -inhw, -inhh, -inhd,
            -hw, -inhh, -inhd,
            //// Right
            -inhw, inhh, -inhd,
            -hw, inhh, -inhd,
            -inhw, -inhh, -inhd,
            -inhw, -inhh, -inhd,
            -hw, inhh, -inhd,
            -hw, -inhh, -inhd,
            //// Left
            -inhw, -inhh, inhd,
            -hw, inhh, inhd,
            -inhw, inhh, inhd,
            -hw, -inhh, inhd,
            -hw, inhh, inhd,
            -inhw, -inhh, inhd,
        // Top cube part
            // Outer
            //// Top
            -inhw, hh, -inhd,
            0, hh, -hd,
            -hw, hh, -hd,
            inhw, hh, -inhd,
            0, hh, -hd,
            -inhw, hh, -inhd,
            hw, hh, -hd,
            0, hh, -hd,
            inhw, hh, -inhd,
            //// Bottom
            -hw, hh, hd,
            0, hh, hd,
            -inhw, hh, inhd,
            -inhw, hh, inhd,
            0, hh, hd,
            inhw, hh, inhd,
            inhw, hh, inhd,
            0, hh, hd,
            hw, hh, hd,
            //// Right
            inhw, hh, -inhd,
            hw, hh, 0,
            hw, hh, -hd,
            inhw, hh, inhd,
            hw, hh, 0,
            inhw, hh, -inhd,
            hw, hh, hd,
            hw, hh, 0,
            inhw, hh, inhd,
            //// Left
            -hw, hh, -hd,
            -hw, hh, 0,
            -inhw, hh, -inhd,
            -inhw, hh, -inhd,
            -hw, hh, 0,
            -inhw, hh, inhd,
            -inhw, hh, inhd,
            -hw, hh, 0,
            -hw, hh, hd,
            // Inner
            //// TODO ?
            // Hole part
            //// Top
            -inhw, inhh, -inhd,
            inhw, inhh, -inhd,
            inhw, hh, -inhd,
            inhw, hh, -inhd,
            -inhw, hh, -inhd,
            -inhw, inhh, -inhd,
            //// Bottom
            inhw, hh, inhd,
            inhw, inhh, inhd,
            -inhw, inhh, inhd,
            -inhw, inhh, inhd,
            -inhw, hh, inhd,
            inhw, hh, inhd,
            //// Right
            inhw, hh, -inhd,
            inhw, inhh, -inhd,
            inhw, inhh, inhd,
            inhw, inhh, inhd,
            inhw, hh, inhd,
            inhw, hh, -inhd,
            //// Left
            -inhw, inhh, inhd,
            -inhw, inhh, -inhd,
            -inhw, hh, -inhd,
            -inhw, hh, -inhd,
            -inhw, hh, inhd,
            -inhw, inhh, inhd,
        // Bottom cube part
            // Outer
            //// Top
            -hw, -hh, -hd,
            0, -hh, -hd,
            -inhw, -hh, -inhd,
            -inhw, -hh, -inhd,
            0, -hh, -hd,
            inhw, -hh, -inhd,
            inhw, -hh, -inhd,
            0, -hh, -hd,
            hw, -hh, -hd,
            //// Bottom
            -inhw, -hh, inhd,
            0, -hh, hd,
            -hw, -hh, hd,
            inhw, -hh, inhd,
            0, -hh, hd,
            -inhw, -hh, inhd,
            hw, -hh, hd,
            0, -hh, hd,
            inhw, -hh, inhd,
            //// Right
            hw, -hh, -hd,
            hw, -hh, 0,
            inhw, -hh, -inhd,
            inhw, -hh, -inhd,
            hw, -hh, 0,
            inhw, -hh, inhd,
            inhw, -hh, inhd,
            hw, -hh, 0,
            hw, -hh, hd,
            //// Left
            -inhw, -hh, -inhd,
            -hw, -hh, 0,
            -hw, -hh, -hd,
            -inhw, -hh, inhd,
            -hw, -hh, 0,
            -inhw, -hh, -inhd,
            -hw, -hh, hd,
            -hw, -hh, 0,
            -inhw, -hh, inhd,
            // Inner
            //// TODO ?
            // Hole part
            //// Top
            inhw, -hh, -inhd,
            inhw, -inhh, -inhd,
            -inhw, -inhh, -inhd,
            -inhw, -inhh, -inhd,
            -inhw, -hh, -inhd,
            inhw, -hh, -inhd,
            //// Bottom
            -inhw, -inhh, inhd,
            inhw, -inhh, inhd,
            inhw, -hh, inhd,
            inhw, -hh, inhd,
            -inhw, -hh, inhd,
            -inhw, -inhh, inhd,
            //// Right
            inhw, -inhh, inhd,
            inhw, -inhh, -inhd,
            inhw, -hh, -inhd,
            inhw, -hh, -inhd,
            inhw, -hh, inhd,
            inhw, -inhh, inhd,
            //// Left
            -inhw, -hh, -inhd,
            -inhw, -inhh, -inhd,
            -inhw, -inhh, inhd,
            -inhw, -inhh, inhd,
            -inhw, -hh, inhd,
            -inhw, -hh, -inhd,
        ]);
        this.setAttribute('position', new BufferAttribute(vertices, 3));
        this.calculateNormals();
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
