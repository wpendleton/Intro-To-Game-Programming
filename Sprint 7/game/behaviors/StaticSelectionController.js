import Engine from "../../engine/Engine.js"

export default class StaticSelectionController extends Engine.Base.Behavior {
    static source = null;
    static move = null;
    static attack = null;
    static inspect = null;

    static sourcehighlight = "rgba(255,255,0,0.5)";
    static movementhighlight = "rgba(0,0,255,0.4)";
    static attackhighlight = "rgba(255,0,0,0.4)";

    static confirmbutton;
    static infoPanel;

    static selectionHandler(tile) {
        if (tile == this.source) {
            this.deselectSource();
            return;
        }
        if (tile == this.move) {
            this.deselectMove();
            return;
        }
        if (tile == this.attack) {
            if (this.move == this.source) {
                this.deselectMove();
            }
            else {
                this.deselectAttack();
            }
            return;
        }

        if (this.attack) {
            return;
        }
        if (this.move) {
            let unit = tile.gameObject.parent.getUnit(tile.x, tile.y).behavior;
            if (unit) {
                if (unit.friendly == 0) {
                    let distX = Math.abs(this.move.x - tile.x);
                    let distY = Math.abs(this.move.y - tile.y);
                    let range = tile.gameObject.parent.getUnit(this.source.x, this.source.y).behavior.attackrange;
                    if (distX <= range && distY <= range) {
                        this.selectAttack(tile);
                    }
                }
            }
        }
        else if (this.source) {
            let unit = tile.gameObject.parent.getUnit(tile.x, tile.y).behavior;
            if (unit) {
                if (unit.friendly == 0) {
                    let distX = Math.abs(this.source.x - tile.x);
                    let distY = Math.abs(this.source.y - tile.y);
                    let range = tile.gameObject.parent.getUnit(this.source.x, this.source.y).behavior.attackrange;
                    if (distX <= range && distY <= range) {
                        this.selectMove(this.source);
                        this.selectAttack(tile);
                    }
                }
            } else if (tile.type == "P" || tile.type == "F") {
                //TODO: Verify Movement Range
                this.selectMove(tile);
            }
        }
        else {
            let unit = tile.gameObject.parent.getUnit(tile.x, tile.y).behavior;
            if (unit) {
                if (unit.friendly == 1) {
                    this.selectSource(tile, unit);
                }
                else {
                    this.inspect = tile.gameObject.parent.getUnit(tile.x, tile.y).behavior;
                }
            }
        }
        //TODO: call inspection panel
        this.infoPanel.updateValues(this.inspect.friendly, this.inspect.type, this.inspect.health, this.inspect.moverange, this.inspect.attackrange, this.inspect.damage);
    }
    static selectSource(tile, unit) {
        this.inspect = tile.gameObject.parent.getUnit(tile.x, tile.y).behavior;
        this.source = tile;
        this.source.rectangle.highlight = this.sourcehighlight;
        let moveable = tile.gameObject.parent.getTilesForMove(tile.x, tile.y, unit.moverange);
        console.log(moveable);
        moveable.forEach(i=>i.rectangle.highlight = this.movementhighlight);
        //TODO: Display movement range of unit
        //Find all valid movemnt square
        //Loop over squares and set their highlights
    }

    static selectMove(tile) {
        this.confirmbutton.rectangle.highlight = this.attackhighlight;
        this.move = tile;
        this.move.rectangle.highlight = this.movementhighlight;
        //TODO: Display attack range of unit
    }

    static selectAttack(tile) {
        this.inspect = tile.gameObject.parent.getUnit(tile.x, tile.y).behavior;
        this.attack = tile;
        this.attack.rectangle.highlight = this.attackhighlight;
    }

    static deselectSource() {
        this.inspect = null;
        this.deselectMove();
        if (this.source) {
            this.source.rectangle.highlight = null;
            this.source = null;
        }
    }

    static deselectMove() {
        this.confirmbutton.rectangle.highlight = null;
        this.deselectAttack();
        if (this.move) {
            if (this.move != this.source) {
                this.move.rectangle.highlight = null;
            }
            else (this.source.rectangle.highlight = this.sourcehighlight)
            this.move = null;
        }
    }

    static deselectAttack() {
        if (this.source){
            this.inspect = this.source.gameObject.parent.getUnit(this.source.x, this.source.y).behavior;
        }
        if (this.attack) {
            this.attack.rectangle.highlight = null;
            this.attack = null;
        }
    }

    static sendMove() {
        this.inspect = null;
        if (this.source && this.move) {
            this.source.gameObject.parent.moveUnit(this.source.x, this.source.y, this.move.x, this.move.y);
        }
        if (this.source && this.attack) {
            this.source.gameObject.parent.killUnit(this.attack.x, this.attack.y); //TODO: Apply damage instead
        }
        this.deselectSource();
    }
}