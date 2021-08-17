/* global joint editModel */
const joint = window.joint;
import { editModel } from '../tools/EditButton.js';
import { Claim, getStrokeWidth } from '../Claim.js';
import { legend } from './Legend.js';
import { color, createColor } from '../colors.js';
import { ObjectionToClaim, ClaimToObjection } from "../ToggleTypes.js"

export function saveEdits() {
  console.log('saving edits...');

  let texts:Array<HTMLElement> = $('[name^="model-text-"]').toArray();
  console.log($('[name^="model-validity-"]').toArray());

  let validities:Array<number> = $('[name^="model-validity-"]').toArray().map((element:HTMLElement) => parseFloat((<HTMLInputElement>element).value));
  console.log('validities', validities)
  
  let text_wraps:Array<string> = texts.map((element:HTMLElement) => joint.util.breakText((<HTMLTextAreaElement>element).value, {width: 190}));
  let num_lines:Array<number> = text_wraps.map(wrap => (wrap.match(/\n/g) || []).length);
  //magic numbers have to do with font size... ask Joe
  let heights:Array<number> = num_lines.map(lines => 16 + 13 * lines);
  console.log(heights)

  if (editModel.isLink()) {
    console.log("saving link edits")
    let link_color = "#bbbbbb"
    const objectionSwitch = document.getElementById("objection-switch") as HTMLInputElement;
    link_color = objectionSwitch.checked ? color.link.dark.objection.stroke : color.link.dark.claim.stroke;
    let weight = $('#link-weight-rect').val()
    let oldLabel = editModel.attributes.labels[0]
    editModel.label(0, {
        attrs: {
          text: {
            class: oldLabel.attrs.text.class,
            text: weight,
            stroke: link_color
          },
          rect: {
            class: oldLabel.attrs.rect.class,
            fill: oldLabel.attrs.rect.fill
          }
        }
    })
    editModel.attr("line/stroke", link_color)
    console.log(weight)
  }
  else if(editModel.attributes.type === "dependent-premise") {
    console.log("saving dependent premise")
    //save new text and adjust size on each model in dependent premise
    editModel.getEmbeddedCells().forEach((cell:any, index:number) => {
      console.log(cell);
      console.log(text_wraps[index])
      cell.attr('text/text', text_wraps[index]);
      //cell.attributes.size.height = heights[index];
      console.log(cell.attributes.attrs.text.text)
      console.log('height: ', heights[index]);
      cell.resize(cell.attributes.size.width, heights[index])
    });

    let max_height = 13 + Math.max(...heights);
    //the 36 is dependent on font-size!!
    let width = 36 + editModel.getEmbeddedCells().reduce((total:number, cell:any) => total + cell.attributes.size.width, 0);
    // let combinedText = text_wraps.slice(1).reduce((total:string, current:string) => {
    //   return combineText(total, current);
    // }, text_wraps[0]);

    //editModel.attr('text/text', combinedText)
    editModel.resize(width, max_height);
    // console.log((height/16) - 1)
    //console.log("new_text", editModel.attributes.attrs.text.text)
  }
  else {
    //just update the single model with the new text and size
    editModel.attr('text/text', text_wraps[0]);
    //console.log(validities)
    editModel.attributes.validity = validities[0];
    editModel.attributes.storedInfo.initialText = text_wraps[0];
    editModel.resize(editModel.attributes.size.width, heights[0]);
    //editModel.attr("rect/fill", createColor(editModel.attributes.validity, editModel.attributes.type))

    //editModel.attr("rect/strokeWidth", getStrokeWidth(editModel.attributes.validity))

    // const objectionSwitch = document.getElementById("objection-switch") as HTMLInputElement;
    // if(editModel.attributes.type === "claim" && objectionSwitch.checked) {
    //   ClaimToObjection(editModel)
    // }
    // else if(editModel.attributes.type === "objection" && !objectionSwitch.checked) {
    //   ObjectionToClaim(editModel)
    // }
    
    console.log(editModel)
  }
  
  const saveButton = document.getElementById("save-edit-button");
  saveButton?.classList.remove("changed");

  // const editContainer = $('#edit-container');
  // editContainer.hide(200);
  $('#edit-dialog').dialog('close');

  legend.refresh();
}


export function discardEdits() {
  const editContainer = $('#edit-container');
  editContainer.hide(200);
}