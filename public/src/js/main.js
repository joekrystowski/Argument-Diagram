/* global joint createDependentPremise*/

// this is built on Joint.js, an open source library. It handles a lot of the
// fundamental pieces for us on the back end, we have to implement the front end / interface
// to interact with it

let graph = new joint.dia.Graph();

// the paper renders the image of the graph
let paper = new joint.dia.Paper({
  el: document.getElementById("myholder"),
  model: graph,
  gridSize: 1,
});

let arg1 = createArgument();
let arg2 = createArgument();
//testing
let test = createDependentPremise(arg1.rect, arg2.rect);

