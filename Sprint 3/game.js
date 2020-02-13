/*Import statements*/
import Scene from "./Scene.js";
import GameObject from "./GameObject.js";
import RectangleComponent from "./RectangleComponent.js";
import RectangleBehavior from "./RotateBehavior.js";
import TileBehavior from "./TileBehavior.js";
import RotateBehavior from "./RotateBehavior.js";
import SelectionController from "./SelectionController.js";
import TextComponent from "./TextComponent.js";
import ConfirmButtonBehavior from "./ConfirmButtonBehavior.js";

/* Setup Scenes, game Objects, components, and behaviors */
let startScene = new Scene("white");
let currentScene = startScene;
let mouseInfo = new MouseEvent("event");
let sc = new SelectionController();

let canv, ctx;

function main() {
    canv = document.querySelector("#canv");
    ctx = canv.getContext('2d');
    canv.addEventListener("mousemove", mouseMoved);
    canv.addEventListener("mouseup", mouseClicked);

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
    let mapsw = canv.width * 3 / 4;
    let mapsh = canv.height * 3 / 4;
    let tilew = mapsw / mapw;
    let tileh = mapsh / maph;

    for (let y = 0; y < maph; y++) {
        for (let x = 0; x < mapw; x++) {
            let tile = new GameObject(0, 0, 1, 1, 0);
            tile.addComponent(new RectangleComponent(tilew, tileh, "white", "black"));
            tile.addComponent(sc);
            tile.addComponent(new TileBehavior(x, y, map[y][x]));
            startScene.gameObjects.push(tile);
        }
    }

    let confirmButton = new GameObject(25, mapsh + tileh, 1, 1, 0);
    confirmButton.addComponent(new RectangleComponent(tilew * 5, tileh, "red", "black"));
    confirmButton.addComponent(new TextComponent("Confirm", "30pt Times", "black"));
    confirmButton.addComponent(sc);
    confirmButton.addComponent(new ConfirmButtonBehavior());
    startScene.gameObjects.push(confirmButton);

    setInterval(gameLoop, 1000 / 30);
}

function gameLoop() {
    mousePosition(mouseInfo);
    update();
    draw();
}

function update() {
    currentScene.update();
}

function draw() {
    currentScene.draw(ctx, canv.width, canv.height);
}

function mousePosition(event){
    currentScene.mousePosition(event);
}

function mouseMoved(event) {
    mouseInfo = event;
}

function mouseClicked(event){
    mouseInfo = event;
    currentScene.mouseClicked(mouseInfo);
}
main();

