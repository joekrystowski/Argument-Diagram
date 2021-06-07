/* global joint createDependentPremise */
// const joint = window.joint;
import { saveEdits } from "./menu/SaveEditsButton.js";
import {
  createArgument,
  createObjection,
  createDependentPremise,
} from "./menu/CreateArguments.js";
import { Argument } from "./Argument.js";
import { color } from "./colors.js";
import { paper, graph } from "./graph.js";
import { importGraph, exportGraph } from "./menu/ImportExport.js";
// this is built on Joint.js, an open source library. It handles a lot of the
// fundamental pieces for us on the back end, we have to implement the front end / interface
// to interact with it

// export let graph = new joint.dia.Graph();

// // the paper renders the image of the graph
// export let paper = new joint.dia.Paper({
//   el: document.getElementById("myholder") as HTMLElement,
//   model: graph,
//   gridSize: 1,
// });

// console.log("setup");
const argumentImage = new Image();
argumentImage.src = "src/img/Argument.jpg";

const newArgumentButton = document.getElementById("new-argument-button") as HTMLElement;
newArgumentButton.addEventListener("click",createArgument.bind(null, 100, 100));

newArgumentButton.addEventListener("dragstart", (event) => {
  // event.dataTransfer?.setDragImage(argumentImage, argumentImage.naturalWidth/2, argumentImage.naturalHeight/2);
  event.dataTransfer?.setDragImage(argumentImage, 0, 0);
  event.dataTransfer?.setData("type", "argument");
});

const objectionButton = document.getElementById("new-objection-button") as HTMLElement;
objectionButton.addEventListener("click", createObjection.bind(null, 100, 100));
  objectionButton.addEventListener("dragstart", (event) => {
    event.dataTransfer?.setDragImage(argumentImage, 0, 0)
    event.dataTransfer?.setData('type', 'objection');
})

const saveEditButton = document.getElementById(
  "save-edit-button"
) as HTMLElement;
saveEditButton.addEventListener("click", saveEdits);

const paperContainer = document.getElementById("myholder") as HTMLElement;
paperContainer.addEventListener("dragover", (event) => {
  event.preventDefault();
});
paperContainer.addEventListener("drop", (event) => {
  const type = event.dataTransfer?.getData("type");
  if (type === "argument") {
    createArgument(
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

// const editContainer= $('#edit-container');
// editContainer.hide();

// function toggleHeader() {
//     const button = $('#toggleHeaderButton');
//     const header = $('#header');
//     button.toggleClass('collapsed');
//     console.log(button);
//     console.log(button.find('i'));
//     if(button.hasClass('collapsed')){
//         header.css('height', '0');
//         header.find('.wrapper').hide();
//         button.find('i').removeClass('fa-chevron-up');
//         button.find('i').addClass('fa-chevron-down');
//     }
//     else {
//         header.css('height', '100px');
//         header.find('.wrapper').show();
//         button.find('i').removeClass('fa-chevron-down');
//         button.find('i').addClass('fa-chevron-up');
//     }
// }

// function hoverDropdown(element:HTMLElement) {
//     const content = $(element).find('.dropdown-content');
//     content.toggleClass('collapsed');
//     if(content.hasClass('collapsed')){
//         $(element).find('i.chevron').removeClass('fa-chevron-down');
//         $(element).find('i.chevron').addClass('fa-chevron-right');
//     }
//     else {
//         $(element).find('i.chevron').removeClass('fa-chevron-right');
//         $(element).find('i.chevron').addClass('fa-chevron-down');
//     }
// }

const importButton = document.getElementById("import-button") as HTMLElement;
importButton.addEventListener("click", importGraph);

const exportButton = document.getElementById("export-button") as HTMLElement;
exportButton.addEventListener("click", exportGraph);
// const addDropdown = document.getElementById('addDropdown') as HTMLElement;
// addDropdown.addEventListener('mouseenter', hoverDropdown.bind(null, addDropdown));
// addDropdown.addEventListener('mouseleave', hoverDropdown.bind(null, addDropdown));

// const toggleHeaderButton = document.getElementById('toggleHeaderButton') as HTMLElement;
// toggleHeaderButton.addEventListener('click', toggleHeader);

console.log("creatingArguments");
let arg1 = createArgument(100, 100);
let arg2 = createArgument(300, 100);
//testing
//let test = createDependentPremise(arg1.rect, arg2.rect);
