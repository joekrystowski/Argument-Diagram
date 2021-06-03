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
        editModel.attributes.models.forEach((model, index) => {
            model.attr('text/text', text_wraps[index]);
            model.resize(model.attributes.size.width, heights[index]);
            console.log(model.attributes.attrs.text.text);
        });
        let max_height = Math.max(...heights);
        //the 36 is dependent on font-size!!
        let width = 36 + editModel.attributes.models.reduce((total, model) => total + model.attributes.size.width, 0);
        let combinedText = text_wraps.slice(1).reduce((total, current) => {
            //skip first one
            return combineText(total, current);
        }, text_wraps[0]);
        //let combinedText = combineText(left_wrap, right_wrap);
        editModel.attr('text/text', combinedText);
        editModel.resize(width, max_height);
        // console.log((height/16) - 1)
        console.log("new_text", editModel.attributes.attrs.text.text);
    }
    else {
        //just update the single model with the new text and size
        editModel.attr('text/text', text_wraps[0]);
        editModel.resize(editModel.attributes.size.width, heights[0]);
    }
    const editContainer = $('#edit-container');
    editContainer.hide();
}
