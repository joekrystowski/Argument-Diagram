/* global joint */
const joint = window.joint;
import { color } from "./colors.js";
import { graph, paper } from "./graph.js";
import { addRectTools } from "./tools/ManageTools.js";
import { selected_links } from "./tools/LinkButton.js";
//custom shape declaration for DependentPremise
const DependentPremiseRect = joint.shapes.standard.Rectangle.define("app.DependentPremise", {
    markup: '<g class="rotatable"><g class="scalable"><rect/></g><text/></g>',
    attrs: {
        rect: { fill: "white", stroke: "", width: 100, height: 100 },
        text: {
            "font-size": 12,
            "ref-x": 0.5,
            "ref-y": 0.5,
            ref: "rect",
            "y-alignment": "middle",
            "x-alignment": "middle",
        },
    },
    // ADD CUSTOM ATTRIBUTES HERE
    link_color: "green",
    weight: "1",
    type: "dependent-premise",
    props: [],
    setHeightBasedOnChildren: function () {
        const children = this.embeds;
        const height = Math.max(...children.map((child) => graph.getCell(child).get('size').height));
        graph.getCell(this.id).set({ size: { width: this.size.width, height: height + 13 } });
    }
});
Object.assign(joint.shapes, {
    app: {
        DependentPremiseRect,
    },
});
//class definition
export class DependentPremise {
    constructor(config) {
        let rect1 = config.rect1;
        let rect2 = config.rect2;
        let models = [];
        if (rect1.attributes.type === "dependent-premise") {
            console.log("combining dependent premise!");
            let embeds = rect1.getEmbeddedCells();
            console.log(embeds);
            models.push(...embeds);
        }
        else {
            models.push(rect1);
        }
        if (rect2.attributes.type === "dependent-premise") {
            console.log("combining dependent premise!");
            let embeds = rect2.getEmbeddedCells();
            console.log(embeds);
            models.push(...embeds);
        }
        else {
            models.push(rect2);
        }
        console.log("models", models);
        //set size
        let width = rect1.attributes.size.width + rect2.attributes.size.width;
        let height = Math.max(rect1.attributes.size.height, rect2.attributes.size.height);
        // set position (average position of two rects)
        let x = rect1.attributes.position.x;
        let y = rect1.attributes.position.y;
        // define weight
        // Needs to be implemented, not sure how we want to do this
        //
        //custom rect configuration
        this.rect = new joint.shapes.app.DependentPremiseRect({
            position: {
                x: x,
                y: y,
            },
            size: {
                width: width + 36,
                height: height + 13,
            },
            attrs: {
                rect: {
                    fill: color.dependentPremise.bodyColor,
                    stroke: color.dependentPremise.stroke
                }
            },
            // set custom attributes here:
            link_color: config.link_color,
            weight: config.weight,
            type: config.type,
        });
        //align position of models
        let center = this.rect.attributes.position;
        let current_x = center.x + 12; //- (this.rect.attributes.size.width / 2);
        for (let i = 0; i < models.length; i++) {
            let cell = models[i];
            console.log(cell);
            cell.set('position', {
                x: current_x,
                y: center.y + 6
            });
            current_x += cell.attributes.size.width + 12;
        }
        if (rect1.attributes.type === "dependent-premise") {
            rect1.unembed(...rect1.getEmbeddedCells());
            rect1.remove();
        }
        if (rect2.attributes.type === "dependent-premise") {
            rect2.unembed(...rect2.getEmbeddedCells());
            rect2.remove();
        }
        //embed models
        for (let i = 0; i < models.length; i++) {
            this.rect.embed(models[i]);
            //disable user movement
            models[i].findView(paper).options.interactive = {
                elementMove: false
            };
            //update tools
            addRectTools(models[i]);
            //remove outgoing links
            let links = graph.getConnectedLinks(models[i], { outbound: true });
            links.forEach(link => {
                link.remove();
            });
            //remove from link selection if applicable
            if (selected_links[0]) {
                if (selected_links[0] === models[i]) {
                    joint.dia.HighlighterView.remove(models[i].findView(paper), 'link-highlight');
                    //alternate way to clear array that gets around typescript import restrictions
                    selected_links.splice(0, selected_links.length);
                }
            }
        }
        console.log("NEW DEPENDENT PREMISE", this.rect);
    }
}
