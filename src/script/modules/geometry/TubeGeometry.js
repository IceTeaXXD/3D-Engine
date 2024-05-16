import { BufferAttribute, BufferGeometry } from "./index.js";

export class TubeGeometry extends BufferGeometry {
    constructor(innerRadius = 0.5, outerRadius = 1, height = 1) {
        super();
        this.innerRadius = innerRadius;
        this.outerRadius = outerRadius;
        this.height = height;
        this.radialSegments = 100000;

        const vertices = [];
        const halfHeight = height / 2;
        const angleStep = (Math.PI * 2) / this.radialSegments;

        // Generate vertices for the caps
        for (let j = 0; j <= this.radialSegments; j++) {
            const angle = j * angleStep;
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);

            // Top cap outer
            vertices.push(outerRadius * cos, halfHeight, outerRadius * sin);

            // Bottom cap outer
            vertices.push(outerRadius * cos, -halfHeight, outerRadius * sin);

            // Bottom cap inner
            vertices.push(innerRadius * cos, -halfHeight, innerRadius * sin);

            // Top cap outer
            vertices.push(outerRadius * cos, halfHeight, outerRadius * sin);

            // Bottom cap inner
            vertices.push(innerRadius * cos, -halfHeight, innerRadius * sin);

            // Top cap inner
            vertices.push(innerRadius * cos, halfHeight, innerRadius * sin);

            // Top cap outer
            vertices.push(outerRadius * cos, halfHeight, outerRadius * sin);

            // Top cap inner
            vertices.push(innerRadius * cos, halfHeight, innerRadius * sin);

            // Bottom cap inner
            vertices.push(innerRadius * cos, -halfHeight, innerRadius * sin);

            // Bottom cap outer
            vertices.push(outerRadius * cos, -halfHeight, outerRadius * sin);

            // Top cap outer
            vertices.push(outerRadius * cos, halfHeight, outerRadius * sin);

            // Bottom cap inner
            vertices.push(innerRadius * cos, -halfHeight, innerRadius * sin);

        }

        this.setAttribute('position', new BufferAttribute(new Float32Array(vertices), 3));
        this.calculateNormals();
    }

    get type() {
        return "TubeGeometry";
    }

    toJson() {
        const data = super.toJson();
        delete data.attributes.position;
        return {
            ...data,
            innerRadius: this.innerRadius,
            outerRadius: this.outerRadius,
            height: this.height,
            radialSegments: this.radialSegments,
            heightSegments: this.heightSegments,
            type: this.type,
        };
    }

    static fromJson(json, geom) {
        if (!geom) geom = new TubeGeometry(json.innerRadius, json.outerRadius, json.height, json.radialSegments, json.heightSegments);
        BufferGeometry.fromJson(json, geom);
        return geom;
    }
}
