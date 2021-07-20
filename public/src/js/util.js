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
