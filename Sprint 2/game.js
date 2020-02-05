/*Import statements*/
import Scene from "./Scene.js";
import GameObject from "./GameObject.js";
import RectangleComponent from "./RectangleComponent.js";
import RectangleBehavior from "./RectangleBehavior.js";

/* Setup Scenes, game Objects, components, and behaviors */
let startScene = new Scene("white");

let currentScene = startScene;

let rectangle = new GameObject(150, 200, 1, 1, 0);
rectangle.addComponent(new RectangleComponent(50, 50, "red", "black"));
rectangle.addComponent(new RectangleBehavior(1));
currentScene.gameObjects.push(rectangle);

let rectangle2 = new GameObject(300, 200, 1, 1, 0);
rectangle2.addComponent(new RectangleComponent(50, 50, "yellow", "black"));
rectangle2.addComponent(new RectangleBehavior(2));
currentScene.gameObjects.push(rectangle2);

let rectangle3 = new GameObject(450, 200, 1, 1, 0);
rectangle3.addComponent(new RectangleComponent(50, 50, "lime", "black"));
rectangle3.addComponent(new RectangleBehavior(3));
currentScene.gameObjects.push(rectangle3);

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

