import Engine from "../../engine/Engine.js"
import StaticSlectionController from "./StaticSelectionController.js";

export default class ConfirmButtonBehavior extends Engine.Base.Behavior {
    rectangle;

    start() {
        this.rectangle = this.gameObject.getComponent(Engine.Components.RectangleComponent);
    }

    update() {
        let mouseX = Engine.Base.Input.getMouseX();
        let mouseY = Engine.Base.Input.getMouseY();
        let clicked = Engine.Base.Input.getMouseButtonUp(0);

        if (this.inBounds(mouseX, mouseY) && this.rectangle.highlight != null){//tangled model and view
            this.rectangle.hovered = true;
            if (clicked){
                StaticSlectionController.sendMove();
            }
        }
        else {
            this.rectangle.hovered = false;
        }
    }

    inBounds(x, y) {
        return(x > this.gameObject.x - this.rectangle.width / 2 && x < this.gameObject.x + this.rectangle.width / 2 && y > this.gameObject.y - this.rectangle.height / 2 && y < this.gameObject.y + this.rectangle.height / 2);
    }
}