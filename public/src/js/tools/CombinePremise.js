/* global color joint createDependentPremise*/
const joint = window.joint;
import { createDependentPremise } from '../menu/CreateClaim.js';
import { color } from '../colors.js';
import { paper } from '../graph.js';
export let selected_premises = [];
//custom link tool definition
joint.elementTools.CombinePremiseButton = joint.elementTools.Button.extend({
    name: "combine-premise-button",
    options: {
        markup: [{
                tagName: "circle",
                selector: "button",
                attributes: {
                    'r': 7,
                    'fill': color.dependentPremise.linkColor,
                    'cursor': "pointer"
                }
            }, {
                tagName: 'path',
                selector: 'icon',
                attributes: {
                    //genuinely no idea what this is called but I used it to draw the arrow on the button
                    'd': 'M -4 -1 0 4 M 0 4 4 -1 M 0 4 0 -4',
                    'fill': 'none',
                    'stroke': '#EEF0F2',
                    'stroke-width': 2,
                    'pointer-events': 'none'
                }
            }],
        x: '100%',
        y: '4',
        offset: {
            x: 0,
            y: 0,
        },
        rotate: true,
        action: function () {
            let elementView = this.model.findView(paper);
            // this is where the actual function of the button goes (onclick event basically)
            console.log('premise mode active');
            selected_premises.push(this.model);
            //add highlight
            joint.highlighters.mask.add(elementView, { selector: 'root' }, 'dp-highlight', {
                padding: 9,
                layer: "back",
                attrs: {
                    'stroke': '#66ff7d',
                    'stroke-opacity': 1,
                    'stroke-width': 3,
                }
            });
            if (selected_premises.length === 2) {
                //check if two models are the same model
                if (selected_premises[0].id !== selected_premises[1].id) {
                    //two elements ready for combining
                    createDependentPremise(selected_premises[0], selected_premises[1]);
                    console.log("dependent premise made");
                    // remove original rects
                    selected_premises[0].remove();
                    selected_premises[1].remove();
                }
                joint.dia.HighlighterView.remove(elementView, 'dp-highlight');
                //empty array
                selected_premises = [];
            }
        }
    }
});
