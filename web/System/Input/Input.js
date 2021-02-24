import { Vector2 } from "../../../libs/three/src/Three.js";
document.addEventListener("keydown", onKeyDown, false);
document.addEventListener("keyup", onKeyUp, false);
document.addEventListener("mousemove", updateMousePosition, false);
let mouseMove = new Vector2(0, 0);
class Key {
    constructor() {
        this.event = false;
        this.keyPressed = false;
        this.keyState = 0;
    }
    update() {
        if (!this.event) {
            if (this.keyState !== 0) {
                this.keyState = 0;
            }
        }
        else {
            this.event = false;
        }
    }
    trigger() {
        this.event = true;
    }
}
const keys = new Array(256);
for (let i = 0; i < 256; i++) {
    keys[i] = new Key();
}
export function update() {
    for (let i = 0; i < 256; i++) {
        keys[i].update();
    }
}
export function lateUpdate() {
    mouseMove.x = 0;
    mouseMove.y = 0;
}
function onKeyUp(event) {
    var keyCode = event.which;
    keys[keyCode].keyPressed = false;
    keys[keyCode].keyState = -1;
    keys[keyCode].trigger();
}
function onKeyDown(event) {
    var keyCode = event.which;
    keys[keyCode].keyPressed = true;
    keys[keyCode].keyState = 1;
    keys[keyCode].trigger();
}
function updateMousePosition(event) {
    mouseMove.x = event.movementX;
    mouseMove.y = event.movementY;
}
export function getKey(keyCode) {
    return keys[keyCode].keyPressed;
}
export function getKeyUp(keyCode) {
    return keys[keyCode].keyState == -1;
}
export function getKeyDown(keyCode) {
    return keys[keyCode].keyState == 1;
}
export function getMouseDelta() {
    return mouseMove;
}
export function asAxis(negativeKey, positiveKey) {
    if (getKey(negativeKey) && !getKey(positiveKey)) {
        return -1;
    }
    else if (!getKey(negativeKey) && getKey(positiveKey)) {
        return 1;
    }
    else {
        return 0;
    }
}
