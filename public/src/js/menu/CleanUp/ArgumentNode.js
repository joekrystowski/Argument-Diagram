const joint = window.joint;
export class Node {
    constructor(c, level) {
        this.cell = c;
        this.level = level;
        this.parents = [];
        this.children = [];
    }
    hasParents() {
        if (this.parents.length > 0)
            return true;
        return false;
    }
    hasChildren() {
        if (this.children.length > 0)
            return true;
        return false;
    }
    hasParent(id) {
        for (const parent of this.parents) {
            if (parent.cell.attributes.id === id) {
                return true;
            }
        }
        return false;
    }
    hasChild(id) {
        for (const child of this.children) {
            if (child.cell.attributes.id === id) {
                return true;
            }
        }
        return false;
    }
}
