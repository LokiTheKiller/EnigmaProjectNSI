import { GameObject } from "./GameObject.js";
import { Object3D, PerspectiveCamera, Scene } from "../../../libs/three/src/Three.js";

export class Handler {

    scene: Scene | null = null;
    camera: PerspectiveCamera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);

    constructor(){}

    getScene(): Scene | null{
        return this.scene;
    }

    update(): void {
        if(this.scene !== null){
            var objs: GameObject[] = this.getGameObjects(new Array(), this.scene);
            for(let i = 0; i < objs.length; i++){
                objs[i].update();
            }

        }

    }

    getGameObjects(result: GameObject[], obj: Object3D): GameObject[]{
        if(obj instanceof GameObject){
            result.push(obj);
        }

        for(var i = 0; i < obj.children.length; i++){
            var child = obj.children[i];
            this.getGameObjects(result, child);
        }
        return result;
    }

}