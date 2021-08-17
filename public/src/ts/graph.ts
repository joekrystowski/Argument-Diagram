const joint = window.joint;
export let graph = new joint.dia.Graph();

const PAPER_SIZE = { width: 10000, height: 10000 };
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

paper.translate(PAPER_SIZE.width/2 - window.innerWidth, PAPER_SIZE.height/2 - window.innerHeight);
$('#paper-wrapper').scrollLeft(PAPER_SIZE.width/2 - window.innerWidth);
$('#paper-wrapper').scrollTop(PAPER_SIZE.height/2 - window.innerHeight);