import { graph } from '../graph.js';
import { createClaim, createDependentPremise, } from "../menu/CreateClaim.js";
import { save } from '../util.js';
import { createLink } from "../tools/LinkButton.js";
import { legend } from './Legend.js';
import { ClaimToObjection } from "../ToggleTypes.js";
var firebase = window.firebase.default;
var database = firebase.database();
// default name that updates for exporting
export let currentDiagram = "myDiagram";
// not fully working
function parseJSON(cells, legend_import) {
    let ids = {};
    var i = 0, len = cells.length;
    //parse cells
    while (i < len) {
        const type = cells[i].type;
        if (type === "standard.Link") {
            const source = cells[i].source.id;
            const target = cells[i].target.id;
            console.log(cells[i]);
            const color = cells[i].attrs.line.stroke;
            createLink(ids[source].rect, ids[target].rect, color);
        }
        else {
            //skip if has parent, will be added when dp is added
            if (cells[i].parent) {
                console.log("imported cell has parent");
                i++;
                continue;
            }
            if (type === "claim") {
                importClaim(cells[i], ids);
            }
            else if (type === "objection") {
                let cell = importClaim(cells[i], ids);
                ClaimToObjection(cell);
            }
            // insert dependent premise here
            else if (type === "dependent-premise") {
                //get list of embed ids
                let embeds;
                embeds = cells[i].embeds;
                //create all embeded children
                let rects;
                rects = [];
                embeds.forEach(id => {
                    let child = getCellById(id, cells);
                    //create child
                    let rect = importClaim(child, ids);
                    rects.push(rect);
                });
                //embed children
                let first_child = rects[0];
                for (let j = 1; j < rects.length; j++) {
                    const second_child = rects[j];
                    //create dependent premise
                    first_child = createDependentPremise(first_child, second_child);
                }
                ids[cells[i].id] = first_child;
            }
        }
        i++;
    }
    //build legend
    legend.enable();
    for (let id in ids) {
        legend.insert(ids[id], legend_import[id], true);
    }
    if (legend.active) {
        $('#legend-button').trigger('click');
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
                legend.clear();
                legend.disable();
                const dataObj = JSON.parse(content);
                parseJSON(dataObj.cells, dataObj.legend);
            }
        };
    };
    input.click();
}
export function exportGraph() {
    let graph_data = JSON.stringify(graph.toJSON(), null, 2);
    let dataObj = JSON.parse(graph_data);
    dataObj.legend = legend.toExportForm();
    const data = JSON.stringify(dataObj, null, 2);
    const filename = `${currentDiagram}.json`; // default name
    save(data, "application/json", filename);
}
export function saveGraph() {
    const user = firebase.auth().currentUser;
    if (user === null)
        return;
    const userRef = firebase.database().ref('users/' + user.uid);
    let graph_data = JSON.stringify(graph.toJSON(), null, 2);
    let dataObj = JSON.parse(graph_data);
    dataObj.legend = legend.toExportForm();
    const data = JSON.stringify(dataObj, null, 2);
    const inputName = document.getElementById("filename");
    inputName.value = currentDiagram;
    $("#filename-dialog").dialog('open');
    const saveName = document.getElementById("save-filename-button");
    saveName.onclick = function () {
        console.log(inputName.value);
        const diagram = inputName.value.length === 0 ? "myDiagram" : inputName.value;
        let confirm = true;
        console.log(diagram);
        userRef.child(diagram).once('value', (snapshot) => {
            if (snapshot.exists()) // handle pre-existing diagram name
                confirm = window.confirm(`Erase existing content in diagram with name: \"${diagram}\"?`);
            if (confirm) {
                currentDiagram = diagram;
                userRef.child(diagram).set(data);
                $('#filename-dialog').dialog('close');
            }
        });
    };
}
export function openGraph() {
    const user = firebase.auth().currentUser;
    if (user === null) {
        return;
    }
    const userRef = firebase.database().ref('users/' + user.uid);
    const diagramsContainer = document.getElementById('firebase-diagrams-container');
    $('#files-dialog').dialog('open');
    userRef.on('value', (snapshot) => {
        const data = snapshot.val();
        // console.log(data);
        while (diagramsContainer.firstChild) { //TODO: make more efficient
            diagramsContainer.removeChild(diagramsContainer.firstChild);
        }
        for (const diagram in data) {
            console.log('diagram');
            const diagramItem = document.createElement('li');
            diagramItem.classList.add('diagram-item');
            diagramItem.textContent = diagram;
            diagramItem.addEventListener('click', () => {
                const erase = window.confirm("Erase your current workspace?");
                if (erase) {
                    graph.clear();
                    legend.clear();
                    legend.disable();
                    const dataObj = JSON.parse(data[diagram]);
                    parseJSON(dataObj.cells, dataObj.legend);
                    diagramsContainer.style.display = 'none';
                    currentDiagram = diagram;
                    $('#files-dialog').dialog('close');
                }
            });
            diagramsContainer.appendChild(diagramItem);
            diagramsContainer.style.display = 'block';
            diagramsContainer.style.alignItems = 'center';
        }
    });
}
function getCellById(id, cells) {
    for (let cell of cells) {
        if (cell.id == id) {
            return cell;
        }
    }
    ;
    throw new Error("Cell id not found");
}
function importClaim(cell, ids) {
    const pos = cell.position;
    let text;
    if (cell.inLegendForm) {
        text = cell.storedInfo.initialText;
    }
    else {
        text = cell.attrs.text.text;
    }
    const arg = createClaim(pos.x, pos.y, text, cell.validity);
    ids[cell.id] = arg;
    return arg.rect;
}
