/* global joint createDependentPremise */
// const joint = window.joint;
import { saveEdits, discardEdits } from "./menu/SaveEditsButton.js";
import { createClaim, createObjection, } from "./menu/CreateClaim.js";
import { importGraph, exportGraph } from "./menu/ImportExport.js";
const claimImage = new Image();
claimImage.src = "src/img/Claim.jpg";
let argCounter = 0; //TODO: temporary until we fix selecting claims
const newClaimButton = document.getElementById("new-claim-button");
newClaimButton.addEventListener("click", () => {
    createClaim(100 + 10 * argCounter, 100 + 10 * argCounter);
    ++argCounter;
    if (argCounter > 29) {
        argCounter = 0;
    }
});
newClaimButton.addEventListener("dragstart", (event) => {
    var _a, _b;
    (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.setDragImage(claimImage, 0, 0);
    (_b = event.dataTransfer) === null || _b === void 0 ? void 0 : _b.setData("type", "claim");
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
    if (type === "claim") {
        createClaim(event.clientX - paperContainer.getBoundingClientRect().left, event.clientY - paperContainer.getBoundingClientRect().top);
    }
    else if (type === "objection") {
        createObjection(event.clientX - paperContainer.getBoundingClientRect().left, event.clientY - paperContainer.getBoundingClientRect().top);
    }
    else {
        throw new Error("Something went wrong when determining dataTransfer type.");
    }
});
const importButton = document.getElementById("import-button");
importButton.addEventListener("click", importGraph);
const exportButton = document.getElementById("export-button");
exportButton.addEventListener("click", exportGraph);
//testing
//let test = createDependentPremise(arg1.rect, arg2.rect);
let arg1 = createClaim(100, 100);
let arg2 = createClaim(300, 100);
