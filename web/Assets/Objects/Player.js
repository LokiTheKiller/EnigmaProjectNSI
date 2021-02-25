import { GameObject } from "../../System/Core/GameObject.js";
import * as Maths from "../../System/Maths.js";
import * as Input from "../../System/Input/Input.js";
import { Vector2, Vector3, Raycaster } from "../../../libs/three/src/Three.js";
import * as UI from "../Objects/UI.js";
import { meshArray } from "../Scenes/MainScene.js";
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
        const distance = 0.52;
        const obstacles = meshArray;
        let collisions;
        this.raycaster.set(this.camera.position, new Vector3(z, 0, x));
        collisions = this.raycaster.intersectObjects(obstacles);
        if (collisions.length > 0 && collisions[0].distance <= distance) {
            return true;
        }
        return false;
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
            if (!this.collision(x, z)) {
                this.camera.position.x += moveDir.y * 0.05;
                this.camera.position.z += moveDir.x * 0.05;
                this.camera.rotation.x = Maths.clamp(this.camera.rotation.x + Input.getMouseDelta().y * 0.005, Maths.degToRad(-75), Maths.degToRad(75));
                this.camera.rotation.y = Maths.loopInRange(this.camera.rotation.y + Input.getMouseDelta().x * 0.005, Maths.degToRad(-180), Maths.degToRad(180));
            }
        }
    }
}
