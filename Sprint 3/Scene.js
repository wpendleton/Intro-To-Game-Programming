class Scene{
    gameObjects = [];
    backGroundColor;
    
    constructor(backGroundColor){
        this.backGroundColor = backGroundColor;
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

