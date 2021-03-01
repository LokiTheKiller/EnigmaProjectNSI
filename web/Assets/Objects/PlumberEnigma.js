import { Interactable } from "../../System/Core/GameObject.js";
var plumber = new Array(6).fill(new Array(6));
export function setPipe(x, y, pipe) {
    plumber[x][y] = pipe;
}
export function getPipe(x, y) {
    return plumber[x][y];
}
export function checkSolution() {
    return false;
}
export class Pipe extends Interactable {
    constructor(name, interactCallback) {
        super(name, interactCallback);
        this.state = 0;
    }
}
