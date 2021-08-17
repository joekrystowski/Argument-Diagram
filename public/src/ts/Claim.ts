import { calcHeight } from "./util.js";
import { graph, paper } from "./graph.js";
import { refreshTools } from "./tools/ManageTools.js";
import { createColor } from "./colors.js"

/* global joint */
const joint = window.joint;
const legend_form_size = 40;

declare module "jointjs" {
  namespace shapes {
    namespace app {
      class ClaimRect extends joint.shapes.basic.Generic {
        //custom shape declaration
      }
    }
  }
}

const ClaimRect = joint.shapes.standard.Rectangle.define("app.ClaimRect", {
  markup: '<g class="rotatable"><g class="scalable"><rect/></g><text/></g>',
  attrs: {
    rect: { class:"claim-rect", width: 100, height: 100, fill: "white", stroke: "black", strokeWidth: 5},//, width: 100, height: 100 },
    text: { class:"claim-text",
      "font-size": 12,
      "ref-x": 0.5,
      "ref-y": 0.5,
      ref: "rect",
      "y-alignment": "middle",
      "x-alignment": "middle",
    },
  },
  link_color: "#222222",
  weight: "1",
  type: "none",
  inLegendForm: false,
  storedInfo: {}
}); 

(<any>Object).assign(joint.shapes, {
  app: {
    ClaimRect,
  },
});

interface ClaimOptions {
  x: number;
  y: number;
  text: string;
  type: string;
  body_color: string;
  text_color: string;
  stroke: string;
  link_color: string;
  weight: string;
  validity: number;
}

export class Claim {
  rect: joint.shapes.app.ClaimRect;

  constructor(config: ClaimOptions) {
    //creates a string of text, attempting to fit as many characters as possible
    //into a line of size width, before separating with newline character and repeating
    //90 is default width
    let text_wrap = joint.util.breakText(config.text, { width: 190 } );
    // regular expression to find number of lines in text_wrap
    // searching for all instances (g-> global) of \n in text_wrap string
    // if none are found, instead of attempting to read .length of undefined,
    //an empty array of .length. 0 is returned.
    let count = (text_wrap.match(/\n/g) || []).length;
    console.log(count);
    //custom rect configuration
    this.rect = new ClaimRect({
      position: {
        x: config.x,
        y: config.y,
      },
      size: {
        width: 200,
        height: calcHeight(count),
      },
      attrs: {
        rect: {
          fill: createColor(config.validity, config.type),
          stroke: config.stroke,
          strokeWidth: getStrokeWidth(config.validity)
        },
          //class: config.type+"-rect",
        text: {
          //class: config.type+"-text",
          text: text_wrap,
          fill: config.text_color,
        },
      },
      // set custom attributes here:
      link_color: config.link_color,
      weight: config.weight,
      validity: config.validity,
      type: config.type,
      inLegendForm: false,
      storedInfo: {
        initialText: text_wrap,
        size: {
          width: 100,
          height: calcHeight(count)
        }
      }
    });

    console.log(this.rect);
  }

  isDependent(other: Claim) {
    // console.log("isDependent");
    if(!this.rect.get("parent") || !other.rect.get("parent")) { 
      return false;
    }
    return this.rect.get("parent") === other.rect.get("parent");
  }
  isDependentCausedBy(other: Claim) {
    if(!other.rect.get("parent")) {
      return false;
    }
    const dp = graph.getCell(other.rect.get("parent"));
    const outLinks = graph.getConnectedLinks(dp, {outbound: true});
    const inLinks = graph.getConnectedLinks(this.rect, {inbound: true});
    var obj: {[key: string]: boolean} = {};
    var result = false;
    outLinks.forEach( (value) => {
      const index = value.id as string;
      obj[index] = true;
    })
    inLinks.forEach( (value) => {
      const index = value.id as string;
      if(obj[index]) {
        result = true;
      }
    })
    return result;
  }

