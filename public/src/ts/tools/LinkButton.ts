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
      
      if (selected_links.length === 1) {
        if (selected_links[0].get('parent')) {
          selected_links = []
          throw new Error("Can not set dependent premise claim as link source");
        }
      }
 
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
        //check if two models are the same model
        if (isValidLink(selected_links[0], selected_links[1])) {
          createLink(selected_links[0], selected_links[1]);
        }
        joint.dia.HighlighterView.remove(elementView, 'link-highlight')
        selected_links = [];
      }
      return;
    }
  }
});

function isValidLink(source: joint.shapes.app.ClaimRect, target:joint.shapes.app.ClaimRect) {
  if(source.id === target.id) return false;
  let disallowed_ids:Array<string> = [<string>source.id];
  let path:Array<string> = [<string>source.id];
  // if(target.get('parent')) {
  //   disallowed_ids.push(target.get('parent'))
  // }
  if(isCircularArgument(graph.getCell(target.id), disallowed_ids, path)) return false;
  return true;
}

function isCircularArgument(current:joint.dia.Cell, disallowed_ids:Array<string>, path:Array<string>): boolean {
  disallowed_ids.push(current.get('id'));
  path.push(current.get('id'));
  if (current.get('embeds')) {
    disallowed_ids.push(...current.get('embeds'));
  }
  if (current.get('parent')) {
    disallowed_ids.push(current.get('parent'));
    current = graph.getCell(current.get('parent'));
  }
  console.log('current', current);
  console.log('disallowed_ids', disallowed_ids);
  console.log('------------------------------');
  const outLinks = graph.getConnectedLinks(current, {outbound: true});
  let found_circular = false;
  for (let outLink of outLinks) {
    if (disallowed_ids.includes(outLink.attributes.target.id)) {
      console.error(`Circular argument detected, path is: \n\t${path.join('\n\t')}\n>>> ${outLink.attributes.target.id}`);
      return true;
    }
    const outCell = graph.getCell(outLink.attributes.target.id);
    found_circular = isCircularArgument(outCell, disallowed_ids, path);
    console.log('outlink', outLink);
  }

  return found_circular;
}

//link two rects together
export function createLink(model1:joint.shapes.app.ClaimRect, model2:joint.shapes.app.ClaimRect) {
  console.log(model1.attributes.link_color);

  //prevent dp from linking to one of its children
  if (model2.get('parent') && graph.getCell(model2.get("parent")) === model1 ) {
    console.log("ERROR: Dependent premise can not link to one of its own embeded children")
    return;
  }

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
  console.log("link made")
  addLinkTools(link);

  //remove highlights from models
  let linkView1 = model1.findView(paper);
  joint.dia.HighlighterView.remove(linkView1, 'link-highlight')
  let linkView2 = model2.findView(paper);
  joint.dia.HighlighterView.remove(linkView2, 'link-highlight')
}