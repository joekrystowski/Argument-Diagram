import { paper } from "../graph.js";
import { addRectTools } from "./ManageTools.js";
const joint = window.joint;
joint.elementTools.RemoveDependentPreimseButton = joint.elementTools.Button.extend({
    name: "remove-dependent-premise-button",
    options: {
        markup: [{
                tagName: "circle",
                selector: "button",
                attributes: {
                    'r': 7,
                    'fill': "red",
                    'cursor': "pointer"
                }
            }, {
                tagName: "g",
                selector: "g-tag",
                attributes: {
                    transform: "translate(-4.25, -4) scale(0.4, 0.4)",
                },
                children: [{
                        tagName: 'path',
                        selector: 'icon',
                        attributes: {
                            //genuinely no idea what this is called but I used it to draw the arrow on the button
                            'd': "M11.469,10l7.08-7.08c0.406-0.406,0.406-1.064,0-1.469c-0.406-0.406-1.063-0.406-1.469,0L10,8.53l-7.081-7.08 c-0.406-0.406-1.064-0.406-1.469,0c-0.406,0.406-0.406,1.063,0,1.469L8.531,10L1.45,17.081c-0.406,0.406-0.406,1.064,0,1.469 c0.203,0.203,0.469,0.304,0.735,0.304c0.266,0,0.531-0.101,0.735-0.304L10,11.469l7.08,7.081c0.203,0.203,0.469,0.304,0.735,0.304 c0.267,0,0.532-0.101,0.735-0.304c0.406-0.406,0.406-1.064,0-1.469L11.469,10z",
                            'fill': 'white',
                            'stroke': 'white',
                            'stroke-width': 2,
                            'pointer-events': 'none'
                        }
                    }],
            }],
        x: '0%',
        y: '0',
        offset: {
            x: 0,
            y: 0,
        },
        rotate: true,
        //cast this context to any type, not sure what type it would be otherwise
        action: function () {
            let model = this.model;
            let embeds = model.getEmbeddedCells();
            for (let i = 0; i < embeds.length; i++) {
                model.unembed(embeds[i]);
                //re-enable drag
                embeds[i].findView(paper).options.interactive = { elementMove: true };
                //update tools
                addRectTools(embeds[i]);
            }
            //remove this dependent premise
            model.remove();
        }
    }
});
