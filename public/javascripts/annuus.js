var socket=io.connect();
//var socket = io('/my-namespace');
			// var socket=io('/annuusors');
			console.log (socket);
			socket.on('usernum',function(data){
        $("#usernum").html("online:" + data.number);
      });
	  //
    paper.install(window);
		paper.setup('paperjs_canvas');
		//
	 if("indexedDB" in window) {
// 支持
	console.log ("support indexDB")
	
} else {
// 不支持
alert (" not support index db")
}


// function helpmessage (msg,posx,posy){
	function helpmessage (msg){
	var helpmsg=document.getElementById("helpmsg");
	helpmsg.innerHTML=msg;
	
}
  
	