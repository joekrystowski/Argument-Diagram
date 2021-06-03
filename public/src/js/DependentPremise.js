/* global joint */
const joint = window.joint;
//custom shape declaration for DependentPremise
const DependentPremiseRect = joint.shapes.standard.Rectangle.define("app.DependentPremise", {
    markup: '<g class="rotatable"><g class="scalable"><rect/></g><text/></g>',
    attrs: {
        rect: { fill: "white", stroke: "green", width: 100, height: 100 },
        text: {
            "font-size": 12,
            "ref-x": 0.5,
            "ref-y": 0.5,
            ref: "rect",
            "y-alignment": "middle",
            "x-alignment": "middle",
        },
    },
    // ADD CUSTOM ATTRIBUTES HERE
    link_color: "green",
    weight: "1",
    type: "dependent-premise",
    models: []
    // ---
});
Object.assign(joint.shapes, {
    app: {
        DependentPremiseRect,
    },
});
//class definition
export class DependentPremise {
    constructor(config) {
        let rect1 = config.rect1.clone();
        let rect2 = config.rect2.clone();
        let models = [];
        if (rect1.attributes.type === "dependent-premise") {
            models.push(...rect1.attributes.models);
        }
        else {
            models.push(rect1);
        }
        if (rect2.attributes.type === "dependent-premise") {
            models.push(...rect2.attributes.models);
        }
        else {
            models.push(rect2);
        }
        console.log("models", models);
        //set size
        let width = rect1.attributes.size.width + rect2.attributes.size.width;
        let height = Math.max(rect1.attributes.size.height, rect2.attributes.size.height);
        // set position (average position of two rects)
        let x = (rect1.attributes.position.x + rect2.attributes.position.x) / 2;
        let y = (rect1.attributes.position.y + rect2.attributes.position.y) / 2;
        //text wrap for both
        let text_wrap1 = rect1.attributes.attrs.text.text;
        let text_wrap2 = rect2.attributes.attrs.text.text;
        //generate new text string for display
        let combined_text = combineText(text_wrap1, text_wrap2);
        // define weight
        // Needs to be implemented, not sure how we want to do this
        //
        //custom rect configuration
        this.rect = new joint.shapes.app.DependentPremiseRect({
            position: {
                x: x,
                y: y,
            },
            size: {
                width: width + 36,
                height: height + 13,
            },
            attrs: {
                rect: {
                    filter: {
                        name: "highlight",
                        args: {
                            color: "green",
                            width: 5,
                            opacity: 0.4,
                            blur: 0,
                        },
                    },
                    fill: config.body_color,
                    stroke: config.stroke,
                },
                text: {
                    text: combined_text,
                    fill: config.text_color,
                },
            },
            // set custom attributes here:
            link_color: config.link_color,
            weight: config.weight,
            type: config.type,
            models: models
        });
        console.log(this.rect);
    }
}
export function combineText(text1, text2) {
    //create two arrays by splitting each string at \n
    let arr1 = text1.split("\n");
    let arr2 = text2.split("\n");
    let buffer = 3; // so that completely filled lines are not right next to each other
    let width1 = findLongestLength(arr1) + buffer;
    let width2 = findLongestLength(arr2) + buffer;
    let middle = Math.floor(arr1.length / 2);
    let ctr = 0;
    let output_str = "";
    while (ctr < arr1.length || ctr < arr2.length) {
        //determine if text exists on left and right side for this line
        let left = ctr < arr1.length; //returns true or false
        let right = ctr < arr2.length; // true or false
        //add left side if exists
        if (left) {
            //some text exists
            output_str += arr1[ctr];
        }
        if (ctr == middle) {
            // special case where add + in the middle of this line
            let left_difference = left ? width1 - arr1[ctr].length - 1 : width1 - 1;
            let left_spaces = " ".repeat(left_difference);
            output_str += left_spaces;
            output_str += "+";
            if (right) {
                //text exists on right
                let right_spaces = " ".repeat(width2 - arr2[ctr].length);
                output_str += right_spaces;
                output_str += arr2[ctr];
            }
        }
        else {
            // normal line
            if (right) {
                let difference = left
                    ? width1 + width2 - (arr1[ctr].length + arr2[ctr].length)
                    : width1 + width2 - arr2[ctr].length;
                let right_spaces = " ".repeat(difference);
                output_str += right_spaces;
                output_str += arr2[ctr];
            }
        }
        //end of line
        if (ctr + 1 < arr1.length || ctr + 1 < arr2.length) {
            output_str += "\n";
        }
        ctr++;
    }
    return output_str;
}
function findLongestLength(arr) {
    let longest = 0;
    arr.forEach((element) => {
        if (element.length > longest) {
            longest = element.length;
        }
    });
    return longest;
}
