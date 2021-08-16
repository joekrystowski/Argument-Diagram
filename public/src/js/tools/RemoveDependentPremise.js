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
                tagName: 'path',
                selector: 'icon',
                attributes: {
                    //genuinely no idea what this is called but I used it to draw the arrow on the button
                    'd': 'M -4 -1 0 4 M 0 4 4 -1 M 0 4 0 -4',
                    'fill': 'none',
                    'stroke': '#FFFFFFff',
                    'stroke-width': 2,
                    'pointer-events': 'none'
                }
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
