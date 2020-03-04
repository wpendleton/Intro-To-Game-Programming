import Base from "../Base.js"
import Input from "../base/Input.js";

export default class RectangleComponent extends Base.Component {
    width;
    height;
    fill;
    stroke;
    highlight;
    lowlight;
    constructor(width, height, fill, stroke) {
        super();
        this.width = width;
        this.height = height;
        this.fill = fill;
        this.stroke = stroke;
        this.highlight = false;
        this.lowlight = false;
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(-this.width / 2, -this.height / 2);
        ctx.fillStyle = this.fill;
        ctx.strokeStyle = this.stroke;
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.strokeRect(0, 0, this.width, this.height);
        if (this.highlight) {
            ctx.fillStyle = "rgba(255,255,255,0.5)";
            ctx.fillRect(0, 0, this.width, this.height);
        }
        if (this.lowlight) {
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fillRect(0, 0, this.width, this.height);
        }
        ctx.restore();
    }
    update() {
        
    }
}