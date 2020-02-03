/*Import statements*/
import Scene from "./Scene.js";
import GameObject from "./GameObject.js";
import RectangleComponent from "./RectangleComponent.js";

/* Setup Scenes, game Objects, components, and behaviors */
let startScene = new Scene();

let currentScene = startScene;

let rectangle = new GameObject(400, 200, 1, 1, 0);
rectangle.addComponent(new RectangleComponent(100, 100, "red", "blue"));
currentScene.gameObjects.push(rectangle);

let rectangle2 = new GameObject(200, 200, 1, 1, 0);
rectangle2.addComponent(new RectangleComponent(100, 100, "purple", "blue"));
currentScene.gameObjects.push(rectangle2);

let canv, ctx;

function main() {
    canv = document.querySelector("#canv");
    ctx = canv.getContext('2d');

    setInterval(gameLoop, 1000/30);
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
}

main();

