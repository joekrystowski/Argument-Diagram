
const joint = window.joint;

import { Claim } from "../Claim.js";

class Legend {
    legend: Array<Claim>

    constructor(){
        this.legend = [];
    }

    add(claim:Claim): void {
        console.log('adding...', claim);
        this.legend.push(claim);
        console.log('legend', this.legend);
    }

    removeAtIndex(index: number): void {
        this.legend.splice(index, 1);
    }

    remove(claim:joint.shapes.app.ClaimRect):void {
        for(let i = 0; i < this.legend.length; i++) {
            if(this.legend[i].rect.id === claim.id) {
                this.removeAtIndex(i);
                break;
            }
        }
    }
}

export let legend = new Legend();