
import { BufferAttribute, BufferGeometry } from "./index.js";

export class HollowPrismGeometry extends BufferGeometry {
    /**
     * @type {float}
     */
    thickness
    /**
     * @type {int}
     */
    side // jumlah sisi

    constructor(width=1, height=1, depth=1, thickness=0.1, side=3) {
        super();
        this.width = width;
        this.height = height;
        this.depth = depth;

        // menangani thickness agar tidak lebih dari besar objek, atau lebih kecil dari 0 
        if (thickness < 0 || thickness > width){
            this.thickness = 0.1;
        } else {
            this.thickness = thickness;
        }
        // menangani side agar tidak lebih kecil dari 3
        if (side < 3) {
            this.side = 3;
            console.log("Prism side can not be less than 3");
        } else {
            this.side = side;
        }
        // const hw = width/2, hh = height/2, hd = depth/2;

        // vertex yang digunakan mirip dengan BoxGeometry 
        // dengan tambahan vertex yang membuat objek hollow
        const vertices = this.createPrismVertices();
        this.setAttribute('position', new BufferAttribute(vertices, 3));
        this.calculateNormals();
    }

    get type() {
        return this.side + "SidePrismGeometry";
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
            thickness : this.thickness,
            side: this.side,
        };
    }

    static fromJSON(json, geom) {
        if(!geom) geom = new HollowBoxGeometry(json.width, json.height, json.depth, json.thickness, json.side);
        BufferGeometry.fromJson(json, geom);
        return geom;
    }

    createPrismVertices() {
        // Define variables to store vertices for top, bottom, inner, and outer sides
        let outerSideVertices = [];
        let innerSideVertices = [];
      
        // Calculate base side based on number of sides (assuming regular polygon)
        const angleStep = (2 * Math.PI) / this.side; // Angle between consecutive side vertices
        const baseSide = this.width / angleStep;
      
        // Calculate half height and half thickness
        const halfHeight = this.height / 2;
        const halfThickness = this.thickness / 2;
      
        // Define center coordinates (adjust as needed)
        const centerX = 0.0;
        const centerY = 0.0;

        // Top
        let _outerTopVertices = [];
        let _innerTopVertices = [];
        let _innerHoleTopVertices = [];
        let TopVertices = []; // For later in the method, when _outerTopVertices, _innerTopVertices, _innerHoleTopVertices is indexed to be faces
        //  Calculate outer, inner, and in-hole vertices
        for (let i = 0; i < this.side; i++) {
            const outerX = this.width * Math.cos(angleStep * i);
            const outerY = this.width * Math.sin(angleStep * i);
            _outerTopVertices.push(outerX, outerY, halfHeight);

            const innerX = (this.width - this.thickness) * Math.cos(angleStep * i);
            const innerY = (this.width - this.thickness) * Math.sin(angleStep * i);
            _innerTopVertices.push(innerX, innerY, halfHeight);

            const holeX = (this.width-this.thickness) * Math.cos(angleStep * i);
            const holeY = (this.width-this.thickness) * Math.sin(angleStep * i);
            _innerHoleTopVertices.push(holeX, holeY, halfHeight-this.thickness);
        }

        //  Pushing procedurally to geometry vertices
        for (let i = 0; i < _outerTopVertices.length; i+=3) {
            const out1 = _outerTopVertices.slice(i, i+3)
            let _out2 = _outerTopVertices.slice(i+3, i+3+3)

            if (i+3 >= _outerTopVertices.length){
                _out2 = _outerTopVertices.slice(
                    i+3-_outerTopVertices.length, 
                    i+3+3-_outerTopVertices.length
                )
            } 
            const out2 = _out2
            
            const in1 = _innerTopVertices.slice(i, i+3)
            let _in2 = _innerTopVertices.slice(i+3, i+3+3)
            if (i+3 >= _innerTopVertices.length){
                _in2 = _innerTopVertices.slice(
                    i+3-_innerTopVertices.length, 
                    i+3+3-_innerTopVertices.length
                )
            }
            const in2 = _in2

            const hole1 = _innerHoleTopVertices.slice(i, i+3)
            let _hole2 = _innerHoleTopVertices.slice(i+3, i+3+3)

            if (i+3 >= _innerHoleTopVertices.length){
                _hole2 = _innerHoleTopVertices.slice(
                    i+3-_innerHoleTopVertices.length, 
                    i+3+3-_innerHoleTopVertices.length
                )
            } 
            const hole2 = _hole2

            // TopVertices.push(...out1)
            // TopVertices.push(...in2)
            // TopVertices.push(...in1)
            // TopVertices.push(...out1)
            // TopVertices.push(...out2)
            // TopVertices.push(...in2)
            // TopVertices.push(...in1)
            // TopVertices.push(...in2)
            // TopVertices.push(...hole1)
            // TopVertices.push(...in2)
            // TopVertices.push(...hole2)
            // TopVertices.push(...hole1)
        }
        // Bottom
        let _outerBottomVertices = [];
        let _innerBottomVertices = [];
        let _innerHoleBottomVertices = [];
        let BottomVertices = []; // For later in the method, when _outerBottomVertices, _innerBottomVertices, _innerHoleBottomVertices is indexed to be faces
        //  Calculate outer, inner, and in-hole vertices
        for (let i = 0; i < this.side; i++) {
            const outerX = this.width * Math.cos(angleStep * i);
            const outerY = this.width * Math.sin(angleStep * i);
            _outerBottomVertices.push(outerX, outerY, -halfHeight);

            const innerX = (this.width - this.thickness) * Math.cos(angleStep * i);
            const innerY = (this.width - this.thickness) * Math.sin(angleStep * i);
            _innerBottomVertices.push(innerX, innerY, -halfHeight);

            const holeX = (this.width-this.thickness) * Math.cos(angleStep * i);
            const holeY = (this.width-this.thickness) * Math.sin(angleStep * i);
            _innerHoleBottomVertices.push(holeX, holeY, -halfHeight+this.thickness);
        }

        //  Pushing procedurally to geometry vertices
        for (let i = 0; i < _outerBottomVertices.length; i+=3) {
            const out1 = _outerBottomVertices.slice(i, i+3)
            let _out2 = _outerBottomVertices.slice(i+3, i+3+3)

            if (i+3 >= _outerBottomVertices.length){
                _out2 = _outerBottomVertices.slice(
                    i+3-_outerBottomVertices.length, 
                    i+3+3-_outerBottomVertices.length
                )
            } 
            const out2 = _out2
            
            const in1 = _innerBottomVertices.slice(i, i+3)
            let _in2 = _innerBottomVertices.slice(i+3, i+3+3)
            if (i+3 >= _innerBottomVertices.length){
                _in2 = _innerBottomVertices.slice(
                    i+3-_innerBottomVertices.length, 
                    i+3+3-_innerBottomVertices.length
                )
            }
            const in2 = _in2

            const hole1 = _innerHoleBottomVertices.slice(i, i+3)
            let _hole2 = _innerHoleBottomVertices.slice(i+3, i+3+3)

            if (i+3 >= _innerHoleBottomVertices.length){
                _hole2 = _innerHoleBottomVertices.slice(
                    i+3-_innerHoleBottomVertices.length, 
                    i+3+3-_innerHoleBottomVertices.length
                )
            } 
            const hole2 = _hole2

            // BottomVertices.push(...in1)
            // BottomVertices.push(...in2)
            // BottomVertices.push(...out1)
            // BottomVertices.push(...in2)
            // BottomVertices.push(...out2)
            // BottomVertices.push(...out1)
            // BottomVertices.push(...hole1)
            // BottomVertices.push(...in2)
            // BottomVertices.push(...in1)
            // BottomVertices.push(...hole1)
            // BottomVertices.push(...hole2)
            // BottomVertices.push(...in2)
        }

        // Side parts
        // for (let i = 0; i < this.side; i++) {
            //     // Vertices used are outer and inner hole vertices from top and bottom faces
            //     // and new set of inner vertices to each side faces
            //     // TODO
            //     // Getting the x,y,z value of inner side faces should be sin/cos of something and related to thickness
            // }
        let SideVertices = [];
        for (let i = 0; i < _outerBottomVertices.length; i+=3){
            const top1 = _outerTopVertices.slice(i, i+3)
            let _top2 = _outerTopVertices.slice(i+3, i+3+3)
            if (i+3 >= _outerTopVertices.length){
                _top2 = _outerTopVertices.slice(
                    i+3-_outerTopVertices.length, 
                    i+3+3-_outerTopVertices.length
                )
            } 
            const top2 = _top2

            const bot1 = _outerBottomVertices.slice(i, i+3)
            let _bot2 = _outerBottomVertices.slice(i+3, i+3+3)
            if (i+3 >= _outerBottomVertices.length){
                _bot2 = _outerBottomVertices.slice(
                    i+3-_outerBottomVertices.length,
                    i+3+3-_outerBottomVertices.length
                )
            }
            const bot2 = _bot2
            SideVertices.push(...bot1)
            SideVertices.push(...top2)
            SideVertices.push(...top1)
            SideVertices.push(...bot1)
            SideVertices.push(...bot2)
            SideVertices.push(...top2)
            SideVertices.push(...top1)
            SideVertices.push(...top2)
            SideVertices.push(...bot1)
            SideVertices.push(...top2)
            SideVertices.push(...bot2)
            SideVertices.push(...bot1)
        }
      
        // Combine all vertices into a single array
        const allVertices = [
          ...TopVertices,
          ...BottomVertices,
          ...SideVertices,
        //   ...outerSideVertices,
        //   ...innerSideVertices,
        ];
      
        return new Float32Array(allVertices);
      }
}
