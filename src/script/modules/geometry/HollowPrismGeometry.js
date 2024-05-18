
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
        let angleStep = (2 * Math.PI) / this.side; // Angle between consecutive side vertices
        let baseSide = this.width / angleStep;
      
        // Calculate half height and half thickness
        let halfHeight = this.height / 2;

        // Top
        let _outerTopVertices = [];
        let _innerTopVertices = [];
        let _innerHoleTopVertices = [];
        let TopVertices = []; // For later in the method, when _outerTopVertices, _innerTopVertices, _innerHoleTopVertices is indexed to be faces
        //  Calculate outer, inner, and in-hole vertices
        for (let i = 0; i < this.side; i++) {
            let outerX = this.width * Math.cos(angleStep * i);
            let outerY = this.width * Math.sin(angleStep * i);
            _outerTopVertices.push(outerX, outerY, halfHeight);

            let innerX = (this.width - this.thickness) * Math.cos(angleStep * i);
            let innerY = (this.width - this.thickness) * Math.sin(angleStep * i);
            _innerTopVertices.push(innerX, innerY, halfHeight);

            let holeX = (this.width-this.thickness) * Math.cos(angleStep * i);
            let holeY = (this.width-this.thickness) * Math.sin(angleStep * i);
            _innerHoleTopVertices.push(holeX, holeY, halfHeight-this.thickness);
        }

        //  Pushing procedurally to geometry vertices
        for (let i = 0; i < _outerTopVertices.length; i+=3) {
            let out1 = _outerTopVertices.slice(i, i+3)
            let _out2 = _outerTopVertices.slice(i+3, i+3+3)

            if (i+3 >= _outerTopVertices.length){
                _out2 = _outerTopVertices.slice(
                    i+3-_outerTopVertices.length, 
                    i+3+3-_outerTopVertices.length
                )
            } 
            let out2 = _out2
            
            let in1 = _innerTopVertices.slice(i, i+3)
            let _in2 = _innerTopVertices.slice(i+3, i+3+3)
            if (i+3 >= _innerTopVertices.length){
                _in2 = _innerTopVertices.slice(
                    i+3-_innerTopVertices.length, 
                    i+3+3-_innerTopVertices.length
                )
            }
            let in2 = _in2

            let hole1 = _innerHoleTopVertices.slice(i, i+3)
            let _hole2 = _innerHoleTopVertices.slice(i+3, i+3+3)

            if (i+3 >= _innerHoleTopVertices.length){
                _hole2 = _innerHoleTopVertices.slice(
                    i+3-_innerHoleTopVertices.length, 
                    i+3+3-_innerHoleTopVertices.length
                )
            } 
            let hole2 = _hole2

            TopVertices.push(...out1)
            TopVertices.push(...in2)
            TopVertices.push(...in1)
            TopVertices.push(...out1)
            TopVertices.push(...out2)
            TopVertices.push(...in2)
            TopVertices.push(...in1)
            TopVertices.push(...in2)
            TopVertices.push(...hole1)
            TopVertices.push(...in2)
            TopVertices.push(...hole2)
            TopVertices.push(...hole1)
        }
        // Bottom
        let _outerBottomVertices = [];
        let _innerBottomVertices = [];
        let _innerHoleBottomVertices = [];
        let BottomVertices = []; // For later in the method, when _outerBottomVertices, _innerBottomVertices, _innerHoleBottomVertices is indexed to be faces
        //  Calculate outer, inner, and in-hole vertices
        for (let i = 0; i < this.side; i++) {
            let outerX = this.width * Math.cos(angleStep * i);
            let outerY = this.width * Math.sin(angleStep * i);
            _outerBottomVertices.push(outerX, outerY, -halfHeight);

            let innerX = (this.width - this.thickness) * Math.cos(angleStep * i);
            let innerY = (this.width - this.thickness) * Math.sin(angleStep * i);
            _innerBottomVertices.push(innerX, innerY, -halfHeight);

            let holeX = (this.width-this.thickness) * Math.cos(angleStep * i);
            let holeY = (this.width-this.thickness) * Math.sin(angleStep * i);
            _innerHoleBottomVertices.push(holeX, holeY, -halfHeight+this.thickness);
        }

        //  Pushing procedurally to geometry vertices
        for (let i = 0; i < _outerBottomVertices.length; i+=3) {
            let out1 = _outerBottomVertices.slice(i, i+3)
            let _out2 = _outerBottomVertices.slice(i+3, i+3+3)

            if (i+3 >= _outerBottomVertices.length){
                _out2 = _outerBottomVertices.slice(
                    i+3-_outerBottomVertices.length, 
                    i+3+3-_outerBottomVertices.length
                )
            } 
            let out2 = _out2
            
            let in1 = _innerBottomVertices.slice(i, i+3)
            let _in2 = _innerBottomVertices.slice(i+3, i+3+3)
            if (i+3 >= _innerBottomVertices.length){
                _in2 = _innerBottomVertices.slice(
                    i+3-_innerBottomVertices.length, 
                    i+3+3-_innerBottomVertices.length
                )
            }
            let in2 = _in2

            let hole1 = _innerHoleBottomVertices.slice(i, i+3)
            let _hole2 = _innerHoleBottomVertices.slice(i+3, i+3+3)

            if (i+3 >= _innerHoleBottomVertices.length){
                _hole2 = _innerHoleBottomVertices.slice(
                    i+3-_innerHoleBottomVertices.length, 
                    i+3+3-_innerHoleBottomVertices.length
                )
            } 
            let hole2 = _hole2

            BottomVertices.push(...in1)
            BottomVertices.push(...in2)
            BottomVertices.push(...out1)
            BottomVertices.push(...in2)
            BottomVertices.push(...out2)
            BottomVertices.push(...out1)
            BottomVertices.push(...hole1)
            BottomVertices.push(...in2)
            BottomVertices.push(...in1)
            BottomVertices.push(...hole1)
            BottomVertices.push(...hole2)
            BottomVertices.push(...in2)
        }
        // Side parts
        // Used to find the X and Y of the prism side faces
        function findPointInBetween(xA, yA, xB, yB, lengthFromPoint, isFromA=true) {
            // Calculate the distance AB
            let AB = Math.sqrt(Math.pow(xB - xA, 2) + Math.pow(yB - yA, 2));
            
            // Calculate the ratio t
            let t = lengthFromPoint / AB;
            if (!isFromA) {
                t = (AB - lengthFromPoint)/AB
            }
            
            // Calculate the coordinates of C
            let xC = xA + t * (xB - xA);
            let yC = yA + t * (yB - yA);
            
            // Return the coordinates of C as an array
            return [xC, yC];
        }

        let SideVertices = []
        for (let i = 0; i < this.side; i++) {
                // Vertices used are outer vertices and inner hole vertices from top and bottom faces
                // and new set of inner vertices to each side faces

                let _top = _outerTopVertices.slice(3*i, 3*i+3)
                let _topHole = _innerHoleTopVertices.slice(3*i, 3*i+3)
                let _bot = _outerBottomVertices.slice(3*i, 3*i+3)
                let _botHole = _innerHoleBottomVertices.slice(3*i, 3*i+3)
                
                let nextAng = i + 1 >= this.side? 0 : i + 1
                let _topNext = _outerTopVertices.slice (3*nextAng, 3*nextAng+3)
                let _topHoleNext = _innerHoleTopVertices.slice(3*nextAng, 3*nextAng+3)
                let _botNext = _outerBottomVertices.slice (3*nextAng, 3*nextAng+3)
                let _botHoleNext = _innerHoleBottomVertices.slice(3*nextAng, 3*nextAng+3)
                // naming system below assumes X and Y respectively as prism depth and lengths along prism blanket
                // (X and Y is relative to 1 prism side only)
                let [_X, _Y] = [_top[0], _top[1]]
                let [_XnextAng, _YnextAng] = [_topNext[0], _topNext[1]]

                // innerBottom and innerTop also relative to 1 prism side
                let _innerBottom = findPointInBetween(_X, _Y, _XnextAng, _YnextAng, this.thickness)
                let _innerTop = findPointInBetween(_X, _Y, _XnextAng, _YnextAng, this.thickness, false)
                
                //_innerBottom forth aliased as _iB, _innerTop forth aliased as _iT
                /// Top or Bottom refers back to Top/Bottom side of prism
                let _iBTop = [..._innerBottom, halfHeight-this.thickness]
                let _iBBot = [..._innerBottom, -halfHeight+this.thickness]
                let _iTTop = [..._innerTop, halfHeight-this.thickness]
                let _iTBot = [..._innerTop, -halfHeight+this.thickness]

                SideVertices.push(..._bot,..._iBTop,..._top)
                SideVertices.push(..._bot,..._iBBot,..._iBTop)
                SideVertices.push(..._top,..._iBTop,..._topNext)
                SideVertices.push(..._iBTop,..._iTTop,..._topNext)
                SideVertices.push(..._bot,..._iTBot,..._iBBot)
                SideVertices.push(..._botNext,..._iTBot,..._bot)
                SideVertices.push(..._botNext,..._topNext,..._iTBot)
                SideVertices.push(..._iTBot,..._topNext,..._iTTop)
                SideVertices.push(..._iBBot,..._botHole,..._topHole)
                SideVertices.push(..._topHole,..._iBTop,..._iBBot)
                SideVertices.push(..._iBBot,..._iTBot,..._botHoleNext)
                SideVertices.push(..._iBBot, ..._botHoleNext, ..._botHole)
                SideVertices.push(..._iTTop, ..._topHoleNext, ..._botHoleNext)
                SideVertices.push(..._iTBot, ..._iTTop, ..._botHoleNext)
                SideVertices.push(..._iBTop, ..._topHoleNext, ..._iTTop)
                SideVertices.push(..._topHole, ..._topHoleNext, ..._iBTop)
            }
      
        // Combine all vertices into a single array
        const allVertices = [
          ...TopVertices,
          ...BottomVertices,
          ...SideVertices,
        ];
      
        return new Float32Array(allVertices);
      }
}
