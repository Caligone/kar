import { 
    BoxGeometry,
    Geometry,
    Line,
    LineBasicMaterial,
    Mesh,
    MeshBasicMaterial,
    Vector3,
} from 'three';

import {
    DEBUG,
    DEBUG_LINE_WIDTH,
    SCALE_FACTOR,
} from '../config';
import generateColor from '../utilities/generateColor';

const DEBUG_LINE_TYPES = [
    'CENTRAL',
    // 'FRONT_RIGHT',
    // 'FRONT_LEFT',
    // 'BACK_RIGHT',
    // 'BACK_LEFT',
];

export default class CarMesh extends Mesh {
    constructor(color = generateColor()) {
        super();
        this.width = 8;
        this.height = 4;
        this.depth = 4;
        this.color = color;
        this.geometry = new BoxGeometry(
            SCALE_FACTOR * this.width,
            SCALE_FACTOR * this.height,
            SCALE_FACTOR * this.depth,
        );
        this.material = new MeshBasicMaterial({ color: this.color });
        if (!DEBUG) return;
        this.debugLines = [];
    }

    buildDebugLines() {
        DEBUG_LINE_TYPES.forEach((DEBUG_LINE_TYPE) => {
            this.debugLines[DEBUG_LINE_TYPE] = this.buildDebugLine(DEBUG_LINE_TYPE);
        });
        this.computeDebugLines();
    }

    buildDebugLine(type) {
        var lineMaterial = new LineBasicMaterial({ color: 0x0000ff });
        let lineGeometry = new Geometry();
        let origin = this.position;
        return new Line(lineGeometry, lineMaterial);
    }

    computeDebugLines(type) {
        DEBUG_LINE_TYPES.forEach((DEBUG_LINE_TYPE) => {
            this.debugLines[DEBUG_LINE_TYPE].geometry.vertices = this.computeDebugLine(DEBUG_LINE_TYPE);
            this.debugLines[DEBUG_LINE_TYPE].geometry.verticesNeedUpdate = true;
        });
    }

    computeDebugLine(type) {
        switch(type) {
            case 'CENTRAL':
                return [
                    this.position,
                    new Vector3(
                        this.position.x + Math.cos(this.rotation.z) * DEBUG_LINE_WIDTH,
                        this.position.y + Math.sin(this.rotation.z) * DEBUG_LINE_WIDTH,
                        0,
                    ),
                ];
            // case DEBUG_LINE_TYPES.FRONT_RIGHT:
            // break;
            // case DEBUG_LINE_TYPES.FRONT_LEFT:
            // break;
            // case DEBUG_LINE_TYPES.BACK_RIGHT:
            // break;
            // case DEBUG_LINE_TYPES.BACK_LEFT:
            // break;
        }
    }
}
