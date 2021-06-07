import { calcHeight } from "./util.js";
/* global joint */
const joint = window.joint;
const CustomRect = joint.shapes.standard.Rectangle.define("app.CustomRect", {
    markup: '<g class="rotatable"><g class="scalable"><rect/></g><text/></g>',
    attrs: {
        rect: { class: "argument-rect", width: 100, height: 100 },
        text: { class: "argument-text",
            "font-size": 12,
            "ref-x": 0.5,
            "ref-y": 0.5,
            ref: "rect",
            "y-alignment": "middle",
            "x-alignment": "middle",
        },
    },
    link_color: "black",
    weight: "1",
    type: "none",
});
// const CustomRect = joint.shapes.standard.Rectangle.define("app.CustomRect", {
//   // markup: '<g class="rotatable"><g class="scalable"><rect/></g><text/></g>',
//   attrs: {
//     body: {
//         class: "custom-rect",
//         rx: 10,
//         ry: 10,
//         fill: '#ffffff'
//       },
//     label: {
//       fontSize: 12
//     },
//   },
//   link_color: "black",
//   weight: "1",
//   type: "none",
// });
// //custom shape declaration
// joint.shapes.basic.customRect = joint.shapes.basic.Generic.extend({
// markup: '<g class="rotatable"><g class="scalable"><rect/></g><text/></g>',
//   defaults: joint.util.deepSupplement({
//     type: "basic.customRect",
//     attrs: {
//       rect: { fill: "white", stroke: "black", width: 100, height: 100 },
//       text: {
//         "font-size": 12,
//         "ref-x": 0.5,
//         "ref-y": 0.5,
//         ref: "rect",
//         "y-alignment": "middle",
//         "x-alignment": "middle",
//       },
//     },
//     // ADD CUSTOM ATTRIBUTES HERE
//     link_color: "black",
//     weight: "1",
//     type: "none",
//     // ---
//   }),
// });
Object.assign(joint.shapes, {
    app: {
        CustomRect,
    },
});
export class Argument {
    constructor(config) {
        // not used
        this.position = {
            x: config.x,
            y: config.y,
        };
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
        this.rect = new CustomRect({
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
                    // class: "arg",
                    fill: config.body_color,
                },
                text: {
                    text: text_wrap,
                    fill: config.text_color,
                },
            },
            // set custom attributes here:
            link_color: config.link_color,
            weight: config.weight,
            type: config.type,
        });
        console.log(this.rect);
    }
}
