import { Player } from "../Objects/Player.js";
import * as Game from "../../Game.js";
import * as Maths from "../../System/Maths.js";
import { GameObject } from "../../System/Core/GameObject.js";
import { BoxGeometry, Mesh, MeshBasicMaterial, Scene } from '../../../libs/three/src/Three.js';
let collisionArray = [];
let interactionArray = [];
function addObject(mesh, name, collideable, interactable, scene) {
    var obj = new GameObject(name);
    obj.add(mesh);
    if (collideable) {
        collisionArray.push(mesh);
    }
    if (interactable) {
        interactionArray.push(mesh);
    }
    scene.add(obj);
    return obj;
}
export function load() {
    var scene = new Scene();
    const geometry = new BoxGeometry();
    const material = new MeshBasicMaterial({ color: 0xBF0000 });
    const material2 = new MeshBasicMaterial({ color: 0xffffff });
    var cube = new Mesh(geometry, material);
    var cube2 = new Mesh(geometry, material2);
    var obj = addObject(cube, "Basic Cube", true, false, scene);
    var obj2 = addObject(cube2, "Interactive cube", true, true, scene);
    obj2.position.z = 4;
    var player = new Player("Player Test");
    player.camera = Game.getHandler().camera;
    player.camera.position.z = 3;
    player.camera.lookAt(cube.position);
    console.log(Maths.degToRad(player.camera.rotation.x));
    scene.add(player);
    return scene;
}
export { collisionArray, interactionArray };
