/* global joint editModel */
const joint = window.joint;
import { editModel } from '../tools/EditButton.js';
import { Claim } from '../Claim.js';

export function saveEdits() {
  let texts:Array<HTMLElement> = $('[name^="model-text-"]').toArray();
  let text_wraps:Array<string> = texts.map((element:HTMLElement) => joint.util.breakText((<HTMLTextAreaElement>element).value, {width: 90}));
  let num_lines:Array<number> = text_wraps.map(wrap => (wrap.match(/\n/g) || []).length);
  //magic numbers have to do with font size... ask Joe
  let heights:Array<number> = num_lines.map(lines => 16 + 13 * lines);
  console.log(heights)

  if(editModel.attributes.type === "dependent-premise") {
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
    const objectionSwitch = document.getElementById("objection-switch") as HTMLInputElement;
    if(editModel.attributes.type === "claim" && objectionSwitch.checked) {
      editModel.attributes.type = "objection";
      editModel.attr("text/class","objection-text");
      editModel.attr("rect/class","objection-rect");
    }
    else if(editModel.attributes.type === "objection" && !objectionSwitch.checked) {
      editModel.attributes.type = "claim";
      editModel.attr("text/class","claim-text");
      editModel.attr("rect/class","claim-rect");
    }

    //just update the single model with the new text and size
    editModel.attr('text/text', text_wraps[0]);
    editModel.resize(editModel.attributes.size.width, heights[0]);
  }
  
  const saveButton = document.getElementById("save-edit-button");
  saveButton?.classList.remove("changed");

  const editContainer = $('#edit-container');
  editContainer.hide(200);
}


export function discardEdits() {
  const editContainer = $('#edit-container');
  editContainer.hide(200);
}