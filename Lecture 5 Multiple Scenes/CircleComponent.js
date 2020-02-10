import Component from "./Component.js"

class CircleComponent extends Component{
    radius;
    fill;
    stroke;
    constructor(radius, fill, stroke){
        super();
        this.radius = radius;
        this.fill = fill;
        this.stroke = stroke;
    }
    draw(ctx){
        ctx.save();
        ctx.fillStyle = this.fill;
        ctx.strokeStyle = this.stroke;
        ctx.beginPath();
        ctx.arc(0,0,this.radius, 0, 360);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    update(){

    }
}

export default CircleComponent;