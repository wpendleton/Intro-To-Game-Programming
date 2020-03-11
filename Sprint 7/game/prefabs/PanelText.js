import Engine from "../../engine/Engine.js";
import PanelTextBehavior from "../behaviors/PanelTextBehavior.js";
import TextComponent from "../../engine/components/TextComponent.js";

export default class PanelText extends Engine.Base.GameObject{
    behavior;
    constructor(x, y, baseString){
        super(x, y);
        this.addComponent(new TextComponent("", "18px Times", "black"));
        this.behavior = new PanelTextBehavior(baseString);
        this.addComponent(this.behavior);
    }
    updateValue(value){
        this.behavior.updateValue(value);
    }
}