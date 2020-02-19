import Behavior from "./Behavior.js"
import RectangleComponent from "./RectangleComponent.js";
import SelectionController from "./SelectionController.js";

class ConfirmButtonBehavior extends Behavior {
    rectangle;
    controller;

    start() {
        this.rectangle = this.gameObject.getComponent(RectangleComponent);
        this.controller = this.gameObject.getComponent(SelectionController);
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
            this.controller.sendMove();
        }
    }

    inBounds(event) {
        return (event.offsetX > this.gameObject.x - this.rectangle.width / 2 && event.offsetX < this.gameObject.x + this.rectangle.width / 2 && event.offsetY > this.gameObject.y - this.rectangle.height / 2 && event.offsetY < this.gameObject.y + this.rectangle.height / 2);
    }
}

export default ConfirmButtonBehavior;