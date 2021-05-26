This project is built on the open source Joint.js library -> https://resources.jointjs.com/docs/jointjs/v3.3/joint.html

It should handle most of the backend things for us like physically drawing the elements and linking them etc, we have to implement the interface to use it


TODO 

Known Bugs:
  - Removing a rect after selecting it for linking causes problems. need to remove it from selected array upon removal (maybe LinkButton.js)

Editing: (EditButton.js & SaveEditsButton.js (also html & css))
  - link colors
  - link weight
  - rect background color
  - rect text color
  - font-size (will want to make font-size a custom attribute)
  - rect size
  - link weight

Custom Rect:
  -  make font-size a custom attribute (see Argument.js)
  - show/hide tools on click instead of mouseover. This will allow us to move the buttons slightly off the side
      of the rect to improve readability (see ManageTools.js)
  - larger default font size (see Argument.js & createArguments.js)
  - better contrast for default objection font color & outline (stroke) (see color.js)

Linking:
  - adjust link stroke size based on source weight
  -prevent duplicate links (LinkButton.js)
  -prevent double sided linking (LinkButto.js)
  -edit link weight (going to need quite a few things here)

other:
  - interface on Argument boxes to adjust size manually (ManageTools.js?)
  - improve UI look (html, css & tools)
  - improve icon readability (tools)

Long term: 
  main:
  - import & export (going to want JSON objects here)
  - dependent premises
  - text or numbers (number each element)

  other:
  - summation of link weights?