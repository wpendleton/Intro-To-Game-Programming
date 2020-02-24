import Base from "../../engine/Base.js";
import Components from "../../engine/Components.js"

export default class CollisionDot extends Base.GameObject{
  constructor(x,y) {
    super(x,y)
    let circleComponent = new Components.CircleComponent(50, "yellow", "black");
    this.addComponent(circleComponent);
  }

}