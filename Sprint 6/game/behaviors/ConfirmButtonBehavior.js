import Engine from "../../engine/Engine.js"
import SelectionController from "./SelectionController.js";

class ConfirmButtonBehavior extends Engine.Base.Behavior {
    rectangle;
    controller;

    start() {
        this.rectangle = this.gameObject.getComponent(Engine.Components.RectangleComponent);
        this.controller = this.gameObject.getComponent(SelectionController);
    }

    update() {
        let mouseX = Engine.Base.Input.getMouseX();
        let mouseY = Engine.Base.Input.getMouseY();
        let clicked = Engine.Base.Input.getMouseButtonUp(0);

        if (this.inBounds(mouseX, mouseY)){
            this.rectangle.highlight = true;
            if (clicked){
                this.controller.sendMove();
            }
        }
        else {
            this.rectangle.highlight = false;
        }
    }

    inBounds(x, y) {
        return(x > this.gameObject.x - this.rectangle.width / 2 && x < this.gameObject.x + this.rectangle.width / 2 && y > this.gameObject.y - this.rectangle.height / 2 && y < this.gameObject.y + this.rectangle.height / 2);
    }
}

export default ConfirmButtonBehavior;