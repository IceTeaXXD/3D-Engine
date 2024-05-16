import { BufferAttribute, BufferGeometry } from "./index.js";

export class TubeGeometry extends BufferGeometry {
    constructor(innerRadius = 0.5, outerRadius = 1, height = 1, radialSegments = 8, heightSegments = 1) {
        super();
        this.innerRadius = innerRadius;
        this.outerRadius = outerRadius;
        this.height = height;
        this.radialSegments = radialSegments;
        this.heightSegments = heightSegments;

        const vertices = [];
        const indices = [];
        const halfHeight = height / 2;
        const angleStep = (Math.PI * 2) / radialSegments;
        const heightStep = height / heightSegments;

        // Generate vertices for the outer and inner surfaces
        for (let i = 0; i <= heightSegments; i++) {
            const y = i * heightStep - halfHeight;
            for (let j = 0; j <= radialSegments; j++) {
                const angle = j * angleStep;
                const cos = Math.cos(angle);
                const sin = Math.sin(angle);

                // Outer surface
                vertices.push(outerRadius * cos, y, outerRadius * sin);

                // Inner surface
                vertices.push(innerRadius * cos, y, innerRadius * sin);
            }
        }

        // Generate indices for the side surfaces
        for (let i = 0; i < heightSegments; i++) {
            for (let j = 0; j < radialSegments; j++) {
                const a = i * (radialSegments + 1) + j;
                const b = a + radialSegments + 1;
                const c = a + 1;
                const d = b + 1;

                // Outer surface
                indices.push(a, b, d);
                indices.push(a, d, c);

                // Inner surface
                const a2 = a + (radialSegments + 1) * (heightSegments + 1);
                const b2 = b + (radialSegments + 1) * (heightSegments + 1);
                const c2 = c + (radialSegments + 1) * (heightSegments + 1);
                const d2 = d + (radialSegments + 1) * (heightSegments + 1);

                indices.push(a2, c2, d2);
                indices.push(a2, d2, b2);
            }
        }

        // Generate vertices for the caps
        for (let j = 0; j <= radialSegments; j++) {
            const angle = j * angleStep;
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);

            // Top cap outer
            vertices.push(outerRadius * cos, halfHeight, outerRadius * sin);

            // Top cap inner
            vertices.push(innerRadius * cos, halfHeight, innerRadius * sin);

            // Bottom cap outer
            vertices.push(outerRadius * cos, -halfHeight, outerRadius * sin);

            // Bottom cap inner
            vertices.push(innerRadius * cos, -halfHeight, innerRadius * sin);
        }

        // Generate indices for the caps
        for (let j = 0; j < radialSegments; j++) {
            const topOuter1 = (heightSegments + 1) * (radialSegments + 1) * 2 + j * 2;
            const topOuter2 = topOuter1 + 2;
            const topInner1 = topOuter1 + 1;
            const topInner2 = topInner1 + 2;

            // Top cap
            indices.push(topOuter1, topOuter2, topInner2);
            indices.push(topOuter1, topInner2, topInner1);

            const bottomOuter1 = topOuter1 + (radialSegments + 1) * 2;
            const bottomOuter2 = bottomOuter1 + 2;
            const bottomInner1 = bottomOuter1 + 1;
            const bottomInner2 = bottomInner1 + 2;

            // Bottom cap
            indices.push(bottomOuter1, bottomInner2, bottomOuter2);
            indices.push(bottomOuter1, bottomInner1, bottomInner2);
        }

        this.setIndices(indices);
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
