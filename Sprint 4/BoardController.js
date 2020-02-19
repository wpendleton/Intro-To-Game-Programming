import Behavior from "./Behavior.js";
import TileBehavior from "./TileBehavior.js"
import UnitBehavior from "./UnitBehavior.js";

class BoardController extends Behavior {
    map;
    constructor(width, height) {
        super();
        let map = new Array(width);
        for (let i = 0; i < width; i++) {
            map[i] = new Array(height);
        }
        this.map = map;
    }
    start() { }
    update() { }
    getTile(x, y) {
        return this.map[x][y];
    }
    setTile(x, y, tile) {
        this.map[x][y] = tile;
    }
    getUnit(x, y) {
        return this.map[x][y].unit;
    }
    setUnit(x, y, unit) {
        this.map[x][y].unit = unit;
        if (unit) {
            unit.tile = this.getTile(x, y);
        }
    }
}

export default BoardController;