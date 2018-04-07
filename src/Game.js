import {
    BoxGeometry,
    Line,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Raycaster,
    Scene,
    Vector3,
    WebGLRenderer,
    Geometry,
    LineBasicMaterial,
} from 'three';
import Stats from 'stats.js';

import {
    DEBUG,
    SPEED_FACTOR,
} from './config';
import {
    default as Keyboard,
    KEYS,
 } from './utilities/keyboard';
import CarMesh from './meshes/CarMesh';
import GroundMesh from './meshes/GroundMesh';

export default class Game {
    constructor(numberOfPlayers = 1) {
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new WebGLRenderer();
        this.ground = new GroundMesh();
        this.ground.position.z = -1;

        this.keyboard = new Keyboard();

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this.renderer.domElement);

        this.camera.position.z = 50;
        this.camera.lookAt(new Vector3(0, 0, 0));

        this.generateCars(numberOfPlayers);
        this.animate = this.animate.bind(this);
        this.scene.add(this.ground);
        this.handleDebugStats();
    }

    generateCars(numberOfPlayers) {
        this.cars = [];
        this.debugCollisionsLinesPerCar = [];
        var lineMaterial = new LineBasicMaterial({ color: 0x0000ff });
        for (let i = 0 ; i < numberOfPlayers ; i++) {
            this.cars.push(new CarMesh());
            this.cars[i].buildDebugLines();
            this.scene.add(this.cars[i]);
            if (!DEBUG) continue;
            Object.keys(this.cars[i].debugLines).forEach((debugLineName) => {
                this.scene.add(this.cars[i].debugLines[debugLineName]);
            });
        }
    }

    animate() {
        if (DEBUG) this.stats.begin();
        if (this.keyboard.isDown(KEYS.UP)) {
            this.cars[0].position.x += SPEED_FACTOR * Math.cos(this.cars[0].rotation.z);
            this.cars[0].position.y += SPEED_FACTOR * Math.sin(this.cars[0].rotation.z);
        }
        if (this.keyboard.isDown(KEYS.DOWN)) {
            this.cars[0].position.x -= SPEED_FACTOR * Math.cos(this.cars[0].rotation.z);
            this.cars[0].position.y -= SPEED_FACTOR * Math.sin(this.cars[0].rotation.z);
        }
        if (this.keyboard.isDown(KEYS.LEFT)) {
            this.cars[0].rotation.z += SPEED_FACTOR * 0.05;
        }
        if (this.keyboard.isDown(KEYS.RIGHT)) {
            this.cars[0].rotation.z -= SPEED_FACTOR * 0.05;
        }

        if (this.keyboard.isDown(KEYS.Z)) {
            this.cars[1].position.x += SPEED_FACTOR * Math.cos(this.cars[1].rotation.z);
            this.cars[1].position.y += SPEED_FACTOR * Math.sin(this.cars[1].rotation.z);
        }
        if (this.keyboard.isDown(KEYS.S)) {
            this.cars[1].position.x -= SPEED_FACTOR * Math.cos(this.cars[1].rotation.z);
            this.cars[1].position.y -= SPEED_FACTOR * Math.sin(this.cars[1].rotation.z);
        }
        if (this.keyboard.isDown(KEYS.Q)) {
            this.cars[1].rotation.z += SPEED_FACTOR * 0.05;
        }
        if (this.keyboard.isDown(KEYS.D)) {
            this.cars[1].rotation.z -= SPEED_FACTOR * 0.05;
        }

        this.checkCollisions();
        this.renderer.render(this.scene, this.camera);
        if (DEBUG) this.stats.end();
        requestAnimationFrame(this.animate);
    }

    checkCollisions() {
        for (let i = 0 ; i < this.cars.length ; i++) {
            let origin = this.cars[i].position;
            let direction = new Vector3(
                this.cars[i].position.x + Math.cos(this.cars[i].rotation.z) * 100,
                this.cars[i].position.y + Math.sin(this.cars[i].rotation.z) * 100,
                0,
            );
            let ray = new Raycaster(origin, direction.sub(origin).normalize(), 0, this.cars[i].geometry.parameters.width/2);
            let collisionResults = ray.intersectObjects(this.cars, false);
            for (var j = 0; j < collisionResults.length; j++) {
                collisionResults[j].object.material.color.set(0xff0000);
            }

            // DEBUG
            if (!DEBUG) continue;
            this.cars[i].computeDebugLines();
        }
    }

    handleDebugStats() {
        if (!DEBUG) return;
        this.stats = new Stats();
        this.stats.showPanel(1);
        document.body.appendChild(this.stats.dom);
    }

    start() {
        requestAnimationFrame(this.animate);
    }
}