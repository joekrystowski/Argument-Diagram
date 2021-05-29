"use strict";
/* global joint */
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
exports.EditButton = exports.editModel = void 0;
// custom edit tool definition
var EditButton = /** @class */ (function (_super) {
    __extends(EditButton, _super);
    function EditButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EditButton;
}(joint.elementTools.Button));
exports.EditButton = EditButton;
joint.elementTools.EditButton = joint.elementTools.Button.extend({
    name: "edit-button",
    options: {
        markup: [{
                tagName: "circle",
                selector: "button",
                attributes: {
                    'r': 7,
                    'fill': "#f2f2f2",
                    'cursor': "pointer",
                    'outline': 'black',
                }
            }, {
                tagName: 'path',
                selector: 'icon',
                attributes: {
                    //2.1 -1.9
                    //genuinely no idea what this is called but I used it to draw the arrow on the button
                    'd': "M -3 0.5 3 -2.7 M -1 2.5 4.5 -1.5 M 3 -3.5 4.5 -1.5 M 1.9 -2.7 2.6 0.25 M -3 0.5 -4 3 M -1 2.5 -4 3",
                    'fill': 'black',
                    'stroke': 'black',
                    'stroke-width': .5,
                    'pointer-events': 'none'
                }
            }],
        x: '100%',
        y: '0',
        offset: {
            x: 0,
            y: 0,
        },
        rotate: true,
        action: function (evt) {
            // FILL "edit-container" elements with current model values HERE
            // EDITTING these values when save button is clicked -> SaveEditsButton.js
            var editView = document.getElementById("edit-container");
            editView.style.display = "flex";
            exports.editModel = this.model;
            var modelText = document.getElementById("model-text");
            modelText.value = exports.editModel.attributes.attrs.text.text;
        }
    }
});
