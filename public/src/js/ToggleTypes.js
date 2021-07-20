const joint = window.joint;
import { color } from "./colors.js";
import { graph } from "./graph.js";
import { createColor } from "./colors.js";
export function ClaimToObjection(cell) {
    //turn claim into objection
    // *** 
    //currently only using dark mode colors
    // ***
    //cell body
    cell.attributes.type = "objection";
    cell.attr("rect/stroke", color.objection.dark.stroke);
    cell.attr("rect/fill", createColor(cell.attributes.validity, cell.attributes.type));
    //links
    let links = graph.getConnectedLinks(cell, { outbound: true });
    for (let i = 0; i < links.length; i++) {
        let link = links[i];
        //set stroke
        link.attr("line/stroke", color.objection.dark.stroke);
        link.label(0, {
            attrs: {
                text: {
                    text: link.attributes.labels[0].attrs.text.text,
                    stroke: color.objection.dark.stroke,
                    fill: color.objection.dark.stroke
                },
                rect: {
                    fill: "#222222" //background color
                }
            }
        });
    }
}
export function ObjectionToClaim(cell) {
    //turn objection into claim
    // *** 
    //currently only using dark mode colors
    // ***
    //cell body
    cell.attributes.type = "claim";
    cell.attr("rect/stroke", color.claim.dark.stroke);
    cell.attr("rect/fill", createColor(cell.attributes.validity, cell.attributes.type));
    //links
    let links = graph.getConnectedLinks(cell, { outbound: true });
    for (let i = 0; i < links.length; i++) {
        let link = links[i];
        //set stroke
        link.attr("line/stroke", color.claim.dark.stroke);
        //redraw the label
        link.label(0, {
            attrs: {
                text: {
                    text: link.attributes.labels[0].attrs.text.text,
                    stroke: color.claim.dark.stroke,
                    fill: color.claim.dark.stroke
                },
                rect: {
                    fill: "#222222" //background color
                }
            }
        });
    }
}
