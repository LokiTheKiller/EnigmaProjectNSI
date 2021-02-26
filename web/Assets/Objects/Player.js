import { GameObject } from "../../System/Core/GameObject.js";
import * as Maths from "../../System/Maths.js";
import * as Input from "../../System/Input/Input.js";
import { Vector2, Vector3, Raycaster } from "../../../libs/three/src/Three.js";
import * as UI from "../Objects/UI.js";
import { collisionArray, interactionArray } from "../Scenes/MainScene.js";
export class Player extends GameObject {
    constructor(name) {
        super(name);
        this.camera = undefined;
        this.raycaster = new Raycaster();
    }
    collision(x, z) {
        if (this.camera === undefined) {
            return true;
        }
        const distance = 0.32;
        const obstacles = collisionArray;
        let collisions;
        let posTete = this.camera.position; //PosTete et pied, pour simuler un personnage et pas simplement une caméra volante.
        let posPied = new Vector3(this.camera.position.x, this.camera.position.y - 1.79, this.camera.position.z);
        this.raycaster.set(posTete, new Vector3(z, 0, x));
        collisions = this.raycaster.intersectObjects(obstacles, true);
        if (collisions.length > 0 && collisions[0].distance <= distance) //On verifie si il y a collision au niveau de la tête,
         {
            return true;
        }
        this.raycaster.set(posPied, new Vector3(z, 0, x));
        collisions = this.raycaster.intersectObjects(obstacles, true);
        if (collisions.length > 0 && collisions[0].distance <= distance) //puis des pieds
         {
            return true;
        }
        return false;
    }
    interraction() {
        if (this.camera === undefined) {
            return;
        }
        const iter = interactionArray;
        const distance = 1;
        let interractions;
        let cameraDir = new Vector3();
        this.camera.getWorldDirection(cameraDir);
        this.raycaster.set(this.camera.position, cameraDir);
        interractions = this.raycaster.intersectObjects(iter, true);
        if (interractions.length > 0 && interractions[0].distance <= distance) {
            UI.showOnDebug("Interraction possible");
        }
    }
    update() {
        var _a;
        let v = Input.asAxis(90, 83);
        let h = Input.asAxis(81, 68);
        let x = 0;
        let z = 0;
        let moveDir = new Vector2(0, 0);
        if (Math.sqrt(v * v + h * h) !== 0) {
            let angle = Maths.radToDeg(Math.atan2(h, v));
            let targetAngle = Maths.radToDeg(((_a = this.camera) === null || _a === void 0 ? void 0 : _a.rotation.y) !== undefined ? this.camera.rotation.y : 0) + angle;
            UI.showOnDebug("Camera angle: " + (targetAngle - angle) + ", Directionnal angle: " + targetAngle);
            x = Math.cos(Maths.degToRad(targetAngle));
            z = Math.sin(Maths.degToRad(targetAngle));
            moveDir = new Vector2(Math.cos(Maths.degToRad(targetAngle)), Math.sin(Maths.degToRad(targetAngle)));
        }
        if (this.camera !== undefined) {
            this.interraction();
            if (!this.collision(x, z)) {
                this.camera.position.x += moveDir.y * 0.05;
                this.camera.position.z += moveDir.x * 0.05;
                this.camera.rotation.x = Maths.clamp(this.camera.rotation.x + Input.getMouseDelta().y * 0.005, Maths.degToRad(-75), Maths.degToRad(75));
                this.camera.rotation.y = Maths.loopInRange(this.camera.rotation.y + Input.getMouseDelta().x * 0.005, Maths.degToRad(-180), Maths.degToRad(180));
            }
        }
    }
}
