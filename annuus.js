				
				//alert ($(window).height());
			var socket=io.connect();//与服务器进行连接
			socket.on('usernum',function(data){
        $("#usernum").html("online:" + data.number);
      });
    
	 if("indexedDB" in window) {
// 支持
	console.log ("support indexDB")
	
} else {
// 不支持
alert (" not support index db")
}

  
	
