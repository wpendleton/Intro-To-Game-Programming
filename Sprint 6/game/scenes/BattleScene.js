import Engine from "../../engine/Engine.js";
import GameObjects from "../GameObjects.js";
import GameBehaviors from "../GameBehaviors.js";

export default class BattleScene extends Engine.Base.Scene {
    constructor(canvwidth, canvheight) {
        super("BattleScene");

        let mapFile = new XMLHttpRequest();
        mapFile.open("GET", "./game/data/map.csv", false);
        mapFile.send(null);
        let tileMap = [];
        let mapRows = mapFile.responseText.split(/\r?\n|\r/);
        for (let i = 0; i < mapRows.length; i++) {
            tileMap.push(mapRows[i].split(','));
        }

        let unitMap = [];
        let unitFile = new XMLHttpRequest();
        unitFile.open("GET", "./game/data/units.csv", false);
        unitFile.send(null);
        let unitRows = unitFile.responseText.split(/\r?\n|\r/);
        for (let i = 0; i < unitRows.length; i ++){
            let unitInfo = unitRows[i].split(',');
            let unitx = unitInfo[0];
            let unity = unitInfo[1];
            let type = unitInfo[2];
            let friendly = unitInfo[3];
            if (unitMap[unitx]){
                unitMap[unitx][unity] = {type:type, friendly:friendly};
            }
            else{
                unitMap[unitx] = [];
                unitMap[unitx][unity] = {type:type, friendly:friendly};
            }
            
        }

        let board = new GameObjects.Board(tileMap, unitMap, canvwidth * 3 / 4, canvheight * 3 / 4);
        this.addChild(board);

        let confirmButton = new Engine.Base.GameObject(25, canvheight * 4 / 5, 1, 1, 0);
        confirmButton.addComponent(new Engine.Components.RectangleComponent(300, 75, "red", "black"));
        confirmButton.addComponent(new Engine.Components.TextComponent("Confirm", "30pt Times", "black"));
        confirmButton.addComponent(new GameBehaviors.ConfirmButtonBehavior());
        this.addChild(confirmButton);

    }
}