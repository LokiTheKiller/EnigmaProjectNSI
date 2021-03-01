import { Object3D } from '../../../libs/three/src/Three.js';

export class GameObject extends Object3D{

    constructor(name: string){
        super();
        this.name = name;
    }

    update(): void{}

}

export class Interactable extends GameObject{
    
    interactable: boolean = true;

    constructor(name: string, interactCallback: (obj: Interactable) => void){
        super(name);
        this.interactCallback = interactCallback;
    }

    update(): void{}
    interact(): void{
        this.interactCallback(this);
    }

    protected interactCallback(obj: Interactable): void{}
}