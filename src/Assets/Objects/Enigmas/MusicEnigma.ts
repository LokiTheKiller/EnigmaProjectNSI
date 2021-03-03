import { GameObject, Interactable } from "../../../System/Core/GameObject.js";
import { Audio, BufferGeometry, AudioLoader, MeshBasicMaterial, BoxGeometry, Color, Mesh, MeshPhongMaterial, PointLight, Scene, BufferGeometryLoader, AudioListener} from "../../../../libs/three/src/Three.js";
import { interactionArray, removeCollision, scene, addObject, objDoor5, collisionArray } from "../../Scenes/MainScene.js";
import { degToRad } from "../../../System/Maths.js"
import * as Game from "../../../Game.js";
import * as UI from "../../Objects/UI.js";

var solved:boolean = false;
var stage:number = 0;
var soundArray:Array<Audio> = [];
var musArray:Array<Audio> = [];
const clocheMaterial: MeshPhongMaterial = new MeshPhongMaterial( {emissive: 0x2e3440} );  
var playedNotes:Array<String> = [];
var Musics:Array<Array<String>> = [
["Mi", "Mi", "Mi", "Mi","Mi", "Mi", "Mi", "Sol", "Do", "Ré", "Mi" ],
[ "Ré", "Ré", "Ré", "Do", "Ré", "Mi", "Do"],
[ "Do", "Ré", "Mi", "Ré", "Mi", "Mi", "Mi" ,"Sol", "Mi", "Ré", "Do", "Mi"],
["Do", "Do", "Ré", "Mi", "Sol", "Sol", "Do", "Do", "Ré", "Mi"]
];


var sonWin = new Audio(new AudioListener());
var sonWinWin = new Audio(new AudioListener());
var soneaster1 = new Audio(new AudioListener());
var soneaster2 = new Audio(new AudioListener());



function playMusic():void
{
    if (stage > 5)
    {
        stage = 0;
    }
    if (musArray[stage].isPlaying)
    {
        musArray[stage].stop();
    }
    if (solved)
    {
        stage++;
    }
    musArray[stage].play();
    playedNotes = [];
}

function check(i: number): void{
    if (i == playedNotes.length || i == Musics[stage].length){
        return;
    }
    console.log(playedNotes[playedNotes.length - i]);
    console.log(Musics[stage][Musics[stage].length - i]);
    if (playedNotes[playedNotes.length - i] == Musics[stage][Musics[stage].length - i]) 
    {
        if (i == Musics[stage].length - 1)
        {
            if (stage == 3)
            {
                sonWinWin.play();
                scene.remove(objDoor5);
                removeCollision(objDoor5);
                solved = true;
                UI.increment();
                return;
            }
            stage++;
            playedNotes = [];
            sonWin.play();
            return;
        }
        check(i+1);
    }
}

