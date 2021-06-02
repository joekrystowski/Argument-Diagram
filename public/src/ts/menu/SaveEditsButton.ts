/* global joint editModel */
const joint = window.joint;
import { editModel } from '../tools/EditButton.js';
import { combineText } from '../DependentPremise.js';

export function saveRectEdits() {
  let editView = document.getElementById("edit-rect-container") as HTMLElement;
  //---- Save Edits Here -----
  // note: doing something like
  // editModel.attributes.attrs.text.text = text_wrap will NOT update the attributes live on the Paper
  // Instead, you should use editModel.set() for most things
  // .set() takes two arguments
  let text = (document.getElementById("rect-model-text")as HTMLTextAreaElement).value;
  console.log(text);
  let text_wrap = joint.util.breakText(text, {width: 90})
  console.log(text_wrap)
  let count = (text_wrap.match(/\n/g) || []).length;
  let new_height = 16 + 13*(count)
  editModel.attr('text/text', text_wrap);
  editModel.resize(editModel.attributes.size.width, new_height);
  console.log(editModel.attributes.attrs.text.text)
  
  //hide edit menu
  editView.style.display = "none";
}

export function saveDPEdits() {
  
  let editView = document.getElementById("edit-DP-container") as HTMLElement;

  // left model edits
  let lefttext = (document.getElementById("DP-model-left-text") as HTMLTextAreaElement).value;
  let left_wrap = joint.util.breakText(lefttext, {width: 90})
  console.log(left_wrap)
  let left_count = (left_wrap.match(/\n/g) || []).length;
  console.log(left_count) 
  let left_height = 16 + 16*(left_count)
  editModel.attributes.model1.attr('text/text', left_wrap);
  editModel.attributes.model1.resize(editModel.attributes.model1.attributes.size.width, left_height);
  console.log(editModel.attributes.model1.attributes.attrs.text.text);
  
  // right model edits
  let righttext = (document.getElementById("DP-model-right-text") as HTMLTextAreaElement).value;
  let right_wrap = joint.util.breakText(righttext, {width: 90})
  console.log(right_wrap)
  let right_count = (right_wrap.match(/\n/g) || []).length; 
  console.log(right_count)
  let right_height = 16 + 16*(right_count);
  editModel.attributes.model2.attr('text/text', right_wrap);
  editModel.attributes.model2.resize(editModel.attributes.model2.attributes.size.width, right_height);
  console.log(editModel.attributes.model2.attributes.attrs.text.text);

  //now update actual DP shape
  let height = Math.max(left_height, right_height);
  let width = editModel.attributes.model1.attributes.size.width + editModel.attributes.model2.attributes.size.width + 36; //36 should be dependent on font size
  let combinedText = combineText(left_wrap, right_wrap);
  editModel.attr('text/text', combinedText)
  editModel.resize(width, height);
  console.log((height/16) - 1)
  console.log(editModel.attributes.attrs.text.text)
  
  //hide edit menu
  editView.style.display = "none";

}