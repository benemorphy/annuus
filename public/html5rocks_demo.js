if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var latLng = new google.maps.LatLng(
        position.coords.latitude, position.coords.longitude);
    var marker = new google.maps.Marker({position: latLng, map: map});
    map.setCenter(latLng);
  }, errorHandler);
}
// Device Orientation
window.addEventListener('deviceorientation', function(event) {
  var a = event.alpha;
  var b = event.beta;
  var g = event.gamma;
}, false);


// input with speech
<input type="text" x-webkit-speech />


//

if (elem.webkitRequestFullScreen) {
  elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
} else if (elem.mozRequestFullScreen) {
  elem.mozRequestFullScreen();
} else if (elem.requestFullScreen){
  elem.requestFullScreen();
}
:-webkit-full-screen-ancestor:root {
  overflow: hidden;
}
:-webkit-full-screen-ancestor {
  z-index: auto;
  -webkit-transform: none;
  -webkit-transition: none;
}
pre:-webkit-full-screen {
  background-color: white;
}

// Canvas 3D (WebGL)
<canvas id="canvas" width="838" height="220"></canvas>

<script>
  var gl = document.getElementById("canvas").getContext("experimental-webgl");
  gl.viewport(0, 0, canvas.width, canvas.height);
  ...
</script>
            
			
			