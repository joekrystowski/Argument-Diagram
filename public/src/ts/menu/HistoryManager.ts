export class Action {
  private type: String;

  public constructor(action: String) {
    this.type = action;
  }

  public execute() {
    
  }
}

export class History {
  private undoStack: [];
  private redoStack: [];

  public constructor() {
    this.undoStack = [];
    this.redoStack = [];
  }

  public undo() {

  }

  public redo() {

  }
}

export const historyManager = new History();