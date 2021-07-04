export class Action {
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
