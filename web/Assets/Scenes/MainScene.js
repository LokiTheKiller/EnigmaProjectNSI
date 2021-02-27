import { Player } from "../Objects/Player.js";
import * as Game from "../../Game.js";
import { GameObject } from "../../System/Core/GameObject.js";
import { BoxGeometry, Mesh, MeshBasicMaterial, ObjectLoader, Scene } from '../../../libs/three/src/Three.js';
let collisionArray = [];
let interactionArray = [];
function addObject(mesh, name, collideable, interactable, scene) {
    var obj = new GameObject(name);
    obj.add(mesh);
    if (collideable) {
        collisionArray.push(obj);
    }
    if (interactable) {
        interactionArray.push(obj);
    }
    scene.add(obj);
    return obj;
}
export function load() {
    var scene = new Scene();
    var map = new GameObject("");
    const loader = new ObjectLoader();
    loader.load("scene.json", function (carte) {
        map = addObject(carte, "Map", true, false, scene);
    });
    const geometry = new BoxGeometry();
    const material = new MeshBasicMaterial({ color: 0xBF0000 });
    const material2 = new MeshBasicMaterial({ color: 0xffffff });
    var cube = new Mesh(geometry, material);
    var cube2 = new Mesh(geometry, material2);
    var obj = addObject(cube, "Basic Cube", true, false, scene);
    var obj2 = addObject(cube2, "Interactive cube", true, true, scene);
    obj.position.y += 0.5; //On surélève les cubes de la moitié de leur hauteur, pour que leur bas soit à y = 0.
    obj.position.x = 2;
    obj2.position.z = 3; //Sinon, ils sont enfoncés dans le sol à l'ajout de la carte.
    obj2.position.y += 0.5;
    var player = new Player("Player Test");
    player.camera = Game.getHandler().camera;
    player.camera.position.y = 1.8; //mise de la caméra à hauteur "humaine".
    // player.camera.lookAt(cube.position);
    scene.add(player);
    return scene;
}
export { collisionArray, interactionArray };
