import { Vector2 } from "../../../libs/three/src/Three.js";

document.addEventListener("keydown", onKeyDown, false);
document.addEventListener("keyup", onKeyUp, false);
document.addEventListener("mousemove", updateMousePosition, false);

let mouseMove = new Vector2(0, 0);

class Key{

    event: boolean = false;
    keyPressed: boolean = false;
    keyState: number = 0;

    update(): void{
        if(!this.event){
            if(this.keyState !== 0){
                this.keyState = 0;
            }

        } else {
            this.event = false;
        }

    }

    trigger(): void{
        this.event = true;
    }

}

const keys: Key[] = new Array(256);

for(let i = 0; i < 256; i++){
    keys[i] = new Key();
}

export function update(): void{
    for(let i = 0; i < 256; i++){
        keys[i].update();
    }
    
}

export function lateUpdate(): void{
    mouseMove.x = 0;
    mouseMove.y = 0;
}

function onKeyUp(event: KeyboardEvent): void{
    var keyCode = event.which;
    keys[keyCode].keyPressed = false;
    keys[keyCode].keyState = -1;
    keys[keyCode].trigger();
}

function onKeyDown(event: KeyboardEvent): void {
    var keyCode = event.which;
    if(keys[keyCode].keyPressed){
        return;
    }
    keys[keyCode].keyPressed = true;
    keys[keyCode].keyState = 1;
    keys[keyCode].trigger();
}

function updateMousePosition(event: MouseEvent): void{
    mouseMove.x = event.movementX;
    mouseMove.y = event.movementY;
}

export function getKey(keyCode: number): boolean{
    return keys[keyCode].keyPressed;
}

export function getKeyUp(keyCode: number): boolean{
    return keys[keyCode].keyState == -1;
}

export function getKeyDown(keyCode: number): boolean{
    return keys[keyCode].keyState == 1;
}

export function getMouseDelta(): Vector2{
    return mouseMove;
}

export function asAxis(negativeKey: number, positiveKey: number): number{
    if(getKey(negativeKey) && !getKey(positiveKey)){
        return -1;
    } else if(!getKey(negativeKey) && getKey(positiveKey)){
        return 1;
    } else {
        return 0;
    }

}