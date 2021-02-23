import { GameObject } from "../../System/Core/GameObject.js";
import * as Maths from "../../System/Maths.js";
import * as Input from "../../System/Input/Input.js";
import { Euler, PerspectiveCamera, Quaternion, Vector2, Vector3 } from "../../../libs/three/src/Three.js";

export class Player extends GameObject{

    camera: PerspectiveCamera | undefined = undefined;

    constructor(name: string){
        super(name);
    }

    update(): void{
        let xMove: number = Input.asAxis(83, 90);
        let zMove: number = Input.asAxis(81, 68);

        //let angle: number = this.camera?.rotation.x !== undefined ? this.camera.rotation.x:0;

        //let moveDir: Vector2 = new Vector2(xMove * Math.sin(angle) * 0.25, zMove * -Math.cos(angle) * 0.25);

        if(this.camera !== undefined){
            this.camera.position.x += xMove * 0.25;
            this.camera.position.z += zMove * 0.25;

            //console.log(this.camera.position.x+";"+this.camera.position.y+";"+this.camera.position.z);

            this.camera.rotation.x = Maths.clamp(this.camera.rotation.x + Input.getMouseDelta().y * 0.005, -100, 100);
            this.camera.rotation.y = Maths.clamp(this.camera.rotation.y + Input.getMouseDelta().x * 0.005, -75, 75);
        }

    }

}