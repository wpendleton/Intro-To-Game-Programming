export default class NameableParent {
    children = [];
    name = "";
    constructor(name){
        this.name = name;
    }
    addChild(child){
        this.children.push(child);
        child.parent = this;
    }
}