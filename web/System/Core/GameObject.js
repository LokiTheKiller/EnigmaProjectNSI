import { Object3D } from '../../../libs/three/src/Three.js';
export class GameObject extends Object3D {
    constructor(name) {
        super();
        this.name = name;
    }
    update() { }
}
export class Interactable extends GameObject {
    constructor(name, interactCallback) {
        super(name);
        this.interactCallback = interactCallback;
    }
    update() { }
    interact() {
        this.interactCallback(this);
    }
    interactCallback(obj) { }
}
