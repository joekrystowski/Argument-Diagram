export class Action {
    constructor(action) {
        this.type = action;
    }
    doAction() {
        //if (this.type === "add-claim") createClaim();
    }
    undoAction() {
    }
}
export class History {
    constructor() {
        this.undoStack = [];
        this.redoStack = [];
    }
    add(action) {
        this.redoStack = [];
        this.undoStack.push(action);
    }
    undo() {
        if (this.undoStack.length > 0) {
            // pop next action and undo it
            const action = this.undoStack.pop();
            action.undoAction();
            this.redoStack.push(action);
        }
    }
    redo() {
        if (this.redoStack.length > 0) {
            // pop next action and redo it
            const action = this.redoStack.pop();
            action.doAction();
            this.undoStack.push(action);
        }
    }
}
