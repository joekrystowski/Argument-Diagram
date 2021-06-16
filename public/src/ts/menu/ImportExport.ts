import { graph } from '../graph.js'
import {
  createArgument,
  createObjection,
  createDependentPremise,
} from "../menu/CreateArguments.js";
import {createLink} from "../tools/LinkButton.js"

export interface HashMap {
	[details: string] : joint.shapes.app.CustomRect;
} 

// not fully working
function parseJSON(cells: any[]): void {
	let argCount = 0;
	let objCount = 0;
	let ids: HashMap = {};
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

export function importGraph(): void {
	const input = document.createElement("input");
	input.type = "file";
	// choosing the file
	input.onchange = function(ev: Event) {
		const file = (ev.target as HTMLInputElement).files![0];
		if (file.type !== "application/json") {
			alert("File must be of .JSON type");
			return;
		}
		// read the file
		const reader = new FileReader();
		reader.readAsText(file, 'UTF-8');
		reader.onload = function(readerEvent: ProgressEvent<FileReader>) {
			const content = readerEvent.target!.result as string;
			const erase = window.confirm("Erase your current workspace?");
			if (erase) {
				graph.clear();
				parseJSON(JSON.parse(content).cells);
			}
		}
	}
	input.click();
}

export function exportGraph(): void {
	const data = JSON.stringify(graph.toJSON(), null, 2);
	const filename = "myDiagram.json"; // default name
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