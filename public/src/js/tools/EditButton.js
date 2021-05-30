/* global joint */
const joint = window.joint;
export let editModel;
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
        //change any to actual type
        action: function () {
            // FILL "edit-container" elements with current model values HERE
            // EDITTING these values when save button is clicked -> SaveEditsButton.js
            let editView = document.getElementById("edit-rect-container");
            editView.style.display = "flex";
            editModel = this.model;
            let modelText = document.getElementById("rect-model-text");
            modelText.value = editModel.attributes.attrs.text.text;
        }
    }
});
// (<any>Object).assign(joint.elementTools, {
//   app: {
//     EditButton,
//   }
// })
joint.elementTools.EditDependentPremiseButton = joint.elementTools.Button.extend({
    name: "edit-dependent-premise-button",
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
        action: function () {
            // make sure other edit windows are hidden
            document.getElementById("edit-rect-container").style.display = "none";
            // FILL "edit-container" elements with current model values HERE
            // EDITTING these values when save button is clicked -> SaveEditsButton.js
            let editView = document.getElementById("edit-DP-container");
            editView.style.display = "flex";
            editModel = this.model;
            //left text
            let leftText = document.getElementById("DP-model-left-text");
            leftText.value = editModel.attributes.model1.attributes.attrs.text.text;
            // right text
            let rightText = document.getElementById("DP-model-right-text");
            rightText.value = editModel.attributes.model2.attributes.attrs.text.text;
        }
    }
});
