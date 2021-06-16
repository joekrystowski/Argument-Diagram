/* global joint addLinkTools graph */
const joint = window.joint;

import { color } from '../colors.js';
import { graph, paper } from '../graph.js';
import { addLinkTools } from './ManageTools.js';

export let selected_links:joint.shapes.app.ClaimRect[] = [];

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
      let elementView = this.model.findView(paper);
      // this is where the actual function of the button goes (onclick event basically)
      console.log('linking mode active')
      //linking mode active
      selected_links.push(this.model);
      console.log(this.model.id);
      console.log("currently selected: " + selected_links)
      //add highlight
      joint.highlighters.mask.add(elementView, { selector: 'root' }, 'link-highlight', {
        padding: 5,
        layer: "back",

        attrs: {
            'stroke': '#6696ff',
            'stroke-opacity': 1,
            'stroke-width': 3,
        }
      });

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

//link two rects together
export function createLink(model1:joint.shapes.app.ClaimRect, model2:joint.shapes.app.ClaimRect) {
  console.log(model1.attributes.link_color);
  //passes in Claim objects
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
          fill: color.claim.textColor
        }
      }
    }
  ]);
  //link rects on graph
  console.log(link);
  link.addTo(graph);
  addLinkTools(link);

  //remove highlights from models
  let linkView1 = model1.findView(paper);
  joint.dia.HighlighterView.remove(linkView1, 'link-highlight')
  let linkView2 = model2.findView(paper);
  joint.dia.HighlighterView.remove(linkView2, 'link-highlight')
}