/* global Argument DependentPremise graph paper addRectTools addDependentPremiseTools color*/
import { color } from '../colors.js';
import { addRectTools, addDependentPremiseTools } from '../tools/ManageTools.js';
import { graph, paper } from '../graph.js'
import { Argument } from '../Argument.js'
import { DependentPremise } from '../DependentPremise.js';

//when new-argument-button is clicked
export function createArgument(x:number, y:number) {
  //creating new rect (Joint.js object)
  const new_rect = new Argument({
    x: x,
    y: y,
    text: "Argument",
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
}

//when objection-button is clicked
export function createObjection(x:number, y:number) {
  //creating new rect (Joint.js object)
  const new_rect = new Argument({
    x: x,
    y: y,
    text: "Objection",
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

// When DependentPremise is made
export function createDependentPremise(rect1: joint.shapes.app.CustomRect, rect2: joint.shapes.app.CustomRect) {
  //creating new rect (Joint.js object)
  let new_dependent_premise = new DependentPremise({
    rect1: rect1,
    rect2: rect2,
    x: 100,
    y: 100,
    text: "A dependent premise",
    type: "dependent-premise",
    //colors
    body_color: color.dependentPremise.bodyColor,
    text_color: color.dependentPremise.textColor, 
    stroke: color.dependentPremise.stroke,
    link_color: color.dependentPremise.linkColor,
    weight: "1.0"
  });

  //add new rect to the graph for displaying
  new_dependent_premise.rect.addTo(graph);
  //adds the buttons to each rect
  addDependentPremiseTools(new_dependent_premise.rect);
  return new_dependent_premise;
}