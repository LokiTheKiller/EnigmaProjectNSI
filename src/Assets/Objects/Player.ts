import { GameObject, Interactable } from "../../System/Core/GameObject.js";
import * as Maths from "../../System/Maths.js";
import * as Game from "../../Game.js";
import * as Input from "../../System/Input/Input.js";
import { PerspectiveCamera, Vector2, Vector3, Raycaster, Intersection, Euler, AudioLoader, Audio, AudioListener} from "../../../libs/three/src/Three.js";
import * as UI from "../Objects/UI.js"
import { collisionArray, interactionArray, objTrapdoor, scene } from "../Scenes/MainScene.js"      
var breakSound:Audio = new Audio(new AudioListener());


export class Player extends GameObject{

    targetAngle: number = 0;
    speed: number = 6;
    currentSpeed: number = 0;
    lock: boolean = false;
    iTarget: Interactable | undefined = undefined;
    camera: PerspectiveCamera | undefined = undefined;
    raycaster: Raycaster = new Raycaster();
    rotate: Euler = new Euler(0, 0, 0);
    trapBroke:boolean = false;

    constructor(name: string){
        super(name);
    }

    collision(x:number, z:number): Boolean
    {
        if (this.camera === undefined)
        {
            return true;
        }
        const distance:number = 0.4;
        const obstacles:Array<GameObject> = collisionArray;
        let collisions:Array<Intersection>;
        let posTete:Vector3 = this.camera.position; //PosTete et pied, pour simuler un personnage et pas simplement une caméra volante.
        let posPied:Vector3 = new Vector3(this.camera.position.x, this.camera.position.y - 1.78, this.camera.position.z);
        this.raycaster.set(posTete, new Vector3(z, 0, x));
        collisions = this.raycaster.intersectObjects(obstacles, true);
        if (collisions.length > 0 && collisions[0].distance <= distance) //On verifie si il y a collision au niveau de la tête,
        {
            return true;
        }
        this.raycaster.set(posPied, new Vector3(z, 0, x));
        collisions = this.raycaster.intersectObjects(obstacles, true);
        if (collisions.length > 0 && collisions[0].distance <= distance) //puis des pieds
        {
            return true;
        }
        return false

    }

    interactionTrappe(): void{
        if (this.camera === undefined || this.trapBroke)
        {
            return;
        }
        let vecteurDown: Vector3 = new Vector3(0, -1, 0);
        this.raycaster.set(this.camera.position, vecteurDown);
        let interaction: Array<Intersection> = this.raycaster.intersectObject(objTrapdoor, true);
        if (interaction.length > 0)
        {
            const loader = new AudioLoader();
            loader.load("./Assets/Sounds/TrapBreak.mp3", function(buffer: AudioBuffer) {
                breakSound.setBuffer(buffer);
                breakSound.setVolume(0.6);
            });
            while(this.camera.position.y > -8.2)
            {
                this.camera.position.y -= 0.1;
                Game.renderer.render(scene, this.camera);
            }
            scene.remove(objTrapdoor);
            this.trapBroke = true;
            breakSound.play();
        }
    }

    interaction(): void{
        if (this.camera === undefined)
        {
            return;
        }
        const iter: Array<GameObject> = interactionArray;
        const distance: number = 2.5;
        let interactions:Array<Intersection>;
        let cameraDir:Vector3 = new Vector3();
        this.camera.getWorldDirection(cameraDir);
        this.raycaster.set(this.camera.position, cameraDir);
        interactions = this.raycaster.intersectObjects(iter, true);
        if (interactions.length > 0 && interactions[0].distance <= distance)
        {
            
            let parent: GameObject | null = Game.getParentGameObject(interactions[0].object);
            if(parent !== null && parent instanceof Interactable){
                if(parent.interactable){
                    UI.showOnDebug("Press E to interact");
                    this.iTarget = parent;
                }
                
            }

        } else {
            this.iTarget = undefined;
            UI.showOnDebug("");
        }

    }

    update(): void{
        let v: number = Input.asAxis(90, 83);
        let h: number = Input.asAxis(81, 68);
        if(this.lock){
            v = 0;
            h = 0;
        }
        let x: number = 0;
        let z: number = 0;
        let moveDir = new Vector2(0, 0);
        
        if(this.camera !== undefined){
            this.interaction();
            this.rotate.y -= Maths.degToRad(Input.getMouseDelta().x * 0.25);
            this.rotate.x = Maths.clamp(this.rotate.x - Maths.degToRad(Input.getMouseDelta().y * 0.25), -Math.PI / 2, Math.PI/2);

            const euler: Euler = new Euler(0, 0, 0, 'YXZ');
            euler.x = this.rotate.x;
            euler.y = this.rotate.y;
            this.camera.quaternion.setFromEuler(euler);

            if(Math.sqrt(v * v + h * h) !== 0){
                let angle: number = Maths.radToDeg(Math.atan2(h, v));
                this.targetAngle = Maths.radToDeg(this.rotate.y) + angle;
                moveDir = new Vector2(Math.cos(Maths.degToRad(this.targetAngle)), Math.sin(Maths.degToRad(this.targetAngle)));
                if(this.currentSpeed < this.speed){
                    this.currentSpeed += this.speed * 1/30;
                }

            } else {
                if(this.currentSpeed > 0){
                    moveDir = new Vector2(Math.cos(Maths.degToRad(this.targetAngle)), Math.sin(Maths.degToRad(this.targetAngle)));
                    this.currentSpeed -= this.speed * 1/30;
                }

            }
            this.interactionTrappe();
            if (!this.collision(moveDir.x, moveDir.y)){
                this.camera.position.x += moveDir.y * this.currentSpeed * 1/60;
                this.camera.position.z += moveDir.x * this.currentSpeed * 1/60;
            }

        }

        if(this.iTarget !== undefined && Input.getKeyDown(69)){
            this.iTarget.interact();
        }

    }

}