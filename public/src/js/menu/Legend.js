const joint = window.joint;
class Legend {
    constructor() {
        this.legend = [];
        this.active = false;
    }
    add(claim) {
        console.log('adding...', claim);
        this.legend.push(claim);
        console.log('legend', this);
        this.refresh();
    }
    removeAtIndex(index) {
        this.legend.splice(index, 1);
        this.refresh();
    }
    remove(claim) {
        for (let i = 0; i < this.legend.length; i++) {
            if (this.legend[i].rect.id === claim.id) {
                this.removeAtIndex(i);
                break;
            }
        }
    }
    toggle() {
        if (!this.active) {
            console.log('showing legend...');
        }
        else {
            console.log('hiding legend...');
        }
        this.legend.forEach((claim, index) => {
            console.log(`claim ${index}: `, claim);
            claim.toggleLegendForm(index + 1);
        });
        this.active = !this.active;
    }
    refresh() {
        console.log('refreshing legend...');
        // Loop through legend
        //   Detect discrepancies/gaps
        //   depending on the state of the legend (active or not) set text of claims appropriately
        let prevIndex = -1;
        this.legend.forEach((claim, index) => {
            console.log(`claim ${index}: `, claim);
            if (Math.abs(index - prevIndex) !== 1) {
                console.log(`discrepancy found in legend!\nExpected ${prevIndex}->${prevIndex + 1}\nInstead found ${prevIndex}->${index}`);
            }
            //if the claim is in the incorrect mode
            console.log('legend active?: ', this.active);
            if (this.active != claim.rect.attributes.inLegendForm) {
                console.log('converting form...');
                if (claim.rect.attributes.inLegendForm) {
                    console.log('\tlegend -> normal');
                }
                else {
                    console.log('\tnormal -> legend');
                }
                claim.toggleLegendForm(index + 1);
            }
            if (this.active) {
                //make sure the legend number is correct
                claim.rect.attr('text/text', index + 1);
            }
            prevIndex = index;
        });
    }
}
export let legend = new Legend();
export function toggleLegend() {
    if (!legend.active) {
        $(this).html('<i class="fas fa-map fa-2x"></i>');
    }
    else {
        $(this).html('<i class="far fa-map fa-2x"></i>');
    }
    legend.toggle();
}
