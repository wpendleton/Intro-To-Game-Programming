import Engine from "../../engine/Engine.js";
import TileBehavior from "../behaviors/TileBehavior.js";

export default class tile extends Engine.Base.GameObject{
    constructor(x, y, w, h, type){
        super(0, 0);
        let rectangle = new Engine.Components.RectangleComponent(w, h, "white", "black");
        this.addComponent(rectangle);
        this.addComponent(new TileBehavior(x, y, type));
    }
}