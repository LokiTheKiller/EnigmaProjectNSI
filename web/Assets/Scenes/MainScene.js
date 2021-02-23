import { Player } from "../Objects/Player.js";
import * as Game from "../../Game.js";
import { GameObject } from "../../System/Core/GameObject.js";
import { BoxGeometry, Mesh, MeshBasicMaterial, Scene } from '../../../libs/three/src/Three.js';
export function load() {
    var scene = new Scene();
    const geometry = new BoxGeometry();
    const material = new MeshBasicMaterial({ color: 0xBF0000 });
    var cube = new Mesh(geometry, material);
    var obj = new GameObject("Basic Cube");
    obj.add(cube);
    scene.add(obj);
    var player = new Player("Player Test");
    player.position.x = 3;
    player.camera = Game.getHandler().camera;
    scene.add(player);
    return scene;
}
