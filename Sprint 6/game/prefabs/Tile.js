import Engine from "../../engine/Engine.js";
import TileBehavior from "../behaviors/TileBehavior.js";

export default class Tile extends Engine.Base.GameObject{
    constructor(x, y, w, h, type){
        super(x, y);
        let rectangle = new Engine.Components.RectangleComponent(w, h, this.getFill(type), "black");
        this.addComponent(rectangle);
        this.addComponent(new TileBehavior());
    }

    getFill(type) {
        switch (type) {
            case "M":
                return "sienna";
            case "P":
                return "limegreen";
            case "W":
                return "mediumblue";
            case "F":
                return "darkgreen";
            default:
                return "black";
        }
    }
}