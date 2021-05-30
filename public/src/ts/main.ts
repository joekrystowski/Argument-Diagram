/* global joint */
const joint = window.joint
import { saveEdits } from './menu/SaveEditsButton.js'
import { createArgument, createObjection } from './menu/CreateArguments.js'

// this is built on Joint.js, an open source library. It handles a lot of the
// fundamental pieces for us on the back end, we have to implement the front end / interface
// to interact with it

export let graph = new joint.dia.Graph();

// the paper renders the image of the graph
export let paper = new joint.dia.Paper({
  el: document.getElementById("myholder") as HTMLElement,
  model: graph,
  gridSize: 1,
});

console.log("setup");
let newArgumentButton = document.getElementById("new-argument-button") as HTMLElement;
newArgumentButton.addEventListener("click", createArgument);

let objectionButton = document.getElementById("objection-button") as HTMLElement;
objectionButton.addEventListener("click", createObjection);

let saveEditButton = document.getElementById("save-edit-button") as HTMLElement;
saveEditButton.addEventListener("click",saveEdits);
