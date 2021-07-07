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
        else {
            validity = cell.attributes.validity;
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
