import Engine from "../../engine/Engine.js"
import BoardController from "./BoardController.js";

class UnitBehavior extends Engine.Base.Behavior {
    x;
    y;
    type;
    friendly;
    rectangle;
    board;
    tile;
    constructor(x, y, type, friendly) {
        super();
        this.x = x;
        this.y = y;
        this.type = type;
        this.friendly = friendly;
    }
    start() {
        this.rectangle = this.gameObject.getComponent(Engine.Components.RectangleComponent);
        this.board = this.gameObject.getComponent(BoardController);
        this.board.setUnit(this.x, this.y, this);
        this.tile = this.board.getTile(this.x, this.y);
        this.tile.unit = this;
        this.gameObject.x = this.tile.gameObject.x;
        this.gameObject.y = this.tile.gameObject.y;
        this.rectangle.fill = this.getFill();
    }

    update() {
    }

    setTile(x, y) {
        this.tile = this.board.getTile(x, y);
        this.tile.unit = this;
        this.gameObject.x = this.tile.gameObject.x;
        this.gameObject.y = this.tile.gameObject.y;
    }

    getFill() {
        if (this.friendly == 0) {
            return "red";
        }
        else {
            return "greenyellow";
        }
    }
}

export default UnitBehavior;