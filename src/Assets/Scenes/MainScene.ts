import { Player } from "../Objects/Player.js";
import * as Game from "../../Game.js";
import * as UI from "../Objects/UI.js";
import { GameObject, Interactable } from "../../System/Core/GameObject.js";
import { BoxGeometry, Texture, Mesh, MeshBasicMaterial, Object3D, ObjectLoader, Scene, PlaneGeometry, TextureLoader, MeshPhongMaterial } from '../../../libs/three/src/Three.js';
import { Lever } from "../Objects/Lever.js";
import { degToRad } from "../../System/Maths.js"

import * as ColoredCandles from "../Objects/Enigmas/ColoredCandlesEnigma.js"

export var scene: Scene = new Scene();

let collisionArray: Array<GameObject> = [];
let interactionArray: Array<GameObject> = [];

function addObject(mesh: Mesh|Object3D, name: string, collideable: Boolean, scene: Scene): GameObject
{
    var obj: GameObject = new GameObject(name);
    if (collideable)
    {
        collisionArray.push(obj);
    }
    obj.add(mesh);
    scene.add(obj);
    return obj;
}

function addInteractable(mesh: Mesh, name: string, collideable: boolean, scene: Scene, interaction: (obj: Interactable) => void): Interactable{
    var obj: Interactable = new Interactable(name, interaction);
    if (collideable)
    {
        collisionArray.push(obj);
    }
    interactionArray.push(obj);
    obj.add(mesh);
    scene.add(obj);
    return obj;
}

export function load(): Scene{
    const loader: ObjectLoader = new ObjectLoader();
    var map: GameObject = new GameObject("");
    loader.load("./Assets/Textures/scene.json", function(carte: Object3D) {
        map = addObject(carte, "carte", true, scene);
     })
    const geometry: BoxGeometry = new BoxGeometry();
    var doorGeo: PlaneGeometry = new PlaneGeometry(3.3, 5);
    const texture = new TextureLoader().load('./Assets/Textures/wood_door_01.png');
    var doorMaterial: MeshPhongMaterial = new MeshPhongMaterial( { emissiveMap: texture, emissive: 0x2a2a2a} );
    var door: Mesh = new Mesh(doorGeo, doorMaterial);
    var door2: Mesh = new Mesh();
    door2.copy(door);
    var objDoor: GameObject = addObject(door, "Door", true, scene);
    var objDoor2: GameObject = addObject(door2, "Door2", true, scene);
    objDoor.position.set(0, 2.5, 9.5);
    objDoor.rotateY(degToRad(180));
    objDoor2.position.set(0, 2.5, -9.5);

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
    var leverMaterial: MeshBasicMaterial = new MeshBasicMaterial( {color: 0xDEB887 } );
    var leverBaseMaterial: MeshBasicMaterial = new MeshBasicMaterial( {color: 0xC5C3C2} );
    var leverMesh: Mesh = new Mesh(geometry, leverMaterial);
    var leverBaseMesh: Mesh = new Mesh(geometry, leverBaseMaterial);
    
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

    var piece2: GameObject = new GameObject("");
    loader.load("./Assets/Textures/scene2.json", function(carte: Object3D) {
        piece2 = addObject(carte, "carte2", true, scene);
        piece2.position.z = 15;
        piece2.rotateY(degToRad(-90));
     })


    var piece3: GameObject = new GameObject("");
    loader.load("./Assets/Textures/scene3.json", function(carte: Object3D) {
        piece3 = addObject(carte, "carte3", true, scene);
        piece3.position.z = 25;
        piece3.rotateY(degToRad(-90));
     })
    var door4: Mesh = new Mesh(doorGeo, doorMaterial);
    var objDoor4: GameObject = addObject(door4, "Door4", true, scene);
    objDoor4.position.set(0, 2.5, 29.5);
    objDoor4.rotateY(degToRad(180));
    var trapdoorGeo: PlaneGeometry = new PlaneGeometry(2, 2.3);
    const trapdoorTexture: Texture = new TextureLoader().load('./Assets/Textures/trapdoor.jpg');
    var trapdoorMaterial: MeshPhongMaterial = new MeshPhongMaterial( { emissiveMap: trapdoorTexture, emissive: 0x2a2a2a} );
    var trapdoorMesh: Mesh = new Mesh(trapdoorGeo, trapdoorMaterial);
    var objTrapdoor:GameObject = addObject(trapdoorMesh, "trapdoor", true, scene);
    objTrapdoor.position.z = 22.85;
    objTrapdoor.rotateX(degToRad(-90));

    var player: Player = new Player("Player Test");
    player.camera = Game.getHandler().camera;
    player.camera.position.y = 1.8; //mise de la caméra à hauteur "humaine".
    // player.camera.lookAt(cube.position);
    scene.add(player);
    return scene;
}

export function removeInteraction(obj: GameObject): void{
    interactionArray = interactionArray.filter(function(el: GameObject) { return el !== obj; });
}

export function removeCollision(obj: GameObject): void{
    collisionArray = collisionArray.filter(function(el: GameObject) { return el !== obj; });
}

export { collisionArray, interactionArray };