import Engine from "../../engine/Engine.js";
import TileBehavior from "../behaviors/TileBehavior.js";

export default class Tile extends Engine.Base.GameObject{
    rectangle;
    constructor(x, y, w, h, type, xi, yi){
        super(x, y);
        this.rectangle = new Engine.Components.RectangleComponent(w, h, this.getFill(type), "black");
        this.addComponent(this.rectangle);
        this.addComponent(new TileBehavior(xi, yi, type));
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