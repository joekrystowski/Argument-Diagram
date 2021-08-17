const joint = window.joint;
import { paper, graph } from "../../graph.js"
import { Node } from "./ArgumentNode.js"

interface dimensions {
    width: number,
    height: number
}

interface argument_data {
    levels: Array<Array<Node> >
    dimensions: Array<dimensions>
}

interface position {
    x: number,
    y: number
}

//can be adjusted to change spacing between cells in cleanup
let increment = {
    x:50,
    y:75
}

function startCleanup(all_arguments:Array <Array<joint.dia.Cell> >) {
    let arg_data:Array<argument_data> = []
    for (const argument of all_arguments) {
       arg_data.push(AutomaticCleanUp(argument))
    }
    buildGraph(arg_data)
}

export function AutomaticCleanUp(argument:Array<joint.dia.Cell>) {
    //find all leaf nodes of the argument
    let leaves:Array<Node> = findLeaves(argument);
    console.log("leaves", leaves)
    let levels:Array< Array<Node> > = [];
    //every parent of a leaf node is level 1, parents of level 1 are level 2, and so on
    let parents:Array<Node> = []
    let current = leaves
    let checked:Array<Node> = []
    while (current.length > 0) {
        console.log("current level", current)
        levels.push(current)
        parents = []
        for (const node of current) {
            let parent_links = graph.getConnectedLinks(node.cell, {inbound:true})
            if (node.cell.get("embeds")) {
                let children = node.cell.getEmbeddedCells()
                //get embed children for parent links as well
                for (const child of children) {
                    let links = graph.getConnectedLinks(child, {inbound:true})
                    parent_links.push(...links)
                }
            }
            console.log("parent_links", parent_links)
            for (const link of parent_links) {
                let parentid = link.attributes.source.id
                let parent = graph.getCell(parentid)
                if (parent.get("parent")) {
                    parent = graph.getCell(parent.get("parent"))
                }
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
            width_sum += node.cell.attributes.size.width + increment.x
        }
        dimensions.push( 
            {
                width: width_sum,
                height: max_height
            }
        )
    }

    let data:argument_data = 
    {
        levels: levels,
        dimensions: dimensions
    }

    return data;

}

function buildGraph(arg_data:Array<argument_data>) {

    let start_x = increment.x;    

    for (const argument of arg_data) {
        let levels = argument.levels;
        let dimensions = argument.dimensions

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
        let y = increment.y;
        for (let i = levels.length-1; i >= 0; i--) {
            let buffer = ( widest - dimensions[i].width ) / 2
            let x = start_x + buffer;
            for (const node of levels[i]) {
                let current_position:position = 
                {  
                    x: node.cell.attributes.position.x,
                    y: node.cell.attributes.position.y
                }
                //change position of node
                node.cell.set("position", {x: x, y: y})
                let difference_x = x - current_position.x
                let difference_y = y - current_position.y
                //move embeds as well
                if (node.cell.get("embeds")) {
                    let embeds = node.cell.getEmbeddedCells();
                    for (const embed of embeds) {
                        let new_x = embed.attributes.position.x +difference_x;
                        let new_y = embed.attributes.position.y +difference_y
                        embed.set("position", {x:new_x, y:new_y})
                    }
                }
                x += node.cell.attributes.size.width + increment.x
            }
            y += dimensions[i].height + increment.y
        }
        
        //increment startx
        start_x += widest + increment.x 
    }

 
}

function findLeaves(cells:Array<joint.dia.Cell>) {
    let leaves:Array<Node> = []
    for (let cell of cells) {
        if (cell.get("parent")) {
            cell = graph.getCell(cell.get("parent"))
        }
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

export function findArguments() {
    //array of all elements (excludes links) on graph
    let cells = graph.getElements();
    // //filter out embeded cells (cells with parents)
    // let cells:Array <joint.dia.Cell> = []
    // for (const cell of all_cells) {
    //     if (!(cell.get("parent"))) {
    //         cells.push(cell)
    //         console.log("pushed", cell)
    //     }
    // }
    
    //array of arguments (arguments are arrays of nodes)
    //cant name a variable "arguments" in typescript
    let all_arguments:Array <Array<joint.dia.Cell> > = []
    
    //pick a cell in the levels array
    //this is the "head" of the "main" tree, regardless of where it is
    let head:joint.dia.Cell | null = pickCell(cells);
    //check if there are no cells left in the levels array, if there are none, exit. All arguments found
    while (head != null) {
        //search through this argument recursively to find all of the other cells in it's argument block
        //  - when a cell is checked, remove it from the levels array so that it can not be selected later
        let argument = searchArgument(head, cells);
        //push arugment
        all_arguments.push(argument)
        //pick another cell that is left in the levels & repeat
        head = pickCell(cells)
    }
    //check that cells array is empty (otherwise we missed something) 
    if (cells.length != 0) {
        alert("Error with cleanup. Could not find all cells when sorting arguments")
        return;
    }

    startCleanup(all_arguments)

}

function pickCell(cells:Array<joint.dia.Cell>) {
    //this function iterates through the cells array and returns the first cell available
    for (const cell of cells) {
        if (cell.get("parent")) {
            return graph.getCell(cell.get("parent"))
        } else {
            return cell;
        }
    }
    return null
}

function searchArgument(head:joint.dia.Cell, cells:Array<joint.dia.Cell>) {
    console.log("STARTING SEARCH -----------")
    let argument:Array<joint.dia.Cell> = []
    let current:Array<joint.dia.Cell> = []
    let next:Array<joint.dia.Cell> = [head]
    while (true) {
        current = next
        next = []
        if (current.length === 0) {
            ///end of search
            console.log("ARGUMENT SEARCH COMPLETE", argument)
            return argument
        }
        console.log("current",current)
        for (let cell of current) {
            if (cell.get("parent")) {
                let parent = graph.getCell(cell.get("parent"))
                if (cells.filter(c => c.id === parent.id).length > 0) {
                    let index = findCellIndex(parent.id, cells)
                    cells.splice(index, 1)
                    argument.push(parent)
                    next.push(parent)
                }
            }
            if (cell.get("embeds")) {
                //include embeds
                let children = cell.getEmbeddedCells();
                for (const child of children) {
                    if (cells.filter(c => c.id === child.id).length > 0) {
                        let index = findCellIndex(child.id, cells)
                        cells.splice(index, 1);
                        argument.push(child)
                        next.push(child)
                    }
                }
            }
            let connections = graph.getConnectedLinks(cell);
            if (connections.length === 0 && next.length === 0) {
                //cell by itself
                argument.push(cell);
                //find cell index in cells array
                let index = findCellIndex(cell.id, cells)
                cells.splice(index, 1)
                console.log("ARGUMENT SEARCH COMPLETE", argument)
                return argument;
            }
            for (const connection of connections) {
                console.log("connection", connection)
                //get cell on other side of connection (link)
                let connected_cell:joint.dia.Cell
                if (connection.attributes.source.id === cell.id) {
                    connected_cell = graph.getCell(connection.attributes.target.id)
                } else {
                    connected_cell = graph.getCell(connection.attributes.source.id)
                }
                console.log("connected cell", connected_cell)
                if (connected_cell.get("parent")) {
                    next.push(graph.getCell(connected_cell.get("parent")))
                }
                //check if connection is new to argument
                if (cells.filter(c => c.id === connected_cell.id).length > 0) {
                    //cells array contains this connection, which means it is new
                    //find cell index in cells array
                    let index = findCellIndex(connected_cell.id, cells)
                    console.log("cells", [...cells])
                    console.log("index", index)
                    //remove it from cells array
                    cells.splice(index,1)
                    //add connection to argument array
                    argument.push(connected_cell);
                    console.log("argument", argument)
                    //add cell to next array
                    next.push(connected_cell);
                }
            }
        }
        console.log("next",next)
    }
}

function findCellIndex(id:string | number, cells:Array<joint.dia.Cell>) {
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].id === id) {
            return i
        }
    }
    return -1
}