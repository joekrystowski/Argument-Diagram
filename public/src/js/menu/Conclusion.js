const joint = window.joint;
class Conclusion {
    constructor() {
        this.conclusion = undefined;
    }
    set(new_conclusion) {
        this.conclusion = new_conclusion;
    }
    get() {
        return this.conclusion;
    }
}
export let conclusion = new Conclusion();
