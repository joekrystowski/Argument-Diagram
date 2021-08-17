import { graph, paper } from '../graph.js'
import { save } from '../util.js';
import { legend } from './Legend.js';
import jsPDF from 'jspdf';

declare const InstallTrigger: any;

function createCanvas(callback: Function): void {
  paper.hideTools();
  const svg = paper.svg;
  const width = svg.clientWidth;
  const height = svg.clientHeight;
  // supposed to check for firefox browser
  if (typeof InstallTrigger !== "undefined") {
    svg.setAttribute("width", width.toString());
    svg.setAttribute("height", height.toString());
  }
  // toggle legend
  let toggleBack = false;
  if (legend.active) {
    legend.toggle();
    toggleBack = true;
  }
  // serialize
  const svgString = new XMLSerializer().serializeToString(svg);
  // encode special chars
  const svgURL = 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(svgString);
  // create image and canvas
  const svgImg = new Image();
  const canvas =  document.createElement('canvas');
  svgImg.onload = function() {
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(svgImg, 0, 0, canvas.width, canvas.height);
    const data = canvas.toDataURL("image/png", 1.0);
    if (toggleBack) $('#legend-button').trigger('click');
    callback(data);
  };
  svgImg.src = svgURL;
}

export function savePNG(): void {
  createCanvas(function(data: string) {
    save(data, "image/png", "myDiagram.png");
  });
}

export function savePDF(): void {
  createCanvas(function(data: string) {
    //const pdf = new jsPDF();
  });
}

