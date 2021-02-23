import { GameObject } from "./GameObject.js";
import { PerspectiveCamera } from "../../../libs/three/src/Three.js";
export class Handler {
    constructor() {
        this.scene = null;
        this.camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    }
    getScene() {
        return this.scene;
    }
    update() {
        if (this.scene !== null) {
            var objs = this.getGameObjects(new Array(), this.scene);
            for (let i = 0; i < objs.length; i++) {
                objs[i].update();
            }
        }
    }
    getGameObjects(result, obj) {
        if (obj instanceof GameObject) {
            result.push(obj);
        }
        for (var i = 0; i < obj.children.length; i++) {
            var child = obj.children[i];
            this.getGameObjects(result, child);
        }
        return result;
    }
}
