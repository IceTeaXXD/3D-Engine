import { BufferAttribute, BufferGeometry } from './index.js';

export class HollowPyramidGeometry extends BufferGeometry {
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
        const theta = 45 * (Math.PI / 180);
        const cosTheta = Math.cos(theta);
        const sinTheta = Math.sin(theta);
        const tanTheta = Math.tan(theta);

         const vertices = new Float32Array([
        /// Square part
            /// Left part
            // Outer part
            -hw, -hh , -inhd - inhw * 0.3,
            -hw, -hh, 0,
            -hw, -inhh  + inhw * 0.1, -inhd - inhw * 0.3,
            -hw, -inhh + inhw* 0.1, -inhd - inhw * 0.3,
            -hw, -hh, 0,
            -hw, -inhh + inhw * 0.1, inhd + inhw * 0.3,
            -hw, -inhh + inhw * 0.1, inhd + inhw * 0.3,
            -hw, -hh, 0,
            -hw, -hh, hd,

            // Hole part
            -hw, -hh, hd,
            -hw, -hh, 0,
            -hw, -inhh + inhw * 0.1, inhd + inhw * 0.3,
            -hw, -inhh + inhw * 0.1, inhd + inhw * 0.3,
            -hw, -hh, 0,
            -hw, -inhh + inhw * 0.1, -inhd - inhw * 0.3,
            -hw, -inhh + inhw * 0.1, -inhd - inhw * 0.3,
            -hw, -hh, 0,
            -hw, -hh , -inhd - inhw * 0.3,

            /// Right part
            // Outer part
            hw, -inhh * 0.1 - inhw * 0.78, -inhd * 1.3,
            hw, -hh, 0,
            hw, -hh, -hd,
            hw, -inhh * 0.1 - inhw * 0.78, inhd * 1.3,
            hw, -hh, 0,
            hw, -inhh * 0.1 - inhw * 0.78, -inhd * 1.3,
            hw, -hh, hd, // kiri
            hw, -hh, 0,
            hw, -inhh * 0.1 - inhw * 0.78, inhd * 1.3, //atas

            // Hole part
            hw, -hh, -hd,
            hw, -hh, 0,
            hw, -inhh * 0.1 - inhw * 0.78, -inhd * 1.3,
            hw, -inhh * 0.1 - inhw * 0.78, -inhd * 1.3,
            hw, -hh, 0,
            hw, -inhh * 0.1 - inhw * 0.78, inhd * 1.3,
            hw, -inhh * 0.1 - inhw * 0.78, inhd * 1.3, // atas
            hw, -hh, 0,
            hw, -hh, hd, // kiri
               

            /// Front part
            // Outer part
            -inhw - inhh * 0.25, -hh, hd, // kiri
            0, -hh, hd, // kanan
            -inhw * 1.25, -inhh * 0.9, hd, 
            -inhw * 1.25, -inhh * 0.9, hd,
            0, -hh, hd,
            inhw + inhh * 0.25, -inhh * 0.9, hd,
            inhw + inhh * 0.25, -inhh * 0.9, hd,
            0, -hh, hd,
            hw, -hh, hd,
            // Hole part
            -inhw * 1.25, -inhh * 0.9, hd,
            0, -hh, hd, 
            -inhw - inhh * 0.25, -hh, hd,
            inhw + inhh * 0.25, -inhh * 0.9, hd,
            0, -hh, hd,
            -inhw * 1.25, -inhh * 0.9, hd,
            hw, -hh, hd,
            0, -hh, hd,
            inhw + inhh * 0.25, -inhh * 0.9, hd,

            // Back part
            // Outer part
            -hw, -inhh * 0.1 - inhw * 0.78, -hd,
            0, -hh, -hd,
            -hw, -hh, -hd,
            hw, -inhh * 0.1 - inhw * 0.78, -hd,
            0, -hh, -hd,
            -hw, -inhh * 0.1 - inhw * 0.78, -hd,
            hw, -hh, -hd,
            0, -hh, -hd,
            hw, -inhh * 0.1 - inhw * 0.78, -hd,
            // Hole part
            -hw, -hh, -hd,
            0, -hh, -hd,
            -hw, -inhh * 0.1 - inhw * 0.78, -hd,
            0, -hh, -hd,
            hw, -inhh * 0.1 - inhw * 0.78, -hd,
            -hw, -inhh * 0.1 - inhw * 0.78, -hd,
            0, -hh, -hd,
            hw, -hh, -hd,
            hw, -inhh * 0.1 - inhw * 0.78, -hd,


            //Bottom part
            // Outer part
            //top
            -hw, -hh, -hd,
            0, -hh, -hd,
            -inhw, -hh, -inhd,
            -inhw, -hh, -inhd,
            0, -hh, -hd,
            inhw, -hh, -inhd,
            inhw, -hh, -inhd,
            0, -hh, -hd,
            hw, -hh, -hd,

            //bottom
            -inhw, -hh, inhd,
            0, -hh, hd,
            -hw, -hh, hd,
            inhw, -hh, inhd,
            0, -hh, hd,
            -inhw, -hh, inhd,
            hw, -hh, hd,
            0, -hh, hd,
            inhw, -hh, inhd,

            //right
            hw, -hh, -hd,
            hw, -hh, 0,
            inhw, -hh, -inhd,
            inhw, -hh, -inhd,
            hw, -hh, 0,
            inhw, -hh, inhd,
            inhw, -hh, inhd,
            hw, -hh, 0,
            hw, -hh, hd,

            //left
            -inhw, -hh, -inhd,
            -hw, -hh, 0,
            -hw, -hh, -hd,
            -inhw, -hh, inhd,
            -hw, -hh, 0,
            -inhw, -hh, -inhd,
            -hw, -hh, hd,
            -hw, -hh, 0,
            -inhw, -hh, inhd,

            // Inner part
            //top
            hw, -hh, -hd,
            0, -hh, -hd,
            inhw, -hh, -inhd,
            inhw, -hh, -inhd,
            0, -hh, -hd,
            -inhw, -hh, -inhd,
            -inhw, -hh, -inhd,
            0, -hh, -hd,
            -hw, -hh, -hd,

            //bottom
            inhw, -hh, inhd,
            0, -hh, hd,
            hw, -hh, hd,
            -inhw, -hh, inhd,
            0, -hh, hd,
            inhw, -hh, inhd,
            -hw, -hh, hd,
            0, -hh, hd,
            -inhw, -hh, inhd,

            //right
            inhw, -hh, -inhd,
            hw, -hh, 0,
            hw, -hh, -hd,
            inhw, -hh, inhd,
            hw, -hh, 0,
            inhw, -hh, -inhd,
            hw, -hh, hd,
            hw, -hh, 0,
            inhw, -hh, inhd,

            //left
            -hw, -hh, -hd,
            -hw, -hh, 0,
            -inhw, -hh, -inhd,
            -inhw, -hh, -inhd,
            -hw, -hh, 0,
            -inhw, -hh, inhd,
            -inhw, -hh, inhd,
            -hw, -hh, 0,
            -hw, -hh, hd,
            

        /// Triangle part
            // front part
            // Outer part
            //right
            hw * cosTheta - inhh * 0.9, inhw * sinTheta, inhd - hd, // atas
            hw * sinTheta - inhh * 0.2, -inhh , hd, // kiri
            hw * cosTheta + inhh * 0.4, inhw * sinTheta - hh * 1.3, hd, //bawah
            //left
            -inhw * cosTheta - inhh * 0.6, inhw * sinTheta - hh * 1.3 , hd, // kiri
            -hw * sinTheta + inhh * 0.2, -inhh, hd, // bawah
            hw * cosTheta - inhh * 0.9, -inhw * sinTheta + hh * 1.1 , inhd - hd, // atas

            // Hole part
            //right
            //right
            hw * cosTheta + inhh * 0.4, inhw * sinTheta - hh * 1.3, hd, // bawah
            hw * sinTheta - inhh * 0.2, -inhh , hd, // kiri
            hw * cosTheta - inhh * 0.9, inhw * sinTheta, inhd - hd, // atas
            //left
            hw * cosTheta - inhh * 0.9, -inhw * sinTheta + hh * 1.1 , inhd - hd, // atas
            -hw * sinTheta + inhh * 0.2, -inhh, hd, // bawah
            -inhw * cosTheta - inhh * 0.6, inhw * sinTheta - hh * 1.3 , hd, // kiri

            // Back part
            // Outer part
            //right
            hw * cosTheta - inhh * 0.9, inhw * sinTheta, -hd + inhd, // atas
            -inhw * cosTheta - inhh * 0.1, inhw * 0.4 - inhh * 1.57, -hd, // kiri
            -inhw * cosTheta - inhh * 0.6, inhh * 1.2 - inhw * 2.1, -hd, // kanan
            //left
            inhw * cosTheta, inhh * cosTheta - inhw * 1.6, -hd, // kanan
            -hw * cosTheta + inhh * 0.9, inhw * sinTheta, -hd + inhd, //atas
            hw * sinTheta + inhh * 0.4, inhw * sinTheta - hh * 1.4, -hd, //kiri

            //Hole part
            //right
            -inhw * cosTheta - inhh * 0.6, inhh * 1.2 - inhw * 2.1, -hd, // kanan
            -inhw * cosTheta - inhh * 0.1, inhw * 0.4 - inhh * 1.57, -hd, // kiri
            hw * cosTheta - inhh * 0.9, inhw * sinTheta, -hd + inhd, // atas
            //left
            hw * sinTheta + inhh * 0.4, inhw * sinTheta - hh * 1.4, -hd, //kiri
            -hw * cosTheta + inhh * 0.9, inhw * sinTheta, -hd + inhd, //atas
            inhw * cosTheta, inhh * cosTheta - inhw * 1.6, -hd, // kanan


            //Right part
            // Outer part
            //left
            hw * cosTheta - inhh * 0.9, inhw * sinTheta, inhd - hd, // atas
            hw * sinTheta + inhh * 0.4, inhw * sinTheta - hh * 1.3, hd, //kiri
            hw * 1.1 - inhh * 0.1, -inhw * 1.5 + hh * 0.4 , hd - inhw * 0.5, // kanan
            
            //right
            -hw * cosTheta + inhh * 0.9, inhw * sinTheta, -hd + inhd, //atas
            hw * cosTheta + inhh * 0.4, inhw * sinTheta - hh * 1.57, -hd + inhd * 0.5, //kiri
            hw * 1.1 - inhh * 0.1, -inhw * 1.5 + hh * 0.4 , -hd, // kanan
        
            // Hole part
           //left
            hw * 1.1 - inhh * 0.1, -inhw * 1.5 + hh * 0.4 , hd - inhw * 0.5, // kanan
            hw * sinTheta + inhh * 0.4, inhw * sinTheta - hh * 1.3, hd, //kiri
            hw * cosTheta - inhh * 0.9, inhw * sinTheta, inhd - hd, // atas

            //right
            hw * 1.1 - inhh * 0.1, -inhw * 1.5 + hh * 0.4 , -hd, // kanan
            hw * cosTheta + inhh * 0.4, inhw * sinTheta - hh * 1.57, -hd + inhd * 0.5, //kiri
            -hw * cosTheta + inhh * 0.9, inhw * sinTheta, -hd + inhd, //atas

            //Left part
            // Outer part
            //right
            -hw * cosTheta + inhh * 0.9, inhw * cosTheta , inhd - hd, // atas
            -inhw * cosTheta - inhh * 0.6, -inhw * 1.5 + hh * 0.5 , hd - inhw * 0.5, // kiri
            -inhw * cosTheta - inhh * 0.6, inhw * sinTheta - hh * 1.3  , hd, //kanan

            //left
            hw * cosTheta - inhh * 0.9, inhw * sinTheta, inhd - hd, // atas
            -inhw * 0.9 - inhh * 0.4, inhw * 1.1 - inhh * 2, -hd, // kiri
            -inhw * cosTheta - inhh * 0.6, inhh * cosTheta - hw * 1.4, -hd + inhw * 0.5, //kanan
        
            // Hole part
            //right
            -inhw * cosTheta - inhh * 0.6, inhw * sinTheta - hh * 1.3, hd, // kanan
            -inhw * cosTheta - inhh * 0.6, -inhw * 1.5 + hh * 0.5, hd - inhw * 0.5, // kiri
            -hw * cosTheta + inhh * 0.9, inhw * cosTheta, inhd - hd, // atas

            //left
            -inhw * cosTheta - inhh * 0.6, inhh * cosTheta - hw * 1.4, -hd + inhw * 0.5, // kanan
            -inhw * 0.9 - inhh * 0.4, inhw * 1.1 - inhh * 2, -hd, // kiri
            hw * cosTheta - inhh * 0.9, inhw * sinTheta, inhd - hd, // atas

        ]);
         this.setAttribute('position', new BufferAttribute(vertices, 3));
         this.calculateNormals();
     }

    get type() {
        return 'HollowPyramidGeometry';
    }

    toJSON() {
        const data = super.toJson();
        delete data.attributes.position;
        return {
            ...data,
            width: this.width,
            height: this.height,
            depth: this.depth,
            thickness: this.thickness,
            type: this.type,
        };
    }

    static fromJSON(json, geom) {
        if (!geom) geom = new HollowPyramidGeometry(json.width, json.height, json.depth, json.thickness);
        BufferGeometry.fromJson(json, geom);
        return geom;
    }
}
