/*Import statements*/
import Input from "./engine/base/Input.js";
import SceneManager from "./game/SceneManager.js"
import Scenes from "./game/Scenes.js"

let canv, ctx;
canv = document.querySelector("#canv");
ctx = canv.getContext('2d');
canv.addEventListener("mousemove", mousemove);
canv.addEventListener('mousedown', mousedown);
canv.addEventListener('mouseup', mouseup);

let battleScene = new Scenes.BattleScene(canv.width, canv.height);
SceneManager.addScene(battleScene);
SceneManager.currentScene = "BattleScene";

function main() {
    setInterval(gameLoop, 1000 / 30);
}

function gameLoop() {
    Input.swapUpDownArrays();
    update();
    draw();
}

function update() {
    SceneManager.currentScene.update();
}

function draw() {
    SceneManager.currentScene.draw(ctx, canv.width, canv.height);
}

function mousemove(event) {
    Input.mouseX = event.offsetX;
    Input.mouseY = event.offsetY;
}

function mousedown(event) {
    if (Input.mouseButtons[event.button] != true)
        Input.mouseButtonsDown[event.button] = true;
    Input.mouseButtons[event.button] = true;
}

function mouseup(event) {
    if (Input.mouseButtons[event.button] != false)
        Input.mouseButtonsUp[event.button] = true;
    Input.mouseButtons[event.button] = false;
}
main();

