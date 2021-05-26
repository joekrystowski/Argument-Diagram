/* global joint editModel */

function saveEdits() {
  let editView = document.getElementById("edit-container");
  //save edits
  let text = document.getElementById("model-text").value;
  let text_wrap = joint.util.breakText(text, {width: 90})
  let count = (text_wrap.match(/\n/g) || []).length;
  let new_height = 16 + 13*(count)
  editModel.set('attrs', {text: {text: text_wrap}});
  editModel.resize(editModel.attributes.size.width, new_height);
  console.log(editModel.attributes.attrs.text.text)
  //redraw rect with updated data
  
  //hide edit menu
  editView.style.display = "none";
}