/* global joint editModel */
const joint = window.joint;
import { editModel } from '../tools/EditButton.js';
import { combineText } from '../DependentPremise.js';
import { Argument } from '../Argument.js';

export function saveEdits() {
  let texts:Array<HTMLElement> = $('[name^="model-text-"]').toArray();
  let text_wraps:Array<string> = texts.map((element:HTMLElement) => joint.util.breakText((<HTMLTextAreaElement>element).value, {width: 90}));
  let num_lines:Array<number> = text_wraps.map(wrap => (wrap.match(/\n/g) || []).length);
  //magic numbers have to do with font size... ask Joe
  let heights:Array<number> = num_lines.map(lines => 16 + 13 * lines);

  if(editModel.attributes.type === "dependent-premise") {
    //save new text and adjust size on each model in dependent premise
    editModel.attributes.props.forEach((propObj:any, index:number) => {
      propObj.attrs.text.text = text_wraps[index];
      propObj.size.height = heights[index];
    });

    let max_height = Math.max(...heights);
    //the 36 is dependent on font-size!!
    let width = 36 + editModel.attributes.props.reduce((total:number, propObj:any) => total + propObj.size.width, 0);
    let combinedText = text_wraps.slice(1).reduce((total:string, current:string) => {
      return combineText(total, current);
    }, text_wraps[0]);

    editModel.attr('text/text', combinedText)
    editModel.resize(width, max_height);
    // console.log((height/16) - 1)
    console.log("new_text", editModel.attributes.attrs.text.text)
  }
  else {
    //just update the single model with the new text and size
    editModel.attr('text/text', text_wraps[0]);
    editModel.resize(editModel.attributes.size.width, heights[0]);
  }
  
  const editContainer = $('#edit-container');
  editContainer.hide();
}
