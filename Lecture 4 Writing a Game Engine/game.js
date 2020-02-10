import Scene from "./Scene.js";
import GameObject from "./GameObject.js"
import RectangleComponent from "./RectangleComponent.js"
import RectangleBehavior from "./RectangleBehavior.js";

let startScene = new Scene();
let billGameObject = new GameObject(200,200);
startScene.gameObjects.push(billGameObject);
let rectangle  = new RectangleComponent(100,100,"red","blue");
let rectangleBehavior = new RectangleBehavior();
billGameObject.addComponent(rectangle);
billGameObject.addComponent(rectangleBehavior);

let currentScene = startScene;

let canv, ctx;

function main() {
    canv = document.querySelector("#canv");
    ctx = canv.getContext('2d');

    setInterval(gameLoop, 33);
}

function gameLoop() {
    update();
    draw(ctx);
}

function update() {
    currentScene.update();    
}

function draw(ctx) {
    currentScene.draw(ctx, canv.width, canv.height);
}

main();

