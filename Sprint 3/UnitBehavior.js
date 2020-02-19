import Behavior from "./Behavior.js"
import RectangleComponent from "./RectangleComponent.js"
import BoardController from "./BoardController.js";

class UnitBehavior extends Behavior {
    x;
    y;
    type;
    friendly;
    rectangle;
    board;
    tile;
    constructor(x, y, type, friendly){
        super();
        this.x = x;
        this.y = y;
        this.type = type;
        this.friendly = friendly;
    }
    start() {
        this.rectangle = this.gameObject.getComponent(RectangleComponent);
        this.board = this.gameObject.getComponent(BoardController);
        this.board.setUnit(this.x, this.y, this);
        this.tile = this.board.getTile(this.x, this.y);
        this.tile.unit = this;
        this.gameObject.x = this.tile.gameObject.x;
        this.gameObject.y = this.tile.gameObject.y;
    }

    update() {
    }

    setTile(x, y){
        this.tile = this.board.getTile(x, y);
        this.tile.unit = this;
        this.gameObject.x = this.tile.gameObject.x;
        this.gameObject.y = this.tile.gameObject.y;
    }
}

export default UnitBehavior;