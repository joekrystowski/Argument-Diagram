import { graph } from '../graph.js'
import {
  createClaim,
  createObjection,
  createDependentPremise,
} from "../menu/CreateClaim.js";
import { createLink } from "../tools/LinkButton.js"
import { save } from '../util.js';

export interface HashMap {
	[details: string] : joint.shapes.app.ClaimRect;
} 

// not fully working
function parseJSON(cells: any[]): void {
	let ids: HashMap = {};
	var i = 0, len = cells.length;
	while (i < len) {
		const type = cells[i].type;
		if (type === "standard.Link") {
			const source = cells[i].source.id;
			const target = cells[i].target.id;
			createLink(ids[source], ids[target]);
		} 
		else {
			const pos = cells[i].position;
			const text = cells[i].attrs.text.text;
			if (type === "claim") {
				const arg = createClaim(pos.x, pos.y, text); 
				ids[cells[i].id] = arg.rect;	
			}
			else if (type === "objection") {
				const obj = createObjection(pos.x, pos.y, text);
				ids[cells[i].id] = obj.rect;
			}
			// insert dependent premise here
		}
		i++;
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
	save(data, "application/json", filename);
}
