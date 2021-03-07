import { Interactable } from "../../../System/Core/GameObject.js";
import { Door } from "../../Objects/Door.js";
import { Audio, AudioListener, AudioLoader, BoxGeometry, Color, Mesh, MeshPhongMaterial, PointLight, Scene } from "../../../../libs/three/src/Three.js";
import { interactionArray, removeCollision, scene } from "../../Scenes/MainScene.js";
import * as Game from "../../../Game.js";
import * as UI from "../../Objects/UI.js";
import * as Music from "../Enigmas/MusicEnigma.js"

export var door: Door = new Door("Null");

var colors: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
var fireBurstSound = new Audio(new AudioListener());
var fireSound = new Audio(new AudioListener());

export function init(){
    fireBurstSound = new Audio(Game.getHandler().audioListener);
    fireSound = new Audio(Game.getHandler().audioListener);
    const loader = new AudioLoader();
    loader.load("./Assets/Sounds/fire-burst.mp3", function(buffer: AudioBuffer) {
        fireBurstSound.setBuffer(buffer);
        fireBurstSound.setVolume(0.1);
    });
    loader.load("./Assets/Sounds/fire.mp3", function(buffer: AudioBuffer){
        fireSound.setBuffer(buffer);
        fireSound.setVolume(0.1);
    });

}

var ansLight: PointLight = new PointLight();

var stageAnswer: number = colors[Math.floor(Math.random()*8)];
var currentStage: number = 0;
var solved: boolean = false;

var candles: boolean[] = new Array(3).fill(false);

function checkStage(): void{
    if(solved){
        return;
    }

    let input: number = 0;
    for(let i = 0; i < 3; i++){
        let toAdd: number = candles[i] ? Math.round(Math.pow(2, i)):0;
        input = input | toAdd;
    }

    let check: boolean = input === stageAnswer;
    if(check){
        colors.filter(function(color: number){ return color !== stageAnswer });
        stageAnswer = colors[Math.floor(Math.random()*colors.length)];
        if(fireBurstSound.isPlaying){
            fireBurstSound.stop();
        }
        fireBurstSound.play();

        if(currentStage == 2){
            solved = true;
            UI.increment();
            door.animate();
            Music.sonWinWin.play();
        } else {
            ansLight.color = changeColor(ansLight.color);
            currentStage++;
        }

    }

}

export function changeColor(color: Color | undefined): Color{
    if(color === undefined){
        color = new Color();
    }
    let r: number = (stageAnswer >> 2) & 1;
    let g: number = (stageAnswer >> 1) & 1;
    let b: number = stageAnswer & 1;
    color.setRGB(r, g, b);
    return color;
}

export function isSolved(): boolean{
    return false;
}

export function createEnigma(scene: Scene): void{
    const geometry: BoxGeometry = new BoxGeometry();
    const rMaterial: MeshPhongMaterial = new MeshPhongMaterial( { color: 0xBF0000, opacity: 0, transparent: true } );
    const gMaterial: MeshPhongMaterial = new MeshPhongMaterial( { color: 0x00BF00, opacity: 0, transparent: true } );
    const bMaterial: MeshPhongMaterial = new MeshPhongMaterial( { color: 0x0000BF, opacity: 0, transparent: true } );
    
    const rLight: PointLight = new PointLight(0xFF0000, 0, 0.5);
    const gLight: PointLight = new PointLight(0x00FF00, 0, 0.5);
    const bLight: PointLight = new PointLight(0x0000FF, 0, 0.5);
    ansLight = new PointLight(changeColor(undefined), 1, 0.5);

    ansLight.position.x = 6.975;
    ansLight.position.y = 2.6;
    ansLight.position.z = 0.85;

    rLight.position.x = 6.975;
    rLight.position.y = 2.6;
    rLight.position.z = -0.85;

    gLight.position.x = 6.975;
    gLight.position.y = 2.6;
    gLight.position.z = -0.28;

    bLight.position.x = 6.975;
    bLight.position.y = 2.6;
    bLight.position.z = 0.28;

    scene.add(rLight);
    scene.add(gLight);
    scene.add(bLight);
    scene.add(ansLight);

    const rMesh: Mesh = new Mesh(geometry, rMaterial);
    const gMesh: Mesh = new Mesh(geometry, gMaterial);
    const bMesh: Mesh = new Mesh(geometry, bMaterial);

    let rInteract = function(){
        candles[2] = !candles[2];
        if(candles[2]){
            fireSound.play();
        }
        rLight.intensity = candles[2] ? 1:0;
        checkStage();
    }

    let gInteract = function(){
        candles[1] = !candles[1];
        if(candles[1]){
            fireSound.play();
        }
        gLight.intensity = candles[1] ? 1:0;
        checkStage();
    }

    let bInteract = function(){
        candles[0] = !candles[0];
        if(candles[0]){
            fireSound.play();
        }
        bLight.intensity = candles[0] ? 1:0;
        checkStage();
    }

    let rInteraction: Interactable = new Interactable("Red candle", rInteract);
    interactionArray.push(rInteraction);
    rInteraction.add(rMesh);
    rInteraction.position.x = 6.975;
    rInteraction.position.y = 2.6;
    rInteraction.position.z = -0.85;

    rInteraction.scale.x = 0.25;
    rInteraction.scale.y = 0.5;
    rInteraction.scale.z = 0.25;
    scene.add(rInteraction);

    let gInteraction: Interactable = new Interactable("Green candle", gInteract);
    interactionArray.push(gInteraction);
    gInteraction.add(gMesh);
    gInteraction.position.x = 6.975;
    gInteraction.position.y = 2.6;
    gInteraction.position.z = -0.28;

    gInteraction.scale.x = 0.25;
    gInteraction.scale.y = 0.5;
    gInteraction.scale.z = 0.25;
    scene.add(gInteraction);

    let bInteraction: Interactable = new Interactable("Blue candle", bInteract);
    interactionArray.push(bInteraction);
    bInteraction.add(bMesh);
    bInteraction.position.x = 6.975;
    bInteraction.position.y = 2.6;
    bInteraction.position.z = 0.28;

    bInteraction.scale.x = 0.25;
    bInteraction.scale.y = 0.5;
    bInteraction.scale.z = 0.25;
    scene.add(bInteraction);
}

export function setDoor(doorObj: Door): void{
    door = doorObj;
}