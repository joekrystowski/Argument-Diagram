const joint = window.joint;
class Legend {
    constructor() {
        this.legend = [];
        this.active = false;
        this.disabled = false;
        this.compact = true;
    }
    disable() {
        this.disabled = true;
    }
    enable() {
        this.disabled = false;
    }
    add(claim) {
        if (this.disabled)
            return;
        this.legend.push(claim);
        this.refresh();
    }
    removeAtIndex(index) {
        if (this.disabled)
            return;
        this.legend.splice(index, 1);
        this.refresh();
    }
    remove(claim) {
        if (this.disabled)
            return;
        for (let i = 0; i < this.legend.length; i++) {
            if (this.legend[i].rect.id === claim.id) {
                this.removeAtIndex(i);
                break;
            }
        }
    }
    toggle() {
        if (this.disabled)
            return;
        this.legend.forEach((claim, index) => {
            claim.toggleLegendForm(index + 1);
        });
        const legend_compact = $('#legend-compact');
        if (this.compact) {
            legend_compact.hide();
        }
        else {
            legend_compact.show();
        }
        this.compact = !this.compact;
        this.active = !this.active;
    }
    refresh() {
        if (this.disabled)
            return;
        // Loop through legend
        //   Detect discrepancies/gaps
        //   depending on the state of the legend (active or not) set text of claims appropriately
        // update DOM legend list
        if (this.legend.filter(x => x !== undefined).length !== this.legend.length) {
            console.log('Incomplete legend. Exiting refresh early...');
            // console.log(this.legend);
            // console.log(this.legend.filter(x => x !== undefined));
            return;
        }
        const legend_list = $('#legend-list');
        legend_list.empty();
        const legend_compact = $('#legend-compact');
        legend_compact.empty();
        let prevIndex = -1;
        var prevClaim = null;
        this.legend.forEach((claim, index) => {
            //if we find gaps, we are probably making large modifications to the legend somewhere / it is incomplete
            // (such as importing), so just exit early
            if (Math.abs(index - prevIndex) !== 1) {
                console.log(`discrepancy found in legend!\nExpected ${prevIndex}->${prevIndex + 1}\nInstead found ${prevIndex}->${index}`);
                return;
            }
            //if the claim is in the incorrect mode
            if (this.active != claim.rect.attributes.inLegendForm) {
                claim.toggleLegendForm(index + 1);
            }
            if (this.active) {
                //make sure the legend number is correct
                claim.rect.attr('text/text', index + 1);
            }
            //update text on legend list to make sure it is the most recent
            legend_list.append(generateLegendListItem(claim.retrieveFromStorage('initialText'), index + 1));
            if (this.compact) {
                if (prevClaim) {
                    if (claim.isDependent(prevClaim)) {
                        legend_compact.append(", and " + claim.retrieveFromStorage('initialText'));
                    }
                    else if (claim.isDependentCausedBy(prevClaim)) {
                        legend_compact.append(". Therefore, " + claim.retrieveFromStorage('initialText'));
                    }
                    else if (claim.isCausedBy(prevClaim)) {
                        legend_compact.append(", so " + claim.retrieveFromStorage('initialText'));
                    }
                    else {
                        legend_compact.append(".<br><br>Next, " + claim.retrieveFromStorage('initialText'));
                    }
                }
                else {
                    legend_compact.append("First, " + claim.retrieveFromStorage('initialText'));
                }
            }
            prevIndex = index;
            prevClaim = claim;
        });
        legend_compact.append(".");
    }
    insert(claim, index, direct) {
        if (this.disabled)
            return;
        if (direct) {
            this.legend[index] = claim;
        }
        else {
            this.legend = [...this.legend.slice(0, index), claim, ...this.legend.slice(index)];
        }
        this.refresh();
    }
    reorder(from, to) {
        if (this.disabled)
            return;
        const claim = this.legend[from];
        this.removeAtIndex(from);
        this.insert(claim, to);
        this.refresh();
    }
    toExportForm() {
        if (this.disabled)
            return;
        let export_legend = {};
        this.legend.forEach((claim, index) => {
            export_legend[claim.rect.id] = index;
        });
        return export_legend;
    }
    clear() {
        if (this.disabled)
            return;
        this.legend.splice(0, this.legend.length);
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
    $('#exit-edit-button').trigger('click');
}
function generateLegendListItem(text, number) {
    return `<li class="legend-list-item">${number}. ${text}</li>`;
}
