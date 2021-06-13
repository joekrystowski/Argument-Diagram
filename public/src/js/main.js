/* global joint createDependentPremise */
// const joint = window.joint;
import { saveEdits, discardEdits } from "./menu/SaveEditsButton.js";
import { createClaim, createObjection, } from "./menu/CreateClaim.js";
const argumentImage = new Image();
argumentImage.src = "src/img/Argument.jpg";
let argCounter = 0; //TODO: temporary until we fix selecting arguments
const newArgumentButton = document.getElementById("new-argument-button");
newArgumentButton.addEventListener("click", () => {
    createClaim(100 + 10 * argCounter, 100 + 10 * argCounter);
    ++argCounter;
    if (argCounter > 29) {
        argCounter = 0;
    }
});
newArgumentButton.addEventListener("dragstart", (event) => {
    var _a, _b;
    (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.setDragImage(argumentImage, 0, 0);
    (_b = event.dataTransfer) === null || _b === void 0 ? void 0 : _b.setData("type", "argument");
});
const saveEditButton = document.getElementById("save-edit-button");
saveEditButton.addEventListener("click", saveEdits);
const exitEditButton = document.getElementById("exit-edit-button");
exitEditButton.addEventListener("click", discardEdits);
const paperContainer = document.getElementById("myholder");
paperContainer.addEventListener("dragover", (event) => {
    event.preventDefault();
});
paperContainer.addEventListener("drop", (event) => {
    var _a;
    const type = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData("type");
    if (type === "argument") {
        createClaim(event.clientX - paperContainer.getBoundingClientRect().left, event.clientY - paperContainer.getBoundingClientRect().top);
    }
    else if (type === "objection") {
        createObjection(event.clientX - paperContainer.getBoundingClientRect().left, event.clientY - paperContainer.getBoundingClientRect().top);
    }
    else {
        throw new Error("Something went wrong when determining dataTransfer type.");
    }
});
let arg1 = createClaim(100, 100);
let arg2 = createClaim(300, 100);
