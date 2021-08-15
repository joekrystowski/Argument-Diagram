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
        'r': 10,
        'fill': "#222222",
        'cursor': "pointer"
      }
    }, {
      tagName: "g",
      selector: "g-tag",
      attributes: {
        transform: "translate(-12, -8.5) scale(0.8, 0.8)"
      },
      children: [{
      tagName: 'path',
      selector: 'icon',
      attributes: {
        //genuinely no idea what this is called but I used it to draw the arrow on the button
        'd': "M19.129,18.164l-4.518-4.52c1.152-1.373,1.852-3.143,1.852-5.077c0-4.361-3.535-7.896-7.896-7.896 c-4.361,0-7.896,3.535-7.896,7.896s3.535,7.896,7.896,7.896c1.934,0,3.705-0.698,5.078-1.853l4.52,4.519 c0.266,0.268,0.699,0.268,0.965,0C19.396,18.863,19.396,18.431,19.129,18.164z M8.567,15.028c-3.568,0-6.461-2.893-6.461-6.461 s2.893-6.461,6.461-6.461c3.568,0,6.46,2.893,6.46,6.461S12.135,15.028,8.567,15.028z",
        'fill': 'white',
        'stroke': 'white',
        'stroke-width': 1,
        'pointer-events': 'none'
      }
    }]   
    }],
    x: '0%',
    y: '0%',
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