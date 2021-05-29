"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLinkTools = exports.addRectTools = void 0;
/* global joint paper */
var jointjs_1 = __importDefault(require("jointjs"));
var main_1 = require("../main");
// adding tools (buttons) to rects
function addRectTools(element) {
    // boundary tool shows boundaries of element
    var boundaryTool = new jointjs_1.default.elementTools.Boundary();
    //remove tool deletes a rect
    var removeButton = new jointjs_1.default.elementTools.Remove();
    // link button
    var linkButton = new jointjs_1.default.elementTools.LinkButton();
    //edit button
    var editButton = new jointjs_1.default.elementTools.EditButton();
    var toolsView = new jointjs_1.default.dia.ToolsView({
        tools: [boundaryTool, removeButton, linkButton, editButton]
    });
    //element view is in charge of rendering the elements on the paper
    var elementView = element.findView(main_1.paper);
    elementView.addTools(toolsView);
    //start with tools hidden
    elementView.hideTools();
    // ------ paper events -------
    main_1.paper.on("element:mouseenter", function (elementView) {
        elementView.showTools();
    });
    main_1.paper.on("element:mouseleave", function (elementView) {
        elementView.hideTools();
    });
    // --- end of paper events -----
}
exports.addRectTools = addRectTools;
// adding tools to links
function addLinkTools(link) {
    var removeButton = new jointjs_1.default.linkTools.Remove();
    var toolsView = new jointjs_1.default.dia.ToolsView({
        tools: [removeButton]
    });
    var linkView = link.findView(main_1.paper);
    linkView.addTools(toolsView);
    //start with tools hidden
    linkView.hideTools();
    // ------ paper events -------
    main_1.paper.on("link:mouseenter", function (linkView) {
        linkView.showTools();
    });
    main_1.paper.on("link:mouseleave", function (linkView) {
        linkView.hideTools();
    });
    // --- end of paper events -----
}
exports.addLinkTools = addLinkTools;
