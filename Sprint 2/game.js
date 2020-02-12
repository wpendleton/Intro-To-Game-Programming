/*Import statements*/
import Scene from "./Scene.js";
import GameObject from "./GameObject.js";
import RectangleComponent from "./RectangleComponent.js";
import RectangleBehavior from "./RotateBehavior.js";
import TileBehavior from "./TileBehavior.js";
import RotateBehavior from "./RotateBehavior.js";

/* Setup Scenes, game Objects, components, and behaviors */
let startScene = new Scene("white");
let currentScene = startScene;
let mouseX = 100;
let mouseY = 100;

let canv, ctx;

function main() {
    canv = document.querySelector("#canv");
    ctx = canv.getContext('2d');
    canv.addEventListener("mousemove", mouseHandler);
    canv.addEventListener("mouseup", mouseHandler);

    let mapFile = new XMLHttpRequest();
    mapFile.open("GET", "./map.csv", false);
    mapFile.send(null);
    let map = new Array();
    let mapRow = mapFile.responseText.split(/\r?\n|\r/);
    for (let i = 0; i < mapRow.length; i++) {
        map.push(mapRow[i].split(','));
    }

    let maph = map.length;
    let mapw = map[0].length;
    let tilew = canv.width / mapw;
    let tileh = canv.height / maph;

    for (let y = 0; y < maph; y++) {
        for (let x = 0; x < mapw; x++) {
            let tile = new GameObject(0, 0, 1, 1, 0);
            tile.addComponent(new RectangleComponent(tilew, tileh, getFill(map[y][x]), "black"));
            tile.addComponent(new TileBehavior(x, y));
            startScene.gameObjects.push(tile);
        }
    }

    setInterval(gameLoop, 1000 / 30);
}

function gameLoop() {
    update();
    draw();
}

function update() {
    currentScene.update();
}

function draw() {
    currentScene.draw(ctx, canv.width, canv.height);
    ctx.save();
    {
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 10, 0, 2 * Math.PI, false);
        ctx.fill();
    }
    ctx.restore();

}
function mouseHandler(event) {
    mouseX = event.offsetX;
    mouseY = event.offsetY;
}

function getFill(type) {
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
main();

