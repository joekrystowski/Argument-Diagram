const joint = window.joint;

import { addSource } from '../Sources.js'
import { color } from '../colors.js';
import { paper } from '../graph.js'

declare module "jointjs" {
  namespace elementTools {
    class AddSourceButton extends joint.elementTools.Button {

    }
  }
}

//custom link tool definition
joint.elementTools.AddSourceButton = joint.elementTools.Button.extend({
  name: "add-source-button",
  options: {
    markup: [{
      tagName: "circle",
      selector: "button",
      attributes: {
        'r': 7,
        'fill': color.dependentPremise.linkColor,
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
    x: '150%',
    y: '4',
    offset: {
      x: 0,
      y: 0,
    },
    rotate: true,
    action: function(this: any) {
        let elementView = this.model.findView(paper);
        // this is where the actual function of the button goes (onclick event basically)
        console.log("adding source")

        console.log(elementView)

        let cell = elementView.model

        addSource(cell)
    
      
      
    }  
  }
})