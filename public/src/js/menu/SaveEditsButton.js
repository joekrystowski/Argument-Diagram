/* global joint editModel combineText findLongestLength */

function saveRectEdits() {
  let editView = document.getElementById("edit-rect-container");
  //---- Save Edits Here -----
  // note: doing something like
  // editModel.attributes.attrs.text.text = text_wrap will NOT update the attributes live on the Paper
  // Instead, you should use editModel.set() for most things
  // .set() takes two arguments
  let text = document.getElementById("rect-model-text").value;
  let text_wrap = joint.util.breakText(text, {width: 90})
  let count = (text_wrap.match(/\n/g) || []).length;
  let new_height = 16 + 13*(count)
  editModel.set('attrs', {text: {text: text_wrap}});
  editModel.resize(editModel.attributes.size.width, new_height);
  console.log(editModel.attributes.attrs.text.text)
  
  //hide edit menu
  editView.style.display = "none";
}

function saveDPEdits() {
  
  let editView = document.getElementById("edit-DP-container");

  // left model edits
  let lefttext = document.getElementById("DP-model-left-text").value;
  let left_wrap = joint.util.breakText(lefttext, {width: 90})
  let left_count = (left_wrap.match(/\n/g) || []).length; 
  let left_height = 16 + 13*(left_count)
  editModel.attributes.model1.set('attrs', {text: {text: left_wrap}});
  editModel.attributes.model1.resize(editModel.attributes.model1.attributes.size.width, left_height);
  console.log(editModel.attributes.model1.attributes.attrs.text.text);
  
  // right model edits
  let righttext = document.getElementById("DP-model-right-text").value;
  let right_wrap = joint.util.breakText(righttext, {width: 90})
  let right_count = (right_wrap.match(/\n/g) || []).length; 
  let right_height = 16 + 13*(right_count);
  editModel.attributes.model2.set('attrs', {text: {text: right_wrap}});
  editModel.attributes.model2.resize(editModel.attributes.model2.attributes.size.width, right_height);
  console.log(editModel.attributes.model2.attributes.attrs.text.text);

  //now update actual DP shape
  let height = Math.max(editModel.attributes.model1.attributes.size.height, editModel.attributes.model2.attributes.size.height);
  let width = editModel.attributes.model1.attributes.size.width + editModel.attributes.model2.attributes.size.width + 36; //36 should be dependent on font size
  editModel.resize(width, height);
  let combinedText = combineText(left_wrap, right_wrap);
  editModel.set('attrs', {text: {text: combinedText}})
  console.log(editModel.attributes.attrs.text.text)
  
  //hide edit menu
  editView.style.display = "none";

}