import Base from "../../engine/Base.js"
import Components from "../../engine/Components.js"
import Input from "../../engine/base/Input.js";
import TextComponent from "../../engine/components/TextComponent.js";

class TextBehavior extends Base.Behavior{
    time = 10;
    
    start(){
        
    }
    update(){
        if(Input.keys['j']){
            this.gameObject.getComponent(TextComponent).text = "j"
        }
        
    }
}

export default TextBehavior;