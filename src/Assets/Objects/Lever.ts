import { Interactable } from "../../System/Core/GameObject.js";
import { Object3D } from "../../../libs/three/src/Three.js";
import * as Maths from "../../System/Maths.js";

const onPosition: number = Maths.degToRad(-45);
const offPosition: number = Maths.degToRad(45);

export class Lever extends Interactable{

    time: number = 0;
    animTime: number = 2;
    rotatePoint: Object3D = new Object3D();
    on: boolean = false;
    current: number = 0; objective: number = onPosition;
    animation: boolean = false;

    constructor(name: string, interactCallback: (obj: Interactable) => void, animate: (obj: Lever) => void, complete: (obj: Lever) => void, rotatePoint: Object3D){
        super(name, interactCallback);
        this.rotatePoint = rotatePoint;
        this.complete = complete;
        this.animate = animate;

        rotatePoint.rotation.x = offPosition;
        this.current = offPosition;
    }

    update(): void{
        //UI.showOnDebug("Updating... (Animation is "+this.animation+")")
        if(this.animation){
            this.current = Maths.loopInRange(this.current + this.rotateTo(this.current, this.objective, -(this.getOrigin() - this.objective) * 1/(60*this.animTime)), -Math.PI, Math.PI);
            this.rotatePoint.rotation.x = this.current;
            this.time += 1/(60*this.animTime);
            this.animate(this);

            if(this.current === this.objective){
                this.complete(this);
                this.animation = false;
            }

        }

    }

    protected complete(obj: Lever): void{}
    protected animate(obj: Lever): void{}

    private getOrigin(): number {
        if(this.objective === onPosition){
            return offPosition;
        } else {
            return onPosition;
        }

    }

    interact(): void{
        if(this.animation){
            return;
        }
        this.on = !this.on;
        if(this.on){
            this.objective = onPosition;
        } else {
            this.objective = offPosition;
        }
        this.time = 0;
        this.animation = true;
        this.interactCallback(this);
    }

    rotateTo(origin: number, objective: number, maxRotate: number): number{
        let dist = objective - origin;
        return Math.min(Math.abs(dist), Math.abs(maxRotate)) === Math.abs(maxRotate) ? maxRotate:dist;
    }

}