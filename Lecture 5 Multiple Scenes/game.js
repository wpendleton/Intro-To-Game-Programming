import Scene from "./Scene.js";
import GameObject from "./GameObject.js"
import RectangleComponent from "./RectangleComponent.js"
import RectangleBehavior from "./RectangleBehavior.js";
import CircleComponent from "./CircleComponent.js";
import CircleBehavior from "./CircleBehavior.js";
import TextComponent from "./TextComponent.js";
import TextBehavior from "./TextBehavior.js";

let sceneOne = new Scene();
let sceneTwo = new Scene();

let rotatingSquare = new GameObject(200,200);
sceneOne.gameObjects.push(rotatingSquare);
let rectangleComponent  = new RectangleComponent(100,100,"red","blue");
let rectangleBehavior = new RectangleBehavior();
rotatingSquare.addComponent(rectangleComponent);
rotatingSquare.addComponent(rectangleBehavior);

let textTimer = new GameObject(300,300);
sceneOne.gameObjects.push(textTimer);
let textComponent  = new TextComponent("10","30pt Times","red");
let textBehavior = new TextBehavior();
textTimer.addComponent(textComponent);
textTimer.addComponent(textBehavior);

let greenCircle = new GameObject(100,100);
sceneOne.gameObjects.push(greenCircle);
let circleComponent  = new CircleComponent(50, "green", "orange");
let circleBehavior = new CircleBehavior();
greenCircle.addComponent(circleComponent);
greenCircle.addComponent(circleBehavior);





let currentScene = sceneOne;

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

