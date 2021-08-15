import { createClaim } from "./menu/CreateClaim.js";
import { paper } from "./graph.js"
import { any } from "underscore";

const joint = window.joint;


export function addSource(claim:joint.dia.Element) {
    //check that claim is somehow a dependent premise, sources should be added to individual claims not a whole premise. 
    //the dependent premise is simply a collection of those claims
    if (claim.attributes.type === "dependent-premise") {
        alert("Can not add a source to a dependent premise")
        return;
    }
    //create new shape to hold source
    let new_source:any = createClaim(0,0,"New Source", 0, "source")
    //embed source into parent claim
    claim.embed(new_source.rect)
    new_source.rect.set("position", {x: claim.attributes.position.x, y: claim.attributes.position.y + claim.attributes.size.height})
    //disable user movement of source
    new_source.rect.findView(paper).options.interactive = {
        elementMove: false
    }
    
}