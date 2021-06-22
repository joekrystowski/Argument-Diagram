
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

            prevIndex = index;
        });
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

