import { graph } from "../graph.js";
const joint = window.joint;
joint.elementTools.ToggleSourceButton = joint.elementTools.Button.extend({
    name: "toggle-source-button",
    options: {
        markup: [{
                tagName: "circle",
                selector: "button",
                attributes: {
                    'r': 7,
                    'fill': "#2c6f99",
                    'cursor': "pointer"
                }
            }, {
                tagName: "g",
                selector: "g-tag",
                attributes: {
                    transform: "translate(-6, -6) scale(0.6 0.6)",
                },
                children: [{
                        tagName: 'path',
                        selector: 'icon',
                        attributes: {
                            //genuinely no idea what this is called but I used it to draw the arrow on the button
                            'd': "M14.999,8.543c0,0.229-0.188,0.417-0.416,0.417H5.417C5.187,8.959,5,8.772,5,8.543s0.188-0.417,0.417-0.417h9.167C14.812,8.126,14.999,8.314,14.999,8.543 M12.037,10.213H5.417C5.187,10.213,5,10.4,5,10.63c0,0.229,0.188,0.416,0.417,0.416h6.621c0.229,0,0.416-0.188,0.416-0.416C12.453,10.4,12.266,10.213,12.037,10.213 M14.583,6.046H5.417C5.187,6.046,5,6.233,5,6.463c0,0.229,0.188,0.417,0.417,0.417h9.167c0.229,0,0.416-0.188,0.416-0.417C14.999,6.233,14.812,6.046,14.583,6.046 M17.916,3.542v10c0,0.229-0.188,0.417-0.417,0.417H9.373l-2.829,2.796c-0.117,0.116-0.71,0.297-0.71-0.296v-2.5H2.5c-0.229,0-0.417-0.188-0.417-0.417v-10c0-0.229,0.188-0.417,0.417-0.417h15C17.729,3.126,17.916,3.313,17.916,3.542 M17.083,3.959H2.917v9.167H6.25c0.229,0,0.417,0.187,0.417,0.416v1.919l2.242-2.215c0.079-0.077,0.184-0.12,0.294-0.12h7.881V3.959z",
                            'fill': 'white',
                            'stroke': '#white',
                            'stroke-width': 1,
                            'pointer-events': 'none'
                        }
                    }],
            }],
        x: '100%',
        y: '50%',
        offset: {
            x: 0,
            y: 0,
        },
        rotate: true,
        //cast this context to any type, not sure what type it would be otherwise
        action: function () {
            let model = this.model;
            let cell = graph.getCell(model.id);
            toggleSources(cell);
        }
    }
});
export function toggleSources(element) {
    let embeds = element.getEmbeddedCells();
    if (embeds.length === 0) {
        //no sources
        return;
    }
    console.log(embeds[0].attr("./display"));
    if (embeds[0].attr("./display") !== "none") {
        //a source is visible, turn them all off
        for (const child of embeds) {
            child.attr("./display", "none");
        }
    }
    else {
        //one is not visisble, turn all on
        for (const child of embeds) {
            child.attr("./display", "visible");
        }
    }
    console.log("embeds", embeds);
}
