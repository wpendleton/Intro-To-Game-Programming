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
            if (this.selector.source == null) {
                if (this.unit) {
                    this.selector.selectSource(this);
                    //TODO: Display unit information in inspection panel
                    if (this.unit.friendly == 1) {
                        //TODO: Draw friendly unit's movement range
                    }
                }
            }
            else if (this.selector.source == this) {
                this.selector.deselectSource();
            }
            else if (this.selector.move == null) {
                if (!this.unit) {
                    if (this.selector.source.unit.friendly == 1) {
                        //TODO: verify movement is in range of source
                        this.selector.selectMove(this);
                        //TODO: Draw Friendly unit's attack range
                    }
                }

            }
            else if (this.selector.move == this) {
                this.selector.deselectMove();
            } else if (this.selector.attack == null) {
                //TODO: Verify that attack is in range of move
                if (this.unit) {
                    if (this.unit.friendly == 0) {
                        this.selector.selectAttack(this);
                    }
                }
            }
            else if (this.selector.attack == this) {
                this.selector.deselectAttack();
            }
        }
    }
    getFill(type) {
        switch (type) {
            case "M":
                return "brown";
                break;
            case "P":
                return "lime";
                break;
            case "W":
                return "blue";
                break;
            case "F":
                return "green";
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

    getUnit(){
        this.board.getUnit(this.x, this.y);
    }
}

export default TileBehavior;