	
      var message = document.getElementById('message');
      $(message.form).submit(function() {
        //表单提交发送信息给SocketIO服务器,服务器端监听message事件即可获取到信息.
		$("#message").html(" ");
        socket.emit('message', { text: message.value });
		$("#pushmessage").html(message.value);
		//annuusDB_add_msg("message",{ text: message.value });
        return false;
      });
	  //
	   //客户端监听push message事件,这是服务器端广播的,广播给除了发送消息的浏览器之外的全部浏览器
      socket.on('push message', function (data) {
				annuusDB_add_msg("push message",{ text: data.text });
  
         $("#pushmessage").html( data.text );
      });
	  
	 

  
	
