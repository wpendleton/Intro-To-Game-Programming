import Engine from "../../engine/Engine.js"
import SceneManager from "../SceneManager.js"

export default class StaticSelectionController extends Engine.Base.Behavior {
    static source = null;
    static move = null;
    static attack = null;

    static selectionHandler(tile) {
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
            let unit = tile.getUnit();
            if (unit) {
                if (unit.friendly == 0) {
                    //TODO : Verify Attack Range
                    this.selectAttack(tile);
                }
            }
            return;
        }
        if (this.source) {
            let unit = tile.getUnit();
            if (unit) {
                if (unit.friendly == 0) {
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
        let unit = tile.getUnit();
        if (unit) {
            if (unit.friendly == 1) {
                this.selectSource(tile);
            }
        }

    }
    static selectSource(tile) {
        this.source = tile;
        this.source.rectangle.lowlight = true;
    }

    static selectMove(tile) {
        this.move = tile;
        this.move.rectangle.lowlight = true;
    }

    static selectAttack(tile) {
        this.attack = tile;
        this.attack.rectangle.lowlight = true;
    }

    static deselectSource() {
        this.deselectMove();
        if (this.source) {
            this.source.rectangle.lowlight = false;
            this.source = null;
        }
    }

    static deselectMove() {
        this.deselectAttack();
        if (this.move) {
            if (this.move != this.source){
                this.move.rectangle.lowlight = false;
            }
            this.move = null;
        }
    }

    static deselectAttack() {
        if (this.attack) {
            this.attack.rectangle.lowlight = false;
            this.attack = null;
        }
    }

    static sendMove() {
        if (this.source && this.move) {
            let unit = this.source.getUnit();
            this.source.setUnit(null);//TODO: fix this
            this.move.setUnit(unit);//this
            this.move.unit.setTile(this.move.x, this.move.y);//this
        }
        if (this.source && this.attack) {
            let unit = this.attack.getUnit();
            SceneManager.currentScene.deleteObject(unit.gameObject); //TODO: Apply damage instead
            this.attack.setUnit(null);//TODO fix this
        }
        this.deselectSource();
    }
}