		var tool;	
		// Create a simple drawing tool:
		if (tool)
		{tool.remove();
		console.log ("tool had been removed")} ;
			 tool = new Tool();
			 console.log (tool);
			var path;
		
		tool.onMouseDown = function(event) {
			console.log("enter sketch mousedown ");
			// Create a new path and set its stroke color to black:
	path = new Path({
			segments: [event.point],
			strokeJoin: 'bevel',
			strokeColor: 'red',
			strokeWidth: 3,
		// Select the path, so we can see its segment points:
			fullySelected: false
	});
		}
//
		tool.onMouseDrag = function(event) {
			path.add(event.point);
		}
		
		tool.onMouseUp=function (event) {
  
	path.simplify(10);
	x=path.exportJSON(Object);
	socket.emit ('imageuri_mark',{obj:x});
   
}
	