export function init(): void{
    let sonDo = new Audio(Game.getHandler().audioListener);
    let sonRe = new Audio(Game.getHandler().audioListener);
    let sonMi = new Audio(Game.getHandler().audioListener);
    let sonSol = new Audio(Game.getHandler().audioListener);
    let musVive = new Audio(Game.getHandler().audioListener);
    let musMario = new Audio(Game.getHandler().audioListener);
    let musEvan = new Audio(Game.getHandler().audioListener);
    let musHein = new Audio(Game.getHandler().audioListener);
    

    const loader = new AudioLoader();
    loader.load("./Assets/Sounds/Do.mp3", function(buffer: AudioBuffer) {
        sonDo.setBuffer(buffer);
        sonDo.setVolume(0.3);
    });
    loader.load("./Assets/Sounds/Re.mp3", function(buffer: AudioBuffer){
        sonRe.setBuffer(buffer);
        sonRe.setVolume(0.3);
    });
    loader.load("./Assets/Sounds/Mi.mp3", function(buffer: AudioBuffer){
        sonMi.setBuffer(buffer);
        sonMi.setVolume(0.3);
    });
    loader.load("./Assets/Sounds/Sol.mp3", function(buffer: AudioBuffer){
        sonSol.setBuffer(buffer);
        sonSol.setVolume(0.3);
    });
    soundArray = [sonDo, sonRe, sonMi, sonSol];
    loader.load("./Assets/Sounds/Evangelion.mp3", function(buffer: AudioBuffer){
        musEvan.setBuffer(buffer);
        musEvan.setVolume(0.3);
    });
    loader.load("./Assets/Sounds/MarioTheme.mp3", function(buffer: AudioBuffer){
        musMario.setBuffer(buffer);
        musMario.setVolume(0.3);
    });
    loader.load("./Assets/Sounds/Mus.mp3", function(buffer: AudioBuffer){
        musHein.setBuffer(buffer);
        musHein.setVolume(0.3);
    });
    loader.load("./Assets/Sounds/ViveLeVent.mp3", function(buffer: AudioBuffer){
        musVive.setBuffer(buffer);
        musVive.setVolume(0.3);
    });
    loader.load("./Assets/Sounds/win.mp3", function(buffer: AudioBuffer){
        sonWin.setBuffer(buffer);
        sonWin.setVolume(0.3);
    });
    loader.load("./Assets/Sounds/winwin.mp3", function(buffer: AudioBuffer){
        sonWinWin.setBuffer(buffer);
        sonWinWin.setVolume(0.3);
    });
    loader.load("./Assets/Sounds/ea1.mp3", function(buffer: AudioBuffer){
        soneaster1.setBuffer(buffer);
        soneaster1.setVolume(0.3);
    });
    loader.load("./Assets/Sounds/ea2.mp3", function(buffer: AudioBuffer){
        soneaster2.setBuffer(buffer);
        soneaster2.setVolume(0.3);
    });
    musArray = [musVive, musMario, musEvan, musHein, soneaster1, soneaster2];
    const loaderGeo = new BufferGeometryLoader();
    loaderGeo.load("./Assets/Textures/bell.json", function(bell: BufferGeometry) {
        const clocheMesh: Mesh = new Mesh(bell, clocheMaterial);
        const clocheMesh2: Mesh = new Mesh(bell, clocheMaterial);
        const clocheMesh3: Mesh = new Mesh(bell, clocheMaterial);
        const clocheMesh4: Mesh = new Mesh(bell, clocheMaterial);
        clocheMesh.position.y = 1.3; 
        clocheMesh.position.z = 42.45;
        clocheMesh.position.x = -0.3;
        clocheMesh.scale.set(5,5,5);
        clocheMesh.rotation.x = degToRad(-90);
        const clocheIntSol:Interactable = new Interactable("clocheSol", function()
        {
            if(soundArray[3].isPlaying){
                soundArray[3].stop();
            }
            soundArray[3].play();
            playedNotes.push("Sol");
            check(0);
        }
        );
        interactionArray.push(clocheIntSol);
        clocheIntSol.add(clocheMesh);
        scene.add(clocheIntSol);
        clocheMesh2.position.y = 1.3; 
        clocheMesh2.position.z = 41.45;
        clocheMesh2.position.x = -0.3;
        clocheMesh2.scale.set(5,5,5);
        clocheMesh2.rotation.x = degToRad(-90);
        const clocheIntMi:Interactable = new Interactable("clocheMi", function()
        {
            if(soundArray[2].isPlaying){
                soundArray[2].stop();
            }
            soundArray[2].play();
            playedNotes.push("Mi");
            check(0);
        }
        );
        interactionArray.push(clocheIntMi);
        clocheIntMi.add(clocheMesh2);
        scene.add(clocheIntMi);
        clocheMesh3.position.y = 1.3; 
        clocheMesh3.position.z = 40.45;
        clocheMesh3.position.x = -0.3;
        clocheMesh3.scale.set(5,5,5);
        clocheMesh3.rotation.x = degToRad(-90); 
        const clocheIntRe:Interactable = new Interactable("clocheRe", function()
        {
            if(soundArray[1].isPlaying){
                soundArray[1].stop();
            }
            soundArray[1].play();
            playedNotes.push("Ré")
            check(0);
        }
        );
        interactionArray.push(clocheIntRe);
        clocheIntRe.add(clocheMesh3);
        scene.add(clocheIntRe);
        clocheMesh4.position.y = 1.3; 
        clocheMesh4.position.z = 39.45;
        clocheMesh4.position.x = -0.3;
        clocheMesh4.scale.set(5,5,5);
        clocheMesh4.rotation.x = degToRad(-90);
        const clocheIntDo:Interactable = new Interactable("clocheDo", function()
        {
            if(soundArray[0].isPlaying){
                soundArray[0].stop();
            }
            soundArray[0].play();
            playedNotes.push("Do");
            check(0);
        }
        );
        interactionArray.push(clocheIntDo);
        clocheIntDo.add(clocheMesh4);
        scene.add(clocheIntDo);
    })
}

export function createEnigma():void {
    var hitboxBoiteGeo:BoxGeometry = new BoxGeometry(0.4, 0.4, 0.7);
    var hitboxBoiteMat:MeshBasicMaterial = new MeshBasicMaterial();
    var hitboxBoiteMesh = new Mesh(hitboxBoiteGeo, hitboxBoiteMat);
    const BoiteMusique:Interactable = new Interactable("BoiteMusique", playMusic);
    BoiteMusique.add(hitboxBoiteMesh);
    interactionArray.push(BoiteMusique);
    hitboxBoiteMesh.visible = false;
    BoiteMusique.position.set(0, 1.55, 38)
    scene.add(BoiteMusique);

}