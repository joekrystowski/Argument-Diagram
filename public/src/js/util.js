import { graph } from "./graph.js";
import { selected_links } from "./tools/LinkButton.js";
import { selected_premises } from "./tools/CombinePremise.js";
import { legend } from "./menu/Legend.js";
export function save(data, filetype, filename) {
    const file = new Blob([data], { type: filetype });
    const a = document.createElement("a");
    let url;
    if (filetype === "application/json")
        url = URL.createObjectURL(file);
    else
        url = data;
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}
export function calcHeight(num_lines) {
    return 16 + 13 * num_lines;
}
graph.on('remove', function (cell) {
    if (!cell.isLink()) {
        //something other than a link was removed
        //clear queues
        // have to be careful here, since this event can be triggered by removal of two
        // component shapes when making a dependent premise, so we only want to do this
        // when queue is half full
        if (selected_links.length === 1) {
            selected_links.pop();
        }
        if (selected_premises.length == 1) {
            selected_premises.pop();
        }
        console.log('cell', cell);
        legend.remove(cell);
    }
});
const keys = {};
$(document).on('keydown', function (e) {
    keys[e.which] = true;
    const paper_element = $('#paper-wrapper')[0];
    if (e.which === 16) {
        paper_element.style.cursor = 'grab';
    }
});
$(document).on('keyup', function (e) {
    keys[e.which] = false;
    $('#paper-wrapper')[0].style.cursor = 'default';
});
//Div drag functionality taken from: 
//https://github.com/phuoc-ng/html-dom/blob/master/demo/drag-to-scroll/index.html
//adapted for conditional use based on shift key
export function initializeContainerDrag(container_id) {
    const ele = document.getElementById(container_id);
    ele.style.cursor = 'default';
    let pos = { top: 0, left: 0, x: 0, y: 0 };
    const mouseDownHandler = function (e) {
        if (!keys[16])
            return;
        ele.style.cursor = 'grabbing';
        ele.style.userSelect = 'none';
        pos = {
            left: ele.scrollLeft,
            top: ele.scrollTop,
            // Get the current mouse position
            x: e.clientX,
            y: e.clientY,
        };
        ele.addEventListener('mousemove', mouseMoveHandler);
        ele.addEventListener('mouseup', mouseUpHandler);
    };
    const mouseMoveHandler = function (e) {
        // How far the mouse has been moved
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;
        // Scroll the element
        ele.scrollTop = pos.top - dy;
        ele.scrollLeft = pos.left - dx;
    };
    const mouseUpHandler = function () {
        ele.style.cursor = 'default';
        ele.style.removeProperty('user-select');
        ele.removeEventListener('mousemove', mouseMoveHandler);
        ele.removeEventListener('mouseup', mouseUpHandler);
    };
    // Attach the handler
    ele.addEventListener('mousedown', mouseDownHandler);
}
