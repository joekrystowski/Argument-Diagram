/* global color joint createDependentPremise*/
const joint = window.joint;
import { createDependentPremise } from '../menu/CreateClaim.js';
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
                    'r': 10,
                    'fill': "#222222",
                    'cursor': "pointer"
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
                            //genuinely no idea what this is called but I used it to draw the arrow on the button
                            'd': "M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10",
                            'fill': 'white',
                            'stroke': 'white',
                            'stroke-width': 1,
                            'pointer-events': 'none'
                        }
                    }],
            }],
        x: '0',
        y: '0',
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
                    //selected_premises[0].remove();
                    //selected_premises[1].remove();
                    //empty array
                    selected_premises = [];
                }
                joint.dia.HighlighterView.remove(elementView, 'dp-highlight');
                //empty array
                selected_premises = [];
            }
        }
    }
});
