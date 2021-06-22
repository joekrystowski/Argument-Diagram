/* global joint createDependentPremise */
// const joint = window.joint;
import { saveEdits, discardEdits } from "./menu/SaveEditsButton.js";
import {
  createClaim,
  createObjection,
  createDependentPremise,
} from "./menu/CreateClaim.js";
import { importGraph, exportGraph } from "./menu/ImportExport.js";
import { toggleLegend } from './menu/Legend.js';
import { Claim } from "./Claim.js";
import { color } from "./colors.js";
import { paper, graph } from "./graph.js";

const claimImage = new Image();
claimImage.src = "src/img/Claim.jpg";

let argCounter = 0; //TODO: temporary until we fix selecting claims
const newClaimButton = document.getElementById("new-claim-button") as HTMLElement;
newClaimButton.addEventListener("click", () => {
  createClaim(100+10*argCounter, 100+10*argCounter);
  ++argCounter;
  if(argCounter > 29) {
    argCounter = 0;
  }
});

newClaimButton.addEventListener("dragstart", (event) => {
  event.dataTransfer?.setDragImage(claimImage, 0, 0);
  event.dataTransfer?.setData("type", "claim");
});

const saveEditButton = document.getElementById("save-edit-button") as HTMLElement;
saveEditButton.addEventListener("click", saveEdits);
const exitEditButton = document.getElementById("exit-edit-button") as HTMLElement;
exitEditButton.addEventListener("click", discardEdits);

const paperContainer = document.getElementById("myholder") as HTMLElement;
paperContainer.addEventListener("dragover", (event) => {
  event.preventDefault();
});
paperContainer.addEventListener("drop", (event) => {
  const type = event.dataTransfer?.getData("type");
  if (type === "claim") {
    createClaim(
      event.clientX - paperContainer.getBoundingClientRect().left,
      event.clientY - paperContainer.getBoundingClientRect().top
    );
  } else if (type === "objection") {
    createObjection(
      event.clientX - paperContainer.getBoundingClientRect().left,
      event.clientY - paperContainer.getBoundingClientRect().top
    );
  } else {
    throw new Error("Something went wrong when determining dataTransfer type.");
  }
});

const importButton = document.getElementById("import-button") as HTMLElement;
importButton.addEventListener("click", importGraph);

const exportButton = document.getElementById("export-button") as HTMLElement;
exportButton.addEventListener("click", exportGraph);

const legendButton = document.getElementById('legend-button') as HTMLElement;
legendButton.addEventListener('click', toggleLegend);

//testing
//let test = createDependentPremise(arg1.rect, arg2.rect);
let arg1 = createClaim(100, 100);
let arg2 = createClaim(300, 100);
