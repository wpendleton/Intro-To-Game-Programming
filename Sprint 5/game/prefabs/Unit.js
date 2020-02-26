import Engine from "../../engine/Engine.js";
import UnitBehavior from "../behaviors/UnitBehavior.js";

export default class Unit extends Engine.Base.GameObject{
    constructor(x, y, w, h, type){
        super(0, 0);
        let rectangle = new Engine.Components.RectangleComponent(w, h, "white", "black");
        this.addComponent(rectangle);
        this.addComponent(new UnitBehavior(x, y, type));
    }
}