import Behavior from "./Behavior.js"

class RotateBehavior extends Behavior {
    speed;

    constructor(speed) {
        super();
        this.speed = speed * Math.PI / 180;
    }

    start() {
        this.gameObject.rotation = 0;
    }

    update() {
        this.gameObject.rotation = +this.gameObject.rotation + +this.speed;
    }
}

export default RotateBehavior;