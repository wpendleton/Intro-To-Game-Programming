import Engine from "../../engine/Engine.js";
import GameBehaviors from "../GameBehaviors.js";
import Tile from "./Tile.js";
import Unit from "./Unit.js";

export default class Board extends Engine.Base.GameObject {
    behavior;
    tileh;
    tilew;
    constructor(tileMap, unitMap, width, height) {
        super();

        this.behavior = new GameBehaviors.BoardBehavior();
        this.addComponent(this.behavior);

        let maph = tileMap.length;
        let mapw = tileMap[0].length;
        this.tilew = width / mapw;
        this.tileh = height / maph;
        let unitw = Math.min(this.tilew, this.tileh) * 0.8;

        for (let y = 0; y < maph; y++) {
            for (let x = 0; x < mapw; x++) {
                let tile = new Tile(x * this.tilew + this.tilew / 2, y * this.tileh + this.tileh / 2, this.tilew, this.tileh, tileMap[y][x], x, y);
                this.addChild(tile);
                if (this.behavior.tiles[x]) {
                    this.behavior.tiles[x][y] = tile;
                }
                else {
                    this.behavior.tiles[x] = [];
                    this.behavior.tiles[x][y] = tile;
                }
            }
        }
        for (let y = 0; y < maph; y++) {
            for (let x = 0; x < mapw; x++) {
                if (unitMap[x]) {
                    if (unitMap[x][y]) {
                        let unit = new Unit(x * this.tilew + this.tilew / 2, y * this.tileh + this.tileh / 2, unitw, unitMap[x][y].friendly, unitMap[x][y].type, x, y)
                        this.addChild(unit);
                        if (this.behavior.units[x]) {
                            this.behavior.units[x][y] = unit;
                        }
                        else {
                            this.behavior.units[x] = [];
                            this.behavior.units[x][y] = unit;
                        }
                    }
                }
            }
        }
    }

    getUnit(x, y) {
        if (this.behavior.units[x]) {
            if (this.behavior.units[x][y]) {
                return this.behavior.units[x][y];
            }
        }
        return -1;
    }

    moveUnit(x1, y1, x2, y2) {
        let unit = this.getUnit(x1, y1);
        unit.x = x2 * this.tilew + this.tilew / 2
        unit.y = y2 * this.tileh + this.tileh / 2
        if (this.behavior.units[x1]) {
            this.behavior.units[x1][y1] = null;
        }
        if (this.behavior.units[x2]) {
            this.behavior.units[x2][y2] = unit;
        }
        else {
            this.behavior.units[x2] = [];
            this.behavior.units[x2][y2] = unit;
        }
    }

    killUnit(x, y) {
        let unit = this.getUnit(x, y);
        let index = this.children.indexOf(unit);
        this.children.splice(index, 1);
        if (this.behavior.units[x]) {
            this.behavior.units[x][y] = null;
        }
    }

    getTilesForMove(sourcex, sourcey, moverange) {
        let valid = this.floodFill(sourcex, sourcey, moverange, new Array());
        return valid;
    }

    floodFill(currentx, currenty, distance, tiles) {
        if (!tiles.includes(this.behavior.tiles[currentx][currenty])) {
            tiles.push(this.behavior.tiles[currentx][currenty]);
        }

        if (distance <= 0) {
            return tiles;
        }

        if (this.inBounds(currentx, currenty - 1) && this.isValid(currentx, currenty - 1)) {
            tiles = this.floodFill(currentx, currenty - 1, distance - 1, tiles)
        }

        if (this.inBounds(currentx + 1, currenty) && this.isValid(currentx + 1, currenty)) {
            tiles = this.floodFill(currentx + 1, currenty, distance - 1, tiles)
        }

        if (this.inBounds(currentx, currenty + 1) && this.isValid(currentx, currenty + 1)) {
            tiles = this.floodFill(currentx, currenty + 1, distance - 1, tiles)
        }

        if (this.inBounds(currentx - 1, currenty) && this.isValid(currentx - 1, currenty)) {
            tiles = this.floodFill(currentx - 1, currenty, distance - 1, tiles)
        }
        
        return tiles;
    }

    isValid(x, y) {
        if (this.getUnit(x, y) != -1) {
            return false;
        }
        let type = this.behavior.tiles[x][y].behavior.type;
        if (type == "W") {
            return false;
        }
        if (type == "M") {
            return false;
        }
        return true;
    }

    inBounds(x, y) {
        return x >= 0 && x < this.behavior.tiles.length && y >= 0 && y < this.behavior.tiles[0].length;
    }
}