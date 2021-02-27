import { Player } from "../Objects/Player.js";
import * as Game from "../../Game.js";
import * as UI from "../Objects/UI.js";
import { GameObject, Interactable } from "../../System/Core/GameObject.js";
import { BoxGeometry, Mesh, MeshBasicMaterial, Scene } from '../../../libs/three/src/Three.js';
let collisionArray = [];
let interactionArray = [];
function addObject(mesh, name, collideable, scene) {
    var obj = new GameObject(name);
    if (collideable) {
        collisionArray.push(obj);
    }
    obj.add(mesh);
    scene.add(obj);
    return obj;
}
function addInteractable(mesh, name, collideable, scene, interaction) {
    var obj = new Interactable(name, interaction);
    if (collideable) {
        collisionArray.push(obj);
    }
    interactionArray.push(obj);
    obj.add(mesh);
    scene.add(obj);
    return obj;
}
export function load() {
    var scene = new Scene();
    /**
    var map: GameObject = new GameObject("");
    const loader: ObjectLoader = new ObjectLoader();
    loader.load("scene.json", function(carte: Object3D) {
        map = addObject(carte, "Map", true, false, scene);
     })**/
    const geometry = new BoxGeometry();
    const material = new MeshBasicMaterial({ color: 0xBF0000 });
    const material2 = new MeshBasicMaterial({ color: 0xffffff });
    var cube = new Mesh(geometry, material);
    var cube2 = new Mesh(geometry, material2);
    var obj = addObject(cube, "Basic Cube", true, scene);
    var obj2 = addInteractable(cube2, "Interactive cube", true, scene, (obj) => {
        UI.increment();
        scene.remove(obj);
        removeInteraction(obj);
    });
    //Création d'un levier qui change la couleur du cube d'interaction
    /**var leverMaterial: MeshBasicMaterial = new MeshBasicMaterial( {color: 0xDEB887 } );
    var leverBaseMaterial: MeshBasicMaterial = new MeshBasicMaterial( {color: 0xC5C3C2} );
    var leverMesh: Mesh = new Mesh(geometry, leverMaterial);
    var leverBaseMesh: Mesh = new Mesh(geometry, leverBaseMaterial);

    leverBaseMesh.scale.x = 0.3;
    leverBaseMesh.scale.y = 0.5;**/
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
export function removeInteraction(obj) {
    interactionArray = interactionArray.filter(function (el) { return el !== obj; });
}
export function removeCollision(obj) {
    collisionArray = collisionArray.filter(function (el) { return el !== obj; });
}
export { collisionArray, interactionArray };
