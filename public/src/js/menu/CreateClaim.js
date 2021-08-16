const joint = window.joint;
import { color } from '../colors.js';
import { addRectTools, addDependentPremiseTools } from '../tools/ManageTools.js';
import { graph, paper } from '../graph.js';
import { Claim } from '../Claim.js';
import { DependentPremise } from '../DependentPremise.js';
import { legend } from './Legend.js';
//when new-claim-button is clicked
export function createClaim(x, y, text, validity) {
    //creating new rect (Joint.js object)
    const new_rect = new Claim({
        x: x,
        y: y,
        text: text !== null && text !== void 0 ? text : "New Claim",
        type: "claim",
        body_color: "ffffff",
        text_color: "#222222",
        stroke: color.claim.dark.stroke,
        link_color: color.claim.dark.stroke,
        weight: "1.0",
        validity: validity !== null && validity !== void 0 ? validity : 0.5
    });
    //add new rect to the graph for displaying
    new_rect.rect.addTo(graph);
    //adds the buttons to each rect
    addRectTools(new_rect.rect);
    legend.add(new_rect);
    return new_rect;
}
//when objection-button is clicked
export function createObjection(x, y, text, validity) {
    //creating new rect (Joint.js object)
    const new_rect = new Claim({
        x: x,
        y: y,
        text: text !== null && text !== void 0 ? text : "New Objection",
        type: "objection",
        body_color: color.objection.dark.stroke,
        text_color: color.objection.dark.textColor,
        stroke: color.objection.dark.stroke,
        link_color: color.objection.dark.stroke,
        weight: "-1.0",
        validity: validity !== null && validity !== void 0 ? validity : 0.5
    });
    new_rect.rect.addTo(graph);
    //adds the buttons to each rect
    addRectTools(new_rect.rect);
    return new_rect;
}
// When DependentPremise is made
export function createDependentPremise(rect1, rect2) {
    //creating new rect (Joint.js object)
    //remove highlights from rect1 and rect2
    console.log("rect1", rect1);
    console.log("rect2", rect2);
    let modelView1 = rect1.findView(paper);
    joint.dia.HighlighterView.remove(modelView1, 'dp-highlight');
    let modelView2 = rect2.findView(paper);
    joint.dia.HighlighterView.remove(modelView2, 'dp-highlight');
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
    new_dependent_premise.rect.toBack();
    legend.refresh();
    return new_dependent_premise;
}
