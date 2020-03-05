import Engine from "../../engine/Engine.js"
import BoardController from "./BoardController.js";

class UnitBehavior extends Engine.Base.Behavior {
    friendly;
    x;
    y;
    constructor(x, y, friendly) {
        super();
        this.x = x;
        this.y = y;
        this.friendly = friendly;
    }
    start() {
    }

    update() {
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