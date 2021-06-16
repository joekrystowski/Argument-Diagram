import { graph } from "../graph.js";
import { addRectTools } from "./ManageTools.js";
import { Claim } from "../Claim.js";
import { color } from "../colors.js";
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
                    'stroke': '#FFFFFF',
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
            let spawn_pos = Object.assign({}, model.attributes.position);
            const spawn_padding = 10;
            model.attributes.props.forEach((propObj, index) => {
                const new_rect = new Claim({
                    x: spawn_pos.x,
                    y: spawn_pos.y,
                    text: propObj.attrs.text.text,
                    type: propObj.type,
                    body_color: color.claim.bodyColor,
                    text_color: color.claim.textColor,
                    stroke: color.claim.stroke,
                    link_color: color.claim.linkColor,
                    weight: "1.0"
                });
                new_rect.rect.addTo(graph);
                addRectTools(new_rect.rect);
                spawn_pos.x += propObj.size.width + spawn_padding;
            });
            //remove this dependent premise
            model.remove();
        }
    }
});
