import { calcHeight } from "./util.js";

/* global joint */
const joint = window.joint;

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
    rect: { class:"claim-rect", width: 100, height: 100}, //, fill: "white", stroke: "black", width: 100, height: 100 },
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
}

export class Claim {
  position: {
    x: number;
    y: number;
  };
  rect: joint.shapes.app.ClaimRect;

  constructor(config: ClaimOptions) {
    // not used
    this.position = {
      x: config.x,
      y: config.y,
    };
    //creates a string of text, attempting to fit as many characters as possible
    //into a line of size width, before separating with newline character and repeating
    //90 is default width
    let text_wrap = joint.util.breakText(config.text, { width: 90 } );
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
        width: 100,
        height: calcHeight(count),
      },
      attrs: {
        rect: {
          class: config.type+"-rect",
          fill: config.body_color,
        },
        text: {
          class: config.type+"-text",
          text: text_wrap,
          fill: config.text_color,
        },
      },
      // set custom attributes here:
      link_color: config.link_color,
      weight: config.weight,
      type: config.type,
    });

    console.log(this.rect);
  }
}