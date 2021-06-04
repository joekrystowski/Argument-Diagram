/* global joint createDependentPremise */
// const joint = window.joint;
import { saveEdits } from './menu/SaveEditsButton.js';
import { createArgument, createObjection, createDependentPremise } from './menu/CreateArguments.js';
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
console.log("setup");
const newArgumentButton = document.getElementById("new-argument-button");
newArgumentButton.addEventListener("click", createArgument.bind(null, 100, 100));
newArgumentButton.addEventListener("dragstart", (event) => {
    var _a;
    (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData('type', 'argument');
});
const objectionButton = document.getElementById("objection-button");
objectionButton.addEventListener("click", createObjection.bind(null, 100, 100));
objectionButton.addEventListener("dragstart", (event) => {
    var _a;
    (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData('type', 'objection');
});
const saveEditButton = document.getElementById("save-edit-button");
saveEditButton.addEventListener("click", saveEdits);
const paperContainer = document.getElementById("myholder");
paperContainer.addEventListener("dragover", (event) => {
    event.preventDefault();
});
paperContainer.addEventListener("drop", (event) => {
    var _a;
    const type = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData('type');
    if (type === 'argument') {
        createArgument(event.clientX - paperContainer.getBoundingClientRect().left, event.clientY - paperContainer.getBoundingClientRect().top);
    }
    else if (type === 'objection') {
        createObjection(event.clientX - paperContainer.getBoundingClientRect().left, event.clientY - paperContainer.getBoundingClientRect().top);
    }
    else {
        throw new Error("Something went wrong when determining dataTransfer type.");
    }
});
const editContainer = $('#edit-container');
editContainer.hide();
let arg1 = createArgument(100, 100);
let arg2 = createArgument(300, 100);
//testing
let test = createDependentPremise(arg1.rect, arg2.rect);
