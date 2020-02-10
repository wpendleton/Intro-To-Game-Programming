import Behavior from "./Behavior.js"
import TextComponent from "./TextComponent.js"

class TextBehavior extends Behavior{
    time = 10;
    start(){
        
    }
    update(){
        this.time -= 1;
        this.gameObject.getComponent(TextComponent).text = this.time;
    }
}

export default TextBehavior;