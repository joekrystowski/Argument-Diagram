const joint = window.joint;
import { graph } from "../graph.js";
export function evaluateArgument() {
    let sum = 0;
    let elements = graph.getElements();
    console.log("elements", elements);
    for (let i = 0; i < elements.length; i++) {
        let cell = elements[i];
        let validity;
        if (cell.attributes.type === "dependent-premise") {
            let arr = [];
            let children = cell.getEmbeddedCells();
            for (let j = 0; j < children.length; j++) {
                arr.push(children[j].attributes.validity);
            }
            validity = arr.reduce((accumulated, current) => accumulated * current, 1);
        }
        else if (cell.attributes.type === "objection") {
            continue;
            //validity = cell.attributes.validity * factorObjections(cell, cell)
        }
        else {
            validity = cell.attributes.validity * factorObjections(cell, cell);
        }
        let outbound_links = graph.getConnectedLinks(cell, { outbound: true });
        console.log("outbound_links", outbound_links);
        for (let link = 0; link < outbound_links.length; link++) {
            let weight = parseFloat(outbound_links[link].attributes.labels[0].attrs.text.text);
            let link_sum = validity * weight;
            if (cell.attributes.type === "objection") {
                link_sum *= -1;
            }
            sum += link_sum;
            console.log(sum);
        }
    }
    console.log("The evaluation of this argument is:", sum);
}
function checkObjections(cell) {
    let objections = [];
    let inbound_links = graph.getConnectedLinks(cell, { inbound: true });
    console.log("inboundlinks", inbound_links);
    for (const link of inbound_links) {
        console.log("link", link);
        let sourceid = link.attributes.source;
        console.log("source", sourceid);
        let source = graph.getCell(sourceid);
        if (source.attributes.type === "objection") {
            console.log("objection to claim " + cell.attributes.id + " in summation");
            let objection = { objection: source, link: link };
            objections.push(objection);
        }
    }
    return objections;
}
// for a claim: 
// likelihood = claim.attributes.likelihood * factorObjections(claim, claim)
// sum += likelihood * weight
function factorObjections(head, cell) {
    let validity = cell.attributes.validity;
    console.log("cell", cell);
    let objections = checkObjections(cell);
    //head has no objections
    if (objections.length === 0 && head === cell)
        return 1;
    //objection has no further objections
    if (objections.length === 0)
        return cell.attributes.validity;
    for (const objection of objections) {
        console.log(objection);
        console.log(objection.link.attributes.labels[0].attrs.text.text);
        let link_weight = parseFloat(objection.link.attributes.labels[0].attrs.text.text);
        console.log("LINK WEIGHT", link_weight);
        validity *= 1 - (factorObjections(head, objection.objection) * link_weight);
        console.log("validity", validity);
    }
    return validity;
}
