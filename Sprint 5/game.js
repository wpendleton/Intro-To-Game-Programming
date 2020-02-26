/*Import statements*/
import Engine from "./engine/Engine.js";
import GameBehaviors from "./game/GameBehaviors.js";
import Input from "./engine/base/Input.js";

/* Setup Scenes, game Objects, components, and behaviors */
let startScene = new Engine.Base.Scene();
let currentScene = startScene;
let mouseInfo = new MouseEvent("event");

let canv, ctx;

function main() {
    canv = document.querySelector("#canv");
    ctx = canv.getContext('2d');
    canv.addEventListener("mousemove", mousemove);
    canv.addEventListener('mousedown', mousedown);
    canv.addEventListener('mouseup', mouseup);

    let mapFile = new XMLHttpRequest();
    mapFile.open("GET", "./game/data/map.csv", false);
    mapFile.send(null);
    let map = new Array();
    let mapRows = mapFile.responseText.split(/\r?\n|\r/);
    for (let i = 0; i < mapRows.length; i++) {
        map.push(mapRows[i].split(','));
    }

    let maph = map.length;
    let mapw = map[0].length;
    let mapsw = canv.width * 3 / 4;
    let mapsh = canv.height * 3 / 4;
    let tilew = mapsw / mapw;
    let tileh = mapsh / maph;

    let sc = new GameBehaviors.SelectionController();
    let bc = new GameBehaviors.BoardController(mapw, maph);

    for (let y = 0; y < maph; y++) {
        for (let x = 0; x < mapw; x++) {
            let tile = new Engine.Base.GameObject(0, 0, 1, 1, 0);
            tile.addComponent(sc);
            tile.addComponent(bc);
            tile.addComponent(new Engine.Components.RectangleComponent(tilew, tileh, "white", "black"));
            tile.addComponent(new GameBehaviors.TileBehavior(x, y, map[y][x]));
            startScene.children.push(tile);
        }
    }

    let unitSize = Math.min(tilew, tileh) * 0.8;
    let unitFile = new XMLHttpRequest();
    unitFile.open("GET", "./game/data/units.csv", false);
    unitFile.send(null);
    let unitRows = unitFile.responseText.split(/\r?\n|\r/);
    for (let i = 0; i < unitRows.length; i++) {
        let unitInfo = unitRows[i].split(',');
        let unit = new Engine.Base.GameObject(0, 0, 1, 1, 0);
        unit.addComponent(bc);
        unit.addComponent(new Engine.Components.RectangleComponent(unitSize, unitSize, "white", "black"));
        unit.addComponent(new GameBehaviors.UnitBehavior(unitInfo[0], unitInfo[1], unitInfo[2], unitInfo[3]));
        startScene.children.push(unit);
    }

    let confirmButton = new Engine.Base.GameObject(25, mapsh + tileh, 1, 1, 0);
    confirmButton.addComponent(sc);
    confirmButton.addComponent(new Engine.Components.RectangleComponent(tilew * 5, tileh, "red", "black"));
    confirmButton.addComponent(new Engine.Components.TextComponent("Confirm", "30pt Times", "black"));
    confirmButton.addComponent(new GameBehaviors.ConfirmButtonBehavior());
    startScene.children.push(confirmButton);

    setInterval(gameLoop, 1000 / 30);
}

function gameLoop() {
    Input.swapUpDownArrays();
    update();
    draw();
}

function update() {
    currentScene.update();
}

function draw() {
    currentScene.draw(ctx, canv.width, canv.height);
}

function mousemove(event) {
    Input.mouseX = event.offsetX;
    Input.mouseY = event.offsetY;
    console.log(Input.mouseX + " " + Input.mouseY);
}

function mousedown(event) {
    if (Input.mouseButtons[event.button] != true)
        Input.down[event.key] = true;
    Input.keys[event.key] = true;
}

function mouseup(event) {
    if (Input.mouseButtons[event.button] != false)
        Input.mouseButtonsUp[event.button] = true;
    Input.mouseButtons[event.button] = false;
}
main();

