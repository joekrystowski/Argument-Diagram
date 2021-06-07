import { graph } from '../graph.js'
const joint = window.joint;

// not fully working
export function importGraph(): void {
	const input = document.createElement('input');
	input.type = 'file';
	input.onchange = function(e: Event) {
		const file = (e.target as HTMLInputElement).files![0];
		const reader = new FileReader();
		reader.readAsText(file,'UTF-8');
		reader.onload = readerEvent => {
			const content = readerEvent.target!.result as string;
			graph.fromJSON(JSON.parse(content!));
		}
	}
	input.click();
	//const erase = window.confirm("Erase your current workspace?")
}

export function exportGraph(): void {
	const data = JSON.stringify(graph.toJSON(), null, 2);
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