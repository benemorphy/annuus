Printscreen.js
==============

Simple library to catch printscreen image from clipboard

Requirements
==============

Nothing :)

How to use
==============

Just include Printscreen.js and run :

      PrintscreenJs.initialize('id');
      

"id" is your image placeholder's element id attribute. PrintscreenJs detects element's tag name. 
The placeholder can be only CANVAS or IMG.

Then, just simply paste your image into the element.

Example
==============

Html :

    <canvas width="800" height="400" id="screen">
  

Js :

    <script type="text/javascript">
      window.onload = function(){
        PrintscreenJs.initialize('screen');
      }
    </script>

<a href="http://vah7id.com/project/printscreenjs/">Demo link</a>
    
License
==============

Copyright (C) 2012 Vahid Taghizadeh (vah7id@gmail.com)
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
