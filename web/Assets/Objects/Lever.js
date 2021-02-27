"use strict";
/**import { Interactable } from "../../System/Core/GameObject.js";

export class Lever extends Interactable{

    on: boolean = false;
    current: number = 0; objective: number = 1;
    animation: boolean = false;

    constructor(name: string, interactCallback: (obj: Interactable) => void){
        super(name, interactCallback);
    }

    update(): void{
        if(this.animation){
        
        }

    }

    interact(): void{
        this.animation = true;
        this.on = !this.on;
        if(this.on){
            this.objective = 1;
        } else {
            this.objective = 0;
        }
        this.interactCallback(this);
    }

}**/ 
