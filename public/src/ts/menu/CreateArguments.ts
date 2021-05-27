/* global Argument graph paper addRectTools color*/
import { color } from '../colors';
import { addRectTools } from '../tools/ManageTools';
import { graph, paper } from '../main'

//when new-argument-button is clicked
function createArgument() {
  //creating new rect (Joint.js object)
  let new_rect = new Argument({
    x: 100,
    y: 100,
    text: "Test argument",
    type: "argument",
    body_color: color.argument.bodyColor,
    text_color: color.argument.textColor, 
    stroke: color.argument.stroke,
    link_color: color.argument.linkColor,
    weight: "1.0"
  });
  //add new rect to the graph for displaying
  new_rect.rect.addTo(graph);
  //adds the buttons to each rect
  addRectTools(new_rect.rect);
  return new_rect;
  let elementView = new_rect.rect.findView(paper);
}

//when objection-button is clicked
function createObjection() {
  //creating new rect (Joint.js object)
  let new_rect = new Argument({
    x: 100,
    y: 100,
    text: "Test objection",
    type: "objection",
    body_color: color.objection.bodyColor,
    text_color: color.objection.textColor,
    stroke: color.objection.stroke, 
    link_color: color.objection.linkColor,
    weight: "-1.0"
  });
  new_rect.rect.addTo(graph);
  //adds the buttons to each rect
  addRectTools(new_rect.rect);
  return new_rect;
}
