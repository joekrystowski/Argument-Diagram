/* global joint addLinkTools graph */
const joint = window.joint;

import { color } from '../colors.js';
import { graph } from '../graph.js';
import { addLinkTools } from './ManageTools.js';

let selected_links:joint.shapes.app.CustomRect[] = [];

declare module "jointjs" {
  namespace elementTools {
    class LinkButton extends joint.elementTools.Button {

    }
  }
}

joint.elementTools.LinkButton = joint.elementTools.Button.extend({
  name: "link-button",
  options: {
    markup: [{
      tagName: "circle",
      selector: "button",
      attributes: {
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
    y: '2',
    offset: {
      x: 0,
      y: 0,
    },
    rotate: true,
    action: function(this: any){
      // this is where the actual function of the button goes (onclick event basically)
      console.log('linking mode active')
      //linking mode active
      selected_links.push(this.model);
      console.log(this.model.id);
      console.log("currently selected: " + selected_links)
      if (selected_links.length === 2) {
        console.log("length of 2")
        //check if two models are the same model
        if (selected_links[0].id === selected_links[1].id) {
          console.log("duplicate model detected")
          //duplicate
          selected_links.pop();
        } else {
          //two elements ready for linking
          createLink(selected_links[0], selected_links[1]);
          console.log("link made")
          //empty array
          selected_links = [];
        }
      }
      return;
    }
  }
});
//custom link tool definition
// class LinkButton extends joint.elementTools.Button {
//   constructor() {
//     super({
//       markup: [{
//         tagName: "circle",
//         selector: "button",
//         attributes: {
//           'r': 7,
//           'fill': "#698cff",
//           'cursor': "pointer"
//         }
//       }, {
//         tagName: 'path',
//         selector: 'icon',
//         attributes: {
//           //genuinely no idea what this is called but I used it to draw the arrow on the button
//           'd': 'M -4 -1 0 4 M 0 4 4 -1 M 0 4 0 -4',
//           'fill': 'none',
//           'stroke': '#FFFFFF',
//           'stroke-width': 2,
//           'pointer-events': 'none'
//         }   
//       }],
//       x: '100%',
//       y: '2',
//       offset: {
//         x: 0,
//         y: 0,
//       },
//       rotate: true,
//       action: button_action
//     });
//   }
// }
//change any to actual type
// function button_action(this: any): joint.elementTools.Button.ActionCallback | undefined {
//   // this is where the actual function of the button goes (onclick event basically)
//   console.log('linking mode active')
//   //linking mode active
//   selected_links.push(this.model);
//   console.log(this.model.id);
//   console.log("currently selected: " + selected_links)
//   if (selected_links.length === 2) {
//     console.log("length of 2")
//     //check if two models are the same model
//     if (selected_links[0].id === selected_links[1].id) {
//       console.log("duplicate model detected")
//       //duplicate
//       selected_links.pop();
//     } else {
//       //two elements ready for linking
//       createLink(selected_links[0], selected_links[1]);
//       console.log("link made")
//       //empty array
//       selected_links = [];
//     }
//   }
//   return;
// }

// (<any>Object).assign(joint.elementTools, {
//   app: {
//     LinkButton,
//   }
// })

//link two rects together
function createLink(model1:joint.shapes.app.CustomRect, model2:joint.shapes.app.CustomRect) {
  console.log(model1.attributes.link_color);
  //passes in Argument objects
  let link = new joint.shapes.standard.Link();
  link.source(model1);
  link.target(model2);
  //link attributes based on arg1/rect1 (source)
  link.attr({
    line: {
      stroke: model1.attributes.link_color
    }
  });
  //link text (maybe implement weights later?) for now everything has weight of 1.0 and the weights themselves do nothing
  link.labels([
    {
      attrs: {
        text: {
          class: model1.attributes.type+"-link-text",
          text: model1.attributes.weight,
          stroke: color.textColor
        },
        rect: {
          class: model1.attributes.type+"-link-rect",
          fill: color.argument.textColor
        }
      }
    }
  ]);
  //link rects on graph
  console.log(link);
  link.addTo(graph);
  addLinkTools(link);
}