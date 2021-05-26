This project is built on the open source Joint.js library -> https://resources.jointjs.com/docs/jointjs/v3.3/joint.html

It should handle most of the backend things for us like physically drawing the elements and linking them etc, we have to implement the interface to use it


TODO 

Known Bugs:
  - Removing a rect after selecting it for linking causes problems. need to remove it from selected array upon removal

Editing:
  - link colors
  - link weight
  - rect background color
  - rect text color
  - font-size (will want to make font-size a custom attribute)
  - rect size
  -

Custom Rect:
  - font-size custom attribute

other:

- interface to add new links (connections) between arguments
    -> different color link when objections are the source ---DONE
- interface on Argument boxes to adjust size manually
- code to automatically adjust size of the text if it overflows the current Argument size. width should be fixed and only changed manually, height can be adjust automatically
    to account for overflow -----> partially done 




  Linking:
    -prevent duplicate links
    -prevent double sided linking
    -edit link weight