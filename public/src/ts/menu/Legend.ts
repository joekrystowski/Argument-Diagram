
const joint = window.joint;

import { Claim } from "../Claim.js";

class Legend {
    legend: Array<Claim>
    active: boolean

    constructor(){
        this.legend = [];
        this.active = false;
    }

    add(claim:Claim): void {
        this.legend.push(claim);
        this.refresh();
    }

    removeAtIndex(index: number): void {
        this.legend.splice(index, 1);
        this.refresh();
    }

    remove(claim:joint.shapes.app.ClaimRect):void {
        for(let i = 0; i < this.legend.length; i++) {
            if(this.legend[i].rect.id === claim.id) {
                this.removeAtIndex(i);
                break;
            }
        }
    }

    toggle() {
        this.legend.forEach( (claim:Claim, index:number) => {
            claim.toggleLegendForm(index+1);
        });

        this.active = !this.active;
    }

    refresh() {
        // Loop through legend
        //   Detect discrepancies/gaps
        //   depending on the state of the legend (active or not) set text of claims appropriately
        // update DOM legend list

        const legend_list = $('#legend-list');
        legend_list.empty();

        let prevIndex = -1;
        this.legend.forEach( (claim:Claim, index:number) => {
            if(Math.abs(index-prevIndex) !== 1) {
                console.log(`discrepancy found in legend!\nExpected ${prevIndex}->${prevIndex+1}\nInstead found ${prevIndex}->${index}`);
            }

            //if the claim is in the incorrect mode
            if (this.active != claim.rect.attributes.inLegendForm) {
                claim.toggleLegendForm(index+1);
            }

            if (this.active) {
                //make sure the legend number is correct
                claim.rect.attr('text/text', index+1);
            }
            
            //update text on legend list to make sure it is the most recent
            legend_list.append(generateLegendListItem(claim.retrieveFromStorage('initialText'), index+1));
        
            prevIndex = index;
        });
    }

    insert (claim:Claim, index:number) {
        this.legend = [...this.legend.slice(0, index), claim, ...this.legend.slice(index)];
        this.refresh();
    }

    reorder (from:number, to:number) {
        console.log('reordering...');
        const claim = this.legend[from];
        this.removeAtIndex(from);
        this.insert(claim, to);
        this.refresh();
    }
}

export let legend = new Legend();

export function toggleLegend(this: JQuery) {
    if (!legend.active) {
        $(this).html('<i class="fas fa-map fa-2x"></i>');
    }
    else {
        $(this).html('<i class="far fa-map fa-2x"></i>')
    }
    legend.toggle();
}

function generateLegendListItem(text:string, number:number) {
    return `<li class="legend-list-item">${number}. ${text}</li>`
}
