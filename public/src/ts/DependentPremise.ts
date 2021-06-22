/* global joint */
const joint = window.joint;

import { color } from "./colors.js"
import { paper } from "./graph.js";
import { addRectTools } from "./tools/ManageTools.js"

declare module "jointjs" {
  namespace shapes {
    namespace app {
      class DependentPremiseRect extends joint.shapes.basic.Generic {
        //custom shape declaration
      }
    }
  }
}
//custom shape declaration for DependentPremise
const DependentPremiseRect = joint.shapes.standard.Rectangle.define(
  "app.DependentPremise",
  {
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
    props: []
    // ---
  }
);

(<any>Object).assign(joint.shapes, {
  app: {
    DependentPremiseRect,
  },
});

interface DependentPremiseOptions {
  rect1: any,
  rect2: any,
  x: number,
  y: number,
  text: string,
  type: string,
  //colors
  body_color: string,
  text_color: string, 
  stroke: string,
  link_color: string,
  weight: string
}

//class definition
export class DependentPremise {
  rect: joint.shapes.app.DependentPremiseRect
  constructor(config: DependentPremiseOptions) {
    let rect1 = config.rect1
    let rect2 = config.rect2

    let models: Array<any> = [];
    if (rect1.attributes.type === "dependent-premise") {
      console.log("combining dependent premise!")
      let embeds = rect1.getEmbeddedCells()
      console.log(embeds)
      models.push(...embeds);
    }
    else {
      models.push(rect1);
    }
    if (rect2.attributes.type === "dependent-premise") {
      console.log("combining dependent premise!")
      let embeds = rect2.getEmbeddedCells();
      console.log(embeds)
      models.push(...embeds);
    }
    else {
      models.push(rect2);
    }

    console.log("models", models);

    //set size
    let width = rect1.attributes.size.width + rect2.attributes.size.width;
    let height = Math.max(rect1.attributes.size.height, rect2.attributes.size.height);
    // set position (average position of two rects)
    let x = rect1.attributes.position.x
    let y = rect1.attributes.position.y
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
        width: width + 36, // should be dependent on font size
        height: height + 13,
      },
      attrs: {
        rect: {
          fill: color.dependentPremise.bodyColor
        }

      },
      // set custom attributes here:
      link_color: config.link_color,
      weight: config.weight,
      type: config.type,
    });

    //align position of models
    let center = this.rect.attributes.position
    let current_x = center.x + 12//- (this.rect.attributes.size.width / 2);
    for (let i = 0; i < models.length; i++) {
      let cell = models[i]
      console.log(cell);
      cell.set('position', {
        x: current_x,// + (cell.attributes.size.width / 2),
        y: center.y + 6
      })
      current_x += cell.attributes.size.width + 12
    }

    if (rect1.attributes.type === "dependent-premise") {
      rect1.unembed(...rect1.getEmbeddedCells())
      rect1.remove();
    }
    if (rect2.attributes.type === "dependent-premise") {
      rect2.unembed(...rect2.getEmbeddedCells())
      rect2.remove();
    }
    
    //embed models
    for (let i = 0; i < models.length; i++) {
      this.rect.embed(models[i]);
      //disable user movement
      models[i].findView(paper).options.interactive = {
        elementMove: false
      }
      //update tools
      addRectTools(models[i]);
    }

    console.log("NEW DEPENDENT PREMISE", this.rect);

  }
}

// export function combineText(text1: string, text2: string) {
//   //create two arrays by splitting each string at \n
//   let arr1 = text1.split("\n");
//   let arr2 = text2.split("\n");

//   let buffer = 3; // so that completely filled lines are not right next to each other
//   let width1 = findLongestLength(arr1) + buffer;
//   let width2 = findLongestLength(arr2) + buffer;

//   let middle = Math.floor(arr1.length / 2);
//   let ctr = 0;
//   let output_str = "";
//   while (ctr < arr1.length || ctr < arr2.length) {
//     //determine if text exists on left and right side for this line
//     let left = ctr < arr1.length; //returns true or false
//     let right = ctr < arr2.length; // true or false
//     //add left side if exists
//     if (left) {
//       //some text exists
//       output_str += arr1[ctr];
//     }
//     if (ctr == middle) {
//       // special case where add + in the middle of this line
//       let left_difference = left ? width1 - arr1[ctr].length - 1 : width1 - 1;
//       let left_spaces = " ".repeat(left_difference);
//       output_str += left_spaces;
//       output_str += "+";
//       if (right) {
//         //text exists on right
//         let right_spaces = " ".repeat(width2 - arr2[ctr].length);
//         output_str += right_spaces;
//         output_str += arr2[ctr];
//       }
//     } else {
//       // normal line
//       if (right) {
//         let difference = left
//           ? width1 + width2 - (arr1[ctr].length + arr2[ctr].length)
//           : width1 + width2 - arr2[ctr].length;
//         let right_spaces = " ".repeat(difference);
//         output_str += right_spaces;
//         output_str += arr2[ctr];
//       }
//     }
//     //end of line
//     if (ctr + 1 < arr1.length || ctr + 1 < arr2.length) {
//       output_str += "\n";
//     }
//     ctr++;
//   }

//   return output_str;
// }

// function findLongestLength(arr: string[]) {
//   let longest = 0;
//   arr.forEach((element) => {
//     if (element.length > longest) {
//       longest = element.length;
//     }
//   });
//   return longest;
// }
