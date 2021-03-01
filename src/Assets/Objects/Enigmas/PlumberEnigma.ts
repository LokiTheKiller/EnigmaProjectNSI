/**import { Interactable } from "../../../System/Core/GameObject.js";

var plumber: Pipe[][] = new Array(6).fill(new Array(6));

export function setPipe(x: number, y: number, pipe: Pipe): void{
    plumber[x][y] = pipe;
}

export function getPipe(x: number, y: number): Pipe{
    return plumber[x][y];
}

export function checkSolution(): boolean{
    return false;
}

export class Pipe extends Interactable{

    state: number = 0;
    constructor(name: string, interactCallback: (obj: Interactable) => void){
        super(name, interactCallback);
    }

}**/