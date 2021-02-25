import { Player } from "../Objects/Player.js";
import * as Game from "../../Game.js";
import * as Maths from "../../System/Maths.js";
import { GameObject } from "../../System/Core/GameObject.js";
import { BoxGeometry, Mesh, MeshBasicMaterial, Scene } from '../../../libs/three/src/Three.js';
let meshArray = [];
export function load() {
    var scene = new Scene();
    const geometry = new BoxGeometry();
    const material = new MeshBasicMaterial({ color: 0xBF0000 });
    var cube = new Mesh(geometry, material);
    var obj = new GameObject("Basic Cube");
    obj.add(cube);
    meshArray.push(cube);
    scene.add(obj);
    var player = new Player("Player Test");
    player.camera = Game.getHandler().camera;
    player.camera.position.z = 3;
    player.camera.lookAt(cube.position);
    console.log(Maths.degToRad(player.camera.rotation.x));
    scene.add(player);
    return scene;
}
export { meshArray };
