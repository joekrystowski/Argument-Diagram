/* global joint createDependentPremise */
// const joint = window.joint;
import { saveEdits, discardEdits } from "./menu/SaveEditsButton.js";
import {
  createClaim,
  createObjection,
  createDependentPremise,
} from "./menu/CreateClaim.js";
import { importGraph, exportGraph } from "./menu/ImportExport.js";
import { savePNG, savePDF } from "./menu/saveAs.js";
import { legend, toggleLegend } from './menu/Legend.js';
import { Claim } from "./Claim.js";
import { color } from "./colors.js";
import { paper, graph } from "./graph.js";
import { evaluateArgument } from "./menu/EvaluateArgument.js"
import { AutomaticCleanUp, findArguments } from "./menu/CleanUp/AutomaticCleanUp.js"
import { createLink, selected_links } from "./tools/LinkButton.js";
import { selected_element } from "./tools/ManageTools.js";
import { initializeContainerDrag } from "./util.js";

const claimImage = new Image();
claimImage.src = "public/src/img/Claim.jpg";

initializeContainerDrag('paper-wrapper');

let argCounter = 0; //TODO: temporary until we fix selecting claims
const paper_wrapper = $('#paper-wrapper')
let previousScroll = {x: paper_wrapper.scrollLeft(), y: paper_wrapper.scrollTop()}
const newClaimButton = document.getElementById("new-claim-button") as HTMLElement;
newClaimButton.addEventListener("click", () => {
  const currentScroll = {x: <number>paper_wrapper.scrollLeft(), y: <number>paper_wrapper.scrollTop()}
  if (currentScroll.x === previousScroll.x && currentScroll.y === previousScroll.y) {
    argCounter = (argCounter + 1) % 29;
  } else {
    argCounter = 0;
    previousScroll = Object.assign({}, currentScroll);
  }

  createClaim(currentScroll.x +10*argCounter, currentScroll.y + 10*argCounter);
});

newClaimButton.addEventListener("dragstart", (event) => {
  event.dataTransfer?.setDragImage(claimImage, 0, 0);
  event.dataTransfer?.setData("type", "claim");
});


const edit_template = $('#edit-form-template').html();
$(edit_template).dialog({ 
  autoOpen: false, 
  title: 'Edit Menu', 
  resizable: true, 
  width: 500, 
  height: 500,
  dialogClass: 'edit',
  close: function(event, ui) {
    //$(this).dialog('close');
  }
});

const saveEditButton = document.getElementById("save-edit-button") as HTMLElement;
saveEditButton.addEventListener("click", saveEdits);
// const exitEditButton = document.getElementById("exit-edit-button") as HTMLElement;
// exitEditButton.addEventListener("click", discardEdits);

const paperContainer = document.getElementById("myholder") as HTMLElement;
paperContainer.addEventListener("dragover", (event) => {
  event.preventDefault();
});
paperContainer.addEventListener("drop", (event) => {
  console.log('dropping')
  const type = event.dataTransfer?.getData("type");
  if (type === "claim") {
    const x = event.clientX - paperContainer.getBoundingClientRect().left;
    const y = event.clientY - paperContainer.getBoundingClientRect().top;
    console.log(x, y);
    createClaim(
      x, y
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

const evaluateButton = document.getElementById('evaluate-button') as HTMLElement;
evaluateButton.addEventListener('click', evaluateArgument);

const CleanArgumentButton = document.getElementById('clean-argument-button') as HTMLElement;
CleanArgumentButton.addEventListener('click', findArguments)

const PNGButton = document.getElementById("png-button") as HTMLElement;
PNGButton.addEventListener("click", savePNG);

const PDFButton = document.getElementById("pdf-button") as HTMLElement;
PDFButton.addEventListener("click", savePDF);

const sidePanel = document.getElementById("side-panel") as HTMLElement;
const wrapper = document.getElementById("wrapper") as HTMLElement;
const sidePanelButton = document.getElementById("side-panel-button") as HTMLElement;
sidePanelButton.addEventListener("click", () => {
  if($('#side-panel').css('display') == 'none') {
    sidePanel.style.display = "inline-block";
  }
  else {
    sidePanel.style.display = "none";
  }
})
const legendButton = document.getElementById('legend-button') as HTMLElement;
legendButton.addEventListener('click', toggleLegend);


let sort_start = 0;
(<any>$('.sortable')).sortable({
  placeholder: 'sortable-placeholder',
  start: function(event:Event, ui:any) {
    sort_start = ui.item.index();
  },
  stop: function(event:Event, ui:any) {
    console.log('start:', sort_start);
    console.log('stop:', ui.item.index());
    legend.reorder(sort_start, ui.item.index());
  }
});

//testing
// const claim1 = createClaim(0, 100, "the past does not exist");
// const claim2 = createClaim(200, 100, "the future does not exist");
// const claim3 = createClaim(200, 300, "only the present exists");
// const claim5 = createClaim(500, 100, "the present is always instantaneous");
// const claim4 = createClaim(300, 300, "during the present there can be no lapse of time");
// const claim6 = createClaim(300, 500, "time does not exist");

// const dp1 = createDependentPremise(claim1.rect, claim2.rect);
// const dp2 = createDependentPremise(claim3.rect, claim4.rect);

// createLink(dp1.rect, claim3.rect);
// createLink(claim5.rect, claim4.rect);
// createLink(dp2.rect, claim6.rect)
