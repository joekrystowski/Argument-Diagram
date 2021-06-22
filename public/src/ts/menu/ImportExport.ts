import { graph } from '../graph.js'
import {
  createClaim,
  createObjection,
  createDependentPremise,
} from "../menu/CreateClaim.js";
import {createLink} from "../tools/LinkButton.js"

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
			//skip if has parent, will be added when dp is added
			if (cells[i].parent) {
				console.log("imported cell has parent")
				i++;
				continue;
			}
			if (type === "claim") {
				importClaim(cells[i], ids)
			}
			else if (type === "objection") {
				importClaim(cells[i], ids)
			}
			// insert dependent premise here
			else if ( type === "dependent-premise" ){
				//get list of embed ids
				let embeds:string[];
				embeds = cells[i].embeds;

				//create all embeded children
				let rects:any[]
				rects = []
				embeds.forEach(id => {
					let child = getCellById(id, cells)
					//create child
					let rect = importClaim(child, ids)
					rects.push(rect)
				});

				//embed children
				let first_child = rects[0]
				for (let j = 1; j < rects.length; j++) {
					const second_child = rects[j];
					//create dependent premise
					console.log("i")
					first_child = createDependentPremise(first_child, second_child)
				}
				ids[cells[i].id] = first_child.rect


				// let first_child = createClaim(embeds[0].attributes.position.x, embeds[0].attributes.position.y, embeds[0].attributes.attrs.text.text);
				// ids[embeds[0].id] = first_child.rect;
				// for (let j = 0; j < embeds.length - 1; j++) {
				// 	const second_child = createClaim(embeds[j+1].attributes.position.x, embeds[j+1].attributes.position.y, embeds[j+1].attributes.attrs.text.text)
				// 	ids[embeds[j+1].id] = second_child.rect;
				// 	const obj = createDependentPremise(first_child.rect, second_child.rect)
				// 	ids[cells[i].id] = obj.rect;
				// 	first_child = second_child;
				// }
			}

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

function getCellById(id:string, cells:any[]){
	for (let cell of cells) {
		if (cell.id == id){ 
			return cell;
		}
	};
	throw new Error("Cell id not found")
}

function importClaim(cell:any, ids:HashMap) {
	const pos = cell.position;
	const text = cell.attrs.text.text;
	const arg = createClaim(pos.x, pos.y, text); 
	ids[cell.id] = arg.rect;
	return arg.rect
}