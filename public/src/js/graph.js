const joint = window.joint;
export let graph = new joint.dia.Graph();
// the paper renders the image of the graph
export let paper = new joint.dia.Paper({
    el: document.getElementById("myholder"),
    model: graph,
    height: window.innerHeight,
    gridSize: 10,
    drawGrid: true,
    preventContextMenu: false
});
