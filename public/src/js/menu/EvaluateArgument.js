const joint = window.joint;
import { color } from "../colors.js";
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
    let sum;
    let validity;
    if (cell.attributes.type != "dependent-premise") {
        validity = cell.attributes.validity;
    }
    else {
        let embeds = cell.getEmbeddedCells();
        validity = embeds[0].attributes.validity;
        for (let i = 1; i < embeds.length; i++) {
            validity *= embeds[i].attributes.validity;
        }
    }
    console.log("validity", validity, cell);
    sum = validity;
    let parent_links = graph.getConnectedLinks(cell, { inbound: true });
    //check if dependent premise, if it is, must also look for parent links for its children
    if (cell.attributes.type === "dependent-premise") {
        let embeds = cell.getEmbeddedCells();
        for (const embed of embeds) {
            parent_links.push(...graph.getConnectedLinks(embed, { inbound: true }));
        }
    }
    if (parent_links.length === 0) {
        addSumLabel(cell, sum);
        //cell.attr("text/text", sum.toString())
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
        let value = calculateSum(head, parent.parent, leaves, tree) * parseFloat(parent.link.attributes.labels[0].attrs.text.text);
        if (parent.link.attributes.attrs.line.stroke === color.link.dark.objection.stroke) {
            //parent is objection 
            value *= -1;
            //objection can not take away more than a cell contributes to the argument
            value = (Math.abs(value) > validity) ? validity * value / (Math.abs(value)) : value;
        }
        parent_sum += value;
    }
    let average = parent_sum / parents.length;
    sum += average;
    addSumLabel(cell, sum);
    //cell.attr("text/text", sum.toString())
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
    manageOldLabel();
    //the + removes trailing 0s
    let sum = +calculateSum(head, head, leaves, tree).toFixed(3);
    console.log("leaves", leaves);
    alert("The evaluation of this argument is: " + sum);
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
function addSumLabel(cell, sum) {
    let child_links = graph.getConnectedLinks(cell, { outbound: true });
    let sign_str = "";
    for (const link of child_links) {
        if (link.attributes.attrs.line.stroke === color.link.dark.claim.stroke) {
            sign_str = "+";
        }
        else if (link.attributes.attrs.line.stroke === color.link.dark.objection.stroke) {
            sign_str = "-";
        }
        let label = {
            attrs: {
                text: {
                    text: sign_str + sum.toString(),
                    stroke: link.attributes.attrs.line.stroke
                },
                rect: {
                    fill: "#222222",
                }
            },
            position: {
                distance: 0.25,
            }
        };
        if (link.labels().length === 1) {
            link.appendLabel(label);
        }
        else {
            link.label(1, label);
        }
        console.log("labels", link.labels);
    }
}
function manageOldLabel() {
    //set any old links to white stroke color
    let all_links = graph.getLinks();
    for (const link of all_links) {
        if (link.labels().length > 1) {
            let label = link.attributes.labels[1];
            link.label(1, {
                attrs: {
                    text: {
                        text: label.attrs.text.text,
                        stroke: "white"
                    },
                    rect: {
                        fill: "#222222",
                    }
                },
                position: {
                    distance: 0.25,
                }
            });
        }
    }
}
