/* global joint */
// this is built on Joint.js, an open source library. It handles a lot of the
// fundamental pieces for us on the back end, we have to implement the front end / interface
// to interact with it
console.log("start");
import * as joint from 'https://cdnjs.cloudflare.com/ajax/libs/jointjs/3.3.0/joint.js';
import { createArgument, createObjection } from './menu/CreateArguments.js';
export let graph = new joint.dia.Graph();
// the paper renders the image of the graph
export let paper = new joint.dia.Paper({
    el: document.getElementById("myholder"),
    model: graph,
    gridSize: 1,
});
console.log("setup");
let newArgumentButton = document.getElementById("new-argument-button");
newArgumentButton.addEventListener("click", createArgument);
let objectionButton = document.getElementById("objection-button");
objectionButton.addEventListener("click", createObjection);
