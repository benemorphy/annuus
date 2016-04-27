 var path;

// var textItem = new PointText({
//	content: 'Click and drag to draw a line.',
//	point: new Point(20, 30),
//	fillColor: 'black',
// });

function onMouseDown(event) {
	// If we produced a path before, deselect it:
	if (path) {
		path.selected = false;
	}

	// Create a new path and set its stroke color to black:
	path = new Path({
		segments: [event.point],
		
		strokeColor: 'red',
		strokeWidth: 5,
		// Select the path, so we can see its segment points:
		fullySelected: true
	});
//	console.log([event.point]);
}

function onMouseDrag(event) {
	path.add(event.point);
  
}
function onMouseUp(event) {

	path.simplify(10);
	if (path) {
		path.selected = false;
	  //  path.closed=true;
	};
   // console.log(path.exportJSON())
}


 