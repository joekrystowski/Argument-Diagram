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
            $('.single-claim').show();
            $('.edit-link').hide();
            objectionLabel.style.display = "none";
            switchLabel.style.display = "none";
            if (!$('#legend-info').hasClass('collapsed')) {
                $('#toggle-legend-info-button').trigger('click');
            }
            $('#edit-dialog').dialog('open');
            $('#model-text-container').empty();
            $('#model-text-container').append(`
      <div class="edit-item">
        <label for="model-text-rect" class="menu-text"></label>
        <textarea id="model-text-rect" name="model-text-rect" class="model-text-rect">${editModel.attributes.attrs.text.text}</textarea>
      </div>
      `);
            $('#model-validity-rect').val(parseFloat(editModel.attributes.validity));
            $('#model-validity-rect').on('input', function () {
                const value = parseFloat($(this).val());
                console.log('value', $(this).val());
                if (isNaN(value)) {
                    return;
                }
                const constrained = Math.max(0, Math.min(value, 1));
                $(this).val(constrained);
            });
            //TODO: remove loop and replace with object
            $("#model-validity-rect").each(function () {
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
joint.elementTools.EditDependentPremiseButton = joint.elementTools.Button.extend({
    name: "edit-dependent-premise-button",
    options: {
        markup: [{
                tagName: "circle",
                selector: "button",
                attributes: {
                    'r': 7,
                    'fill': "#222222",
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
            editModel = this.model;
            console.log("editModel", editModel);
            // const form = $('#edit-form');
            // form.empty();
            $('#edit-dialog').dialog('open');
            $('#model-text-container').empty();
            $('.single-claim').hide();
            $('.edit-link').hide();
            editModel.getEmbeddedCells().forEach((cell, index) => {
                $('#model-text-container').append(`
        <div class="edit-item">
          <label for="model-text-rect" class="menu-text">${index + 1}. </label>
          <textarea id="model-text-DP-${index}" name="model-text-DP-${index}" class="model-text-rect">${cell.attributes.attrs.text.text}</textarea>
        </div>`);
            });
            //TODO: remove loop and replace with objects
            //fix for dependent premises
            $("#model-validity-rect").each(function () {
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
            const objectionSwitch = document.getElementById("objection-switch");
            const objectionLabel = document.getElementById("objection-label");
            const switchLabel = document.getElementById("switch-label");
            $('.single-claim').show();
            objectionLabel.style.display = "revert";
            switchLabel.style.display = "revert";
            editModel = this.model;
            objectionSwitch.checked = editModel.attributes.type === "objection";
            console.log("editModel (link)", editModel);
            //TODO: re implement exit button
            // $('#edit-dialog')
            // .dialog({
            //   open: function(event, ui) {
            //       $('.ui-dialog-titlebar-close')
            //       .attr('id',"exit-edit-button")
            //       .addClass("menu-button exit-button")
            //       .html('<i class="fas fa-times"></i></i><span>Cancel</span>');
            //   }
            // })
            $('#edit-dialog').dialog('open');
            $('#model-text-container').empty();
            $('.single-claim').hide();
            $('.edit-link').show();
            $('#link-weight-rect').val(editModel.attributes.labels[0].attrs.text.text);
            $("#link-weight-rect").each(function () {
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
            // const form = $('#edit-form');
            // form.empty();
            // form.append(`<label for="link-weight-rect" class="menu-text">Link Weight</label>`)
            // form.append(`<input type="number" id="link-weight-rect" name="link-weight-rect" class="edit-number-form" min="0" max="1" step="0.1" value="${parseFloat(editModel.attributes.labels[0].attrs.text.text)}"></input>`)
            // form.append('<br/>')
        }
    }
});
