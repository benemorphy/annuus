
	//

	console.log("enter cloud");
	
	if (tool)
		{tool.remove();
		console.log ("tool had been removed")} ;
	var tool = new Tool();
				 console.log (tool);

	//	var path;
	 tool.minDistance = 30;
	tool.onMouseDown=function (event) {
					console.log("enter cloud mousedown ");

           path = new Path({
		segments: [event.point],
		    strokeJoin: 'round',
            strokeCap: 'round',
			strokeColor: 'red',
			strokeWidth: 5,
		// Select the path, so we can see its segment points:
		fullySelected: false
	});
            path.add(event.point);
        }

        tool.onMouseDrag=function (event) {
            path.arcTo(event.point, true);
        }
	tool.onMouseUp=function (event) {
   socket.emit ('imageuri_mark',{obj:path})
  
}