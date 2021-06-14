
const joint = window.joint;

class Conclusion {
    conclusion: joint.shapes.app.ClaimRect;

    constructor() {
        this.conclusion = undefined;
    }

    set(new_conclusion:joint.shapes.app.ClaimRect){
        this.conclusion = new_conclusion;
    }

    get(): joint.shapes.app.ClaimRect {
        return this.conclusion;
    }

}

export let conclusion = new Conclusion();