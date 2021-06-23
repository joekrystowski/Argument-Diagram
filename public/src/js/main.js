/* global joint createDependentPremise */
// const joint = window.joint;
import { saveEdits, discardEdits } from "./menu/SaveEditsButton.js";
import { createClaim, createObjection, } from "./menu/CreateClaim.js";
import { importGraph, exportGraph } from "./menu/ImportExport.js";
import { legend, toggleLegend } from './menu/Legend.js';
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
const legendButton = document.getElementById('legend-button');
legendButton.addEventListener('click', toggleLegend);
$('#toggle-legend-info-button').on('click', function () {
    const legend_info = $('#legend-info');
    if (legend_info.hasClass('collapsed')) {
        legend_info.css('width', '20%');
        legend_info.css('border-right', '1px solid white');
        $(this).html('<i class="fa fa-chevron-left fa-2x"></i>');
        legend_info.find('.collapsed-content').show();
    }
    else {
        legend_info.css('width', '0px');
        legend_info.css('border-right', '1px solid transparent');
        $(this).html('<i class="fa fa-chevron-right fa-2x"></i>');
        legend_info.find('.collapsed-content').hide();
    }
    legend_info.toggleClass('collapsed');
});
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
createClaim(100, 100, 'Claim 1 aaaaaaaaaaaaadjklajsdlkajsdlkajsdlaksjdlkajsdlasjdlkj');
createClaim(300, 100, 'Claim 2');
createClaim(500, 100, 'Claim 3');
createClaim(700, 100, 'Claim 4');
createClaim(900, 100, 'Claim 5');
