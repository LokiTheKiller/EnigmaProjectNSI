import { Interactable } from "../../../System/Core/GameObject.js";
import { Door } from "../../Objects/Door.js";
import { Audio, AudioListener, AudioLoader, BoxGeometry, Color, Mesh, MeshPhongMaterial, PointLight } from "../../../../libs/three/src/Three.js";
import { interactionArray } from "../../Scenes/MainScene.js";
import * as Game from "../../../Game.js";
import * as UI from "../../Objects/UI.js";
import * as Music from "../Enigmas/MusicEnigma.js";
export var door = new Door("Null");
var colors = [0, 1, 2, 3, 4, 5, 6, 7];
var fireBurstSound = new Audio(new AudioListener());
var fireSound = new Audio(new AudioListener());
export function init() {
    fireBurstSound = new Audio(Game.getHandler().audioListener);
    fireSound = new Audio(Game.getHandler().audioListener);
    const loader = new AudioLoader();
    loader.load("./Assets/Sounds/fire-burst.mp3", function (buffer) {
        fireBurstSound.setBuffer(buffer);
        fireBurstSound.setVolume(0.1);
    });
    loader.load("./Assets/Sounds/fire.mp3", function (buffer) {
        fireSound.setBuffer(buffer);
        fireSound.setVolume(0.1);
    });
}
var ansLight = new PointLight();
var stageAnswer = colors[Math.floor(Math.random() * 8)];
var currentStage = 0;
var solved = false;
var candles = new Array(3).fill(false);
function checkStage() {
    if (solved) {
        return;
    }
    let input = 0;
    for (let i = 0; i < 3; i++) {
        let toAdd = candles[i] ? Math.round(Math.pow(2, i)) : 0;
        input = input | toAdd;
    }
    let check = input === stageAnswer;
    if (check) {
        colors.filter(function (color) { return color !== stageAnswer; });
        stageAnswer = colors[Math.floor(Math.random() * colors.length)];
        if (fireBurstSound.isPlaying) {
            fireBurstSound.stop();
        }
        fireBurstSound.play();
        if (currentStage == 2) {
            solved = true;
            UI.increment();
            door.animate();
            Music.sonWinWin.play();
        }
        else {
            ansLight.color = changeColor(ansLight.color);
            currentStage++;
        }
    }
}
export function changeColor(color) {
    if (color === undefined) {
        color = new Color();
    }
    let r = (stageAnswer >> 2) & 1;
    let g = (stageAnswer >> 1) & 1;
    let b = stageAnswer & 1;
    color.setRGB(r, g, b);
    return color;
}
export function isSolved() {
    return false;
}
export function createEnigma(scene) {
    const geometry = new BoxGeometry();
    const rMaterial = new MeshPhongMaterial({ color: 0xBF0000, opacity: 0, transparent: true });
    const gMaterial = new MeshPhongMaterial({ color: 0x00BF00, opacity: 0, transparent: true });
    const bMaterial = new MeshPhongMaterial({ color: 0x0000BF, opacity: 0, transparent: true });
    const rLight = new PointLight(0xFF0000, 0, 0.5);
    const gLight = new PointLight(0x00FF00, 0, 0.5);
    const bLight = new PointLight(0x0000FF, 0, 0.5);
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
    const rMesh = new Mesh(geometry, rMaterial);
    const gMesh = new Mesh(geometry, gMaterial);
    const bMesh = new Mesh(geometry, bMaterial);
    let rInteract = function () {
        candles[2] = !candles[2];
        if (candles[2]) {
            fireSound.play();
        }
        rLight.intensity = candles[2] ? 1 : 0;
        checkStage();
    };
    let gInteract = function () {
        candles[1] = !candles[1];
        if (candles[1]) {
            fireSound.play();
        }
        gLight.intensity = candles[1] ? 1 : 0;
        checkStage();
    };
    let bInteract = function () {
        candles[0] = !candles[0];
        if (candles[0]) {
            fireSound.play();
        }
        bLight.intensity = candles[0] ? 1 : 0;
        checkStage();
    };
    let rInteraction = new Interactable("Red candle", rInteract);
    interactionArray.push(rInteraction);
    rInteraction.add(rMesh);
    rInteraction.position.x = 6.975;
    rInteraction.position.y = 2.6;
    rInteraction.position.z = -0.85;
    rInteraction.scale.x = 0.25;
    rInteraction.scale.y = 0.5;
    rInteraction.scale.z = 0.25;
    scene.add(rInteraction);
    let gInteraction = new Interactable("Green candle", gInteract);
    interactionArray.push(gInteraction);
    gInteraction.add(gMesh);
    gInteraction.position.x = 6.975;
    gInteraction.position.y = 2.6;
    gInteraction.position.z = -0.28;
    gInteraction.scale.x = 0.25;
    gInteraction.scale.y = 0.5;
    gInteraction.scale.z = 0.25;
    scene.add(gInteraction);
    let bInteraction = new Interactable("Blue candle", bInteract);
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
export function setDoor(doorObj) {
    door = doorObj;
}
