class Scene{
    gameObjects = [];
    backGroundColor;
    
    constructor(backGroundColor){
        this.backGroundColor = backGroundColor;
    }
    addGameObject(gameObject){
        gameObject.scene = this;
        this.gameObjects.push(gameObject);
    }
    removeGameObject(gameObject){
        let index = this.gameObjects.indexOf(gameObject);
        this.gameObjects.splice(index, 1);
    }
    draw(ctx, width, height){
        ctx.fillStyle = this.backGroundColor;
        ctx.fillRect(0,0,width,height);

        for(let i = 0; i < this.gameObjects.length; i++){
            let gameObject = this.gameObjects[i];
            gameObject.draw(ctx);
        }

    }
    update(){
        for(let i = 0; i < this.gameObjects.length; i++){
            let gameObject = this.gameObjects[i];
            gameObject.update();
        }
    }
    mousePosition(event){
        for(let i = 0; i < this.gameObjects.length; i++){
            let gameObject = this.gameObjects[i];
            gameObject.mousePosition(event);
        }
    }
    mouseClicked(event){
        for(let i = 0; i < this.gameObjects.length; i++){
            let gameObject = this.gameObjects[i];
            gameObject.mouseClicked(event);
        }
    }
}

export default Scene;

