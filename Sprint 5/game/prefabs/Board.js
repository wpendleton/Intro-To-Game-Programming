import Engine from "../../engine/Engine.js";
import BoardModel from "../behaviors/BoardModel.js"
import Tile from "./Tile.js";

export default class tile extends Engine.Base.GameObject {
    boardModel;
    constructor(map, unitMap, width, height) {
        super(0, 0, 0.75, 0.75, 0);

        let maph = map.length;
        let mapw = map[0].length;
        let tilew = width / mapw;
        let tileh = height / maph;

        this.boardModel = new BoardModel(mapw, maph);
        this.addComponent(thiboardModel);

        for (let y = 0; y < maph; y++) {
            for (let x = 0; x < mapw; x++) {
                let tile = new Tile(x, y, tilew, tileh, map[y][x]);
                this.children.push(tile);
                this.boardModel.setTile(x, y, tile);
                this.boardModel.setUnit(x, y, unit);
            }
        }
    }
}