/* global joint createDependentPremise*/
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
newArgumentButton.addEventListener("click", createArgument);
const objectionButton = document.getElementById("objection-button");
objectionButton.addEventListener("click", createObjection);
const saveEditButton = document.getElementById("save-edit-button");
saveEditButton.addEventListener("click", saveEdits);
const editContainer = $('#edit-container');
editContainer.hide();
let arg1 = createArgument();
let arg2 = createArgument();
//testing
let test = createDependentPremise(arg1.rect, arg2.rect);
