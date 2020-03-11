import Engine from "../../engine/Engine.js";
import TextComponent from "../../engine/components/TextComponent.js";

export default class PanelTextBehavior extends Engine.Base.Behavior {
    baseString;
    value;
    text;
    constructor(baseString){
        super();
        this.baseString = baseString;
        this.value = ""
    }
    start() {
        this.text = this.gameObject.getComponent(TextComponent);
    }
    update() {}
    updateValue(value){
        this.value = value;
        this.text.text = this.baseString + this.value;
    }
}