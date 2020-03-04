import Engine from "../../engine/Engine.js"
import BoardController from "./BoardController.js";

class UnitBehavior extends Engine.Base.Behavior {
    friendly;
    constructor(friendly) {
        super();
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