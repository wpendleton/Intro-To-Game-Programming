import Engine from "../../engine/Engine.js"
import SelectionController from "./SelectionController.js";
import BoardController from "./BoardController.js";

class TileBehavior extends Engine.Base.Behavior {
    rectangle;
    selector;
    board;
    x;
    y;
    width;
    height;
    type;
    unit;
    constructor(x, y, type) {
        super();
        this.x = x;
        this.y = y;
        this.type = type;
    }
    start() {
        this.rectangle = this.gameObject.getComponent(Engine.Components.RectangleComponent);
        this.selector = this.gameObject.getComponent(SelectionController);
        this.board = this.gameObject.getComponent(BoardController);
        this.board.setTile(this.x, this.y, this);
        this.rectangle.fill = this.getFill(this.type);
        this.width = this.rectangle.width;
        this.height = this.rectangle.height;
        this.gameObject.x = this.x * this.width + this.width / 2;
        this.gameObject.y = this.y * this.height + this.height / 2;
    }

    update() {
        let mouseX = Engine.Base.Input.getMouseX();
        let mouseY = Engine.Base.Input.getMouseY();
        let clicked = Engine.Base.Input.getMouseButtonUp(0);

        if (this.inBounds(mouseX, mouseY)){
            this.rectangle.highlight = true;
            if (clicked){
                this.selector.selectionHandler(this);
            }
        }
        else {
            this.rectangle.highlight = false;
        }
    }

    getFill(type) {
        switch (type) {
            case "M":
                return "sienna";
            case "P":
                return "limegreen";
            case "W":
                return "mediumblue";
            case "F":
                return "darkgreen";
            default:
                return "black";
        }
    }

    inBounds(x, y) {
        return (x > this.gameObject.x - this.rectangle.width / 2 && x < this.gameObject.x + this.rectangle.width / 2 && y > this.gameObject.y - this.rectangle.height / 2 && y < this.gameObject.y + this.rectangle.height / 2);
    }

    setUnit(unit) {
        this.board.setUnit(this.x, this.y, unit);
    }

    getUnit() {
        return this.board.getUnit(this.x, this.y);
    }
}

export default TileBehavior;