import * as Game from "../../Game.js";

document.addEventListener('pointerlockchange', lockChange, false);
document.addEventListener('mozpointerlockchange', lockChange, false);

var locked: boolean = false;
var canvas: HTMLCanvasElement | null = null;

export function init(): void{
    canvas = Game.getCanvas();
    if(canvas !== null){
        canvas.onclick = function() { setCursorLockState(locked); };
    }

}

function lockChange(): void{
    if(document.pointerLockElement === Game.getCanvas()){
        locked = true;
    } else {
        locked = false;
    }

}

export function setCursorLockState(state: boolean): void{
    if(state){
        canvas?.requestPointerLock();
    } else {
        document.exitPointerLock();
    }
    locked = state;
}