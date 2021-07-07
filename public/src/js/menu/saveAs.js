import { paper } from '../graph.js';
import { save } from '../util.js';
import { legend } from './Legend.js';
function createCanvas(callback) {
    paper.hideTools();
    const svg = paper.svg;
    const svgWidth = window.screen.width;
    const svgHeight = window.screen.height;
    // fix firefox problem
    svg.setAttribute("width", svgWidth.toString() + "px");
    svg.setAttribute("height", svgHeight.toString() + "px");
    // toggle legend
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
    const canvas = document.createElement('canvas');
    svgImg.onload = function () {
        canvas.width = svgWidth;
        canvas.height = svgHeight;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = "gray";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(svgImg, 0, 0, canvas.width, canvas.height);
        const data = canvas.toDataURL("image/png", 1.0);
        if (toggleBack)
            $('#legend-button').trigger('click');
        callback(data);
    };
    svgImg.src = svgURL;
}
export function savePNG() {
    createCanvas(function (data) {
        save(data, "image/png", "myDiagram.png");
    });
}
export function savePDF() {
    createCanvas(function (data) {
        //const pdf = new jsPDF();
    });
}
