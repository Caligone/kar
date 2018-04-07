import { 
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
} from 'three';

import { SCALE_FACTOR } from '../config';
import generateColor from '../utilities/generateColor';

export default class GroundMesh extends Mesh {
    constructor() {
        super();
        this.geometry = new BoxGeometry(SCALE_FACTOR * 200, SCALE_FACTOR * 200, SCALE_FACTOR * 1);
        this.material = new MeshBasicMaterial({ color: 0x444444 });
    }
}
