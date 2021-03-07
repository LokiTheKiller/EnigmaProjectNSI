import { GameObject } from "../../System/Core/GameObject.js";
export class Door extends GameObject {
    constructor(name) {
        super(name);
        this.animation = false;
        this.animTime = 0;
        this.waitTime = 0;
    }
    update() {
        if (this.animation) {
            if (this.waitTime < 1) {
                this.waitTime += 1 / 120;
            }
            else if (this.animTime < 1) {
                this.animTime += 1 / 120;
                this.rotation.y = this.animTime * -Math.PI / 2;
            }
        }
    }
    animate() {
        if (this.animation) {
            return;
        }
        this.animation = true;
    }
}
