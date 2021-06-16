import { graph } from '../graph.js';
import { createArgument, createObjection, } from "../menu/CreateArguments.js";
import { createLink } from "../tools/LinkButton.js";
// not fully working
function parseJSON(cells) {
    let argCount = 0;
    let objCount = 0;
    let ids = {};
    for (let i = 0; i < cells.length; i++) {
        const type = cells[i].type;
        const pos = cells[i].position;
        const text = cells[i].text;
        if (type === "argument") {
            const arg = createArgument(pos.x, pos.y, text);
            ids[cells[i].id] = arg.rect;
        }
        else if (type === "objection") {
            const obj = createObjection(pos.x, pos.y, text);
            ids[cells[i].id] = obj.rect;
        }
        else if (type === "standard.Link") {
            const source = cells[i].source.id;
            const target = cells[i].target.id;
            createLink(ids[source], ids[target]);
        }
    }
}
export function importGraph() {
    const input = document.createElement("input");
    input.type = "file";
    // choosing the file
    input.onchange = function (ev) {
        const file = ev.target.files[0];
        if (file.type !== "application/json") {
            alert("File must be of .JSON type");
            return;
        }
        // read the file
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = function (readerEvent) {
            const content = readerEvent.target.result;
            const erase = window.confirm("Erase your current workspace?");
            if (erase) {
                graph.clear();
                parseJSON(JSON.parse(content).cells);
            }
        };
    };
    input.click();
}
export function exportGraph() {
    const data = JSON.stringify(graph.toJSON(), null, 2);
    const filename = "myDiagram.json"; // default name
    const file = new Blob([data], { type: "application/json" });
    if (window.navigator.msSaveOrOpenBlob) { // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    }
    else { // Others
        const a = document.createElement("a");
        const url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}
