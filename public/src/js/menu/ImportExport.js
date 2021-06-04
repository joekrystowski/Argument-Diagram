import { graph } from '../graph.js';
<<<<<<< HEAD
//import { inspect } from '../util.js'
=======
>>>>>>> 75e3b7b9d21e366226b0e60bf8f658c390c8a942
export function importGraph() {
    console.log('test');
}
export function exportGraph() {
    const data = JSON.stringify(graph.toJSON());
<<<<<<< HEAD
    console.log(data);
    const filename = "myDiagram.JSON";
=======
    const filename = "myDiagram.json";
>>>>>>> 75e3b7b9d21e366226b0e60bf8f658c390c8a942
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
