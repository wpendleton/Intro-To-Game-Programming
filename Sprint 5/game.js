/*Import statements*/
import Engine from "./engine/Engine.js";
import SceneManager from "./game/SceneManager.js";
import Scenes from "./game/Scenes.js";

/* Setup Scenes, game Objects, components, and behaviors */

let battleScene = new Scenes.BattleScene();
SceneManager.addScene(startScene);
SceneManager.currentScene = "BattleScene";
let mouseInfo = new MouseEvent("event");

let canv, ctx;

function main() {
    canv = document.querySelector("#canv");
    ctx = canv.getContext('2d');
    canv.addEventListener("mousemove", mouseMoved);
    canv.addEventListener("mouseup", mouseClicked);
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

