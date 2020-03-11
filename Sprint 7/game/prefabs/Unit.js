import Engine from "../../engine/Engine.js";
import UnitBehavior from "../behaviors/UnitBehavior.js";

export default class Unit extends Engine.Base.GameObject{
    behavior;
    constructor(x, y, w, friendly, type, xi, yi){
        super(x, y);
        let rectangle = new Engine.Components.RectangleComponent(w, w, this.getFill(friendly), "black");
        this.addComponent(rectangle);
        this.behavior = new UnitBehavior(xi, yi, friendly, type)
        this.addComponent(this.behavior);
    }

    getFill(friendly) {
        if (friendly == 0) {
            return "red";
        }
        else {
            return "greenyellow";
        }
    }
}