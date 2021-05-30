/* global color joint createDependentPremise*/

let selected_premises = []
//custom link tool definition
joint.elementTools.CombinePremiseButton = joint.elementTools.Button.extend({
  name: "combine-premise-button",
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
        'stroke': '#FFFFFF',
        'stroke-width': 2,
        'pointer-events': 'none'
      }   
    }],
    x: '100%',
    y: '4',
    offset: {
      x: 0,
      y: 0,
    },
    rotate: true,
    action: function(evt) {
      // this is where the actual function of the button goes (onclick event basically)
      console.log('premise mode active')
      selected_premises.push(this.model);
      console.log(this.model.id);
      console.log("currently selected: " + selected_premises)
      if (selected_premises.length === 2) {
        console.log("length of 2")
        //check if two models are the same model
        if (selected_premises[0].id === selected_premises[1].id) {
          console.log("duplicate model detected")
          //duplicate
          selected_premises.pop();
        } else {
          //two elements ready for combining
          createDependentPremise(selected_premises[0], selected_premises[1]);
          console.log("dependent premise made")
          // remove original rects
          selected_premises[0].remove();
          selected_premises[1].remove();
          //empty array
          selected_premises = [];
        }
      }
    }  
  }
})