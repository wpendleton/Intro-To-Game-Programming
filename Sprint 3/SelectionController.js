import Behavior from "./Behavior.js";

class SelectionController extends Behavior {
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
            this.move.rectangle.lowlight = false;
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
            this.move.setUnit(this.source.unit);
            this.source.unit.setTile(this.move.x, this.move.y);
            this.source.setUnit(null);
            this.deselectSource(); //TODO implement this functionality;
        }
    }
}

export default SelectionController;