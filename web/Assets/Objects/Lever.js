import { Interactable } from "../../System/Core/GameObject.js";
import { Object3D } from "../../../libs/three/src/Three.js";
import * as Maths from "../../System/Maths.js";
const onPosition = Maths.degToRad(-45);
const offPosition = Maths.degToRad(45);
export class Lever extends Interactable {
    constructor(name, interactCallback, animate, complete, rotatePoint) {
        super(name, interactCallback);
        this.time = 0;
        this.animTime = 2;
        this.rotatePoint = new Object3D();
        this.on = false;
        this.current = 0;
        this.objective = onPosition;
        this.animation = false;
        this.rotatePoint = rotatePoint;
        this.complete = complete;
        this.animate = animate;
        rotatePoint.rotation.x = offPosition;
        this.current = offPosition;
    }
    update() {
        //UI.showOnDebug("Updating... (Animation is "+this.animation+")")
        if (this.animation) {
            this.current = Maths.loopInRange(this.current + this.rotateTo(this.current, this.objective, -(this.getOrigin() - this.objective) * 1 / (60 * this.animTime)), -Math.PI, Math.PI);
            this.rotatePoint.rotation.x = this.current;
            this.time += 1 / (60 * this.animTime);
            this.animate(this);
            if (this.current === this.objective) {
                this.complete(this);
                this.animation = false;
            }
        }
    }
    complete(obj) { }
    animate(obj) { }
    getOrigin() {
        if (this.objective === onPosition) {
            return offPosition;
        }
        else {
            return onPosition;
        }
    }
    interact() {
        if (this.animation) {
            return;
        }
        this.on = !this.on;
        if (this.on) {
            this.objective = onPosition;
        }
        else {
            this.objective = offPosition;
        }
        this.time = 0;
        this.animation = true;
        this.interactCallback(this);
    }
    rotateTo(origin, objective, maxRotate) {
        let dist = objective - origin;
        return Math.min(Math.abs(dist), Math.abs(maxRotate)) === Math.abs(maxRotate) ? maxRotate : dist;
    }
}
