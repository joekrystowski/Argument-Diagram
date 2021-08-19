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
                    'r': 10,
                    'fill': "#222222",
                    "fill-opacity": 0,
                    'cursor': "pointer"
                }
            }, {
                tagName: "g",
                selector: "g-tag",
                attributes: {
                    transform: "translate(-10, -10)",
                },
                children: [{
                        tagName: 'path',
                        selector: 'icon',
                        attributes: {
                            //genuinely no idea what this is called but I used it to draw the arrow on the button
                            'd': "M16.469,8.924l-2.414,2.413c-0.156,0.156-0.408,0.156-0.564,0c-0.156-0.155-0.156-0.408,0-0.563l2.414-2.414c1.175-1.175,1.175-3.087,0-4.262c-0.57-0.569-1.326-0.883-2.132-0.883s-1.562,0.313-2.132,0.883L9.227,6.511c-1.175,1.175-1.175,3.087,0,4.263c0.288,0.288,0.624,0.511,0.997,0.662c0.204,0.083,0.303,0.315,0.22,0.52c-0.171,0.422-0.643,0.17-0.52,0.22c-0.473-0.191-0.898-0.474-1.262-0.838c-1.487-1.485-1.487-3.904,0-5.391l2.414-2.413c0.72-0.72,1.678-1.117,2.696-1.117s1.976,0.396,2.696,1.117C17.955,5.02,17.955,7.438,16.469,8.924 M10.076,7.825c-0.205-0.083-0.437,0.016-0.52,0.22c-0.083,0.205,0.016,0.437,0.22,0.52c0.374,0.151,0.709,0.374,0.997,0.662c1.176,1.176,1.176,3.088,0,4.263l-2.414,2.413c-0.569,0.569-1.326,0.883-2.131,0.883s-1.562-0.313-2.132-0.883c-1.175-1.175-1.175-3.087,0-4.262L6.51,9.227c0.156-0.155,0.156-0.408,0-0.564c-0.156-0.156-0.408-0.156-0.564,0l-2.414,2.414c-1.487,1.485-1.487,3.904,0,5.391c0.72,0.72,1.678,1.116,2.696,1.116s1.976-0.396,2.696-1.116l2.414-2.413c1.487-1.486,1.487-3.905,0-5.392C10.974,8.298,10.55,8.017,10.076,7.825",
                            'fill': 'white',
                            'stroke': 'white',
                            'stroke-width': 1,
                            'pointer-events': 'none'
                        }
                    }],
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
                else {
                    joint.dia.HighlighterView.remove(selected_links[1].findView(paper), 'link-highlight');
                    selected_links.pop();
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
                dialogClass: 'error',
                close: function () {
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
export function createLink(model1, model2, _color) {
    console.log(model1.attributes.link_color);
    let link_color = _color !== null && _color !== void 0 ? _color : color.link.dark.claim.stroke;
    // if (model1.attributes.type === "claim") {
    //   link_color = color.claim.dark.stroke
    // } else if (model1.attributes.type === "objection") {
    //   link_color = color.objection.dark.stroke
    // } else if (model1.attributes.type === "dependent-premise") {
    //   link_color = color.dependentPremise.stroke
    // }
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
