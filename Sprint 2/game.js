/*Import statements*/
import Scene from "./Scene.js";
import GameObject from "./GameObject.js";
import RectangleComponent from "./RectangleComponent.js";
import RotateBehavior from "./RotateBehavior.js";

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

for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[0].length; y++) {
        let tile = new GameObject(y * 50 + 25, x * 50 + 25, 1, 1, 0);
        tile.addComponent(new RectangleComponent(50, 50, getFill(map[x][y]), "black"));
        currentScene.gameObjects.push(tile);
    }
}
document.addEventListener("mousemove", mouseMoved);
/*let rectangle = new GameObject(150, 200, 1, 1, 0);
rectangle.addComponent(new RectangleComponent(50, 50, "red", "black"));
rectangle.addComponent(new RotateBehavior(1));
currentScene.gameObjects.push(rectangle);

let rectangle2 = new GameObject(300, 200, 1, 1, 0);
rectangle2.addComponent(new RectangleComponent(50, 50, "yellow", "black"));
rectangle2.addComponent(new RotateBehavior(2));
currentScene.gameObjects.push(rectangle2);

let rectangle3 = new GameObject(450, 200, 1, 1, 0);
rectangle3.addComponent(new RectangleComponent(50, 50, "lime", "black"));
rectangle3.addComponent(new RotateBehavior(3));
currentScene.gameObjects.push(rectangle3);*/

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

function mouseMoved(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
}
main();

