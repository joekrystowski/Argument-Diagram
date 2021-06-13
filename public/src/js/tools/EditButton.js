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
                    'fill': "#F5EE9E",
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
            const exitButton = document.getElementById("exit-edit-button");
            exitButton === null || exitButton === void 0 ? void 0 : exitButton.classList.remove("changed");
            const saveButton = document.getElementById("save-edit-button");
            saveButton === null || saveButton === void 0 ? void 0 : saveButton.classList.remove("changed");
            editModel = this.model;
            const objectionSwitch = document.getElementById("objection-switch");
            objectionSwitch.checked = editModel.attributes.type === "objection";
            const objectionLabel = document.getElementById("objection-label");
            const switchLabel = document.getElementById("switch-label");
            objectionLabel.style.visibility = "visible";
            switchLabel.style.visibility = "visible";
            const editView = $('#edit-container');
            editView.show(200);
            const form = $('#edit-form');
            form.empty();
            // form.append(`<label class="menu-text">Edit Claim Text</label>`);
            form.append(`<textarea id="model-text-rect" name="model-text-rect" class="model-text-rect">${editModel.attributes.attrs.text.text}</textarea>`);
            form.append('<br/>');
            //TODO: remove loop and replace with object
            $(".model-text-rect").each(function () {
                const elem = $(this);
                let val = elem.val();
                elem.data("oldVal", val);
                elem.on("propertychange change click keyup input paste", function () {
                    let newVal = elem.val();
                    if (elem.data("oldVal") != newVal) {
                        exitButton === null || exitButton === void 0 ? void 0 : exitButton.classList.add("changed");
                        saveButton === null || saveButton === void 0 ? void 0 : saveButton.classList.add("changed");
                    }
                    if (elem.data("oldVal") === newVal) {
                        exitButton === null || exitButton === void 0 ? void 0 : exitButton.classList.remove("changed");
                        saveButton === null || saveButton === void 0 ? void 0 : saveButton.classList.remove("changed");
                    }
                });
            });
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
                    'fill': "#F5EE9E",
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
            // FILL "edit-container" elements with current model values HERE
            // EDITTING these values when save button is clicked -> SaveEditsButton.js
            const exitButton = document.getElementById("exit-edit-button");
            exitButton === null || exitButton === void 0 ? void 0 : exitButton.classList.remove("changed");
            const saveButton = document.getElementById("save-edit-button");
            saveButton === null || saveButton === void 0 ? void 0 : saveButton.classList.remove("changed");
            const objectionLabel = document.getElementById("objection-label");
            const switchLabel = document.getElementById("switch-label");
            objectionLabel.style.visibility = "hidden";
            switchLabel.style.visibility = "hidden";
            const editView = $('#edit-container');
            editView.show(200);
            editModel = this.model;
            console.log("editModel", editModel);
            const form = $('#edit-form');
            form.empty();
            editModel.attributes.props.forEach((propObj, index) => {
                form.append(`<label class="menu-text">Edit Claim ${index + 1} Text</label>`);
                form.append(`<textarea id="model-text-DP-${index}" name="model-text-DP-${index}" class="model-text-rect">${propObj.attrs.text.text}</textarea>`);
                form.append('<br/>');
            });
            //TODO: remove loop and replace with objects
            //fix for dependent premises
            $(".model-text-rect").each(function () {
                const elem = $(this);
                let val = elem.val();
                elem.data("oldVal", val);
                elem.on("propertychange change click keyup input paste", function () {
                    let newVal = elem.val();
                    if (elem.data("oldVal") != newVal) {
                        exitButton === null || exitButton === void 0 ? void 0 : exitButton.classList.add("changed");
                        saveButton === null || saveButton === void 0 ? void 0 : saveButton.classList.add("changed");
                    }
                    if (elem.data("oldVal") === newVal) {
                        exitButton === null || exitButton === void 0 ? void 0 : exitButton.classList.remove("changed");
                        saveButton === null || saveButton === void 0 ? void 0 : saveButton.classList.remove("changed");
                    }
                });
            });
        }
    }
});
