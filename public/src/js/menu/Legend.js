const joint = window.joint;
class Legend {
    constructor() {
        this.legend = [];
    }
    add(claim) {
        console.log('adding...', claim);
        this.legend.push(claim);
        console.log('legend', this.legend);
    }
    removeAtIndex(index) {
        this.legend.splice(index, 1);
    }
    remove(claim) {
        for (let i = 0; i < this.legend.length; i++) {
            if (this.legend[i].rect.id === claim.id) {
                this.removeAtIndex(i);
                break;
            }
        }
    }
}
export let legend = new Legend();
