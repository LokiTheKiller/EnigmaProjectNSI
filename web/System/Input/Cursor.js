import * as Game from "../../Game.js";
document.addEventListener('pointerlockchange', lockChange, false);
var locked = false;
var canvas = null;
export function init() {
    canvas = Game.getCanvas();
    if (canvas !== null) {
        canvas.onclick = function () { setCursorLockState(locked); };
    }
}
function lockChange() {
    if (document.pointerLockElement === Game.getCanvas()) {
        locked = true;
    }
    else {
        locked = false;
    }
}
export function setCursorLockState(state) {
    if (state) {
        canvas === null || canvas === void 0 ? void 0 : canvas.requestPointerLock();
    }
    else {
        document.exitPointerLock();
    }
    locked = state;
}
