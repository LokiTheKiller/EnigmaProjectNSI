import * as Game from "../../Game.js";
var locked = false;
var canvas = null;
export function init() {
    canvas = Game.getCanvas();
    if (canvas !== null) {
        canvas.onclick = function () { setCursorLockState(locked); };
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
export function getLockState() {
    return document.pointerLockElement != null;
}
