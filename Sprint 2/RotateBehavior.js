import Behavior from "./Behavior.js"

class RotateBehavior extends Behavior {

    start() {
        this.gameObject.rotation = 0;
    }

    update() {
        this.gameObject.rotation += Math.PI / 180;
    }
}

export default RotateBehavior;