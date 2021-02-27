import * as Game from "../../Game.js";

var locked: boolean = false;
var canvas: HTMLCanvasElement | null = null;

export function init(): void{
    canvas = Game.getCanvas();
    if(canvas !== null){
        canvas.onclick = function() { setCursorLockState(locked); };
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