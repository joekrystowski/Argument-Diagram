/* global joint createDependentPremise */
// const joint = window.joint;
import { saveEdits, discardEdits } from "./menu/SaveEditsButton.js";
import {
  createClaim,
  createObjection,
  createDependentPremise,
} from "./menu/CreateClaim.js";
import { importGraph, exportGraph } from "./menu/ImportExport.js";
import { legend, toggleLegend } from './menu/Legend.js';
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

$('#toggle-legend-info-button').on('click', function() {
  const legend_info = $('#legend-info');
  if (legend_info.hasClass('collapsed')) {
    $(this).html('<i class="fa fa-chevron-left fa-2x"></i>');
    legend_info.find('.collapsed-content').show();
  }
  else {
    $(this).html('<i class="fa fa-chevron-right fa-2x"></i>');
    legend_info.find('.collapsed-content').hide();
  }

  legend_info.toggleClass('collapsed');
});

let sort_start = 0;
$('.sortable').sortable({
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
//let test = createDependentPremise(arg1.rect, arg2.rect);
createClaim(100, 100, 'Claim 1 aaaaaaaaaaaaadjklajsdlkajsdlkaj sdlaksjdlkajsdlasjdlkj');
createClaim(300, 100, 'Claim 2');
createClaim(500, 100, 'Claim 3');
createClaim(700, 100, 'Claim 4');
createClaim(900, 100, 'Claim 5');
