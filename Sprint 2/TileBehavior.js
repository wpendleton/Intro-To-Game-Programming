import Behavior from "./Behavior.js"
import RectangleComponent from "./RectangleComponent.js";

class TileBehavior extends Behavior {
    rectangle;
    x;
    y;
    width;
    height;
    constructor(x, y){
        super();
        this.x = x;
        this.y = y;
    }
    start() {
        this.rectangle = this.gameObject.getComponent(RectangleComponent);
        this.width = this.rectangle.width;
        this.height = this.rectangle.height;
        this.rectangle.gameObject.x = this.x * this.width + this.width / 2;
        this.rectangle.gameObject.y = this.y * this.height + this.height / 2;
    }

    update() {
    }
}

export default TileBehavior;