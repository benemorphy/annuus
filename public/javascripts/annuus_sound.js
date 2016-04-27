SPECFREQ=2048; 
var leftchannel = [];
var rightchannel = [];
var recorder = null;
var recording = false;
var recordingLength = 0;
var volume = null;
var audioInput = null;
var sampleRate = null;
var audioContext = null;
var context = null;
var outputElement = document.getElementById('output');
var outputString;

// feature detection 
if (!navigator.getUserMedia)
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                  navigator.mozGetUserMedia || navigator.msGetUserMedia;

if (navigator.getUserMedia){
    navigator.getUserMedia({audio:true}, success, function(e) {
    alert('Error capturing audio.');
    });
} else alert('getUserMedia not supported in this browser.');

///
var img_soundrec=document.getElementById('sound_rec');
var  pointerstart="mousedown"||"touchstart"||"mousemove"||"touchmove";
var  pointerup="mouseup"||"touchend";

		
img_soundrec.addEventListener(pointerstart,function(e){
		e.preventDefault();
		recording = true;
        // reset the buffers for the new recording
        leftchannel.length = rightchannel.length = 0;
        recordingLength = 0;
        outputElement.innerHTML = 'Recording now...';
	// 	img_soundrec.src="/button/tool2_p.png";
});
//////////
img_soundrec.addEventListener(pointerup,function(e){
        // we stop recording
        recording = false;
		 outputElement.innerHTML = 'Recording end';
		img_soundrec.src="/button/tool2.png";
        //img_soundrec.border=0;
         var interleaved = mergeBuffers ( leftchannel, recordingLength );
      //  var rightBuffer = mergeBuffers ( rightchannel, recordingLength );
	    var lng = interleaved.length;
		if (!lng%6 == 0) {lng=lng-lng%6};
	  var buffer = new ArrayBuffer(44 + lng /3);
        var view = new DataView(buffer);
        
        // RIFF chunk descriptor
        writeUTFBytes(view, 0, 'RIFF');//资源交换文件标志（RIFF）
        view.setUint32(4, 44 + lng /3, true); //从下个地址开始到文件尾的总字节数
        writeUTFBytes(view, 8, 'WAVE');//WAV文件标志（WAVE）
        // FMT sub-chunk
        writeUTFBytes(view, 12, 'fmt '); //波形格式标志（fmt ），最后一位空格。
        view.setUint32(16, 16, true); //过滤字节（一般为00000010H）
        view.setUint16(20, 1, true);//格式种类（值为1时，表示数据为线性PCM编码）
        // mono (1 channels)
        view.setUint16(22, 1, true);//通道数，单声道为1，双声道为2
        view.setUint32(24, sampleRate/6, true);//采样频率
        view.setUint32(28, sampleRate /3, true);//波形数据传输速率（每秒平均字节数）
        view.setUint16(32, 2, true);//DATA数据块长度，字节。　单声道
        view.setUint16(34, 16, true);//PCM位宽 单声道
        // data sub-chunk
        writeUTFBytes(view, 36, 'data');//数据标志符（data）
        view.setUint32(40, lng/3, true);//DATA总数据长度字节
        
        // write the PCM samples,DATA数据块
      
        var index = 44;
        var volume = 1;
		
        for (var i = 0; i < (lng-6); i+=6){
            view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
            index += 2;//2 to 1
        }
        //
		
        // we interleave both channels together
        var string=buffer2string(buffer);
		//socket.emit ('sound_rec',{wave:Base64.encode(string)})
		socket.emit ('sound_rec',{wave:string});
		});

////
 socket.on('sound_rec_push', function (data) {
	 
	 //var aud = document.createElement('AUDIO');
	 var aud=document.getElementById('speak');
	 //var string = Base64.decode(data.wave);
	 var string = data.wave;
	 // annuusDB_add_msg("sound_rec_push",{ wave: data.wave });
	// alert(string);
	 var buffer = string2buffer(string);
        //alert (interleaved.length.toString());
        // we create our wav file
        var view=new DataView(buffer);
		
        // our final binary blob,
      var blob = new Blob ( [ view ], { type : 'audio/wav' } );
        
        // let's save it locallybu
       // outputElement.innerHTML = 'Handing off the file now...';
      var url = (window.URL || window.webkitURL).createObjectURL(blob);
       // var link = window.document.createElement('a');
      //  ///link.href = url;
        //link.download = 'output.wav';
    //   /// var click = document.createEvent("Event");
       // click.initEvent("click", true, true);
       // link.dispatchEvent(click);
	 var aud=document.getElementById("speak");
	  aud.src= url;
	aud.autoplay= true;
	// alert ((Base64.decode(data.wave)));
 });
//

function mergeBuffers(channelBuffer, recordingLength){
  var result = new Float32Array(recordingLength);
  var offset = 0;
  var lng = channelBuffer.length;
  for (var i = 0; i < lng; i++){
    var buffer = channelBuffer[i];
    result.set(buffer, offset);
    offset += buffer.length;
  }
  return result;
}

function writeUTFBytes(view, offset, string){ 
  var lng = string.length;
  for (var i = 0; i < lng; i++){
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

function success(e){
    // creates the audio context
    audioContext = window.AudioContext || window.webkitAudioContext;
    context = new audioContext();

	// we query the context sample rate (varies depending on platforms)
    sampleRate = context.sampleRate;

    console.log('succcess');
    
    // creates a gain node
    volume = context.createGain();

    // creates an audio node from the microphone incoming stream
    audioInput = context.createMediaStreamSource(e);

    // connect the stream to the gain node
    audioInput.connect(volume);

    /* From the spec: This value controls how frequently the audioprocess event is 
    dispatched and how many sample-frames need to be processed each call. 
    Lower values for buffer size will result in a lower (better) latency. 
    Higher values will be necessary to avoid audio breakup and glitches */
    var bufferSize = SPECFREQ;
    recorder = context.createScriptProcessor(bufferSize, 2, 2);

    recorder.onaudioprocess = function(e){
        if (!recording) return;
        var left = e.inputBuffer.getChannelData (0);
        var right = e.inputBuffer.getChannelData (1);
        // we clone the samples
        leftchannel.push (new Float32Array (left));
        rightchannel.push (new Float32Array (right));
        recordingLength += bufferSize;
        console.log('recording');
    }

    // we connect the recorder
    volume.connect (recorder);
    recorder.connect (context.destination); 
};
//
function buffer2string (buffer){
	
	
	return String.fromCharCode.apply(null, new Uint16Array(buffer));
	
};
//
function string2buffer (str){
	var buf = new ArrayBuffer(str.length*2); // 每个字符占用2个字节
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i<strLen; i++) {
         bufView[i] = str.charCodeAt(i);
    }
    return buf;
	
}

