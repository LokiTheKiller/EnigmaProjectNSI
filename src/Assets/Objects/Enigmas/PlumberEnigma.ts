import { BoxGeometry, BufferGeometry, BufferGeometryLoader, Mesh, MeshBasicMaterial, MeshPhongMaterial, Object3D, Scene, TextureLoader } from "../../../../libs/three/src/Three.js";
import { GameObject, Interactable } from "../../../System/Core/GameObject.js";
import * as Maths from "../../../System/Maths.js";
import { interactionArray, scene, removeCollision } from "../../Scenes/MainScene.js";
import * as UI from "../UI.js";

var plumber: Pipe[][] = [[],[],[],[],[],[]];
var door: GameObject = new GameObject("Null");

const types: number[][] = [
    [0, 1, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0],
    [1, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 0],
    [0, 1, 1, 0, 1, 1],
    [0, 1, 0, 0, 0, 1]
];


export function setPipe(x: number, y: number, pipe: Pipe): void{
    plumber[x][y] = pipe;
}

export function getPipe(x: number, y: number): Pipe{
    return plumber[x][y];
}

function checkWin(){
    if(solution()){
        UI.increment();
        scene.remove(door);
        removeCollision(door);
        for(let x = 0; x < 6; x++){
            for(let y = 0; y < 6; y++){
                plumber[x][y].interactable = false;
            }

        }

    }

}

function solution(): boolean{
    return check(5, 0, false, 0) && check(4, 0, false, 0) && check(3, 0, true, 0) && check(3, 1, false, 1) && check(3, 2, true, 0) && check(4, 2, true, 0) &&
            check(4, 3, false, 1) && check(4, 4, true, 0) && check(3, 4, false, 0) && check(2, 4, false, 0) && check(1, 4, false, 0) && check(0, 4, true, 0) && check(0, 5, false, 1);
}

function check(x: number, y: number, turn: boolean, answer: number): boolean{
    let test: boolean = (turn ? getPipe(x, y).getState():getPipe(x, y).getState() % 2) === answer;
    return test;
}

export class Pipe extends Interactable{

    time: number = 0;
    animation: boolean = false;
    current: number = 0; objective: number = Math.PI / 2;
    state: number = 0;

    constructor(name: string, interactCallback: (obj: Interactable) => void, complete: (obj: Pipe) => void){
        super(name, interactCallback);
        this.complete = complete;
        this.state = Math.floor(Math.random()*4);
        this.current = this.state * Math.PI / 2;
    }

    update(): void{
        //UI.showOnDebug("Updating... (Animation is "+this.animation+")")
        if(this.animation){
            let origin: number = 0;
            if(this.state === 0){
                origin = 3;
            } else {
                origin = this.state - 1;
            }
            origin = origin * Math.PI / 2;

            this.current = Maths.loopInRange(this.current + this.rotateTo(this.current, this.objective, -(origin - this.objective) * 1/60), 0, 2 * Math.PI);
            this.rotation.x = this.current;
            this.time += 1;

            if(this.current === this.objective){
                this.complete(this);
                this.animation = false;
            }

        }

    }

    interact(): void{
        if(this.animation){
            return;
        }
        this.state = (this.state + 1) % 4;
        console.log(this.state);
        if(this.state === 0){
            this.objective = Math.PI * 2;
        } else {
            this.objective = Maths.loopInRange(this.state * Math.PI / 2, 0, 2 * Math.PI);
        }
        this.time = 0;
        this.animation = true;
        this.interactCallback(this);
    }

    rotateTo(origin: number, objective: number, maxRotate: number): number{
        let dist = objective - origin;
        return Math.min(Math.abs(dist), Math.abs(maxRotate)) === Math.abs(maxRotate) ? maxRotate:dist;
    }

    private complete(obj: Pipe): void{}

    getState(): number{
        return this.state;
    }

}

export function init(scene: Scene): void{
    const texture = new TextureLoader().load('./Assets/Textures/metal.jpg');
    var coudeMaterial: MeshPhongMaterial = new MeshPhongMaterial( { emissiveMap: texture, emissive: 0x2a2a2a} );
    const loaderGeo = new BufferGeometryLoader();
    let coudeGeo: BufferGeometry = new BufferGeometry();
    loaderGeo.load("./Assets/Textures/coude.json", function(coude: BufferGeometry) {
        coudeGeo = coude;
    });

    for(let x = 0; x < 6; x++){
        for(let y = 0; y < 6; y++){
            let pipe: Pipe = new Pipe("Pipe ("+x+";"+y+")", () => {}, (obj: Pipe) => {
                console.log(obj.getState());
                checkWin();
            });
            interactionArray.push(pipe);
            const geometry: BoxGeometry = new BoxGeometry();
            const material: MeshBasicMaterial = new MeshBasicMaterial( {color: 0xFF7F00} );
            let mesh: Mesh = new Mesh(geometry, material);
            if(types[x][y] === 1){
                material.color.setHex(0x00FF00);
                mesh = new Mesh(coudeGeo, material);
            }
            mesh.scale.x = 0.5;
            mesh.scale.y = 0.75;
            mesh.scale.z = 0.5;
            pipe.add(mesh);
            
            pipe.position.z = 14.25 + 0.75 * y;
            pipe.position.y = 4.375 - 0.75 * x;
            pipe.position.x = 4.8;
            if(pipe.state === 0){
                pipe.rotation.x = 2 * Math.PI;
            } else {
                pipe.rotation.x = Maths.loopInRange(pipe.state * Math.PI / 2, 0, 2 * Math.PI);
            }
            scene.add(pipe);
            plumber[x].push(pipe);
        }

    }

}

export function setDoor(doorObj: GameObject): void{
    door = doorObj;
}