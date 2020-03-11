import Engine from "../../engine/Engine.js"
import RectangleComponent from "../../engine/components/RectangleComponent.js"

class UnitBehavior extends Engine.Base.Behavior {
    friendly;
    type;
    health;
    moverange;
    attackrange;
    damage;
    x;
    y;
    constructor(x, y, friendly, type) {
        super();
        this.x = x;
        this.y = y;
        this.friendly = friendly;
        this.type = type;
    }
    start() {
        this.setStats(this.type);
    }

    update() {
    }
    setStats(type){
        switch(type){
            case "A"://Archer
                this.health = 15;
                this.moverange = 1;
                this.attackrange = 3;
                this.damage = 5;
                this.gameObject.getComponent(RectangleComponent).setTexture("./game/assets/archer.png");
                break;
            case "M"://Mage
                this.health = 20;
                this.moverange = 2;
                this.attackrange = 2;
                this.damage = 10;
                this.gameObject.getComponent(RectangleComponent).setTexture("./game/assets/mage.png");
                break;
            case "R"://Rogue
                this.health = 25;
                this.moverange = 3;
                this.attackrange = 1;
                this.damage = 15;
                this.gameObject.getComponent(RectangleComponent).setTexture("./game/assets/rogue.png");
                break;
            case "W"://Warrior
                this.health = 40;
                this.moverange = 2;
                this.attackrange = 1;
                this.damage = 10;
                this.gameObject.getComponent(RectangleComponent).setTexture("./game/assets/warrior.png");
                break;
        }
    }
}

export default UnitBehavior;