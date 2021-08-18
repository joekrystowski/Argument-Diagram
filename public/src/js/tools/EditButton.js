/* global joint */
const joint = window.joint;
export let editModel; //joint.shapes.app.ClaimRect | joint.shapes.app.DependentPremiseRect ;
joint.elementTools.EditButton = joint.elementTools.Button.extend({
    name: "edit-button",
    options: {
        markup: [{
                tagName: "circle",
                selector: "button",
                attributes: {
                    'r': 10,
                    'fill': "#222222",
                    "fill-opacity": 0,
                    'cursor': "pointer",
                }
            }, {
                tagName: "g",
                selector: "g-tag",
                attributes: {
                    transform: "translate(-10,-10)"
                },
                children: [{
                        tagName: 'path',
                        selector: 'icon',
                        attributes: {
                            //2.1 -1.9
                            //genuinely no idea what this is called but I used it to draw the arrow on the button
                            'd': "M18.303,4.742l-1.454-1.455c-0.171-0.171-0.475-0.171-0.646,0l-3.061,3.064H2.019c-0.251,0-0.457,0.205-0.457,0.456v9.578c0,0.251,0.206,0.456,0.457,0.456h13.683c0.252,0,0.457-0.205,0.457-0.456V7.533l2.144-2.146C18.481,5.208,18.483,4.917,18.303,4.742 M15.258,15.929H2.476V7.263h9.754L9.695,9.792c-0.057,0.057-0.101,0.13-0.119,0.212L9.18,11.36h-3.98c-0.251,0-0.457,0.205-0.457,0.456c0,0.253,0.205,0.456,0.457,0.456h4.336c0.023,0,0.899,0.02,1.498-0.127c0.312-0.077,0.55-0.137,0.55-0.137c0.08-0.018,0.155-0.059,0.212-0.118l3.463-3.443V15.929z M11.241,11.156l-1.078,0.267l0.267-1.076l6.097-6.091l0.808,0.808L11.241,11.156z",
                            'fill': 'white',
                            'stroke': 'white',
                            'stroke-width': 1,
                            'pointer-events': 'none'
                        }
                    }],
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
            objectionLabel.style.visibility = "hidden";
            switchLabel.style.visibility = "hidden";
            if (!$('#legend-info').hasClass('collapsed')) {
                $('#toggle-legend-info-button').trigger('click');
            }
            const editView = $('#edit-container');
            editView.show(200);
            const form = $('#edit-form');
            form.empty();
            form.append(`<label for="model-text-rect" class="menu-text">Claim Text</label>`);
            form.append(`<textarea id="model-text-rect" name="model-text-rect" class="model-text-rect">${editModel.attributes.attrs.text.text}</textarea>`);
            form.append('<br/>');
            form.append(`<label for="model-validity-rect" class="menu-text">Claim Validity</label>`);
            form.append(`<input type="number" id="model-validity-rect" name="model-validity-rect" class="edit-number-form" min="0" max="1" step="0.1" value="${parseFloat(editModel.attributes.validity)}"></input>`);
            form.append('<br/>');
            $('#model-validity-rect').on('input', function () {
                const value = parseFloat($(this).val());
                if (isNaN(value)) {
                    return;
                }
                const constrained = Math.max(0, Math.min(value, 1));
                $(this).val(constrained);
            });
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
                    'fill': "#222222",
                    "fill-opacity": 0,
                    'cursor': "pointer",
                    'outline': 'black',
                }
            }, {
                tagName: "g",
                selector: "g-tag",
                attributes: {
                    transform: "translate(-10,-10)"
                },
                children: [{
                        tagName: 'path',
                        selector: 'icon',
                        attributes: {
                            //2.1 -1.9
                            //genuinely no idea what this is called but I used it to draw the arrow on the button
                            'd': "M18.303,4.742l-1.454-1.455c-0.171-0.171-0.475-0.171-0.646,0l-3.061,3.064H2.019c-0.251,0-0.457,0.205-0.457,0.456v9.578c0,0.251,0.206,0.456,0.457,0.456h13.683c0.252,0,0.457-0.205,0.457-0.456V7.533l2.144-2.146C18.481,5.208,18.483,4.917,18.303,4.742 M15.258,15.929H2.476V7.263h9.754L9.695,9.792c-0.057,0.057-0.101,0.13-0.119,0.212L9.18,11.36h-3.98c-0.251,0-0.457,0.205-0.457,0.456c0,0.253,0.205,0.456,0.457,0.456h4.336c0.023,0,0.899,0.02,1.498-0.127c0.312-0.077,0.55-0.137,0.55-0.137c0.08-0.018,0.155-0.059,0.212-0.118l3.463-3.443V15.929z M11.241,11.156l-1.078,0.267l0.267-1.076l6.097-6.091l0.808,0.808L11.241,11.156z",
                            'fill': 'white',
                            'stroke': 'white',
                            'stroke-width': 1,
                            'pointer-events': 'none'
                        }
                    }],
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
            editModel.getEmbeddedCells().forEach((cell, index) => {
                form.append(`<label class="menu-text">Edit Claim ${index + 1} Text</label>`);
                form.append(`<textarea id="model-text-DP-${index}" name="model-text-DP-${index}" class="model-text-rect">${cell.attributes.attrs.text.text}</textarea>`);
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
joint.linkTools.EditLinkButton = joint.elementTools.Button.extend({
    name: "edit-dependent-premise-button",
    options: {
        markup: [{
                tagName: "circle",
                selector: "button",
                attributes: {
                    'r': 10,
                    'fill': "#222222",
                    'cursor': "pointer",
                }
            }, {
                tagName: "g",
                selector: "g-tag",
                attributes: {
                    transform: "translate(-10,-10)"
                },
                children: [{
                        tagName: 'path',
                        selector: 'icon',
                        attributes: {
                            //2.1 -1.9
                            //genuinely no idea what this is called but I used it to draw the arrow on the button
                            'd': "M18.303,4.742l-1.454-1.455c-0.171-0.171-0.475-0.171-0.646,0l-3.061,3.064H2.019c-0.251,0-0.457,0.205-0.457,0.456v9.578c0,0.251,0.206,0.456,0.457,0.456h13.683c0.252,0,0.457-0.205,0.457-0.456V7.533l2.144-2.146C18.481,5.208,18.483,4.917,18.303,4.742 M15.258,15.929H2.476V7.263h9.754L9.695,9.792c-0.057,0.057-0.101,0.13-0.119,0.212L9.18,11.36h-3.98c-0.251,0-0.457,0.205-0.457,0.456c0,0.253,0.205,0.456,0.457,0.456h4.336c0.023,0,0.899,0.02,1.498-0.127c0.312-0.077,0.55-0.137,0.55-0.137c0.08-0.018,0.155-0.059,0.212-0.118l3.463-3.443V15.929z M11.241,11.156l-1.078,0.267l0.267-1.076l6.097-6.091l0.808,0.808L11.241,11.156z",
                            'fill': 'white',
                            'stroke': 'white',
                            'stroke-width': 1,
                            'pointer-events': 'none'
                        }
                    }],
            }],
        distance: "75%",
        offset: 0,
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
            objectionLabel.style.visibility = "visible";
            switchLabel.style.visibility = "visible";
            const editView = $('#edit-container');
            editView.show(200);
            editModel = this.model;
            console.log("editModel (link)", editModel);
            const form = $('#edit-form');
            form.empty();
            form.append(`<label for="link-weight-rect" class="menu-text">Link Weight</label>`);
            form.append(`<input type="number" id="link-weight-rect" name="link-weight-rect" class="edit-number-form" min="0" max="1" step="0.1" value="${parseFloat(editModel.attributes.labels[0].attrs.text.text)}"></input>`);
            form.append('<br/>');
            //     //TODO: remove loop and replace with objects
            //     //fix for dependent premises
            //     $(".model-text-rect").each(function () {
            //       const elem = $(this);
            //       let val = elem.val() as string;
            //       elem.data("oldVal", val);
            //       elem.on("propertychange change click keyup input paste", function () {
            //         let newVal = elem.val();
            //         if (elem.data("oldVal") != newVal) {
            //           exitButton?.classList.add("changed");
            //           saveButton?.classList.add("changed");
            //         }
            //         if (elem.data("oldVal") === newVal) {
            //           exitButton?.classList.remove("changed");
            //           saveButton?.classList.remove("changed");
            //         }
            //       });
            //     });
        }
    }
});
