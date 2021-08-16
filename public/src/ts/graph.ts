import { dia } from "jointjs";

const joint = window.joint;
export let graph = new joint.dia.Graph();

const mainPaperSize = { width: window.innerWidth, height: window.innerHeight };

let moving_rect = false;
let rect_moved:joint.shapes.app.ClaimRect;
let previous_mouse = {x: 0, y: 0};
const mouse_position = {x: 0, y: 0};
let interval:any; 

$(document).on('mousemove', function(event) {
  previous_mouse = Object.assign({}, mouse_position);
  mouse_position.x = event.clientX;
  mouse_position.y = event.clientY;
})

$(document).on('mousedown', function(event) {
  console.log('here');
  interval = setInterval(function(){
    console.log('interval');
    if(moving_rect && window.innerWidth - mouse_position.x < 40) {
      paper.fitToContent({
        minWidth: mainPaperSize.width,
        minHeight: mainPaperSize.height
      });
      $('#paper-wrapper').scrollLeft(9999999999);
    }
    if(moving_rect && window.innerHeight - mouse_position.y < 40) {
      paper.fitToContent({
        minWidth: mainPaperSize.width,
        minHeight: mainPaperSize.height
      });
      $('#paper-wrapper').scrollTop(9999999999);
    }
    if(moving_rect && mouse_position.x < 40) {
      $('#paper-wrapper')[0].scrollLeft -= 50;
    }
    if(moving_rect && window.innerHeight - mouse_position.y < 40) {
      $('#paper-wrapper').scrollTop(9999999999);
    }
    if(moving_rect && mouse_position.y < 40) {
      $('#paper-wrapper')[0].scrollTop -= 50;
    }
  }, 100);
});

$(document).on('mouseup', function() {
  moving_rect = false;
  clearInterval(interval);
});

// $('#right-border-trigger').on('mouseover', function() {
//   console.log('mouseover');
//   $('#paper-wrapper').scrollLeft(999999999);
// })


graph.on('change:position', function(rect, position) {
  moving_rect = true;
  rect_moved = rect;
  //console.log(rect);
  // if (rect.attributes.position.x + rect.attributes.size.width - <number>$('#paper-wrapper').scrollLeft() >= window.innerWidth) {
  //   //rect.attributes.position.x += 1;
  //   $('#paper-wrapper').scrollLeft(9999999999);
  // }
  const x_direction = (mouse_position.x - previous_mouse.x) / Math.abs(mouse_position.x - previous_mouse.x);
  const y_direction = (mouse_position.y - previous_mouse.y) / Math.abs(mouse_position.y - previous_mouse.y);
  if (rect.attributes.position.x + rect.attributes.size.width - <number>$('#paper-wrapper').scrollLeft() >= window.innerWidth && x_direction >= 0){
    paper.fitToContent({
      minWidth: mainPaperSize.width,
      minHeight: mainPaperSize.height
    });
    $('#paper-wrapper').scrollLeft(99999999999)
  }
  if (rect.attributes.position.y + rect.attributes.size.height - <number>$('#paper-wrapper').scrollTop() >= window.innerHeight && y_direction >= 0){
    paper.fitToContent({
      minWidth: mainPaperSize.width,
      minHeight: mainPaperSize.height
    });
    $('#paper-wrapper').scrollTop(99999999999)
  }
  //  else if (rect.attributes.position.x - <number>$('#paper-wrapper').scrollLeft() <= 0 && x_direction <= 0){
  //   // paper.fitToContent({
  //   //   minWidth: <number>$('#myholder').width() * 0.9,
  //   //   minHeight: <number>$('#myholder').height() * 0.9
  //   // });
  //   $('#paper-wrapper')[0].scrollLeft -= 5;
  // }
}); 

// the paper renders the image of the graph
export let paper = new joint.dia.Paper({
  el: document.getElementById("myholder") as HTMLElement,
  model: graph,
  ...mainPaperSize,
  gridSize: 10,
  drawGrid: true,
  preventContextMenu: false,
  clickThreshold: 1,
});

console.log("PAPER", paper);

const scaleFactor = 0.3;
export let minimap = new joint.dia.Paper({
  el: document.getElementById('minimap-holder') as HTMLElement,
  model: graph,
  height: mainPaperSize.height * scaleFactor,
  width: mainPaperSize.width * scaleFactor,
  gridSize: 10,
  interactive: false,
  preventContextMenu: true,
  drawGrid: true
})
minimap.scale(scaleFactor);