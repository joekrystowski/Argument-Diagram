import { calcHeight } from "./util.js";
/* global joint */
const joint = window.joint;
const ClaimRect = joint.shapes.standard.Rectangle.define("app.ClaimRect", {
    markup: '<g class="rotatable"><g class="scalable"><rect/></g><text/></g>',
    attrs: {
        rect: { class: "claim-rect", width: 100, height: 100 },
        text: { class: "claim-text",
            "font-size": 12,
            "ref-x": 0.5,
            "ref-y": 0.5,
            ref: "rect",
            "y-alignment": "middle",
            "x-alignment": "middle",
        },
    },
    link_color: "#222222",
    weight: "1",
    type: "none",
    inLegendForm: false,
    storedInfo: {}
});
Object.assign(joint.shapes, {
    app: {
        ClaimRect,
    },
});
export class Claim {
    constructor(config) {
        //creates a string of text, attempting to fit as many characters as possible
        //into a line of size width, before separating with newline character and repeating
        //90 is default width
        let text_wrap = joint.util.breakText(config.text, { width: 90 });
        // regular expression to find number of lines in text_wrap
        // searching for all instances (g-> global) of \n in text_wrap string
        // if none are found, instead of attempting to read .length of undefined,
        //an empty array of .length. 0 is returned.
        let count = (text_wrap.match(/\n/g) || []).length;
        console.log(count);
        //custom rect configuration
        this.rect = new ClaimRect({
            position: {
                x: config.x,
                y: config.y,
            },
            size: {
                width: 100,
                height: calcHeight(count),
            },
            attrs: {
                rect: {
                    class: config.type + "-rect",
                    fill: config.body_color,
                },
                text: {
                    class: config.type + "-text",
                    text: text_wrap,
                    fill: config.text_color,
                },
            },
            // set custom attributes here:
            link_color: config.link_color,
            weight: config.weight,
            type: config.type,
            inLegendForm: false,
            storedInfo: {
                initialText: text_wrap,
                size: {
                    width: 100,
                    height: calcHeight(count)
                }
            }
        });
        console.log(this.rect);
    }
    /**
     * Sets a specific (or all) values on the `Claim.rect.attributes.storedInfo` object.
     * @param {string} storageProp The property on the `Claim.rect.attributes.storedInfo` object you wish to set
     * @param {any} value The value to set in `Claim.rect.attributes.storedInfo[storageProp]`
     */
    store(storageProp, value) {
        if (arguments.length !== 0 && arguments.length !== 2) {
            throw new TypeError(`Claim.store expected 0 or 2 arguments. Got ${arguments.length}`);
        }
        //if a specific property is specified
        if (storageProp !== undefined && value !== undefined) {
            if (!this.rect.attributes.storedInfo.hasOwnProperty(storageProp)) {
                throw new ReferenceError(`Claim.storedInfo does not have property '${storageProp}'`);
            }
            this.rect.attributes.storedInfo[storageProp] = value;
        }
        //set default(all) properties
        else {
            this.rect.attributes.storedInfo.initialText = this.rect.attributes.attrs.text.text;
            //use Object.assign to make an actual copy of the object (not a reference)
            this.rect.attributes.storedInfo.size = Object.assign({}, this.rect.attributes.size);
            this.rect.attributes.storedInfo.rx = this.rect.attributes.attrs.rect.rx || 0;
        }
    }
    /**
     * Retrieves a specific item from `Claim.rect.attributes.storedInfo`
     * @param {string} storagePath  * The path to the property on the `Claim.rect.attributes.storedInfo` object you wish to recieve
     *                              * Separate nested properties with _/_ eg. `size/width`
     * @returns {any}
     */
    retrieveFromStorage(storagePath) {
        const path = storagePath.split('/');
        return path.reduce((accumulated, currentProp) => {
            return accumulated[currentProp];
        }, this.rect.attributes.storedInfo);
    }
    /**
     * Toggles the form of the claim. If it is in normal form, it will be converted to legend form,
     * and vice versa.
     * @param {number} legendNumber The number to display if the Claim were to be shown in legend form.
     */
    toggleLegendForm(legendNumber) {
        //convert from normal to legend form
        if (!this.rect.attributes.inLegendForm) {
            if (legendNumber === undefined) {
                throw new TypeError('legendNumber must be specified when converting a claim into legend form.');
            }
            this.store();
            //change attributes to legend form style
            this.rect.attr('text/text', legendNumber === null || legendNumber === void 0 ? void 0 : legendNumber.toString());
            this.rect.resize(50, 50);
            this.rect.attr('rect/rx', 50);
        }
        //convert from legend to normal form
        else {
            this.rect.attr('text/text', this.retrieveFromStorage('initialText'));
            const old_size = this.retrieveFromStorage('size');
            this.rect.resize(old_size.width, old_size.height);
            this.rect.attr('rect/rx', this.retrieveFromStorage('rx'));
        }
        //update form boolean
        this.rect.attributes.inLegendForm = !this.rect.attributes.inLegendForm;
    }
}
