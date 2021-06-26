import { graph, paper } from '../graph.js'
import { save } from '../util.js';

export function savePNG(): void {
  const filename = "myDiagram.png";
  const svg = paper.svg;
  const svgAsXML = (new XMLSerializer).serializeToString(svg);
  const dataURL = "data:image/svg+xml," + encodeURIComponent(svgAsXML);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.onload = function(e) {
    ctx!.drawImage(img, 0, 0);
  };
  img.src = dataURL;
  const data = canvas.toDataURL("image/png");
  save(data, "image/png", filename); 
  /*
  // save as svg only - need to get styling to work
  var dl = document.createElement("a");
  document.body.appendChild(dl); // This line makes it work in Firefox.
  dl.setAttribute("href", dataURL);
  dl.setAttribute("download", "test.svg");
  dl.click(); */
}

export function savePDF(): void {

}