  isCausedBy(other: Claim) {
    // console.log("isCausedBy");
    const outLinks = graph.getConnectedLinks(other.rect, {outbound: true});
    const inLinks = graph.getConnectedLinks(this.rect, {inbound: true});
    var obj: {[key: string]: boolean} = {};
    var result = false;
    outLinks.forEach( (value) => {
      const index = value.id as string;
      obj[index] = true;
    })
    inLinks.forEach( (value) => {
      const index = value.id as string;
      if(obj[index]) {
        result = true;
      }
    })
    return result;
  }

  /**
   * Sets a specific (or all) values on the `Claim.rect.attributes.storedInfo` object.
   * @param {string} storageProp The property on the `Claim.rect.attributes.storedInfo` object you wish to set
   * @param {any} value The value to set in `Claim.rect.attributes.storedInfo[storageProp]`
   */
  store(storageProp?:string, value?:any) {
    if (arguments.length !== 0 && arguments.length !== 2) {
      throw new TypeError(`Claim.store expected 0 or 2 arguments. Got ${arguments.length}`);
    }

    //if a specific property is specified
    if (storageProp !== undefined && value !== undefined) {
      if(!this.rect.attributes.storedInfo.hasOwnProperty(storageProp)){
        throw new ReferenceError(`Claim.storedInfo does not have property '${storageProp}'`);
      }

      this.rect.attributes.storedInfo[storageProp] = value;
    }
    //set default(all) properties
    else {
      this.rect.attributes.storedInfo.initialText = this.rect.attributes.attrs.text.text;
      //use Object.assign to make an actual copy of the object (not a reference)
      this.rect.attributes.storedInfo.size = Object.assign({}, this.rect.attributes.size);
      this.rect.attributes.storedInfo.rx = this.rect.attributes.attrs.rect.rx || 0;
      this.rect.attributes.storedInfo.position = Object.assign({}, this.rect.attributes.position);
    }
  }

  /** 
   * Retrieves a specific item from `Claim.rect.attributes.storedInfo`
   * @param {string} storagePath  * The path to the property on the `Claim.rect.attributes.storedInfo` object you wish to recieve
   *                              * Separate nested properties with _/_ eg. `size/width`
   * @returns {any}
   */
  retrieveFromStorage(storagePath:string): any {
    const path = storagePath.split('/');
    return path.reduce( (accumulated:any, currentProp:string) => { 
      return accumulated[currentProp]; 
    }, this.rect.attributes.storedInfo);
  }

  /**
   * Toggles the form of the claim. If it is in normal form, it will be converted to legend form,
   * and vice versa.
   * @param {number} legendNumber The number to display if the Claim were to be shown in legend form.
   */
  toggleLegendForm(legendNumber?:number) {
    //convert from normal to legend form
    if (!this.rect.attributes.inLegendForm) {
      if(legendNumber === undefined) {
        throw new TypeError('legendNumber must be specified when converting a claim into legend form.');
      }
      this.store();
      //change attributes to legend form style
      this.rect.attr('text/text', legendNumber?.toString());
      this.rect.translate((this.rect.attributes.size.width-legend_form_size)/2, 0);
      this.rect.resize(legend_form_size, legend_form_size);
      this.rect.attr('rect/rx', 50);
    } 
    //convert from legend to normal form
    else {
      this.rect.attr('text/text', this.retrieveFromStorage('initialText'));
      const old_size = this.retrieveFromStorage('size');
      this.rect.translate(-(old_size.width-legend_form_size)/2, 0); 
      this.rect.resize(old_size.width, old_size.height);
      this.rect.attr('rect/rx', this.retrieveFromStorage('rx'));
    }

    //if this claim has a parent (Dependent premise), resize it
    const parent = this.rect.getParentCell();
    if (parent) {
      parent.attributes.setHeightBasedOnChildren();
    }

    //update form boolean
    this.rect.attributes.inLegendForm = !this.rect.attributes.inLegendForm;
    refreshTools(this.rect);
  }
}


export function getStrokeWidth(value:number) {
  return 2 //+ ( 3 * value )
}