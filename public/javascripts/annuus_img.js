//当canvas上发生粘贴事件时发送给服务器
		   //   PrintscreenJs.initialize('ann_canvas');
	   var ann_canvas = document.getElementById('ann_canvas');
	 
	   
	  // alert (ann_canvas.width.toString()+" "+ann_canvas.height.toString())
	   var paper_ctx=ann_canvas.getContext('2d');
	   paper_ctx.fillStyle='#FF0000';
	

	//提交鼠标，touch信息给服务器
	
	 //
	 
	 	
	 
	
	  
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
	   var a=(img.width)/(img.height);
	   var b=(ann_canvas.width)/(ann_canvas.height);
	   console.log(a);
	   console.log(b);
	   paper_ctx.fillStyle="#ffffff";
	   paper_ctx.fillRect(0,0,ann_canvas.width,ann_canvas.height);
	   if (a>b)
	   {paper_ctx.drawImage(img,0,0,img.width,img.height,0,(ann_canvas.height-(ann_canvas.width/a)),ann_canvas.width,(ann_canvas.width/a))}
	   else
	   {paper_ctx.drawImage(img,0,0,img.width,img.height,(ann_canvas.width-(ann_canvas.height*a)),0,ann_canvas.height*a,ann_canvas.height)}
		   
	
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
		// annuusDB_add_msg("imageuri_push",{ uri: data.uri });
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
		//annuusDB_addb_msg("imageuri_mark_push",{ uri: data.uri });
		x=data.obj;
		y=data.obj;
		//path=new Path (x);
		path = new Path({
			
			strokeJoin: 'bevel',
			strokeColor: 'red',
			strokeWidth: 3});
			path.importJSON(x);
      });
	   socket.on('imageuri_newnote_push', function (data) {
		//alert("imageuri_push")
		//annuusDB_add_msg("imageuri_mark_push",{ uri: data.uri });
		paper.install(window);
		paper.setup('paperjs_canvas');
		});
		
   

	        //  表单提交发送信息给SocketIO服务器,服务器端监听message事件即可获取到信息.

