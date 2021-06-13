/* global joint editModel */
const joint = window.joint;
import { editModel } from '../tools/EditButton.js';
import { combineText } from '../DependentPremise.js';
export function saveEdits() {
    let texts = $('[name^="model-text-"]').toArray();
    let text_wraps = texts.map((element) => joint.util.breakText(element.value, { width: 90 }));
    let num_lines = text_wraps.map(wrap => (wrap.match(/\n/g) || []).length);
    //magic numbers have to do with font size... ask Joe
    let heights = num_lines.map(lines => 16 + 13 * lines);
    if (editModel.attributes.type === "dependent-premise") {
        //save new text and adjust size on each model in dependent premise
        editModel.attributes.props.forEach((propObj, index) => {
            propObj.attrs.text.text = text_wraps[index];
            propObj.size.height = heights[index];
        });
        let max_height = Math.max(...heights);
        //the 36 is dependent on font-size!!
        let width = 36 + editModel.attributes.props.reduce((total, propObj) => total + propObj.size.width, 0);
        let combinedText = text_wraps.slice(1).reduce((total, current) => {
            return combineText(total, current);
        }, text_wraps[0]);
        editModel.attr('text/text', combinedText);
        editModel.resize(width, max_height);
        // console.log((height/16) - 1)
        console.log("new_text", editModel.attributes.attrs.text.text);
    }
    else {
        const objectionSwitch = document.getElementById("objection-switch");
        if (editModel.attributes.type === "claim" && objectionSwitch.checked) {
            editModel.attributes.type = "objection";
            editModel.attr("text/class", "objection-text");
            editModel.attr("rect/class", "objection-rect");
        }
        else if (editModel.attributes.type === "objection" && !objectionSwitch.checked) {
            editModel.attributes.type = "claim";
            editModel.attr("text/class", "claim-text");
            editModel.attr("rect/class", "claim-rect");
        }
        //just update the single model with the new text and size
        editModel.attr('text/text', text_wraps[0]);
        editModel.resize(editModel.attributes.size.width, heights[0]);
    }
    const saveButton = document.getElementById("save-edit-button");
    saveButton === null || saveButton === void 0 ? void 0 : saveButton.classList.remove("changed");
    const editContainer = $('#edit-container');
    editContainer.hide(200);
}
export function discardEdits() {
    const editContainer = $('#edit-container');
    editContainer.hide(200);
}
