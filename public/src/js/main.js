/* global joint createDependentPremise */
// const joint = window.joint;
import { saveEdits } from "./menu/SaveEditsButton.js";
import { createClaim, createObjection, createDependentPremise, } from "./menu/CreateClaim.js";
import { importGraph, exportGraph, saveGraph, openGraph } from "./menu/ImportExport.js";
import { savePNG, savePDF } from "./menu/saveAs.js";
import { legend, toggleLegend } from './menu/Legend.js';
import { evaluateArgument } from "./menu/EvaluateArgument.js";
import { findArguments } from "./menu/CleanUp/AutomaticCleanUp.js";
import { createLink } from "./tools/LinkButton.js";
import { toggleSettings } from "./Settings.js";
import { initializeContainerDrag } from "./util.js";
const claimImage = new Image();
claimImage.src = "src/img/Claim.jpg";
initializeContainerDrag('paper-wrapper');
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
const edit_template = $('#edit-form-template').html();
$(edit_template).dialog({
    autoOpen: false,
    title: 'Edit Menu',
    resizable: true,
    width: 500,
    height: 500,
    dialogClass: 'edit',
    close: function (event, ui) {
        //$(this).dialog('close');
    }
});
const saveEditButton = document.getElementById("save-edit-button");
saveEditButton.addEventListener("click", saveEdits);
// const exitEditButton = document.getElementById("exit-edit-button") as HTMLElement;
// exitEditButton.addEventListener("click", discardEdits);
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
const saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", saveGraph);
const filesButton = document.getElementById("files-button");
filesButton.addEventListener("click", openGraph);
const evaluateButton = document.getElementById('evaluate-button');
evaluateButton.addEventListener('click', evaluateArgument);
const CleanArgumentButton = document.getElementById('clean-argument-button');
CleanArgumentButton.addEventListener('click', findArguments);
const PNGButton = document.getElementById("png-button");
PNGButton.addEventListener("click", savePNG);
const PDFButton = document.getElementById("pdf-button");
PDFButton.addEventListener("click", savePDF);


const sidePanel = document.getElementById("side-panel");
const wrapper = document.getElementById("wrapper");
const sidePanelButton = document.getElementById("side-panel-button");
sidePanelButton.addEventListener("click", () => {
    if ($('#side-panel').css('display') == 'none') {
        sidePanel.style.display = "inline-block";
    }
    else {
        sidePanel.style.display = "none";
    }
});
const legendButton = document.getElementById('legend-button');
legendButton.addEventListener('click', toggleLegend);
const settingsButton = document.getElementById('settings-button');
settingsButton.addEventListener('click', toggleSettings);
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
