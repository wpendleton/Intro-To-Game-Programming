import Behavior from "./Behavior.js";
class GameObject {
    /* Elements of a transform - translate, scale and rotate in 2D */
    x;
    y;
    scaleX;
    scaleY;
    rotation;

    /* children */
    children = [];

    components = [];
    
    constructor(x=0, y=0, scaleX=1, scaleY=1, rotation=0) {
        this.x = x;
        this.y = y;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.rotation = rotation;
    }
    addComponent(component) {
        this.components.push(component);
        component.gameObject = this;
        if (component.start){
            component.start();
        }
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scaleX, this.scaleY);
        ctx.rotate(this.rotation);

        for (let i = 0; i < this.components.length; i++) {
            let component = this.components[i];
            if (component.draw) {
                component.draw(ctx);
            }
        }

        ctx.restore();

    }
    update() {
        for (let i = 0; i < this.components.length; i++) {
            let component = this.components[i];
            if (component.update) {
                component.update();
            }
        }
    }
    mousePosition(event){
        for (let i = 0; i < this.components.length; i++) {
            let component = this.components[i];
            if (component.mousePosition) {
                component.mousePosition(event);
            }
        }
    }
    mouseClicked(event){
        for (let i = 0; i < this.components.length; i++) {
            let component = this.components[i];
            if (component.mouseClicked) {
                component.mouseClicked(event);
            }
        }
    }
    getComponent(type){
        for(let i = 0; i < this.components.length; i++){
            let component = this.components[i];
            if (component instanceof type){
                return component;
            }
        }
        throw "Error: Couldn't find type " + type;
    }
    delete(){}
}

export default GameObject;