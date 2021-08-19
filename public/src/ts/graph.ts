import { dia } from "jointjs";

const joint = window.joint;
export let graph = new joint.dia.Graph();

const PAPER_SIZE = { width: 4000, height: 4000 };
// the paper renders the image of the graph
export let paper = new joint.dia.Paper({
  el: document.getElementById("myholder") as HTMLElement,
  model: graph,
  height: PAPER_SIZE.height,
  width: PAPER_SIZE.width,
  gridSize: 10,
  drawGrid: true,
  preventContextMenu: false,
  clickThreshold: 1,
});

const MINIMAP_SCALE = 0.08;
const MINIMAP_SIZE = { width: PAPER_SIZE.width * MINIMAP_SCALE, height: PAPER_SIZE.height * MINIMAP_SCALE };
export let minimap = new joint.dia.Paper({
  el: document.getElementById('minimap') as HTMLElement,
  model: graph,
  height: MINIMAP_SIZE.height,
  width: MINIMAP_SIZE.width,
  gridSize: 10,
  interactive: false
});
minimap.scale(MINIMAP_SCALE);

let sketch = function(p:any) {

  const view_x = window.innerWidth / PAPER_SIZE.width * MINIMAP_SIZE.width;
  const view_y = window.innerHeight / PAPER_SIZE.height * MINIMAP_SIZE.height;

  p.setup = function() {
    const canvas = p.createCanvas(MINIMAP_SIZE.width, MINIMAP_SIZE.height);
    canvas.id('minimap-canvas');

    $('#minimap-canvas').on('mouseenter', function() {
      updatePrevious = false;
      previousPos = {x: <number>paper_wrapper.scrollLeft(), y: <number>paper_wrapper.scrollTop()}
    })
    
    $('#minimap-canvas').on('mouseout', function() {
      updatePrevious = true;
      paper_wrapper.scrollLeft(previousPos.x);
      paper_wrapper.scrollTop(previousPos.y);
    })

    p.stroke(255, 0, 0);
    p.noFill();
    p.rectMode(p.CORNERS);
  }

  p.draw = function() {
    p.clear();
    const mousePos = {x: p.mouseX, y: p.mouseY}
    const view = {
      left : mousePos.x - view_x/2,
      top : mousePos.y - view_y/2,
      right : mousePos.x + view_x/2,
      bottom :  mousePos.y + view_y/2
    }
    p.stroke(255, 0, 0);
    p.rect(view.left, view.top, view.right, view.bottom);

    const old = {
      left: previousPos.x * MINIMAP_SCALE,
      top: previousPos.y * MINIMAP_SCALE,
      right: previousPos.x * MINIMAP_SCALE + view_x,
      bottom: previousPos.y * MINIMAP_SCALE + view_y
    }
    p.stroke(255, 200, 0);
    p.rect(old.left, old.top, old.right, old.bottom);
    if(mousePos.x > 0 && mousePos.x < p.width && mousePos.y > 0 && mousePos.y < p.height) {
      paper_wrapper.scrollLeft(view.left/MINIMAP_SCALE);
      paper_wrapper.scrollTop(view.top/MINIMAP_SCALE);
    }
  }

  p.mouseClicked = function() {
    previousPos.x = (p.mouseX - view_x/2)/MINIMAP_SCALE;
    previousPos.y = (p.mouseY - view_y/2)/MINIMAP_SCALE;
  }
}

//@ts-ignore
let myp5 = new p5(sketch, 'wrapper');

const dx = PAPER_SIZE.width/2 - window.innerWidth/2;
const dy =  PAPER_SIZE.height/2 - window.innerHeight/2;
//paper.translate(dx, dy);
//minimap.translate(dx * MINIMAP_SCALE, dy * MINIMAP_SCALE)
const paper_wrapper = $('#paper-wrapper');
paper_wrapper.scrollLeft(PAPER_SIZE.width/2 - window.innerWidth/2);
paper_wrapper.scrollTop(PAPER_SIZE.height/2 - window.innerHeight/2);

interface coords { x: number, y: number}
let updatePrevious = true;
let previousPos:coords = {x: <number>paper_wrapper.scrollLeft(), y: <number>paper_wrapper.scrollTop()}

setInterval(() => {
  if(!updatePrevious) return;
  previousPos = {x: <number>paper_wrapper.scrollLeft(), y: <number>paper_wrapper.scrollTop()}
}, 30)
