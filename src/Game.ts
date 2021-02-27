import { Object3D, WebGLRenderer } from '../libs/three/src/Three.js';
import * as MainScene from "./Assets/Scenes/MainScene.js";
import * as Input from "./System/Input/Input.js";
import * as Cursor from "./System/Input/Cursor.js";
import { GameObject } from "./System/Core/GameObject.js";
//import * as Time from './System/Core/Time.js';
import { Handler } from './System/Core/Handler.js';

window.addEventListener('resize', onWindowResize, false);

const canvas: HTMLCanvasElement | null = document.querySelector('#canvas');
var renderer: WebGLRenderer = new WebGLRenderer();
if(canvas !== null){
    renderer = new WebGLRenderer({canvas});
}
const handler: Handler = new Handler();
load();

function load(): void{
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    handler.scene = MainScene.load();
    Cursor.init();
    Cursor.setCursorLockState(true);
    animate();
}

function animate(): void {
    requestAnimationFrame(animate);
    
    Input.update();
    handler.update();
    /**getInput();

    
    camera.position.x += xMove;
    camera.rotation.x += xRotate;
    camera.rotation.y += yRotate;
    camera.position.z += zMove;**/

    let scene = handler.getScene();
    if(scene !== null){
        renderer.render(scene, handler.camera);
    }
    Input.lateUpdate();
}

function onWindowResize ()
{
    handler.camera.aspect = window.innerWidth / window.innerHeight;
    handler.camera.updateProjectionMatrix();
    renderer.setSize (window.innerWidth, window.innerHeight);
}

export function getHandler(): Handler{
    return handler;
}

export function getCanvas(): HTMLCanvasElement | null{
    return canvas;
}

export function getParentGameObject(obj: Object3D): GameObject | null{
    if(obj instanceof GameObject){
        return obj;
    }

    if(obj.parent !== null){
        let parent: Object3D = obj.parent;
        let go: GameObject | null = getParentGameObject(parent);
        if(go !== null){
            return go;
        }

    }
    return null;
}

/**const speed = 5 * Time.deltaTime;

const scene: Scene = new Scene();
const camera: PerspectiveCamera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);


renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry: BoxGeometry = new BoxGeometry();
const material: MeshBasicMaterial = new MeshBasicMaterial( { color: 0x8BEBFF } );
var cube: Mesh = new Mesh(geometry, material);

scene.add(cube);

var xMove: number = 0.0;
var xRotate: number = 0.0;
var yRotate: number = 0.0;
var zMove: number = 0.0;

camera.position.x = -5;
camera.position.y = 2;
camera.lookAt(cube.position);

function getInput(){
    xMove = 0.0;
    xRotate = 0.0;
    yRotate = 0.0;
    zMove = 0.0;

    if (getKey(90)) {
        xMove += speed;
    }
    if (getKey(83)) {
        xMove -= speed;
    }
    if (getKey(68)) {
        zMove += speed;
    }
    if (getKey(81)) {
        zMove -= speed;
    }
    if (getKey(70)) {
        yRotate += speed;
    }
    if(getKey(82)){
        yRotate -= speed;
    }
    if(getKey(65)){
        xRotate += speed;
    }
    if(getKey(69)){
        xRotate -= speed;
    }

}**/