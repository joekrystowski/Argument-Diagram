/* global joint paper */
const joint = window.joint;
import { paper } from '../graph.js';
export function refreshTools(element) {
    const view = element.findView(paper);
    view.hideTools();
    addRectTools(element);
}
// adding tools (buttons) to rects
export function addRectTools(element) {
    //element view is in charge of rendering the elements on the paper
    let elementView = element.findView(paper);
    //clear any old tools
    elementView.removeTools();
    // boundary tool shows boundaries of element
    let boundaryTool = new joint.elementTools.Boundary();
    //remove tool deletes a rect
    let removeButton = new joint.elementTools.Remove({
        x: "5%",
        y: "0%",
        offset: {
            x: 0,
            y: -15
        }
    });
    // link button
    let linkButton = new joint.elementTools.LinkButton({
        x: "23%",
        y: "0%",
        offset: {
            x: 0,
            y: -15
        }
    });
    //edit button
    let editButton = new joint.elementTools.EditButton({
        x: "59%",
        y: "0%",
        offset: {
            x: 0,
            y: -15
        }
    });
    let addSourceButton = new joint.elementTools.AddSourceButton({
        x: "77%",
        y: "0%",
        offset: {
            x: 0,
            y: -15
        }
    });
    let removeSourceButton = new joint.elementTools.RemoveSourceButton({
        x: "20%",
        y: "0%",
        offset: {
            x: 0,
            y: -15
        }
    });
    let toggleSourceButton = new joint.elementTools.ToggleSourceButton({
        x: "95%",
        y: "0%",
        offset: {
            x: 0,
            y: -15
        }
    });
    let combinedPremiseButton = new joint.elementTools.CombinePremiseButton({
        x: "41%",
        y: "0%",
        offset: {
            x: 0,
            y: -15
        }
    });
    let rect_tools;
    if (element.get('parent')) {
        //inside dependent premise
        rect_tools = [linkButton, toggleSourceButton, addSourceButton];
    }
    else if (element.attributes.inLegendForm) {
        rect_tools = [removeButton, linkButton, combinedPremiseButton, addSourceButton];
    }
    else if (element.attributes.type === "source") {
        rect_tools = [removeSourceButton, editButton];
    }
    else {
        //regular claim (not in dependent premise)
        rect_tools = [removeButton, linkButton, editButton, combinedPremiseButton, addSourceButton, toggleSourceButton];
    }
    let toolsView = new joint.dia.ToolsView({
        tools: rect_tools
    });
    elementView.addTools(toolsView);
    //start with tools hidden
    elementView.hideTools();
    element.on("change:position", function (eventView) {
        element.toFront();
    });
    // deselects elements that were not clicked on.
    paper.on("element:pointerclick", function (eventView) {
        if (eventView !== elementView) {
            elementView.hideTools();
        }
    });
    // --- end of paper events -----
}
// adding tools to links
export function addLinkTools(link) {
    let removeButton = new joint.linkTools.Remove();
    let editLinkButton = new joint.linkTools.EditLinkButton();
    let toolsView = new joint.dia.ToolsView({
        tools: [removeButton, editLinkButton]
    });
    let linkView = link.findView(paper);
    linkView.addTools(toolsView);
    //start with tools hidden
    linkView.hideTools();
    // ------ paper events -------
    paper.on("link:pointerclick", function (linkView) {
        linkView.showTools();
    });
    paper.on("link:pointerdblclick", function (linkView) {
        linkView.hideTools();
    });
    // --- end of paper events -----
}
export function addDependentPremiseTools(element) {
    // the first four buttons are the same buttons that Rects get
    // boundary tool shows boundaries of element
    let boundaryTool = new joint.elementTools.Boundary();
    //remove tool deletes a rect
    let removeDependentPremiseButton = new joint.elementTools.RemoveDependentPreimseButton({
        x: "20%",
        y: "0%",
        offset: {
            x: 0,
            y: -15
        }
    });
    // link button
    let linkButton = new joint.elementTools.LinkButton({
        x: "40%",
        y: "0%",
        offset: {
            x: 0,
            y: -15
        }
    });
    // dependent premise button
    let combinePremiseButton = new joint.elementTools.CombinePremiseButton({
        x: "80%",
        y: "0%",
        offset: {
            x: 0,
            y: -15
        }
    });
    //the edit button is specific to dependent premise
    let editDependentPremiseButton = new joint.elementTools.EditDependentPremiseButton({
        x: "60%",
        y: "0%",
        offset: {
            x: 0,
            y: -15
        }
    });
    let toolsView = new joint.dia.ToolsView({
        tools: [removeDependentPremiseButton, linkButton, editDependentPremiseButton, combinePremiseButton]
    });
    //element view is in charge of rendering the elements on the paper
    let elementView = element.findView(paper);
    elementView.addTools(toolsView);
    //start with tools hidden
    elementView.hideTools();
    element.on("change:position", function (eventView) {
        element.toFront();
    });
    // ------ paper events -------
    paper.on("element:pointerclick", function (eventView) {
        if (eventView !== elementView) {
            elementView.hideTools();
        }
    });
    // --- end of paper events -----
}
paper.on("element:pointerclick", function (eventView) {
    if (eventView._toolsView.tools.length <= 0) {
        console.log("What is this? an element with no tools?");
        console.log("Well that is quite strange.");
        return;
    }
    if (eventView._toolsView.tools[0].isVisible() == true) {
        //console.log("UnClicked=>Hiding!");
        eventView.hideTools();
    }
    else {
        //console.log("Clicked=>Showing!");
        eventView.showTools();
    }
});
paper.on("blank:pointerclick", function (evt) {
    paper.hideTools();
});
