const joint = window.joint
import { Claim } from "../Claim.js";
import { color } from "../colors.js";
import { DependentPremise } from "../DependentPremise.js";
import { graph, paper } from "../graph.js" 
import { selected_element } from "../tools/ManageTools.js";

interface idMap {
    [key:string]: boolean
}

function buildTree(head:joint.dia.Cell, cell:joint.dia.Cell, leaves:idMap, tree:idMap) {
    let parent_links = graph.getConnectedLinks(cell, {inbound: true})
    if (parent_links.length === 0) {
        console.log("leaf reached", cell)
        leaves[cell.id] = true;
        return
    }
    let parents:Array<joint.dia.Cell> = []
    for (const link of parent_links) {
        parents.push(graph.getCell(link.attributes.source.id))
    }
    for (const parent of parents) {
        buildTree(head, parent, leaves, tree);
    }
    tree[cell.id] = true;
    return
}

interface parentInfo {
    parent:joint.dia.Cell,
    link:joint.dia.Link
}

function calculateSum(head:joint.dia.Cell, cell:joint.dia.Cell, leaves:idMap, tree:idMap) {
    let sum;
    let validity
    if (cell.attributes.type != "dependent-premise") {
       validity = cell.attributes.validity;
    } else {
        let embeds = cell.getEmbeddedCells()
        validity = embeds[0].attributes.validity
        for (let i = 1; i < embeds.length; i++) {
            validity *= embeds[i].attributes.validity
        }
    }
    console.log("validity", validity, cell)
    sum = validity
    console.log("cell validity", cell.attributes.validity)
    let parent_links = graph.getConnectedLinks(cell, {inbound: true})
    //check if dependent premise, if it is, must also look for parent links for its children
    if (cell.attributes.type === "dependent-premise") {
        let embeds = cell.getEmbeddedCells()
        for (const embed of embeds) {
            parent_links.push(...graph.getConnectedLinks(embed, {inbound:true}))
        }
    }
    if (parent_links.length === 0) {
        console.log("leaf reached", cell)
        leaves[cell.id] = true;
        cell.attr("text/text", sum.toString())
        return sum
    }
    let parents:Array<parentInfo> = []
    for (const link of parent_links) {
        let info:parentInfo = {
            parent: graph.getCell(link.attributes.source.id),
            link: link
        }
        parents.push(info)
    }
    let parent_sum:number = 0
    for (const parent of parents) {       
        let value = calculateSum(head, parent.parent, leaves, tree) * parseFloat( parent.link.attributes.labels[0].attrs.text.text )   
        if (parent.link.attributes.attrs.line.stroke === color.link.dark.objection.stroke) {
            //parent is objection 
            value *= -1;
            //objection can not take away more than a cell contributes to the argument
            value = (Math.abs(value) > validity) ? validity * value / (Math.abs(value)) : value
        }                                            
        parent_sum += value ;
    }
    let average = parent_sum / parents.length
    sum += average
    tree[cell.id] = true;
    cell.attr("text/text", sum.toString())
    return sum
}

export function evaluateArgument() {
    let head = selected_element
    console.log("head of summation", head)
    if (head === undefined || graph.getCell(head.id) === undefined) {
        alert("Please select a cell to sum")
        return
    }
    console.log("head", head)
    //first collect all cells relevant to this summation (upside down tree)
    let leaves:idMap = {}
    let tree:idMap = {}
    //the + removes trailing 0s
    let sum = +calculateSum(head, head, leaves, tree).toFixed(3)

    console.log("leaves", leaves)

    alert("The evaluation of this argument is: " + sum )

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

interface ObjectionInfo {
    objection:joint.dia.Cell;
    link: joint.dia.Link
}

function checkObjections(cell:joint.dia.Cell) {
    let objections:Array<ObjectionInfo> = []
    let inbound_links = graph.getConnectedLinks(cell, {inbound:true})
    console.log("inboundlinks", inbound_links)
    for (const link of inbound_links) {
        console.log("link",link)
        let sourceid = link.attributes.source
        console.log("source",sourceid)
        let source = graph.getCell(sourceid)
        if (source.attributes.type === "objection") {
            console.log("objection to claim " + cell.attributes.id + " in summation")
            let objection = { objection: source, link: link }
            objections.push(objection)
        }
    }
    return objections
}

// for a claim: 
// likelihood = claim.attributes.likelihood * factorObjections(claim, claim)
// sum += likelihood * weight


function factorObjections(head:joint.dia.Cell, cell:joint.dia.Cell) {
    let validity = cell.attributes.validity
    console.log("cell",cell)
    let objections = checkObjections(cell);
    //head has no objections
    if (objections.length === 0 && head === cell) return 1;
    //objection has no further objections
    if (objections.length === 0) return cell.attributes.validity;
    for (const objection of objections) {
        console.log(objection)
        console.log(objection.link.attributes.labels[0].attrs.text.text)
        let link_weight = parseFloat(objection.link.attributes.labels[0].attrs.text.text)
        console.log("LINK WEIGHT", link_weight)
        validity *= 1 - ( factorObjections(head, objection.objection) *  link_weight)
        console.log("validity", validity)
    }
    return validity
}