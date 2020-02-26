import Engine from "../../engine/Engine.js"

class BoardModel extends Engine.Base.Behavior {
    map;
    unitMap;
    constructor(width, height) {
        super();
        let map = new Array(width);
        let unitMap = new Array(width);
        for (let i = 0; i < width; i++) {
            map[i] = new Array(height);
            unitMap[i] = new Array(height);
        }
        this.map = map;
        this.unitMap = unitMap;
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
        return this.unitMap[x][y];
    }
    setUnit(x, y, unit) {
        this.unitMap[x][y] = unit;
    }
}

export default BoardModel;