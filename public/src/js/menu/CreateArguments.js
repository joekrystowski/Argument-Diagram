"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* global Argument graph paper addRectTools color*/
var colors_1 = require("../colors");
var ManageTools_1 = require("../tools/ManageTools");
var main_1 = require("../main");
//when new-argument-button is clicked
function createArgument() {
    //creating new rect (Joint.js object)
    var new_rect = new Argument({
        x: 100,
        y: 100,
        text: "Test argument",
        type: "argument",
        body_color: colors_1.color.argument.bodyColor,
        text_color: colors_1.color.argument.textColor,
        stroke: colors_1.color.argument.stroke,
        link_color: colors_1.color.argument.linkColor,
        weight: "1.0"
    });
    //add new rect to the graph for displaying
    new_rect.rect.addTo(main_1.graph);
    //adds the buttons to each rect
    ManageTools_1.addRectTools(new_rect.rect);
    return new_rect;
    var elementView = new_rect.rect.findView(main_1.paper);
}
//when objection-button is clicked
function createObjection() {
    //creating new rect (Joint.js object)
    var new_rect = new Argument({
        x: 100,
        y: 100,
        text: "Test objection",
        type: "objection",
        body_color: colors_1.color.objection.bodyColor,
        text_color: colors_1.color.objection.textColor,
        stroke: colors_1.color.objection.stroke,
        link_color: colors_1.color.objection.linkColor,
        weight: "-1.0"
    });
    new_rect.rect.addTo(main_1.graph);
    //adds the buttons to each rect
    ManageTools_1.addRectTools(new_rect.rect);
    return new_rect;
}
