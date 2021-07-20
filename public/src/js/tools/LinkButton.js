/* global joint addLinkTools graph */
const joint = window.joint;
import { color } from '../colors.js';
import { graph, paper } from '../graph.js';
import { legend } from '../menu/Legend.js';
import { addLinkTools } from './ManageTools.js';
export let selected_links = [];
joint.elementTools.LinkButton = joint.elementTools.Button.extend({
    name: "link-button",
    options: {
        markup: [{
                tagName: "circle",
                selector: "button",
                attributes: {
                    'r': 7,
                    'fill': "#3B8EA5",
                    'cursor': "pointer"
                }
            }, {
                tagName: 'path',
                selector: 'icon',
                attributes: {
                    //genuinely no idea what this is called but I used it to draw the arrow on the button
                    'd': 'M -4 -1 0 4 M 0 4 4 -1 M 0 4 0 -4',
                    'fill': 'none',
                    'stroke': '#EEF0F2',
                    'stroke-width': 2,
                    'pointer-events': 'none'
                }
            }],
        x: '100%',
        y: '2',
        offset: {
            x: 0,
            y: 0,
        },
        rotate: true,
        action: function () {
            let elementView = this.model.findView(paper);
            // this is where the actual function of the button goes (onclick event basically)
            console.log('linking mode active');
            //linking mode active
            selected_links.push(this.model);
            if (selected_links.length === 1) {
                if (selected_links[0].get('parent')) {
                    selected_links = [];
                    throw new Error("Can not set dependent premise claim as link source");
                }
            }
            console.log(this.model.id);
            console.log("currently selected: " + selected_links);
            //add highlight
            joint.highlighters.mask.add(elementView, { selector: 'root' }, 'link-highlight', {
                padding: 5,
                layer: "back",
                attrs: {
                    'stroke': '#6696ff',
                    'stroke-opacity': 1,
                    'stroke-width': 3,
                }
            });
            if (selected_links.length === 2) {
                //check if two models are the same model
                if (isValidLink(selected_links[0], selected_links[1])) {
                    createLink(selected_links[0], selected_links[1]);
                }
                joint.dia.HighlighterView.remove(elementView, 'link-highlight');
                joint.dia.HighlighterView.remove(selected_links[1].findView(paper), 'link-highlight');
                selected_links = [];
            }
            return;
        }
    }
});
function isValidLink(source, target) {
    if (source.id === target.id)
        return false;
    let disallowed_ids = [source.id];
    let path = [source.id];
    if (isCircularArgument(graph.getCell(target.id), disallowed_ids, path))
        return false;
    return true;
}
function isCircularArgument(current, disallowed_ids, path) {
    disallowed_ids.push(current.get('id'));
    path.push(current.get('id'));
    if (current.get('embeds')) {
        disallowed_ids.push(...current.get('embeds'));
    }
    if (current.get('parent')) {
        disallowed_ids.push(current.get('parent'));
        current = graph.getCell(current.get('parent'));
    }
    console.log('current', current);
    console.log('disallowed_ids', disallowed_ids);
    console.log('------------------------------');
    const outLinks = graph.getConnectedLinks(current, { outbound: true });
    let found_circular = false;
    for (let outLink of outLinks) {
        if (disallowed_ids.includes(outLink.attributes.target.id)) {
            const alert_text = generateCircularAlertString(path, outLink.attributes.target.id);
            const alert_dialog = document.createElement('div');
            alert_dialog.innerHTML = `<pre>${alert_text}</pre>`;
            document.body.append(alert_dialog);
            $(alert_dialog).dialog({
                autoOpen: true,
                title: 'ERROR',
                resizable: true,
                width: 500,
                height: 500,
                close: function (event, ui) {
                    $(this).dialog('destroy').remove();
                }
            });
            return true;
        }
        const outCell = graph.getCell(outLink.attributes.target.id);
        found_circular = isCircularArgument(outCell, disallowed_ids, path);
        console.log('outlink', outLink);
    }
    return found_circular;
}
function generateCircularAlertString(path, final_id) {
    const first_cell = graph.getCell(path[0]);
    const first_text = first_cell.attributes.storedInfo ? first_cell.attributes.storedInfo.initialText.replace(/\n/g, '\n    ') : 'Dependent Premise';
    // const first_text = graph.getCell(path[0]).attributes.storedInfo.initialText.replace(/\n/g, '\n    ');
    const first_target_cell = graph.getCell(path[1]);
    const first_target_text = first_target_cell.attributes.storedInfo ? first_target_cell.attributes.storedInfo.initialText.replace(/\n/g, '\n    ') : 'Dependent Premise';
    //const first_target_text = graph.getCell(path[1]).attributes.storedInfo.initialText.replace(/\n/g, '\n    ');
    const cells = path.map(id => graph.getCell(id));
    let output = `Failed to create link.\nReason: Circular argument detected.\n\nLink from\n   '${first_text}'\nto\n    '${first_target_text}'\nis illegal since\n   '${first_text}'\nis reachable from\n    '${first_target_text}'.\n\nPath:`;
    for (let cell of cells) {
        if (cell.get('embeds')) {
            output += '\n---- Dependent Premise';
        }
        else {
            output += `\n---- ${cell.attributes.storedInfo.initialText.replace(/\n/g, '\n        ')}`;
            if (cell.get('parent')) {
                output += '\n(continuing from parent...)';
            }
        }
    }
    output += `\n>>>> ${graph.getCell(final_id).attributes.storedInfo ? graph.getCell(final_id).attributes.storedInfo.initialText.replace(/\n/g, '\n    ') : 'Dependent Premise'}`;
    return output;
}
//link two rects together
export function createLink(model1, model2) {
    console.log(model1.attributes.link_color);
    let link_color;
    if (model1.attributes.type === "claim") {
        link_color = color.claim.dark.stroke;
    }
    else if (model1.attributes.type === "objection") {
        link_color = color.objection.dark.stroke;
    }
    else if (model1.attributes.type === "dependent-premise") {
        link_color = color.dependentPremise.stroke;
    }
    console.log("link color", link_color);
    //prevent dp from linking to one of its children
    if (model2.get('parent') && graph.getCell(model2.get("parent")) === model1) {
        console.log("ERROR: Dependent premise can not link to one of its own embeded children");
        return;
    }
    //passes in Claim objects
    let link = new joint.shapes.standard.Link();
    link.source(model1);
    link.target(model2);
    //link attributes based on arg1/rect1 (source)
    link.attr({
        line: {
            stroke: link_color
        }
    });
    //link text (maybe implement weights later?) for now everything has weight of 1.0 and the weights themselves do nothing
    link.labels([
        {
            attrs: {
                text: {
                    //class: model1.attributes.type+"-link-text",
                    text: model1.attributes.weight,
                    stroke: link_color,
                    fill: link_color
                },
                rect: {
                    //class: model1.attributes.type+"-link-rect",
                    fill: "#222222" //background color
                }
            }
        }
    ]);
    //link rects on graph
    console.log(link);
    link.addTo(graph);
    console.log("link made");
    addLinkTools(link);
    legend.refresh();
    //remove highlights from models
    let linkView1 = model1.findView(paper);
    joint.dia.HighlighterView.remove(linkView1, 'link-highlight');
    let linkView2 = model2.findView(paper);
    joint.dia.HighlighterView.remove(linkView2, 'link-highlight');
}
