import { graph } from '../graph.js';
const joint = window.joint;
// not fully working
export function importGraph() {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = function (e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = readerEvent => {
            const content = readerEvent.target.result;
            graph.fromJSON(JSON.parse(content));
        };
    };
    input.click();
    //const erase = window.confirm("Erase your current workspace?")
}
export function exportGraph() {
    const data = JSON.stringify(graph.toJSON(), null, 2);
    const filename = "myDiagram.json";
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
