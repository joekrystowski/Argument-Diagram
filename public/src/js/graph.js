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

// Bit of extra stuff to move the paper to start in the center.
console.debug(document.getElementById("myholder")) ;
console.debug(document.getElementById("wrapper")) ;
console.debug("YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
console.debug($("myholder"));

var middleishwidth = document.getElementById("myholder").clientWidth*2/5;
var middleishheight = document.getElementById("myholder").clientHeight*2/5;
document.getElementById("wrapper").scrollTo(middleishwidth ,middleishheight);