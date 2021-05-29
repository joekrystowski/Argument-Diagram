/* global joint editModel */

import joint from 'jointjs';
import { editModel } from '../tools/EditButton'

function saveEdits() {
  let editView = document.getElementById("edit-container") as HTMLElement;
  //---- Save Edits Here -----
  // note: doing something like
  // editModel.attributes.attrs.text.text = text_wrap will NOT update the attributes live on the Paper
  // Instead, you should use editModel.set() for most things
  // .set() takes two arguments
  let text = (document.getElementById("model-text") as HTMLTextAreaElement).value;
  let text_wrap = joint.util.breakText(text, {width: 90})
  let count = (text_wrap.match(/\n/g) || []).length;
  let new_height = 16 + 13*(count)
  editModel.set('attrs', {text: {text: text_wrap}});
  editModel.resize(editModel.attributes.size.width, new_height);
  console.log(editModel.attributes.attrs.text.text)
  
  //hide edit menu
  editView.style.display = "none";
}