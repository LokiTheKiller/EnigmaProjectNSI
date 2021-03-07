import { BoxGeometry, BufferGeometry, BufferGeometryLoader, Mesh, MeshBasicMaterial, MeshPhongMaterial, TextureLoader } from "../../../../libs/three/src/Three.js";
import { GameObject, Interactable } from "../../../System/Core/GameObject.js";
import * as Maths from "../../../System/Maths.js";
import { interactionArray, scene, removeCollision } from "../../Scenes/MainScene.js";
import * as UI from "../UI.js";
var plumber = [[], [], [], [], [], []];
var door = new GameObject("Null");
const types = [
    [0, 1, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0],
    [1, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 0],
    [0, 1, 1, 0, 1, 1],
    [0, 1, 0, 0, 0, 1]
];
export function setPipe(x, y, pipe) {
    plumber[x][y] = pipe;
}
export function getPipe(x, y) {
    return plumber[x][y];
}
function checkWin() {
    if (solution()) {
        UI.increment();
        scene.remove(door);
        removeCollision(door);
        for (let x = 0; x < 6; x++) {
            for (let y = 0; y < 6; y++) {
                plumber[x][y].interactable = false;
            }
        }
    }
}
function solution() {
    return check(5, 0, false, 0) && check(4, 0, false, 0) && check(3, 0, true, 0) && check(3, 1, false, 1) && check(3, 2, true, 0) && check(4, 2, true, 0) &&
        check(4, 3, false, 1) && check(4, 4, true, 0) && check(3, 4, false, 0) && check(2, 4, false, 0) && check(1, 4, false, 0) && check(0, 4, true, 0) && check(0, 5, false, 1);
}
function check(x, y, turn, answer) {
    let test = (turn ? getPipe(x, y).getState() : getPipe(x, y).getState() % 2) === answer;
    return test;
}
export class Pipe extends Interactable {
    constructor(name, interactCallback, complete) {
        super(name, interactCallback);
        this.time = 0;
        this.animation = false;
        this.current = 0;
        this.objective = Math.PI / 2;
        this.state = 0;
        this.complete = complete;
        this.state = Math.floor(Math.random() * 4);
        this.current = this.state * Math.PI / 2;
    }
    update() {
        //UI.showOnDebug("Updating... (Animation is "+this.animation+")")
        if (this.animation) {
            let origin = 0;
            if (this.state === 0) {
                origin = 3;
            }
            else {
                origin = this.state - 1;
            }
            origin = origin * Math.PI / 2;
            this.current = Maths.loopInRange(this.current + this.rotateTo(this.current, this.objective, -(origin - this.objective) * 1 / 60), 0, 2 * Math.PI);
            this.rotation.x = this.current;
            this.time += 1;
            if (this.current === this.objective) {
                this.complete(this);
                this.animation = false;
            }
        }
    }
    interact() {
        if (this.animation) {
            return;
        }
        this.state = (this.state + 1) % 4;
        console.log(this.state);
        if (this.state === 0) {
            this.objective = Math.PI * 2;
        }
        else {
            this.objective = Maths.loopInRange(this.state * Math.PI / 2, 0, 2 * Math.PI);
        }
        this.time = 0;
        this.animation = true;
        this.interactCallback(this);
    }
    rotateTo(origin, objective, maxRotate) {
        let dist = objective - origin;
        return Math.min(Math.abs(dist), Math.abs(maxRotate)) === Math.abs(maxRotate) ? maxRotate : dist;
    }
    complete(obj) { }
    getState() {
        return this.state;
    }
}
export function init(scene) {
    const texture = new TextureLoader().load('./Assets/Textures/metal.jpg');
    var coudeMaterial = new MeshPhongMaterial({ emissiveMap: texture, emissive: 0x2a2a2a });
    const loaderGeo = new BufferGeometryLoader();
    let coudeGeo = new BufferGeometry();
    loaderGeo.load("./Assets/Textures/coude.json", function (coude) {
        coudeGeo = coude;
    });
    for (let x = 0; x < 6; x++) {
        for (let y = 0; y < 6; y++) {
            let pipe = new Pipe("Pipe (" + x + ";" + y + ")", () => { }, (obj) => {
                console.log(obj.getState());
                checkWin();
            });
            interactionArray.push(pipe);
            const geometry = new BoxGeometry();
            const material = new MeshBasicMaterial({ color: 0xFF7F00 });
            let mesh = new Mesh(geometry, material);
            if (types[x][y] === 1) {
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
            if (pipe.state === 0) {
                pipe.rotation.x = 2 * Math.PI;
            }
            else {
                pipe.rotation.x = Maths.loopInRange(pipe.state * Math.PI / 2, 0, 2 * Math.PI);
            }
            scene.add(pipe);
            plumber[x].push(pipe);
        }
    }
}
export function setDoor(doorObj) {
    door = doorObj;
}
