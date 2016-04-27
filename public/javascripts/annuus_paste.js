   var ann_canvas = document.getElementById('ann_canvas');
	   
		   var dataurl=ann_canvas.toDataURL("image/jpeg",0.7);
	  socket.emit ('imageuri',{uri:dataurl});
		    
	 
	