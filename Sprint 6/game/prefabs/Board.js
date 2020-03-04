import Engine from "../../engine/Engine.js";
import GameBehaviors from "../GameBehaviors.js";
import Tile from "./Tile.js";
import Unit from "./Unit.js";

export default class Board extends Engine.Base.GameObject {
    constructor(tileMap, unitMap, width, height) {
        super();

        let behavior = new GameBehaviors.BoardBehavior();
        this.addComponent(behavior);

        let maph = tileMap.length;
        let mapw = tileMap[0].length;
        let tilew = width / mapw;
        let tileh = height / maph;
        let unitw = Math.min(tilew, tileh) * 0.8;

        for (let y = 0; y < maph; y++) {
            for (let x = 0; x < mapw; x++) {
                let tile = new Tile(x*tilew + tilew/2, y*tileh + tileh/2, tilew, tileh, tileMap[y][x]);
                this.children.push(tile);
                let unit = new Unit(x*tilew + tilew/2, y*tileh + tileh/2, unitw, unitMap)
                this.behavior.tiles[x][y] = tile;
                this.behavior.units[x][y] = unit;
            }
        }
    }
}