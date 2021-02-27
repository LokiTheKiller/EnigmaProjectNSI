import { Player } from "../Objects/Player.js";
import * as Game from "../../Game.js";
import { GameObject } from "../../System/Core/GameObject.js";
import { BoxGeometry, Mesh, MeshBasicMaterial, Object3D, ObjectLoader, Scene, Vector3 } from '../../../libs/three/src/Three.js';

let collisionArray: Array<GameObject> = [];
let interactionArray: Array<GameObject> = [];

function addObject(mesh: Object3D, name: string, collideable: Boolean, interactable: Boolean, scene: Scene): GameObject
{
    var obj: GameObject = new GameObject(name);
    obj.add(mesh);
    if (collideable)
    {
        collisionArray.push(obj);
    }
    if (interactable)
    {
        interactionArray.push(obj);
    }
    scene.add(obj);
    return obj;
}

export function load(): Scene{
    var scene: Scene = new Scene();
    var map: GameObject = new GameObject("");
    const loader: ObjectLoader = new ObjectLoader();
    loader.load("scene.json", function(carte: Object3D) {
        map = addObject(carte, "Map", true, false, scene);
     })
    const geometry: BoxGeometry = new BoxGeometry();
    const material: MeshBasicMaterial = new MeshBasicMaterial( { color: 0xBF0000 } );
    const material2: MeshBasicMaterial = new MeshBasicMaterial( { color: 0xffffff } );
    var cube: Mesh = new Mesh(geometry, material);
    var cube2: Mesh = new Mesh(geometry, material2);
    var obj: GameObject = addObject(cube, "Basic Cube", true, false, scene);
    var obj2: GameObject = addObject(cube2, "Interactive cube", true, true, scene);
    obj.position.y += 0.5; //On surélève les cubes de la moitié de leur hauteur, pour que leur bas soit à y = 0.
    obj.position.x = 2;
    obj2.position.z = 3; //Sinon, ils sont enfoncés dans le sol à l'ajout de la carte.
    obj2.position.y += 0.5;
    var player: Player = new Player("Player Test");
    player.camera = Game.getHandler().camera;
    player.camera.position.y = 1.8; //mise de la caméra à hauteur "humaine".
    // player.camera.lookAt(cube.position);
    scene.add(player);
    return scene;
}

export { collisionArray, interactionArray };