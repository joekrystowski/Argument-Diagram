"use strict";
/* global joint addLinkTools graph */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkButton = void 0;
var main_1 = require("../main");
var ManageTools_1 = require("./ManageTools");
// let selected:  = [] //add type?
//custom link tool definition
var LinkButton = /** @class */ (function (_super) {
    __extends(LinkButton, _super);
    function LinkButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LinkButton;
}(joint.elementTools.Button));
exports.LinkButton = LinkButton;
joint.elementTools.LinkButton = joint.elementTools.Button.extend({
    name: "link-button",
    options: {
        markup: [{
                tagName: "circle",
                selector: "button",
                attributes: {
                    'r': 7,
                    'fill': "#698cff",
                    'cursor': "pointer"
                }
            }, {
                tagName: 'path',
                selector: 'icon',
                attributes: {
                    //genuinely no idea what this is called but I used it to draw the arrow on the button
                    'd': 'M -4 -1 0 4 M 0 4 4 -1 M 0 4 0 -4',
                    'fill': 'none',
                    'stroke': '#FFFFFF',
                    'stroke-width': 2,
                    'pointer-events': 'none'
                }
            }],
        x: '100%',
        y: '2',
        offset: {
            x: 0,
            y: 0,
        },
        rotate: true,
        action: function (evt) {
            // this is where the actual function of the button goes (onclick event basically)
            console.log('linking mode active');
            //linking mode active
            selected.push(this.model);
            console.log(this.model.id);
            console.log("currently selected: " + selected);
            if (selected.length === 2) {
                console.log("length of 2");
                //check if two models are the same model
                if (selected[0].id === selected[1].id) {
                    console.log("duplicate model detected");
                    //duplicate
                    selected.pop();
                }
                else {
                    //two elements ready for linking
                    createLink(selected[0], selected[1]);
                    console.log("link made");
                    //empty array
                    selected = [];
                }
            }
        }
    }
});
//link two rects together
function createLink(model1, model2) {
    console.log(model1.attributes.link_color);
    //passes in Argument objects
    var link = new joint.shapes.standard.Link();
    link.source(model1);
    link.target(model2);
    //link attributes based on arg1/rect1 (source)
    link.attr({
        line: {
            stroke: model1.attributes.link_color
        }
    });
    //link text (maybe implement weights later?) for now everything has weight of 1.0 and the weights themselves do nothing
    link.labels([
        {
            attrs: {
                text: {
                    text: model1.attributes.weight,
                    stroke: model1.attributes.link_color
                }
            }
        }
    ]);
    //link rects on graph
    console.log(link);
    link.addTo(main_1.graph);
    ManageTools_1.addLinkTools(link);
}
