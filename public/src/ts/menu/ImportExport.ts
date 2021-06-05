import { graph } from '../graph.js'
const joint = window.joint;

export function importGraph(): void {
    const erase = window.confirm("Erase your current workspace?");
    console.log(erase);
    const newGraph = new joint.dia.Graph;
    //newGraph.fromJSON();
}

export function exportGraph(): void {
    const data = JSON.stringify(graph.toJSON());
    const filename = "myDiagram.json";
    const file = new Blob([data], {type: "application/json"});    
    if (window.navigator.msSaveOrOpenBlob) {// IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    } else { // Others
        const a = document.createElement("a");
        const url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    } 
}