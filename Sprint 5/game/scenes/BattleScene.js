import Engine from "../../engine/Engine.js";
import GameObjects from "../GameObjects.js";

export default class BattleScene extends Engine.Base.Scene {
    constructor(width, height) {
        super("BattleScene");
        
        let mapFile = new XMLHttpRequest();
        mapFile.open("GET", "./game/data/map.csv", false);
        mapFile.send(null);
        let map = new Array();
        let mapRows = mapFile.responseText.split(/\r?\n|\r/);
        for (let i = 0; i < mapRows.length; i++) {
            map.push(mapRows[i].split(','));
        }

        let board = new GameObjects.Board(map, width, height);

        let unitSize = Math.min(tilew, tileh) * 0.8;
        let unitFile = new XMLHttpRequest();
        unitFile.open("GET", "./units.csv", false);
        unitFile.send(null);
        let unitRows = unitFile.responseText.split(/\r?\n|\r/);
        for (let i = 0; i < unitRows.length; i++) {
            let unitInfo = unitRows[i].split(',');
            let unit = new GameObject(0, 0, 1, 1, 0);
            unit.addComponent(bc);
            unit.addComponent(new RectangleComponent(unitSize, unitSize, "white", "black"));
            unit.addComponent(new UnitBehavior(unitInfo[0], unitInfo[1], unitInfo[2], unitInfo[3]));
            this.children.push(unit);
        }

        let confirmButton = new GameObject(25, mapsh + tileh, 1, 1, 0);
        confirmButton.addComponent(sc);
        confirmButton.addComponent(new RectangleComponent(tilew * 5, tileh, "red", "black"));
        confirmButton.addComponent(new TextComponent("Confirm", "30pt Times", "black"));
        confirmButton.addComponent(new ConfirmButtonBehavior());
        this.children.push(confirmButton);

    }
}