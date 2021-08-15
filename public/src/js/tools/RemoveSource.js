import { graph } from "../graph.js";
const joint = window.joint;
joint.elementTools.RemoveSourceButton = joint.elementTools.Button.extend({
    name: "remove-source-button",
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
                    transform: "translate(-5.5, -5) scale(0.5 0.5)",
                },
                children: [{
                        tagName: 'path',
                        selector: 'icon',
                        attributes: {
                            //genuinely no idea what this is called but I used it to draw the arrow on the button
                            'd': "M11.469,10l7.08-7.08c0.406-0.406,0.406-1.064,0-1.469c-0.406-0.406-1.063-0.406-1.469,0L10,8.53l-7.081-7.08 c-0.406-0.406-1.064-0.406-1.469,0c-0.406,0.406-0.406,1.063,0,1.469L8.531,10L1.45,17.081c-0.406,0.406-0.406,1.064,0,1.469 c0.203,0.203,0.469,0.304,0.735,0.304c0.266,0,0.531-0.101,0.735-0.304L10,11.469l7.08,7.081c0.203,0.203,0.469,0.304,0.735,0.304 c0.267,0,0.532-0.101,0.735-0.304c0.406-0.406,0.406-1.064,0-1.469L11.469,10z",
                            'fill': 'white',
                            'stroke': '#white',
                            'stroke-width': 3,
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
            let parent = graph.getCell(model.get("parent"));
            model.remove();
            //adjust position of other models
            let embeds = parent.getEmbeddedCells();
            console.log("embeds", embeds);
            let x_offset = parent.attributes.size.width;
            for (let i = 0; i < embeds.length; i++) {
                let child = embeds[i];
                child.set("position", { x: parent.attributes.position.x + x_offset, y: parent.attributes.position.y });
                x_offset += child.attributes.size.width;
            }
        }
    }
});
