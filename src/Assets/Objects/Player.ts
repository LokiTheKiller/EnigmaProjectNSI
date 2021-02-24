import { GameObject } from "../../System/Core/GameObject.js";
import * as Maths from "../../System/Maths.js";
import * as Input from "../../System/Input/Input.js";
import { Euler, PerspectiveCamera, Quaternion, Vector2, Vector3 } from "../../../libs/three/src/Three.js";
import * as UI from "../Objects/UI.js"

export class Player extends GameObject{

    camera: PerspectiveCamera | undefined = undefined;

    constructor(name: string){
        super(name);
    }

    update(): void{
        let v: number = Input.asAxis(90, 83);
        let h: number = Input.asAxis(81, 68);

        let moveDir = new Vector2(0, 0);
        if(Math.sqrt(v * v + h * h) !== 0){
            let angle: number = Maths.radToDeg(Math.atan2(h, v));
            let targetAngle: number = Maths.radToDeg(this.camera?.rotation.y !== undefined ? this.camera.rotation.y:0) + angle;
            UI.showOnDebug("Camera angle: "+(targetAngle-angle)+", Directionnal angle: "+targetAngle);

            moveDir = new Vector2(Math.cos(Maths.degToRad(targetAngle)), Math.sin(Maths.degToRad(targetAngle)));
        }

        if(this.camera !== undefined){
            this.camera.position.x += moveDir.y * 0.05;
            this.camera.position.z += moveDir.x * 0.05;

            this.camera.rotation.x = Maths.clamp(this.camera.rotation.x + Input.getMouseDelta().y * 0.005,
                    Maths.degToRad(-75), Maths.degToRad(75));
            this.camera.rotation.y = Maths.loopInRange(this.camera.rotation.y + Input.getMouseDelta().x * 0.005,
                    Maths.degToRad(-180), Maths.degToRad(180));
        }

    }

}