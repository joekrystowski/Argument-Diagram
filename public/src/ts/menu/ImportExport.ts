import { graph } from '../graph.js'
//import { inspect } from '../util.js'

export function importGraph() {
    console.log('test');
}

export function exportGraph() {
    const data = JSON.stringify(graph.toJSON());
    console.log(data);
    const filename = "myDiagram.JSON";
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