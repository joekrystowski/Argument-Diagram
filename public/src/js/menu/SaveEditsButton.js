"use strict";
/* global joint editModel */
Object.defineProperty(exports, "__esModule", { value: true });
var EditButton_1 = require("../tools/EditButton");
function saveEdits() {
    var editView = document.getElementById("edit-container");
    //---- Save Edits Here -----
    // note: doing something like
    // editModel.attributes.attrs.text.text = text_wrap will NOT update the attributes live on the Paper
    // Instead, you should use editModel.set() for most things
    // .set() takes two arguments
    var text = document.getElementById("model-text").value;
    var text_wrap = joint.util.breakText(text, { width: 90 });
    var count = (text_wrap.match(/\n/g) || []).length;
    var new_height = 16 + 13 * (count);
    EditButton_1.editModel.set('attrs', { text: { text: text_wrap } });
    EditButton_1.editModel.resize(EditButton_1.editModel.attributes.size.width, new_height);
    console.log(EditButton_1.editModel.attributes.attrs.text.text);
    //hide edit menu
    editView.style.display = "none";
}
