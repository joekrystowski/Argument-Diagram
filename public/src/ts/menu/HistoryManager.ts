import { createClaim } from "./CreateClaim";

export class Action {
  private type: String;

  public constructor(action: String) {
    this.type = action;
  }

  public doAction() {
    //if (this.type === "add-claim") createClaim();
  }

  public undoAction() {

  }


}

export class History {
  private undoStack: Action[];
  private redoStack: Action[];

  public constructor() {
    this.undoStack = [];
    this.redoStack = [];
  }

  public add(action: Action): void {
    this.redoStack = [];
    this.undoStack.push(action);
  }

  public undo(): void {
    if (this.undoStack.length > 0) {
      // pop next action and undo it
      const action = this.undoStack.pop()!;
      action.undoAction();
      this.redoStack.push(action);
    }
  }

  public redo(): void {
    if (this.redoStack.length > 0) {
      // pop next action and redo it
      const action = this.redoStack.pop()!;
      action.doAction();
      this.undoStack.push(action);
    } 
  }

}
