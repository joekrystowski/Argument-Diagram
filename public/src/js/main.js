/* global joint createDependentPremise */
// const joint = window.joint;
import { saveEdits, discardEdits } from "./menu/SaveEditsButton.js";
import { createClaim, createObjection, createDependentPremise, } from "./menu/CreateClaim.js";
import { importGraph, exportGraph } from "./menu/ImportExport.js";
import { legend, toggleLegend } from './menu/Legend.js';
import { createLink } from "./tools/LinkButton.js";
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
const undoButton = document.getElementById("undo-button");
const redoButton = document.getElementById("redo-button");
const importButton = document.getElementById("import-button");
importButton.addEventListener("click", importGraph);
const exportButton = document.getElementById("export-button");
exportButton.addEventListener("click", exportGraph);
const sidePanel = document.getElementById("side-panel");
const wrapper = document.getElementById("wrapper");
const sidePanelButton = document.getElementById("side-panel-button");
sidePanelButton.addEventListener("click", () => {
    if ($('#side-panel').css('display') == 'none') {
        // wrapper.style.width= "50%";
        // sidePanel.style.width= "50%";
        sidePanel.style.display = "inline-block";
    }
    else {
        // wrapper.style.width= "100%";
        // sidePanel.style.width= "0%";
        sidePanel.style.display = "none";
    }
});
const legendButton = document.getElementById('legend-button');
legendButton.addEventListener('click', toggleLegend);
// $('#toggle-legend-info-button').on('click', function() {
//   const legend_info = $('#legend-info');
//   if (legend_info.hasClass('collapsed')) {
//     $(this).html('<i class="fa fa-chevron-left fa-2x"></i>');
//     legend_info.find('.collapsed-content').show();
//   }
//   else {
//     $(this).html('<i class="fa fa-chevron-right fa-2x"></i>');
//     legend_info.find('.collapsed-content').hide();
//   }
//   legend_info.toggleClass('collapsed');
// });
let sort_start = 0;
$('.sortable').sortable({
    placeholder: 'sortable-placeholder',
    start: function (event, ui) {
        sort_start = ui.item.index();
    },
    stop: function (event, ui) {
        console.log('start:', sort_start);
        console.log('stop:', ui.item.index());
        legend.reorder(sort_start, ui.item.index());
    }
});
//testing
//let test = createDependentPremise(arg1.rect, arg2.rect);
// createClaim(100, 100, 'This is Claim 1.');
// createClaim(300, 100, 'This is Claim 2.');
// createClaim(500, 100, 'This is Claim 3.');
// createClaim(700, 100, 'This is Claim 4.');
// createClaim(900, 100, 'This is Claim 5.');
const claim1 = createClaim(0, 100, "the past does not exist");
const claim2 = createClaim(200, 100, "the future does not exist");
const claim3 = createClaim(200, 300, "only the present exists");
const claim5 = createClaim(500, 100, "the present is always instantaneous");
const claim4 = createClaim(300, 300, "during the present there can be no lapse of time");
const claim6 = createClaim(300, 500, "time does not exist");
const dp1 = createDependentPremise(claim1.rect, claim2.rect);
const dp2 = createDependentPremise(claim3.rect, claim4.rect);
createLink(dp1.rect, claim3.rect);
createLink(claim5.rect, claim4.rect);
createLink(dp2.rect, claim6.rect);
