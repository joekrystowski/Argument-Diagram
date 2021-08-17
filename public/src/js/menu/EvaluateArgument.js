const joint = window.joint;
import { graph } from "../graph.js";
import { selected_element } from "../tools/ManageTools.js";
function buildTree(head, cell, leaves, tree) {
    let parent_links = graph.getConnectedLinks(cell, { inbound: true });
    if (parent_links.length === 0) {
        console.log("leaf reached", cell);
        leaves[cell.id] = true;
        return;
    }
    let parents = [];
    for (const link of parent_links) {
        parents.push(graph.getCell(link.attributes.source.id));
    }
    for (const parent of parents) {
        buildTree(head, parent, leaves, tree);
    }
    tree[cell.id] = true;
    return;
}
function calculateSum(head, cell, leaves, tree) {
    let sum = cell.attributes.validity;
    console.log("cell validity", cell.attributes.validity);
    let parent_links = graph.getConnectedLinks(cell, { inbound: true });
    if (parent_links.length === 0) {
        console.log("leaf reached", cell);
        leaves[cell.id] = true;
        cell.attr("text/text", sum);
        return sum;
    }
    let parents = [];
    for (const link of parent_links) {
        let info = {
            parent: graph.getCell(link.attributes.source.id),
            link: link
        };
        parents.push(info);
    }
    let parent_sum = 0;
    for (const parent of parents) {
        parent_sum += calculateSum(head, parent.parent, leaves, tree) * parseFloat(parent.link.attributes.labels[0].attrs.text.text);
    }
    let average = parent_sum / parents.length;
    sum += average;
    tree[cell.id] = true;
    cell.attr("text/text", sum);
    return sum;
}
export function evaluateArgument() {
    let head = selected_element;
    console.log("head of summation", head);
    if (head === undefined || graph.getCell(head.id) === undefined) {
        alert("Please select a cell to sum");
        return;
    }
    console.log("head", head);
    //first collect all cells relevant to this summation (upside down tree)
    let leaves = {};
    let tree = {};
    //the + removes trailing 0s
    let sum = +calculateSum(head, head, leaves, tree).toFixed(3);
    console.log("leaves", leaves);
    alert("The evaluation of this argument is: " + sum);
    // let elements = graph.getElements()
    // console.log("elements",elements)
    // for (let i = 0; i < elements.length; i++) {
    //     let cell = elements[i]
    //     let validity
    //     if (cell.attributes.type === "dependent-premise") {
    //         let arr = []
    //         let children = cell.getEmbeddedCells()
    //         for (let j = 0; j < children.length; j++) {
    //             arr.push(children[j].attributes.validity)
    //         }
    //         validity = arr.reduce( (accumulated, current) => accumulated * current, 1)
    //     } else if (cell.attributes.type === "objection") {
    //         continue;
    //         //validity = cell.attributes.validity * factorObjections(cell, cell)
    //     } else { 
    //         validity = cell.attributes.validity * factorObjections(cell, cell)
    //     }
    //     let outbound_links = graph.getConnectedLinks(cell, {outbound:true})
    //     console.log("outbound_links",outbound_links)
    //     for (let link = 0; link < outbound_links.length; link++) {
    //         let weight = parseFloat(outbound_links[link].attributes.labels[0].attrs.text.text)
    //         let link_sum = validity * weight;
    //         if (cell.attributes.type === "objection") {
    //             link_sum *= -1;
    //         }
    //         sum += link_sum;
    //         console.log(sum)
    //     }
    // }
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
