import { Claim } from '../Claim.js';
import { graph } from '../graph.js'
import {
  createClaim,
  createObjection,
  createDependentPremise,
} from "../menu/CreateClaim.js";
import {createLink} from "../tools/LinkButton.js"
import { legend, LegendMap, toggleLegend } from './Legend.js';

export interface HashMap {
	[details: string] : Claim;
} 

// not fully working
function parseJSON(cells: any[], legend_import:LegendMap): void {
	let ids: HashMap = {};
	var i = 0, len = cells.length;
	//parse cells
	while (i < len) {
		const type = cells[i].type;
		if (type === "standard.Link") {
			const source = cells[i].source.id;
			const target = cells[i].target.id;
			createLink(ids[source].rect, ids[target].rect);
		} 
		else {
			const pos = cells[i].position;
			let text;
			//if the graph was saved in legend mode, we need to retrieve the actual text
			//of the cell, not the legend number
			if(cells[i].inLegendForm){
				text = cells[i].storedInfo.initialText;
			}
			else {
				text = cells[i].attrs.text.text;
			}
			if (type === "claim") {
				const arg = createClaim(pos.x, pos.y, text); 
				ids[cells[i].id] = arg;	
			}
			else if (type === "objection") {
				const obj = createObjection(pos.x, pos.y, text);
				ids[cells[i].id] = obj;
			}
			// insert dependent premise here
		}
		i++;
	}

	//build legend
	legend.enable();
	for(let id in ids) {
		legend.insert(ids[id], legend_import[id], true);
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
				legend.clear();
				legend.disable();
				const dataObj = JSON.parse(content);
				parseJSON(dataObj.cells, dataObj.legend);
			}
		}
	}
	input.click();
}

export function exportGraph(): void {
	let graph_data = JSON.stringify(graph.toJSON(), null, 2);
	let dataObj = JSON.parse(graph_data);
	dataObj.legend = legend.toExportForm();
	console.log(dataObj);
	const data = JSON.stringify(dataObj, null, 2);
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