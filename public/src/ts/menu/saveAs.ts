import { graph, paper } from '../graph.js'
import { save } from '../util.js';
import { legend } from './Legend.js';

/*
function createCanvas(): string {

} */

export function savePNG(): void {
  const svg = paper.svg;
  paper.hideTools();
  let toggleBack = false;
  if (legend.active) {
    legend.toggle();
    toggleBack = true;
  }
  // serialize
  const svgData = (new XMLSerializer()).serializeToString(svg);
  // encode special chars
  const svgURL = 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(svgData);
  // create image and canvas
  const svgImg = new Image();
  const canvas =  document.createElement('canvas');
  svgImg.onload = function() {
    const bound = svg.getBoundingClientRect();
    canvas.width = bound.width;
    canvas.height = bound.height;
    const ctx = canvas.getContext('2d');
    ctx!.fillStyle = "gray";
    ctx!.fillRect(0, 0, canvas.width, canvas.height);
    ctx!.drawImage(svgImg, 0, 0, canvas.width, canvas.height);
    const data = canvas.toDataURL("image/png", 1.0);
    save(data, "image/png", "myDiagram.png");
    if (toggleBack) $('#legend-button').trigger('click');
  };
  svgImg.src = svgURL;
}

export function savePDF(): void {
  
}