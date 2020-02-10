import Component from "./Component.js"
import RectangleComponent from "./RectangleComponent.js";

class BoardComponent extends Component {
    map;
    width;
    height;
    tiles;
    tilesizex;
    tilesizey;

    constructor(map, width, height) {
        super();
        this.map = map;
        this.xs = map.length;
        this.yx = map[0].length;
        this.tilesizex = width / this.xs;
        this.tilesizey = height / this.ys;
        this.tiles = [];
        for (let x = 0; x < this.xs; x++) {
            for (let y = 0; y < this.ys; y++) {
                let tile = new GameObject(y * this.ys + this.ys / 2, x * this.xs + this.xs / 2, 1, 1, 0);
                tile.addComponent(new RectangleComponent(xs, ys, getFill(map[x][y]), "black"));
                this.tiles.push(tile);
            }
        }
    }
    draw(ctx) {
        console.log("Drawing Board");
        for(let i = 0; i < this.tiles.length; i++){
            let gameObject = this.tiles[i];
            gameObject.draw(ctx);
        }
    }

    getFill(type) {
        switch (type) {
            case "M":
                return "brown";
                break;
            case "P":
                return "lime";
                break;
            case "W":
                return "blue";
                break;
            case "F":
                return "green";
                break;
            default:
                return "black";
        }
    }
}

export default BoardComponent;