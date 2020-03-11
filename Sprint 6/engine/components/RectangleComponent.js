import Base from "../Base.js"
import Input from "../base/Input.js";

export default class RectangleComponent extends Base.Component {
    width;
    height;
    fill;
    stroke;
    highlight;
    lowlight;
    texture;
    constructor(width, height, fill, stroke) {
        super();
        this.width = width;
        this.height = height;
        this.fill = fill;
        this.stroke = stroke;
        this.hovered = false;
        this.highlight = null;
        this.texture = null;
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(-this.width / 2, -this.height / 2);
        ctx.fillStyle = this.fill;
        ctx.strokeStyle = this.stroke;
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.strokeRect(0, 0, this.width, this.height);
        if (this.highlight) {
            ctx.fillStyle = this.highlight;
            ctx.fillRect(0, 0, this.width, this.height);
        }
        if (this.texture) {
            ctx.drawImage(this.texture, 0, 0, this.width, this.height);
        }
        if (this.hovered) {
            ctx.fillStyle = "rgba(255,255,255,0.5)";
            ctx.fillRect(0, 0, this.width, this.height);
        }
        ctx.restore();
    }
    update() {
        
    }
    setTexture(filename){
        let img = new Image();
        img.src = filename;
        this.texture = img;
    }
}