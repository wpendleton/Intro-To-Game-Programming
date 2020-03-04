import Engine from "../../engine/Engine.js";
import UnitBehavior from "../behaviors/UnitBehavior.js";

export default class Unit extends Engine.Base.GameObject{
    constructor(x, y, w, friendly, type){
        super(x, y);
        let rectangle = new Engine.Components.RectangleComponent(w, w, this.getFill(friendly), "black");
        this.addComponent(rectangle);
        this.addComponent(new UnitBehavior());
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