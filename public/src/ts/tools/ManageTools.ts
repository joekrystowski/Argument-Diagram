/* global joint paper */
import joint from 'jointjs'
import { paper } from '../main'
// import { LinkButton } from './LinkButton'

// adding tools (buttons) to rects
export function addRectTools(element) {
  // boundary tool shows boundaries of element
  let boundaryTool = new joint.elementTools.Boundary();
  //remove tool deletes a rect
  let removeButton = new joint.elementTools.Remove();
  // link button
  let linkButton = new joint.elementTools.LinkButton();
  //edit button
  let editButton = new joint.elementTools.EditButton();
  
  let toolsView = new joint.dia.ToolsView({
    tools: [boundaryTool, removeButton, linkButton, editButton]
  });

  //element view is in charge of rendering the elements on the paper
  let elementView = element.findView(paper);
  elementView.addTools(toolsView);
  //start with tools hidden
  elementView.hideTools();

  // ------ paper events -------
  paper.on("element:mouseenter", function(elementView) {
    elementView.showTools();
  });
  paper.on("element:mouseleave", function(elementView) {
    elementView.hideTools();
  });
  // --- end of paper events -----
}


// adding tools to links
export function addLinkTools(link) {
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