const joint = window.joint;
export let graph = new joint.dia.Graph();
<<<<<<< HEAD
const PAPER_SIZE = { width: 4000, height: 4000 };
=======
const mainPaperSize = { width: window.innerWidth, height: window.innerHeight };
let moving_rect = false;
let rect_moved;
let previous_mouse = { x: 0, y: 0 };
const mouse_position = { x: 0, y: 0 };
let interval;
$(document).on('mousemove', function (event) {
    previous_mouse = Object.assign({}, mouse_position);
    mouse_position.x = event.clientX;
    mouse_position.y = event.clientY;
});
$(document).on('mousedown', function (event) {
    console.log('here');
    interval = setInterval(function () {
        console.log('interval');
        if (moving_rect && window.innerWidth - mouse_position.x < 40) {
            paper.fitToContent({
                minWidth: mainPaperSize.width,
                minHeight: mainPaperSize.height
            });
            $('#paper-wrapper').scrollLeft(9999999999);
        }
        if (moving_rect && window.innerHeight - mouse_position.y < 40) {
            paper.fitToContent({
                minWidth: mainPaperSize.width,
                minHeight: mainPaperSize.height
            });
            $('#paper-wrapper').scrollTop(9999999999);
        }
        if (moving_rect && mouse_position.x < 40) {
            $('#paper-wrapper')[0].scrollLeft -= 50;
        }
        if (moving_rect && window.innerHeight - mouse_position.y < 40) {
            $('#paper-wrapper').scrollTop(9999999999);
        }
        if (moving_rect && mouse_position.y < 40) {
            $('#paper-wrapper')[0].scrollTop -= 50;
        }
    }, 100);
});
$(document).on('mouseup', function () {
    moving_rect = false;
    clearInterval(interval);
});
// $('#right-border-trigger').on('mouseover', function() {
//   console.log('mouseover');
//   $('#paper-wrapper').scrollLeft(999999999);
// })
graph.on('change:position', function (rect, position) {
    moving_rect = true;
    rect_moved = rect;
    //console.log(rect);
    // if (rect.attributes.position.x + rect.attributes.size.width - <number>$('#paper-wrapper').scrollLeft() >= window.innerWidth) {
    //   //rect.attributes.position.x += 1;
    //   $('#paper-wrapper').scrollLeft(9999999999);
    // }
    const x_direction = (mouse_position.x - previous_mouse.x) / Math.abs(mouse_position.x - previous_mouse.x);
    const y_direction = (mouse_position.y - previous_mouse.y) / Math.abs(mouse_position.y - previous_mouse.y);
    if (rect.attributes.position.x + rect.attributes.size.width - $('#paper-wrapper').scrollLeft() >= window.innerWidth && x_direction >= 0) {
        paper.fitToContent({
            minWidth: mainPaperSize.width,
            minHeight: mainPaperSize.height
        });
        $('#paper-wrapper').scrollLeft(99999999999);
    }
    if (rect.attributes.position.y + rect.attributes.size.height - $('#paper-wrapper').scrollTop() >= window.innerHeight && y_direction >= 0) {
        paper.fitToContent({
            minWidth: mainPaperSize.width,
            minHeight: mainPaperSize.height
        });
        $('#paper-wrapper').scrollTop(99999999999);
    }
    //  else if (rect.attributes.position.x - <number>$('#paper-wrapper').scrollLeft() <= 0 && x_direction <= 0){
    //   // paper.fitToContent({
    //   //   minWidth: <number>$('#myholder').width() * 0.9,
    //   //   minHeight: <number>$('#myholder').height() * 0.9
    //   // });
    //   $('#paper-wrapper')[0].scrollLeft -= 5;
    // }
});
>>>>>>> 26ddef1523e51e3fca508b4ac08669a9d0afdbc8
// the paper renders the image of the graph
export let paper = new joint.dia.Paper(Object.assign(Object.assign({ el: document.getElementById("myholder"), model: graph }, mainPaperSize), { gridSize: 10, drawGrid: true, preventContextMenu: false, clickThreshold: 1 }));
console.log("PAPER", paper);
const scaleFactor = 0.3;
export let minimap = new joint.dia.Paper({
    el: document.getElementById('minimap-holder'),
    model: graph,
<<<<<<< HEAD
    height: PAPER_SIZE.height,
    width: PAPER_SIZE.width,
=======
    height: mainPaperSize.height * scaleFactor,
    width: mainPaperSize.width * scaleFactor,
>>>>>>> 26ddef1523e51e3fca508b4ac08669a9d0afdbc8
    gridSize: 10,
    interactive: false,
    preventContextMenu: true,
    drawGrid: true
});
<<<<<<< HEAD
const MINIMAP_SCALE = 0.08;
const MINIMAP_SIZE = { width: PAPER_SIZE.width * MINIMAP_SCALE, height: PAPER_SIZE.height * MINIMAP_SCALE };
export let minimap = new joint.dia.Paper({
    el: document.getElementById('minimap'),
    model: graph,
    height: MINIMAP_SIZE.height,
    width: MINIMAP_SIZE.width,
    gridSize: 10,
    interactive: false
});
minimap.scale(MINIMAP_SCALE);
let sketch = function (p) {
    const view_x = window.innerWidth / PAPER_SIZE.width * MINIMAP_SIZE.width;
    const view_y = window.innerHeight / PAPER_SIZE.height * MINIMAP_SIZE.height;
    p.setup = function () {
        const canvas = p.createCanvas(MINIMAP_SIZE.width, MINIMAP_SIZE.height);
        canvas.id('minimap-canvas');
        $('#minimap-canvas').on('mouseenter', function () {
            updatePrevious = false;
            previousPos = { x: paper_wrapper.scrollLeft(), y: paper_wrapper.scrollTop() };
        });
        $('#minimap-canvas').on('mouseout', function () {
            updatePrevious = true;
            paper_wrapper.scrollLeft(previousPos.x);
            paper_wrapper.scrollTop(previousPos.y);
        });
        p.stroke(255, 0, 0);
        p.noFill();
        p.rectMode(p.CORNERS);
    };
    p.draw = function () {
        p.clear();
        const mousePos = { x: p.mouseX, y: p.mouseY };
        const view = {
            left: mousePos.x - view_x / 2,
            top: mousePos.y - view_y / 2,
            right: mousePos.x + view_x / 2,
            bottom: mousePos.y + view_y / 2
        };
        p.stroke(255, 0, 0);
        p.rect(view.left, view.top, view.right, view.bottom);
        const old = {
            left: previousPos.x * MINIMAP_SCALE,
            top: previousPos.y * MINIMAP_SCALE,
            right: previousPos.x * MINIMAP_SCALE + view_x,
            bottom: previousPos.y * MINIMAP_SCALE + view_y
        };
        p.stroke(255, 200, 0);
        p.rect(old.left, old.top, old.right, old.bottom);
        if (mousePos.x > 0 && mousePos.x < p.width && mousePos.y > 0 && mousePos.y < p.height) {
            paper_wrapper.scrollLeft(view.left / MINIMAP_SCALE);
            paper_wrapper.scrollTop(view.top / MINIMAP_SCALE);
        }
    };
    p.mouseClicked = function () {
        previousPos.x = (p.mouseX - view_x / 2) / MINIMAP_SCALE;
        previousPos.y = (p.mouseY - view_y / 2) / MINIMAP_SCALE;
    };
};
//@ts-ignore
let myp5 = new p5(sketch, 'wrapper');
const dx = PAPER_SIZE.width / 2 - window.innerWidth / 2;
const dy = PAPER_SIZE.height / 2 - window.innerHeight / 2;
paper.translate(dx, dy);
minimap.translate(dx * MINIMAP_SCALE, dy * MINIMAP_SCALE);
const paper_wrapper = $('#paper-wrapper');
paper_wrapper.scrollLeft(PAPER_SIZE.width / 2 - window.innerWidth / 2);
paper_wrapper.scrollTop(PAPER_SIZE.height / 2 - window.innerHeight / 2);
let updatePrevious = true;
let previousPos = { x: paper_wrapper.scrollLeft(), y: paper_wrapper.scrollTop() };
setInterval(() => {
    if (!updatePrevious)
        return;
    previousPos = { x: paper_wrapper.scrollLeft(), y: paper_wrapper.scrollTop() };
}, 30);
=======
minimap.scale(scaleFactor);
>>>>>>> 26ddef1523e51e3fca508b4ac08669a9d0afdbc8
