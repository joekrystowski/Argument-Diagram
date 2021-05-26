/* global joint */

//custom shape declaration
joint.shapes.basic.customRect = joint.shapes.basic.Generic.extend({
  
  markup: '<g class="rotatable"><g class="scalable"><rect/></g><text/></g>',
  
  defaults: joint.util.deepSupplement({
    type: 'basic.customRect',
    attrs: {
      'rect': {'fill':'white', 'stroke':'black', width:100, height: 100},
      'text': { 'font-size':12, 'ref-x':.5, 'ref-y':.5, ref:'rect', 'y-alignment':'middle', 'x-alignment':'middle'}
    },
    // ADD CUSTOM ATTRIBUTES HERE
    link_color: 'black',
    weight: "1",
    type: "none",
    // ---
  })
})



class Argument {
  constructor(config) {
    // not used
    this.position = {
      x: config.x,
      y: config.y
    }
  //creates a string of text, attempting to fit as many characters as possible 
  //into a line of size width, before separating with newline character and repeating
  let text_wrap = joint.util.breakText(" a lot of text a lot of text a lot of text a lot of text a lot of text a lot of text a lot of text", {width: 90})
  // regular expression to find number of lines in text_wrap
  // searching for all instances (g-> global) of \n in text_wrap string
  // if none are found, instead of attempting to read .length of undefined,
  //an empty array of .length. 0 is returned.
  let count = (text_wrap.match(/\n/g) || []).length;
  console.log(count);
  //custom rect configuration
    this.rect = new joint.shapes.basic.customRect({
      position: {
        x: config.x,
        y:config.y
      },
      size: {
        width: 100,
        height: 13*(count+1)
      },
      attrs: {
        rect: {
          fill: config.body_color
        },
        text: {
          text: text_wrap,
          fill: config.text_color,
        }
      },
      // set custom attributes here:
      link_color: config.link_color,
      weight: config.weight,
      type: config.type
    })

    console.log (this.rect)
    
  }
}