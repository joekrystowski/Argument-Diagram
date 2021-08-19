import { graph, paper } from "./graph.js"
import { selected_links } from "./tools/LinkButton.js"
import { selected_premises } from "./tools/CombinePremise.js"
import { legend } from "./menu/Legend.js";

export function save(data: string, filetype: string, filename: string): void {
	const file = new Blob([data], {type: filetype}); 
  const a = document.createElement("a");
  let url: string;
  if (filetype === "application/json") url = URL.createObjectURL(file);
  else url = data;
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);  
  }, 0); 
}

export function calcHeight(num_lines:number) {
  return 16 + 13 * num_lines;
}

graph.on('remove', function(cell) {
  if (!cell.isLink()) {
    //something other than a link was removed
    //clear queues
    // have to be careful here, since this event can be triggered by removal of two
    // component shapes when making a dependent premise, so we only want to do this
    // when queue is half full
    if (selected_links.length === 1) {
      selected_links.pop();
    }
    if (selected_premises.length == 1 ) {
      selected_premises.pop();
    }

    console.log('cell', cell);
    legend.remove(cell);
  }
})


interface KeyMap {
  [key: number]: boolean
}
const keys:KeyMap = {}

$(document).on('keydown', function(e:JQuery.Event) {
  keys[<number>e.which] = true;
  const paper_element = $('#paper-wrapper')[0];
  if (e.which === 16) {
    paper_element.style.cursor = 'grab'
  }
});


$(document).on('keyup', function(e:JQuery.Event) {
  keys[<number>e.which] = false;
  $('#paper-wrapper')[0].style.cursor = 'default';
});


//Div drag functionality taken from: 
//https://github.com/phuoc-ng/html-dom/blob/master/demo/drag-to-scroll/index.html
//adapted for conditional use based on shift key
export function initializeContainerDrag(container_id:string){
  const ele = document.getElementById(container_id) as HTMLElement;
  ele.style.cursor = 'default';

    let pos = { top: 0, left: 0, x: 0, y: 0 };

    const mouseDownHandler = function(e:MouseEvent) {
        if (!keys[16]) return;
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

    const mouseMoveHandler = function(e:MouseEvent) {
        // How far the mouse has been moved
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        // Scroll the element
        ele.scrollTop = pos.top - dy;
        ele.scrollLeft = pos.left - dx;
    };
  
    const mouseUpHandler = function() {
        ele.style.cursor = 'default';
        ele.style.removeProperty('user-select');

        ele.removeEventListener('mousemove', mouseMoveHandler);
        ele.removeEventListener('mouseup', mouseUpHandler);
    };

    // Attach the handler
    ele.addEventListener('mousedown', mouseDownHandler);
}