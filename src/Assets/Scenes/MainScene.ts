import { Player } from "../Objects/Player.js";
import * as Game from "../../Game.js";
import { GameObject } from "../../System/Core/GameObject.js";
import { BoxGeometry, Mesh, MeshBasicMaterial, Scene } from '../../../libs/three/src/Three.js';

export function load(): Scene{
    var scene: Scene = new Scene();
    
    const geometry: BoxGeometry = new BoxGeometry();
    const material: MeshBasicMaterial = new MeshBasicMaterial( { color: 0xBF0000 } );
    var cube: Mesh = new Mesh(geometry, material);
    var obj: GameObject = new GameObject("Basic Cube");
    obj.add(cube);
    
    scene.add(obj);
    
    var player: Player = new Player("Player Test");
    

    player.camera = Game.getHandler().camera;
    player.camera.position.x = -3;
    player.camera.lookAt(cube.position);
    scene.add(player);

    return scene;
}