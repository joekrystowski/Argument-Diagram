// this is built on Joint.js, an open source library. It handles a lot of the
// fundamental pieces for us on the back end, we have to implement the front end / interface
// to interact with it
// export let graph = new joint.dia.Graph();
// // the paper renders the image of the graph
// export let paper = new joint.dia.Paper({
//   el: document.getElementById("myholder") as HTMLElement,
//   model: graph,
//   gridSize: 1,
// });
// console.log("setup");
// const newArgumentButton = document.getElementById("new-argument-button") as HTMLElement;
// newArgumentButton.addEventListener("click", createArgument.bind(null, 100, 100));
// newArgumentButton.addEventListener("dragstart", (event) => {
//     event.dataTransfer?.setData('type', 'argument');
// })
// const objectionButton = document.getElementById("objection-button") as HTMLElement;
// objectionButton.addEventListener("click", createObjection.bind(null, 100, 100));
// objectionButton.addEventListener("dragstart", (event) => {
//     event.dataTransfer?.setData('type', 'objection');
// })
// const saveEditButton = document.getElementById("save-edit-button") as HTMLElement;
// saveEditButton.addEventListener("click",saveEdits);
// const paperContainer = document.getElementById("myholder") as HTMLElement;
// paperContainer.addEventListener("dragover", (event) => {
//     event.preventDefault();
// });
// paperContainer.addEventListener("drop", (event) => {
//     const type = event.dataTransfer?.getData('type');
//     if(type === 'argument') {
//         createArgument(
//             event.clientX - paperContainer.getBoundingClientRect().left,
//             event.clientY - paperContainer.getBoundingClientRect().top
//         );
//     }
//     else if (type === 'objection') {
//         createObjection(
//             event.clientX - paperContainer.getBoundingClientRect().left,
//             event.clientY - paperContainer.getBoundingClientRect().top
//         );
//     }
//     else {
//         throw new Error("Something went wrong when determining dataTransfer type.");
//     }
// })
// const editContainer= $('#edit-container');
// editContainer.hide();
function toggleHeader() {
    const header = $('#header');
    header.toggleClass('collapsed');
    if (header.hasClass('collapsed')) {
        header.css('height', '0');
        header.find('.wrapper').hide();
        header.find('i').removeClass('fa-chevron-up');
        header.find('i').addClass('fa-chevron-down');
    }
    else {
        header.css('height', '100px');
        header.find('.wrapper').show();
        header.find('i').removeClass('fa-chevron-down');
        header.find('i').addClass('fa-chevron-up');
    }
}
function hoverDropdown(element) {
    const content = $(element).find('.dropdown-content');
    content.toggleClass('collapsed');
    if (content.hasClass('collapsed')) {
        $(element).find('i.chevron').removeClass('fa-chevron-down');
        $(element).find('i.chevron').addClass('fa-chevron-right');
    }
    else {
        $(element).find('i.chevron').removeClass('fa-chevron-right');
        $(element).find('i.chevron').addClass('fa-chevron-down');
    }
}
const addDropdown = document.getElementById('addDropdown');
addDropdown.addEventListener('mouseenter', hoverDropdown.bind(null, addDropdown));
addDropdown.addEventListener('mouseleave', hoverDropdown.bind(null, addDropdown));
const toggleHeaderButton = document.getElementById('toggleHeaderButton');
toggleHeaderButton.addEventListener('click', toggleHeader);
export {};
// let arg1 = createArgument(100, 100);
// let arg2 = createArgument(300, 100);
// //testing
// let test = createDependentPremise(arg1.rect, arg2.rect);
