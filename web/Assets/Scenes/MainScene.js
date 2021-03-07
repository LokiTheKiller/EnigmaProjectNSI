import { Player } from "../Objects/Player.js";
import { Door } from "../Objects/Door.js";
import * as Game from "../../Game.js";
import * as Plumber from "../Objects/Enigmas/PlumberEnigma.js";
import { GameObject, Interactable } from "../../System/Core/GameObject.js";
import { BoxGeometry, Mesh, ObjectLoader, Scene, PlaneGeometry, TextureLoader, MeshPhongMaterial, LoadingManager, DoubleSide } from '../../../libs/three/src/Three.js';
import { degToRad } from "../../System/Maths.js";
import * as UI from "../Objects/UI.js";
import * as ColoredCandles from "../Objects/Enigmas/ColoredCandlesEnigma.js";
import * as MusicEnigme from "../Objects/Enigmas/MusicEnigma.js";
export var manager = new LoadingManager();
export var scene = new Scene();
export var objTrapdoor = new GameObject("");
export var objDoor5 = new Door("");
export var map = new GameObject("");
let collisionArray = [];
let interactionArray = [];
const loadingScreen = document.querySelector("#loadingContainer");
export function addObject(mesh, name, collideable, scene) {
    var obj = new GameObject(name);
    if (collideable) {
        collisionArray.push(obj);
    }
    obj.add(mesh);
    scene.add(obj);
    return obj;
}
export function addDoor(mesh, name, scene) {
    var obj = new Door(name);
    collisionArray.push(obj);
    mesh.position.x = 1.65;
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
    var player = new Player("Player Test");
    player.camera = Game.getHandler().camera;
    player.camera.position.y = 1.8; //mise de la caméra à hauteur "humaine".
    scene.add(player);
    manager.onLoad = function () {
        loadingScreen === null || loadingScreen === void 0 ? void 0 : loadingScreen.remove();
    };
    const loader = new ObjectLoader(manager);
    map = new GameObject("");
    loader.load("./Assets/Textures/scene.json", function (carte) {
        map = addObject(carte, "carte", true, scene);
    });
    const geometry = new BoxGeometry();
    var doorGeo = new PlaneGeometry(3.3, 5);
    const texture = new TextureLoader().load('./Assets/Textures/wood_door_01.png');
    var doorMaterial = new MeshPhongMaterial({ emissiveMap: texture, emissive: 0x2a2a2a, side: DoubleSide });
    var door = new Mesh(doorGeo, doorMaterial);
    var door2 = new Mesh();
    door2.copy(door);
    var objDoor = addDoor(door, "Door", scene);
    var objDoor2 = addObject(door2, "Door2", true, scene);
    objDoor.position.set(1.65, 2.5, 10);
    objDoor.rotateY(degToRad(180));
    objDoor2.position.set(0, 2.5, -10);
    ColoredCandles.init();
    ColoredCandles.setDoor(objDoor);
    ColoredCandles.createEnigma(scene);
    Plumber.init(scene);
    var piece2 = new GameObject("");
    loader.load("./Assets/Textures/scene2.json", function (carte) {
        piece2 = addObject(carte, "carte2", true, scene);
        piece2.position.z = 15;
        piece2.rotateY(degToRad(-90));
    });
    var door3 = new Mesh(doorGeo, doorMaterial);
    var objDoor3 = addDoor(door3, "Door3", scene);
    objDoor3.position.set(1.65, 2.5, 20);
    objDoor3.rotateY(degToRad(180));
    Plumber.setDoor(objDoor3);
    var piece3 = new GameObject("");
    loader.load("./Assets/Textures/scene3.json", function (carte) {
        piece3 = addObject(carte, "carte3", true, scene);
        piece3.position.z = 25;
        piece3.rotateY(degToRad(-90));
    });
    var door4 = new Mesh(doorGeo, doorMaterial);
    /**var objDoor4: GameObject = addObject(door4, "Door4", false, scene);

    objDoor4.position.set(0, 2.5, 30);
    objDoor4.rotateY(degToRad(180));**/
    var trapdoorGeo = new PlaneGeometry(3.4, 3.1);
    const trapdoorTexture = new TextureLoader(manager).load('./Assets/Textures/trapdoor.jpg');
    var trapdoorMaterial = new MeshPhongMaterial({ emissiveMap: trapdoorTexture, emissive: 0x2a2a2a });
    var trapdoorMesh = new Mesh(trapdoorGeo, trapdoorMaterial);
    objTrapdoor = addObject(trapdoorMesh, "trapdoor", true, scene);
    objTrapdoor.position.z = 23.525;
    objTrapdoor.rotateX(degToRad(-90));
    var piece4 = new GameObject("");
    loader.load("./Assets/Textures/scene4.json", function (carte) {
        piece4 = addObject(carte, "carte4", true, scene);
        piece4.position.z = 40;
    });
    var door5 = new Mesh(doorGeo, doorMaterial);
    objDoor5 = addDoor(door5, "door5", scene);
    objDoor5.position.set(1.65, 2.5, 50);
    objDoor5.rotateY(degToRad(180));
    MusicEnigme.init();
    MusicEnigme.createEnigma();
    var piece5 = new GameObject("");
    loader.load("./Assets/Textures/scene5.json", function (carte) {
        piece5 = addObject(carte, "carte5", true, scene);
        piece5.position.z = 60;
    });
    var fakeWallGeo = new PlaneGeometry(4, 5);
    var fakeWallTexture = new TextureLoader(manager).load("./Assets/Textures/wall.jpg");
    var fakeWallMaterial = new MeshPhongMaterial({ emissiveMap: fakeWallTexture, emissive: 0x19140e, specular: 0xffffff, shininess: 30, color: 0x000000 });
    var fakeWall = new Mesh(fakeWallGeo, fakeWallMaterial);
    var fakeWallObj = addInteractable(fakeWall, "fakeWall", true, scene, (obj) => {
        removeInteraction(obj);
        removeCollision(obj);
        UI.increment();
        MusicEnigme.sonWinWin.play();
    });
    fakeWallObj.position.set(7.5, 2.5, 67);
    fakeWallObj.rotateY(degToRad(-90));
    return scene;
}
export function removeInteraction(obj) {
    interactionArray = interactionArray.filter(function (el) { return el !== obj; });
}
export function removeCollision(obj) {
    collisionArray = collisionArray.filter(function (el) { return el !== obj; });
}
export { collisionArray, interactionArray };
