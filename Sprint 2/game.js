/*Import statements*/
import Scene from "./Scene.js";
import GameObject from "./GameObject.js";
import RectangleComponent from "./RectangleComponent.js";
import BoardComponent from "./BoardComponent.js";

/* Setup Scenes, game Objects, components, and behaviors */
let startScene = new Scene("white");
let currentScene = startScene;
let mouseX = 100;
let mouseY = 100;

let mapFile = new XMLHttpRequest();
mapFile.open("GET", "./map.csv", false);
mapFile.send(null);
let map = new Array();
let mapRow = mapFile.responseText.split(/\r?\n|\r/);
for (let i = 0; i < mapRow.length - 1; i++) {
    map.push(mapRow[i].split(','));
}

let board = new GameObject(250, 250, 1, 1, 0);
board.addComponent(new BoardComponent(map, 500, 500));
currentScene.gameObjects.push(board);

document.addEventListener("mousemove", mouseMoved);

let canv, ctx;

function main() {
    canv = document.querySelector("#canv");
    ctx = canv.getContext('2d');

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
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 25, 0, 2 * Math.PI, false);
        ctx.fill();
    }
    ctx.restore();

}
function mouseMoved(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
}
main();

