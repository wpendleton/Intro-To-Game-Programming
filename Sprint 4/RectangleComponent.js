import Component from "./Component.js"

class RectangleComponent extends Component{
    /* a retangle has a width, height, stroke, and fill */
    width;
    height;
    fill;
    stroke;
    highlight;
    lowlight;

    constructor(width, height, fill, stroke){
        super();
        this.width = width;
        this.height = height;
        this.fill = fill;
        this.stroke = stroke;
        this.highlight = false;
        this.lowlight = false;
    }
    draw(ctx){
        /* draw a rectangle centered about 0,0 */
        ctx.save();
        {
            ctx.translate(-this.width/2, -this.height/2);
            ctx.fillStyle = this.fill;
            ctx.strokeStyle = this.stroke;
            ctx.fillRect(0,0,this.width,this.height);
            if (this.highlight){
                ctx.globalAlpha = 0.5;
                ctx.fillStyle = "white";
                ctx.fillRect(0,0,this.width,this.height);
            }
            if (this.lowlight){
                ctx.globalAlpha = 0.3;
                ctx.fillStyle = "black";
                ctx.fillRect(0,0,this.width,this.height);
            }
            ctx.strokeRect(0,0,this.width,this.height);
        }
        ctx.restore();
    }
}

export default RectangleComponent;