/**
 * Printscreen.js v0.1.0
 * https://github.com/vah7id/Printscreen.js
 * MIT licensed
 *
 * Copyright (C) 2014 Vahid Taghizadeh (@vah7id)
 */

var PrintscreenJs = {
    
    option: {
      _pasteCatcher: null,
      _srcCatched: null,
      _el: null,
      _type: null
    },
    
    initialize: function(obj){
      this.option._el = obj;
      this.option._type = document.getElementById(this.option._el).tagName;
      this._clipboard();
      this._eventListener();
    },

    _clipboard: function(){
      if (!window.Clipboard){
          PrintscreenJs.option._pasteCatcher = document.createElement("div");
          PrintscreenJs.option._pasteCatcher.setAttribute("id", "_clip");
          PrintscreenJs.option._pasteCatcher.setAttribute("contenteditable", "");
          PrintscreenJs.option._pasteCatcher.style.cssText = 'opacity:0;position:fixed;top:0px;left:0px;';
          PrintscreenJs.option._pasteCatcher.style.marginLeft = "-20px";
          document.body.appendChild(PrintscreenJs.option._pasteCatcher);

          PrintscreenJs.option._pasteCatcher.focus();
          document.getElementById('_clip').addEventListener('DOMSubtreeModified',function(){
            
              if(PrintscreenJs.option._pasteCatcher.children.length == 1){
                  src = PrintscreenJs.option._pasteCatcher.firstElementChild.src;
                  PrintscreenJs.option._pasteCatcher.innerHTML = '';
                  PrintscreenJs.option._srcCatched = src;
                  PrintscreenJs._createObject();
              }
          });
        }
    },

    _eventListener: function(){
        window.addEventListener("paste", this._pasteHandler);
    },

    _pasteHandler: function(e){

      if(e.clipboardData) {
          var items = e.clipboardData.items;
          if (items){
              for (var i = 0; i < items.length; i++) {
                  if (items[i].type.indexOf("image") !== -1) {
                      var blob = items[i].getAsFile();
                      var URLObj = window.URL || window.webkitURL;
                      PrintscreenJs.option._srcCatched = URLObj.createObjectURL(blob);
                  }
              }
          }
          else{
            console.log("Can't catch clipboard image !");
          }
      }
      else{
          setTimeout(this._checkInput, 1);
      }

      PrintscreenJs._createObject();
    },

    _checkInput: function(){
        var child = option._pasteCatcher.childNodes[0];
        option._pasteCatcher.innerHTML = "";

        if (child){
            if(cild.tagName === "IMG"){
                PrintscreenJs.option._srcCatched = child.src;
            }
        }
    },

    _createObject: function(){

      if(this.option._type == 'IMG'){
          var image = document.getElementById(this.option._el);
          image.src = this.option._srcCatched;
      }

      else if(this.option._type == 'CANVAS'){
        var canvas = document.getElementById(this.option._el);
        var ctx = canvas.getContext("2d");
        var pastedImage = new Image();
        pastedImage.onload = function() {
          ctx.drawImage(pastedImage, 0, 0,pastedImage.width*0.7,pastedImage.height*0.7);
        }
        pastedImage.src = PrintscreenJs.option._srcCatched;
      }

      else{
        console.log('Element tag is undefined ! clipboard src: ' + PrintscreenJs.option._srcCatched);
      }
    }

};
