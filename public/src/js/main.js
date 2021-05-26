/* global joint */

// this is built on Joint.js, an open source library. It handles a lot of the
// fundamental pieces for us on the back end, we have to implement the front end / interface
// to interact with it

let graph = new joint.dia.Graph();

let paper = new joint.dia.Paper({
  el: document.getElementById("myholder"),
  model: graph,
  gridSize: 1,
});


