const joint = window.joint;
import { paper, graph } from "../../graph.js"
import { Node } from "./ArgumentNode.js"

interface dimensions {
    width: number,
    height: number
}

let increment = 50;

export function AutomaticCleanUp() {
    //find all leaf nodes
    let leaves:Array<Node> = findLeaves();
    let levels:Array< Array<Node> > = [];
    //every parent of a leaf node is level 1, parents of level 1 are level 2, and so on
    let parents:Array<Node> = []
    let current = leaves
    let checked:Array<Node> = []
    while (current.length > 0) {
        levels.push(current)
        parents = []
        for (const node of current) {
            let parent_links = graph.getConnectedLinks(node.cell, {inbound:true})
            for (const link of parent_links) {
                let parentid = link.attributes.source.id
                let parent = graph.getCell(parentid)
                let parent_index = findCell(parents, parent)
                let parent_node:Node;
                if (parent_index === -1) {
                    //new parent for level found
                    parent_node = new Node(parent, node.level + 1)
                    parents.push(parent_node)
                    console.log(parents)
                } else {
                    parent_node = parents[parent_index]
                }
                parent_node.children.push(node)
                node.parents.push(parent_node)
                let checked_index = findCell(checked, parent)
                if ( checked_index === -1) {
                    checked.push(parent_node)
                } else {
                    //already been checked before
                    let checked_node = checked[checked_index];
                    
                    //skip, checked node is on the same level
                    if (checked_node.level === levels.length) {
                        continue;
                    }
                    //find it in the levels arrays
                    let level = levels[checked_node.level]
                    let level_index = findCell(level, checked_node.cell)

                    //remove it from the levels arrays
                    level.splice(level_index,1)

                    //put it in the right level
                    let new_level = node.level + 1
                    //will be placed in correct level by parents array

                    //update to new level
                    checked_node.level = new_level
                }
            }
        }
        current = parents;
    }
    console.log("Argument levels", levels)

    let dimensions:Array<dimensions> = []
    //find dimensions of levels
    for (const level of levels) {
        let width_sum = 0;
        let max_height = 0;
        for (const node of level) {
            console.log("node", node)
            let height = node.cell.attributes.size.height
            if (height > max_height) max_height = height
            width_sum += node.cell.attributes.size.width + increment
        }
        dimensions.push( 
            {
                width: width_sum,
                height: max_height
            }
        )
    }

        //find the widest level 
        let widest = 0;
        let widest_level = 0;
    
        for (let i = 0; i < dimensions.length; i++) {
            const dimension = dimensions[i]
            //level is an array of nodes
            if (dimension.width > widest) {
                widest = dimension.width
                widest_level = i
            }
        }
    

    //build argument
    let start_x = increment;
    let y = increment;
    for (let i = levels.length-1; i >= 0; i--) {
        let buffer = ( widest - dimensions[i].width ) / 2
        let x = start_x + buffer;
        for (const node of levels[i]) {
            //change position of node
            node.cell.set("position", {x: x, y: y})
            x += node.cell.attributes.size.width + increment
        }
        y += dimensions[i].height + increment
    }
}



function findLeaves() {
    let cells = graph.getElements();
    let leaves:Array<Node> = []
    for (const cell of cells) {
        let outbound_links = graph.getConnectedLinks(cell, {outbound:true})
        if (outbound_links.length === 0) {
            //leaf cell
            let node = new Node(cell, 0)
            leaves.push(node)
        }
    }
    return leaves
}

function findCell(nodes:Array<Node>, cell:joint.dia.Cell) {
    const index = nodes.map(node => node.cell.id).indexOf(cell.id);
    console.log("index", index)
    return index
} 

function searchLevels(levels:Array< Array<Node> >, cell:joint.dia.Cell) {

    for (const level of levels) {
        let cell_index = findCell(level, cell);
        if (cell_index != -1) {
            level.splice(cell_index,1)
            return true
        }
    }
}