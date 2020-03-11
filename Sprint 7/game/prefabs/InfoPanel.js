import Engine from "../../engine/Engine.js";
import PanelText from "./PanelText.js";

export default class InfoPanel extends Engine.Base.GameObject {
    texth;
    textm;
    textw;
    IFFText;
    classText;
    healthText;
    moverangeText;
    attackrangeText;
    damageText;
    constructor(x, y, width, height) {
        super(x, y);
        this.texth = height / 19 * 2;
        this.textm = height / 19;
        this.textw = width - 2 * this.textm;
        this.IFFText = new PanelText(this.textm, this.textm, "");
        this.addChild(this.IFFText);
        this.classText = new PanelText(this.textm, this.textm*4, "Class: ");
        this.addChild(this.classText);
        this.healthText = new PanelText(this.textm, this.textm*7, "Health: ");
        this.addChild(this.healthText);
        this.moverangeText = new PanelText(this.textm, this.textm*10, "Movement Speed: ");
        this.addChild(this.moverangeText);
        this.attackrangeText = new PanelText(this.textm, this.textm*13, "Attack Range: ");
        this.addChild(this.attackrangeText);
        this.damageText = new PanelText(this.textm, this.textm*16, "Damage: ");
        this.addChild(this.damageText);
    }

    updateValues(iff, type, health, move, attack, damage){
        this.IFFText.updateValue(this.getFriendly(iff));
        this.classText.updateValue(this.getClass(type));
        this.healthText.updateValue(health);
        this.moverangeText.updateValue(move);
        this.attackrangeText.updateValue(attack);
        this.damageText.updateValue(damage);
    }

    getFriendly(value){
        if (value == 1){
            return "Ally";
        }
        else{
            return "Enemy";
        }
    }

    getClass(value){
        switch(value){
            case "A":
                return "Archer";
            case "M":
                return "Mage";
            case "R":
                return "Rogue";
            case "W":
                return "Warrior";
        }
    }
}