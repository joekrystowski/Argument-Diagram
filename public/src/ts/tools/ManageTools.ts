/* global joint paper */
const joint = window.joint;
import { paper } from '../graph.js'

// adding tools (buttons) to rects
export function addRectTools(element: joint.shapes.app.CustomRect) {
  // boundary tool shows boundaries of element
  let boundaryTool = new joint.elementTools.Boundary();
  //remove tool deletes a rect
  let removeButton = new joint.elementTools.Remove();
  // link button
  let linkButton = new joint.elementTools.LinkButton();
  //edit button
  let editButton = new joint.elementTools.EditButton();

  let combinedPremiseButton = new joint.elementTools.CombinePremiseButton();
  
  let toolsView = new joint.dia.ToolsView({
    tools: [boundaryTool, removeButton, linkButton, editButton, combinedPremiseButton]
  });

  //element view is in charge of rendering the elements on the paper
  let elementView = element.findView(paper);
  elementView.addTools(toolsView);
  //start with tools hidden
  elementView.hideTools();

  element.on("change:position", function () {
    paper.hideTools();
    elementView.showTools();
  })

  // deselects elements that were not clicked on.
  paper.on("element:pointerclick", function(eventView){
    if (eventView !== elementView){
      elementView.hideTools();
    }
  })
  // --- end of paper events -----
}


// adding tools to links
export function addLinkTools(link: joint.shapes.standard.Link) {
  let removeButton = new joint.linkTools.Remove();
  let toolsView = new joint.dia.ToolsView({
    tools: [removeButton]
  });
  let linkView = link.findView(paper);
  linkView.addTools(toolsView)
  //start with tools hidden
  linkView.hideTools();
    // ------ paper events -------
  paper.on("link:mouseenter", function(linkView) {
    linkView.showTools();
  });
  paper.on("link:mouseleave", function(linkView) {
    linkView.hideTools();
  });

  // --- end of paper events -----
}

export function addDependentPremiseTools(element: joint.shapes.app.DependentPremiseRect)  {
  // the first four buttons are the same buttons that Rects get
  // boundary tool shows boundaries of element
  let boundaryTool = new joint.elementTools.Boundary();
  //remove tool deletes a rect
  let removeButton = new joint.elementTools.Remove();
  // link button
  let linkButton = new joint.elementTools.LinkButton();
  // dependent premise button
  let combinePremiseButton = new joint.elementTools.CombinePremiseButton();
  //the edit button is specific to dependent premise
  let editDependentPremiseButton = new joint.elementTools.EditDependentPremiseButton();

  let toolsView = new joint.dia.ToolsView({
    tools: [boundaryTool, removeButton, linkButton, editDependentPremiseButton, combinePremiseButton]
  });

  //element view is in charge of rendering the elements on the paper
  let elementView = element.findView(paper);
  elementView.addTools(toolsView);
  //start with tools hidden
  elementView.hideTools();

  element.on("change:position", function () {
    paper.hideTools();
    elementView.showTools();
  })

  // ------ paper events -------
  paper.on("element:pointerclick", function(eventView){
    if (eventView !== elementView){
      elementView.hideTools();
    }
  });
  // --- end of paper events -----
}


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

paper.on("blank:pointerclick", function(evt) {
  paper.hideTools();
})