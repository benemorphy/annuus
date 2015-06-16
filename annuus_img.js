//当canvas上发生粘贴事件时发送给服务器
		   //   PrintscreenJs.initialize('ann_canvas');
	   var ann_canvas = document.getElementById('ann_canvas');
	    var paperjs_canvas = document.getElementById('paperjs_canvas');
	   var btn_paste = document.getElementById('paste');
	    var btn_mark = document.getElementById('mark');
	   //
	   btn_paste.addEventListener("click",function()
		   
		   { console.log("ann changed")
		   var dataurl=ann_canvas.toDataURL("image/jpeg",0.7);
	  socket.emit ('imageuri',{uri:dataurl});
		    
	  } );
	  btn_mark.addEventListener("click",function()
		   
		   { console.log("ann changed")
		   var dataurl=paperjs_canvas.toDataURL("image/png");
	  socket.emit ('imageuri_mark',{uri:dataurl});
	  path.visible=false; 
		    
	  } );
	   
	  // alert (ann_canvas.width.toString()+" "+ann_canvas.height.toString())
	   var paper_ctx=ann_canvas.getContext('2d');
	   paper_ctx.fillStyle='#FF0000';
	  ///var userAgentInfo = this.navigator.userAgent;
		/////socket.emit('message', { text: userAgentInfo.toString() }); 
		
	//var flag = require ("ispc.js")
	

	//规定touchevents

	//提交鼠标，touch信息给服务器
	
	 //
	 
	 	
	 
		 socket.on('m_pos_push', function (data) {
		 
	       var xydatas=JSON.parse(data.text);//将字符串转为数值数组
		 // $('form').after('<p>' + xydatas.length.toString() + '</p>');
		  // $('form').after('<p>' + xydatas[1] + '</p>');
		   for (var i=0;i<xydatas.length;i++)
		   {
		   var xydata=xydatas[i];
		   var posstr = xydata.split("\,")
	  var x=parseInt(posstr[0]);
	  var y=parseInt(posstr[1]);
		paper_ctx.fillStyle="#FF0000";
	  paper_ctx.fillRect((x-240),(y-50),3,3);
	  };
	annuusDB_add_msg("m_pos_push",{ text: data.text });
	 // 需要在此补充内存释放功能
	  xydatas=[];
	  });
	  
	  //选择文件作为canvas背景
	  
var file=document.getElementById("file");  
  
//判断浏览器是否支持FileReader接口  
if(typeof FileReader == 'undefined'){  
    result.InnerHTML="<p>你的浏览器不支持FileReader接口！</p>";  
    //使选择控件不可操作  
    file.setAttribute("disabled","disabled");  
}  
  
function readAsDataURL(){  
    //检验是否为图像文件  
    var file = document.getElementById("file").files[0];  
    if(!/image\/\w+/.test(file.type)){  
        alert("看清楚，这个需要图片！");  
        return false;  
    }  
    var reader = new FileReader();  
    //将文件以Data URL形式读入页面  
    reader.readAsDataURL(file);  
    reader.onload=function(e){  
        
		
		var img=new Image();
	img.src = this.result;
	//alert (img.src.toString());
	img.onload=function(){
	  var ann_canvas = document.getElementById('ann_canvas');
	   var paper_ctx=ann_canvas.getContext('2d');
	   //alert(paper_ctx);
	paper_ctx.drawImage(img,0,0,img.width,img.height,0,0,ann_canvas.width,ann_canvas.height);;
	//here add sth to scale img linear;
	
	var dataurl=ann_canvas.toDataURL("image/jpeg",0.7);
	  socket.emit ('imageuri',{uri:dataurl})
	  };
	 
    }  ;


}  ;
//

//

	  
	   socket.on('imageuri_push', function (data) {
		//alert("imageuri_push")
		annuusDB_add_msg("imageuri_push",{ uri: data.uri });
	var img=new Image();
	img.src = data.uri;
	 var ann_canvas = document.getElementById('ann_canvas');
	   var paper_ctx=ann_canvas.getContext('2d');
	   
	img.onload=function(){

	  // img.src = data.uri;
	   //alert(paper_ctx);
	  paper_ctx.drawImage(img,0,0,img.width,img.height,0,0,ann_canvas.width,ann_canvas.height);
	  
	  };
		
	//alert (data.uri.length);
      });
	  socket.on('imageuri_mark_push', function (data) {
		//alert("imageuri_push")
		annuusDB_add_msg("imageuri_mark_push",{ uri: data.uri });
	var img=new Image();
	img.src = data.uri;
	 var paperjs_canvas = document.getElementById('paperjs_canvas');
	 paperjs_canvas.width=810;
	 paperjs_canvas.height=470;
	   var paper_ctx=paperjs_canvas.getContext('2d');
	   
	img.onload=function(){

	  // img.src = data.uri;
	   //alert(paper_ctx);
	  paper_ctx.drawImage(img,0,0,img.width,img.height,0,0,paperjs_canvas.width,paperjs_canvas.height);
	  
	  };
		
	//alert (data.uri.length);
      });

	        //  表单提交发送信息给SocketIO服务器,服务器端监听message事件即可获取到信息.

