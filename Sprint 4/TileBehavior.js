import Behavior from "./Behavior.js"
import RectangleComponent from "./RectangleComponent.js";
import SelectionController from "./SelectionController.js";
import BoardController from "./BoardController.js";

class TileBehavior extends Behavior {
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
        this.rectangle = this.gameObject.getComponent(RectangleComponent);
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
    }

    mousePosition(event) {
        if (this.inBounds(event)) {
            this.rectangle.highlight = true;
        }
        else {
            this.rectangle.highlight = false;
        }
    }

    mouseClicked(event) {
        if (this.inBounds(event)) {
            this.selector.selectionHandler(this);
        }
    }
    getFill(type) {
        switch (type) {
            case "M":
                return "sienna";
                break;
            case "P":
                return "limegreen";
                break;
            case "W":
                return "mediumblue";
                break;
            case "F":
                return "darkgreen";
                break;
            default:
                return "black";
        }
    }

    inBounds(event) {
        return (event.offsetX > this.gameObject.x - this.rectangle.width / 2 && event.offsetX < this.gameObject.x + this.rectangle.width / 2 && event.offsetY > this.gameObject.y - this.rectangle.height / 2 && event.offsetY < this.gameObject.y + this.rectangle.height / 2);
    }

    setUnit(unit) {
        this.board.setUnit(this.x, this.y, unit);
    }

    getUnit() {
        return this.board.getUnit(this.x, this.y);
    }
}

export default TileBehavior;