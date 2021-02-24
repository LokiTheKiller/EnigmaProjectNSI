import { Object3D } from '../../../libs/three/src/Three.js';

export class GameObject extends Object3D{

    constructor(name: string){
        super();
        this.name = name;
    }

    update(): void{}

}