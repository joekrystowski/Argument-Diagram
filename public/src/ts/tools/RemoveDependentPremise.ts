import { elementTools } from "jointjs"
import { graph } from "../graph.js"
import { addRectTools, addDependentPremiseTools } from "./ManageTools.js"

const joint = window.joint

declare module "jointjs" {
    namespace elementTools {
        class RemoveDependentPreimseButton extends joint.elementTools.Button {

        }
    }
}

joint.elementTools.RemoveDependentPreimseButton = joint.elementTools.Button.extend({
    name: "remove-dependent-premise-button",
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
        tagName: 'path',
        selector: 'icon',
        attributes: {
          //genuinely no idea what this is called but I used it to draw the arrow on the button
          'd': 'M -4 -1 0 4 M 0 4 4 -1 M 0 4 0 -4',
          'fill': 'none',
          'stroke': '#FFFFFF',
          'stroke-width': 2,
          'pointer-events': 'none'
        }   
      }],
      x: '0%',
      y: '0',
      offset: {
        x: 0,
        y: 0,
      },
      rotate: true,
      action: function (this:any) {
        let model = this.model;
        console.log("dependent-premise-removed")
        // add component models
        let model1 = model.attributes.model1;
        let model2 = model.attributes.model2;
        model1.addTo(graph);
        model2.addTo(graph);
        console.log(model1)
        console.log(model2)
        if (model1.attributes.type === "argument" || model1.attributes.type === "objection") {
            addRectTools(model1);
        } else {
            addDependentPremiseTools(model1);
        }
        if (model2.attributes.type === "argument" || model2.attributes.type === "objection") {
           addRectTools(model2);
        } else {
            addDependentPremiseTools(model2);
        }
        //remove this dependent premise
        model.remove();
      }
    }
});