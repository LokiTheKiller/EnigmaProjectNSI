import { GameObject } from "../../System/Core/GameObject.js";
import * as Maths from "../../System/Maths.js";
import * as Input from "../../System/Input/Input.js";
export class Player extends GameObject {
    constructor(name) {
        super(name);
        this.camera = undefined;
    }
    update() {
        let xMove = Input.asAxis(83, 90) * 0.25;
        let zMove = Input.asAxis(68, 81) * 0.25;
        if (this.camera !== undefined) {
            this.camera.position.x += xMove;
            this.camera.position.z += zMove;
            this.camera.rotation.x = Maths.clamp(this.camera.rotation.x + Input.getMouseDelta().y * 0.005, -100, 100);
            this.camera.rotation.y = Maths.clamp(this.camera.rotation.y + Input.getMouseDelta().x * 0.005, -75, 75);
        }
    }
}
