export class Action {
    constructor(action) {
        this.type = action;
    }
    execute() {
    }
}
export class History {
    constructor() {
        this.undoStack = [];
        this.redoStack = [];
    }
    undo() {
    }
    redo() {
    }
}
export const historyManager = new History();
