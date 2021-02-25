import { Player } from "../Objects/Player.js";
import * as Game from "../../Game.js";
import * as Maths from "../../System/Maths.js";
import { GameObject } from "../../System/Core/GameObject.js";
import { BoxGeometry, Mesh, MeshBasicMaterial, Scene, Vector3 } from '../../../libs/three/src/Three.js';

let collisionArray: Array<Mesh> = [];
let interactionArray: Array<Mesh> = [];

function addObject(mesh: Mesh, name: string, collideable: Boolean, interactable: Boolean, scene: Scene): GameObject
{
    var obj: GameObject = new GameObject(name);
    obj.add(mesh);
    if (collideable)
    {
        collisionArray.push(mesh);
    }
    if (interactable)
    {
        interactionArray.push(mesh);
    }
    scene.add(obj);
    return obj;
}

export function load(): Scene{
    var scene: Scene = new Scene();
    
    const geometry: BoxGeometry = new BoxGeometry();
    const material: MeshBasicMaterial = new MeshBasicMaterial( { color: 0xBF0000 } );
    const material2: MeshBasicMaterial = new MeshBasicMaterial( { color: 0xffffff } );
    var cube: Mesh = new Mesh(geometry, material);
    var cube2: Mesh = new Mesh(geometry, material2);
    var obj: GameObject = addObject(cube, "Basic Cube", true, false, scene);
    var obj2: GameObject = addObject(cube2, "Interactive cube", true, true, scene);
    obj2.position.z = 4;

    var player: Player = new Player("Player Test");
    

    player.camera = Game.getHandler().camera;
    player.camera.position.z = 3;
    player.camera.lookAt(cube.position);
    console.log(Maths.degToRad(player.camera.rotation.x));
    scene.add(player);

    return scene;
}

export { collisionArray, interactionArray };