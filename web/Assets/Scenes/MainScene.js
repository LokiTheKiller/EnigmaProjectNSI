import { Player } from "../Objects/Player.js";
import * as Game from "../../Game.js";
import { GameObject, Interactable } from "../../System/Core/GameObject.js";
import { BoxGeometry, Mesh, MeshBasicMaterial, ObjectLoader, Scene, PlaneGeometry, TextureLoader, MeshPhongMaterial } from '../../../libs/three/src/Three.js';
import { degToRad } from "../../System/Maths.js";
import * as ColoredCandles from "../Objects/Enigmas/ColoredCandlesEnigma.js";
import * as MusicEnigme from "../Objects/Enigmas/MusicEnigma.js";
export var scene = new Scene();
export var objDoor5 = new GameObject("");
let collisionArray = [];
let interactionArray = [];
export function addObject(mesh, name, collideable, scene) {
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
    const loader = new ObjectLoader();
    var map = new GameObject("");
    loader.load("./Assets/Textures/scene.json", function (carte) {
        map = addObject(carte, "carte", true, scene);
    });
    const geometry = new BoxGeometry();
    var doorGeo = new PlaneGeometry(3.3, 5);
    const texture = new TextureLoader().load('./Assets/Textures/wood_door_01.png');
    var doorMaterial = new MeshPhongMaterial({ emissiveMap: texture, emissive: 0x2a2a2a });
    var door = new Mesh(doorGeo, doorMaterial);
    var door2 = new Mesh();
    door2.copy(door);
    var objDoor = addObject(door, "Door", false, scene);
    var objDoor2 = addObject(door2, "Door2", true, scene);
    objDoor.position.set(0, 2.5, 10);
    objDoor.rotateY(degToRad(180));
    objDoor2.position.set(0, 2.5, -10);
    /**var leverRotatePoint: Object3D = new Object3D();
    leverRotatePoint.position.y = 0.075;
    let leverObj: Lever = new Lever("Basic Lever", (obj: Interactable) => {}, (lever: Lever) => {
        if(lever.on){
            material2.color.setHSL(120/360, 1, 1 - (0.5 * lever.getTime01()));
        } else {
            material2.color.setHSL(120/360, 1, 0.5 + (lever.getTime01() * 0.5));
        }

    }, (lever: Lever) => {}, leverRotatePoint);

    var obj2: Interactable = addInteractable(cube2, "Interactive cube", true, scene, (obj: Interactable) => {
        if(material2.color.getHex() === 0x00FF00){
            UI.increment();
            scene.remove(obj);
            scene.remove(objDoor);
            removeInteraction(obj);
            removeCollision(obj);
            removeCollision(objDoor);
            leverObj.interactable = false;
        }

    });**/
    //Création d'un levier qui change la couleur du cube d'interaction
    var leverMaterial = new MeshBasicMaterial({ color: 0xDEB887 });
    var leverBaseMaterial = new MeshBasicMaterial({ color: 0xC5C3C2 });
    var leverMesh = new Mesh(geometry, leverMaterial);
    var leverBaseMesh = new Mesh(geometry, leverBaseMaterial);
    /**collisionArray.push(leverObj);
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
    leverMesh.rotation.x = -Math.PI/2

    leverRotatePoint.add(leverMesh);
    leverObj.add(leverRotatePoint);
    leverObj.add(leverBaseMesh);**/
    ColoredCandles.init();
    ColoredCandles.setDoor(objDoor);
    ColoredCandles.createEnigma(scene);
    var piece2 = new GameObject("");
    loader.load("./Assets/Textures/scene2.json", function (carte) {
        piece2 = addObject(carte, "carte2", true, scene);
        piece2.position.z = 15;
        piece2.rotateY(degToRad(-90));
    });
    var door3 = new Mesh(doorGeo, doorMaterial);
    var objDoor3 = addObject(door3, "Door3", false, scene);
    objDoor3.position.set(0, 2.5, 20);
    objDoor3.rotateY(degToRad(180));
    var piece3 = new GameObject("");
    loader.load("./Assets/Textures/scene3.json", function (carte) {
        piece3 = addObject(carte, "carte3", true, scene);
        piece3.position.z = 25;
        piece3.rotateY(degToRad(-90));
    });
    var door4 = new Mesh(doorGeo, doorMaterial);
    var objDoor4 = addObject(door4, "Door4", false, scene);
    objDoor4.position.set(0, 2.5, 30);
    objDoor4.rotateY(degToRad(180));
    var trapdoorGeo = new PlaneGeometry(2, 2.3);
    const trapdoorTexture = new TextureLoader().load('./Assets/Textures/trapdoor.jpg');
    var trapdoorMaterial = new MeshPhongMaterial({ emissiveMap: trapdoorTexture, emissive: 0x2a2a2a });
    var trapdoorMesh = new Mesh(trapdoorGeo, trapdoorMaterial);
    var objTrapdoor = addObject(trapdoorMesh, "trapdoor", true, scene);
    objTrapdoor.position.z = 22.85;
    objTrapdoor.rotateX(degToRad(-90));
    var piece4 = new GameObject("");
    loader.load("./Assets/Textures/scene4.json", function (carte) {
        piece4 = addObject(carte, "carte4", true, scene);
        piece4.position.z = 40;
    });
    var door5 = new Mesh(doorGeo, doorMaterial);
    objDoor5 = addObject(door5, "door5", true, scene);
    objDoor5.position.set(0, 2.5, 50);
    objDoor5.rotateY(degToRad(180));
    MusicEnigme.init();
    MusicEnigme.createEnigma();
    var player = new Player("Player Test");
    player.camera = Game.getHandler().camera;
    player.camera.position.y = 1.8; //mise de la caméra à hauteur "humaine".
    player.camera.position.x = -2;
    player.camera.lookAt(0, 1.8, 1);
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
