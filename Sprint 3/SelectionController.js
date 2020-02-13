import Behavior from "./Behavior.js";

class SelectionController extends Behavior{
    source;
    move;
    attack;
    start(){
        this.source = null;
        this.move = null;
        this.attack = null;
    }
    update(){

    }
    selectSource(tile){
        this.source = tile;
        this.source.rectangle.lowlight = true;
    }
    selectMove(tile){
        this.move = tile;
        this.move.rectangle.lowlight = true;
    }
    selectAttack(tile){
        this.attack = tile;
        this.attack.rectangle.lowlight = true;
        //this.sendMove(); //TODO: move this call to a "Confirm" button
    }
    deselectSource(){
        if (this.attack){
            this.attack.rectangle.lowlight = false;
            this.attack = null;
        }
        if(this.move){
            this.move.rectangle.lowlight = false;
            this.move = null;
        }
        if(this.source){
            this.source.rectangle.lowlight = false;
            this.source = null;
        }
    }
    deselectMove(){
        if (this.attack){
            this.attack.rectangle.lowlight = false;
            this.attack = null;
        }
        if(this.move){
            this.move.rectangle.lowlight = false;
            this.move = null;
        }
    }
    deselectAttack(){
        if (this.attack){
            this.attack.rectangle.lowlight = false;
            this.attack = null;
        }
    }
    sendMove(){
        this.source.rectangle.lowlight = false;
        this.move.rectangle.lowlight = false;
        this.attack.rectangle.lowlight = false;
        this.source = null;
        this.move = null;
        this.attack = null;
    }
}

export default SelectionController;