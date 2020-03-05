import Engine from "../../engine/Engine.js"
import StaticSelectionController from "./StaticSelectionController.js";

class TileBehavior extends Engine.Base.Behavior {
    rectangle;
    x;
    y;
    type;
    constructor(x, y, type){
        super();
        this.x = x;
        this.y = y;
        this.type = type;
    }
    start() {
        this.rectangle = this.gameObject.getComponent(Engine.Components.RectangleComponent);
    }

    update() {
        let mouseX = Engine.Base.Input.getMouseX();
        let mouseY = Engine.Base.Input.getMouseY();
        let clicked = Engine.Base.Input.getMouseButtonUp(0);

        if (this.inBounds(mouseX, mouseY)){
            this.rectangle.highlight = true;
            if (clicked){
                StaticSelectionController.selectionHandler(this);
            }
        }
        else {
            this.rectangle.highlight = false;
        }
    }
    inBounds(x, y) {
        return (x > this.gameObject.x - this.rectangle.width / 2 && x < this.gameObject.x + this.rectangle.width / 2 && y > this.gameObject.y - this.rectangle.height / 2 && y < this.gameObject.y + this.rectangle.height / 2);
    }
}

export default TileBehavior;