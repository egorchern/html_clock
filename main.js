'use strict';
var canvas = ""
var ctx = ""
var frame_interval = 16.6;
document.addEventListener("DOMContentLoaded", function(e){
    init();
    
});

function init(){
    canvas = document.querySelector("#main_canvas");
    ctx = canvas.getContext('2d');
}



