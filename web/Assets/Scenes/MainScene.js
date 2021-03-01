import { Player } from "../Objects/Player.js";
import * as Game from "../../Game.js";
import * as UI from "../Objects/UI.js";
import { GameObject, Interactable } from "../../System/Core/GameObject.js";
import { BoxGeometry, Mesh, MeshBasicMaterial, Object3D, ObjectLoader, Scene, PlaneGeometry, TextureLoader, MeshPhongMaterial } from '../../../libs/three/src/Three.js';
import { Lever } from "../Objects/Lever.js";
import { degToRad } from "../../System/Maths.js";
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
    const loader = new ObjectLoader();
    var map = new GameObject("");
    loader.load("./Assets/Textures/scene.json", function (carte) {
        map = addObject(carte, "carte", true, scene);
    });
    const geometry = new BoxGeometry();
    const material = new MeshBasicMaterial({ color: 0xBF0000 });
    const material2 = new MeshBasicMaterial({ color: 0xffffff });
    var doorGeo = new PlaneGeometry(3.3, 5);
    const texture = new TextureLoader().load('./Assets/Textures/wood_door_01.png');
    var doorMaterial = new MeshPhongMaterial({ emissiveMap: texture, emissive: 0x2a2a2a });
    var door = new Mesh(doorGeo, doorMaterial);
    var door2 = new Mesh();
    door2.copy(door);
    var objDoor = addObject(door, "Door", true, scene);
    var objDoor2 = addObject(door2, "Door2", true, scene);
    objDoor.position.set(0, 2.5, 9.5);
    objDoor.rotateY(degToRad(180));
    objDoor2.position.set(0, 2.5, -9.5);
    var cube = new Mesh(geometry, material);
    var cube2 = new Mesh(geometry, material2);
    var obj = addObject(cube, "Basic Cube", true, scene);
    var obj2 = addInteractable(cube2, "Interactive cube", true, scene, (obj) => {
        UI.increment();
        scene.remove(obj);
        scene.remove(objDoor);
        removeInteraction(obj);
        removeCollision(obj);
        removeCollision(objDoor);
    });
    //Création d'un levier qui change la couleur du cube d'interaction
    var leverMaterial = new MeshBasicMaterial({ color: 0xDEB887 });
    var leverBaseMaterial = new MeshBasicMaterial({ color: 0xC5C3C2 });
    var leverMesh = new Mesh(geometry, leverMaterial);
    var leverBaseMesh = new Mesh(geometry, leverBaseMaterial);
    var leverRotatePoint = new Object3D();
    leverRotatePoint.position.y = 0.075;
    let leverObj = new Lever("Basic Lever", (obj) => { }, (lever) => {
        if (lever.on) {
            material2.color.setHSL(120 / 360, 1, 1 - (0.5 * lever.time / lever.animTime));
        }
        else {
            material2.color.setHSL(120 / 360, 1, lever.time / lever.animTime * 0.5);
        }
    }, (lever) => { }, leverRotatePoint);
    collisionArray.push(leverObj);
    interactionArray.push(leverObj);
    scene.add(leverObj);
    leverBaseMesh.scale.x = 0.5;
    leverBaseMesh.scale.y = 0.15;
    leverBaseMesh.scale.z = 0.65;
    leverObj.position.x = 2;
    leverObj.position.y = 1.075;
    leverMesh.scale.x = 0.1;
    leverMesh.scale.y = 0.1;
    leverMesh.scale.z = 0.5;
    leverMesh.position.y = 0.1;
    leverMesh.rotation.x = -Math.PI / 2;
    leverRotatePoint.add(leverMesh);
    leverObj.add(leverRotatePoint);
    leverObj.add(leverBaseMesh);
    obj.position.y += 0.5; //On surélève les cubes de la moitié de leur hauteur, pour que leur bas soit à y = 0.
    obj.position.x = 2;
    obj2.position.z = 3; //Sinon, ils sont enfoncés dans le sol à l'ajout de la carte.
    obj2.position.y += 0.5;
    var piece2 = new GameObject("");
    loader.load("./Assets/Textures/scene2.json", function (carte) {
        piece2 = addObject(carte, "carte2", true, scene);
        piece2.position.z = 25;
        piece2.rotateY(degToRad(-90));
    });
    var door3 = new Mesh(doorGeo, doorMaterial);
    var objDoor3 = addObject(door3, "Door3", true, scene);
    objDoor3.position.set(0, 2.5, 29.5);
    objDoor3.rotateY(degToRad(180));
    var trapdoorGeo = new PlaneGeometry(2, 2.3);
    const trapdoorTexture = new TextureLoader().load('./Assets/Textures/trapdoor.jpg');
    var trapdoorMaterial = new MeshPhongMaterial({ emissiveMap: trapdoorTexture, emissive: 0x2a2a2a });
    var trapdoorMesh = new Mesh(trapdoorGeo, trapdoorMaterial);
    var objTrapdoor = addObject(trapdoorMesh, "trapdoor", true, scene);
    objTrapdoor.position.z = 22.85;
    objTrapdoor.rotateX(degToRad(-90));
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
