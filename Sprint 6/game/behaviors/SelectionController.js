import Engine from "../../engine/Engine.js"
import SceneManager from "../SceneManager.js"

class SelectionController extends Engine.Base.Behavior {
    source;
    move;
    attack;
    constructor() {
        super();
        this.source = null;
        this.move = null;
        this.attack = null;
    }
    start() { }
    update() { }
    selectionHandler(tile) {
        if (tile == this.source) {
            this.deselectSource();
            return;
        }
        if (tile == this.move) {
            this.deselectMove();
            return;
        }
        if (tile == this.attack) {
            if (this.move == this.source){
                this.deselectMove();
            }
            else{
                this.deselectAttack();
            }
            return;
        }
        
        if (this.attack) {
            return;
        }
        if (this.move) {
            if (tile.unit) {
                if (tile.unit.friendly == 0) {
                    //TODO : Verify Attack Range
                    this.selectAttack(tile);
                }
            }
            return;
        }
        if (this.source) {
            if (tile.unit) {
                if (tile.unit.friendly == 0) {
                    //TODO: Verify Attack Range;
                    this.selectMove(this.source);
                    this.selectAttack(tile);
                }
            } else if (tile.type == "P" || tile.type == "F") {
                //TODO: Verify Movement Range
                this.selectMove(tile);
            }

            return;
        }
        if (tile.unit) {
            if (tile.unit.friendly == 1) {
                this.selectSource(tile);
            }
        }

    }
    selectSource(tile) {
        this.source = tile;
        this.source.rectangle.lowlight = true;
    }

    selectMove(tile) {
        this.move = tile;
        this.move.rectangle.lowlight = true;
    }

    selectAttack(tile) {
        this.attack = tile;
        this.attack.rectangle.lowlight = true;
    }

    deselectSource() {
        this.deselectMove();
        if (this.source) {
            this.source.rectangle.lowlight = false;
            this.source = null;
        }
    }

    deselectMove() {
        this.deselectAttack();
        if (this.move) {
            if (this.move != this.source){
                this.move.rectangle.lowlight = false;
            }
            this.move = null;
        }
    }

    deselectAttack() {
        if (this.attack) {
            this.attack.rectangle.lowlight = false;
            this.attack = null;
        }
    }

    sendMove() {
        if (this.source && this.move) {
            let unit = this.source.getUnit();
            this.source.setUnit(null);
            this.move.setUnit(unit);
            this.move.unit.setTile(this.move.x, this.move.y);
        }
        if (this.source && this.attack) {
            let unit = this.attack.getUnit();
            SceneManager.currentScene.deleteObject(unit.gameObject); //TODO: Apply damage instead
            this.attack.setUnit(null);
        }
        this.deselectSource();
    }
}

export default SelectionController;