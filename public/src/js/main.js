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

// used to alternate between selected and unselected when clicking on the elment.
paper.on("element:pointerclick", function(eventView){
  if (eventView._toolsView.tools.length <= 0){
    console.log("What is this? an element with no tools?")
    console.log("Well that is quite strange.");
    return
  }
  if(eventView._toolsView.tools[0].isVisible() == true){
    //console.log("UnClicked=>Hiding!");
    eventView.hideTools();
  }else{
    //console.log("Clicked=>Showing!");
    eventView.showTools();
  }
});
