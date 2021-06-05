import { Argument } from "../Argument";

/* global joint */
const joint = window.joint;

export let editModel: joint.shapes.app.CustomRect | joint.shapes.app.DependentPremiseRect;

// custom edit tool definition
declare module "jointjs" {
  namespace elementTools {
    class EditButton extends joint.elementTools.Button {

    }
    class EditDependentPremiseButton extends joint.elementTools.Button {

    }
  }
}

joint.elementTools.EditButton = joint.elementTools.Button.extend({
  name: "edit-button",
  options: {
    markup: [{
      tagName: "circle",
      selector: "button",
      attributes: {
        'r': 7,
        'fill': "#f2f2f2",
        'cursor': "pointer",
        'outline': 'black',
      }
    }, {
      tagName: 'path',
      selector: 'icon',
      attributes: {
        //2.1 -1.9
        //genuinely no idea what this is called but I used it to draw the arrow on the button
        'd': "M -3 0.5 3 -2.7 M -1 2.5 4.5 -1.5 M 3 -3.5 4.5 -1.5 M 1.9 -2.7 2.6 0.25 M -3 0.5 -4 3 M -1 2.5 -4 3",
        'fill': 'black',
        'stroke': 'black',
        'stroke-width': .5,
        'pointer-events': 'none'
      }   
    }],
    x: '100%',
    y: '0',
    offset: {
      x: 0,
      y: 0,
    },
    rotate: true,
    //change any to actual type
    action: function(this: any) {
      // FILL "edit-container" elements with current model values HERE
      // EDITTING these values when save button is clicked -> SaveEditsButton.js
      const editView = $('#edit-container');
      editView.show();

      editModel = this.model;

      const form = $('#edit-form');
      form.empty();

      form.append(`<label class="menu-text">Edit Argument Text:</label>`);
      form.append(`<textarea id="model-text-rect" name="model-text-rect" rows="8" cols="25">${editModel.attributes.attrs.text.text}</textarea>`);
      form.append('<br/>');
    }  
  }
});

// (<any>Object).assign(joint.elementTools, {
//   app: {
//     EditButton,
//   }
// })

joint.elementTools.EditDependentPremiseButton = joint.elementTools.Button.extend({
  name: "edit-dependent-premise-button",
  options: {
    markup: [{
      tagName: "circle",
      selector: "button",
      attributes: {
        'r': 7,
        'fill': "#f2f2f2",
        'cursor': "pointer",
        'outline': 'black',
      }
    }, {
      tagName: 'path',
      selector: 'icon',
      attributes: {
        //2.1 -1.9
        //genuinely no idea what this is called but I used it to draw the arrow on the button
        'd': "M -3 0.5 3 -2.7 M -1 2.5 4.5 -1.5 M 3 -3.5 4.5 -1.5 M 1.9 -2.7 2.6 0.25 M -3 0.5 -4 3 M -1 2.5 -4 3",
        'fill': 'black',
        'stroke': 'black',
        'stroke-width': .5,
        'pointer-events': 'none'
      }   
    }],
    x: '100%',
    y: '0',
    offset: {
      x: 0,
      y: 0,
    },
    rotate: true,
    action: function(this: any) {
      // FILL "edit-container" elements with current model values HERE
      // EDITTING these values when save button is clicked -> SaveEditsButton.js
      const editView = $('#edit-container');
      editView.show();
      
      editModel = this.model;

      console.log("editModel", editModel);

      const form = $('#edit-form');
      form.empty();

      editModel.attributes.props.forEach((propObj:any, index:number) => {
        form.append(`<label class="menu-text">Edit Argument ${index+1} Text:</label>`);
        form.append(`<textarea id="model-text-DP-${index}" name="model-text-DP-${index}" rows="8" cols="25">${propObj.attrs.text.text}</textarea>`);
        form.append('<br/>');
      });
    }  
  }
});