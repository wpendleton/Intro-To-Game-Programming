import Behavior from "./Behavior.js"
import RectangleComponent from "./RectangleComponent.js";
import SelectionController from "./SelectionController.js";

class TileBehavior extends Behavior {
    rectangle;
    controller;
    x;
    y;
    width;
    height;
    type;
    constructor(x, y, type){
        super();
        this.x = x;
        this.y = y;
        this.type = type;
    }
    start() {
        this.rectangle = this.gameObject.getComponent(RectangleComponent);
        this.controller = this.gameObject.getComponent(SelectionController);
        this.rectangle.fill = this.getFill(this.type);
        this.width = this.rectangle.width;
        this.height = this.rectangle.height;
        this.gameObject.x = this.x * this.width + this.width / 2;
        this.gameObject.y = this.y * this.height + this.height / 2;
    }

    update() {
    }

    mousePosition(event){
        if (this.inBounds(event)){
            this.rectangle.highlight = true;
        }
        else{
            this.rectangle.highlight = false;
        }
    }

    mouseClicked(event){
        if (this.inBounds(event)){
            if (this.controller.source == null){
                //TODO: check occupant of square. If friendly, set as source for move + Draw move range
                //If enemy, set as source for inspect + Draw Inspect Info
                //If empty, no selection is made
                this.controller.selectSource(this);
            }
            else if (this.controller.source == this){
                //Deselect source
                this.controller.deselectSource();
            }
            else if (this.controller.move == null){
                //TODO: find shortest valid path from source to move + Verify character can move that far
                //Draw attack range
                this.controller.selectMove(this);
            }
            else if (this.controller.move == this){
                //Deselect move
                this.controller.deselectMove();
            } else if (this.controller.attack == null) {
                //TODO: Verify that attack is in range of move
                //Perform move
                this.controller.selectAttack(this);
            }
            else if (this.controller.attack == this){
                this.controller.deselectAttack();
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

    inBounds(event){
        return (event.offsetX > this.gameObject.x - this.rectangle.width / 2 && event.offsetX < this.gameObject.x + this.rectangle.width / 2 && event.offsetY > this.gameObject.y - this.rectangle.height / 2 && event.offsetY < this.gameObject.y + this.rectangle.height / 2);
    }
}

export default TileBehavior;