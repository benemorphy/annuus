var paper;
window.onload = function() {
    var paper = new Raphael(document.getElementById('canvas_container'), 500, 500);
    
var circ = paper.circle(250, 250, 160);
        circ.attr({fill: '#fff', 
					stroke: '#ddd',
						'stroke-width': 5});
		var text = paper.text(250, 250, 'Bye Bye Circle!')
text.attr({opacity: 0, 'font-size': 12}).toBack();
circ.node.onmouseover = function() {
    this.style.cursor = 'pointer';
}
circ.animate({"fill-opacity": 2}, 2500)
circ.drag.onmove=function(){
	 circ.attr({r:50});
}
circ.node.onclick = function() {
    text.animate({opacity: 1}, 2000);
    circ.animate({opacity: 0}, 2000, function() {
        this.remove();
    });
}


}

