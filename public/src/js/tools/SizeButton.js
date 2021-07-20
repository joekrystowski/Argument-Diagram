const joint = window.joint;
import { paper } from "../graph.js";
joint.elementTools.SizeButton = joint.elementTools.Button.extend({
    name: "size-button",
    options: {
        markup: [{
                tagName: "circle",
                selector: "button",
                attributes: {
                    "onclick": function () {
                        console.log('lf vlj vlgj lrjgvjrgvjtrgv ktgj vkrtgj vktgv ktg vknc');
                    },
                    'r': 7,
                    'fill': "#3B8EA5",
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
        y: '100%',
        offset: {
            x: 0,
            y: 0,
        },
        rotate: true,
        action: function () {
            let elementView = this.model.findView(paper);
        }
    }
});
let start_pos = {
    x: 0,
    y: 0
};
export function func() {
}
