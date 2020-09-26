'use strict';
var canvas = ""
var ctx = ""
var center_x;
var center_y;
var radius;
var offset;
const pi = Math.PI;
var hours;
var minutes;
var seconds;
//DOM loaded event
document.addEventListener("DOMContentLoaded", function (e) {
    init();

});

// obtain the 2d drawing context;
function init() {
    
    
    canvas = document.querySelector("#main_canvas");
    ctx = canvas.getContext('2d');
    canvas.onmousemove = function(ev){
        let rect = this.getBoundingClientRect();
        let item = document.querySelector("#position");
        item.innerHTML = `x:${ev.clientX - rect.left} y:${ev.clientY - rect.top}`;
    }
    draw_clock();
    update_time_variables();
    let tmr = setInterval(function(){update_time_variables()}, 1000);
    
}
// set hours, minutes and seconds to local machine time.
function update_time_variables(){
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();
    seconds = today.getSeconds();
    let displayed = "";
    if(hours < 10){
        displayed += "0";
    }
    displayed += String(hours);
    displayed += ":";
    if(minutes < 10){
        displayed  += "0";
    }
    displayed += String(minutes);
    displayed += ":";
    if(seconds < 10){
        displayed += "0";
    }
    
    displayed += String(seconds);
    let item = document.querySelector("#time");
    item.innerHTML = displayed;
    draw_clock();
}
// draw the clock
function draw_clock() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //draw a circle
    center_x = canvas.width / 2;
    center_y = canvas.height / 2;
    offset = 5;
    radius = center_x - offset * 2;
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(center_x, center_y, radius, 0, 2 * pi, false);
    ctx.stroke();
    draw_inside_clock();
    
    
    
    




}
// 0.05 for small, 0.07 for big, 72 pieces needed
function draw_inside_clock(){
    let pieces = 60;
    let step_value = (2 * pi) / pieces;
    let limit = 5;
    let counter = limit;
    let num = 9;
    for(let theta = -pi; theta < pi; theta += step_value){
        let temp = find_x_and_y(theta);
        let x = temp[0];
        let y = temp[1];
        let multiplier = 0.05;
        if (counter === limit){
            multiplier = 0.07;
        }
        let start_x = Math.abs(x - center_x) * multiplier;
        
        let start_y = Math.abs(y - center_y) * multiplier;
        if(x < center_x){
            start_x = x + start_x;
        }
        else{
            start_x = x - start_x;
        }
        if(y < center_y){
            start_y = y + start_y;
        }
        else{
            start_y = y - start_y;
        }
        ctx.lineWidth = 2;
        if (counter === limit){
            ctx.lineWidth = 4;
            

        }
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(start_x, start_y);
        ctx.lineTo(x,y);
        
        ctx.stroke();
        
        if(counter === limit){
            ctx.font = "30px serif";
            
            let x_offset = 0;
            let y_offset = 0;
            switch(num){
                case 9:
                    x_offset = 6;
                    y_offset = 8;
                    
                    break;
                case 10:
                    x_offset = 4;
                    y_offset = 13;
                    
                    break;
                case 11:
                    x_offset = -6;
                    y_offset = 24;
                    
                    break;
                case 12:
                    x_offset = -14;
                    y_offset = 24;
                    
                    break;
                case 1:
                    x_offset = -16;
                    y_offset = 20;
                    break;
                case 2:
                    x_offset = -20;
                    y_offset = 16;
                    break;
                case 3:
                    x_offset = -20;
                    y_offset = 10;
                    break;
                case 4:
                    x_offset = -20;
                    y_offset = 4;
                    break;
                case 5:
                    x_offset = -14;
                    y_offset = -6;
                    break;
                case 6:
                    x_offset = -7;
                    y_offset = -8;
                    break;
                case 7:
                    x_offset = 0;
                    y_offset = -4;
                    break;
                case 8:
                    x_offset = 6;
                    y_offset = 4;
                    break;
            }
            ctx.fillText(String(num), start_x + x_offset , start_y + y_offset);
            num += 1;
            if(num === 13){
                num = 1;
            }
            counter = 0;
        }
        counter += 1;
        

    }
    
    draw_arrow("seconds");
    draw_arrow("minutes");
    draw_arrow("hours");
    

}
// hour arrow - 0.45; minutes - 0.35; seconds - 0.25. Draws arrow
function draw_arrow(type){

    let multiplier;
    let step_value = (2 * pi);
    let temp;
    
    switch (type){
        case "seconds":
            multiplier = 0.25;
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = "red";
            step_value /= 60;
            temp = step_value * seconds;
            break;
        case "minutes":
            multiplier = 0.35;
            ctx.lineWidth = 2.5;
            ctx.strokeStyle = "black";
            step_value /= 60;
            temp = step_value * minutes;
            break;
        case "hours":
            multiplier = 0.45;
            ctx.lineWidth = 3.5;
            ctx.strokeStyle = "black";
            step_value /= 12;
            temp = step_value * hours;
            break;
    }
    
    temp = temp - pi/2;
    if (temp > pi){
        temp -= 2 * pi;
    }
    temp = find_x_and_y(temp);
    let x = temp[0];
    let y = temp[1];
    let end_x = Math.abs(x - center_x) * multiplier;
        
    let end_y = Math.abs(y - center_y) * multiplier;
    if(x < center_x){
        end_x = x + end_x;
    }
    else{
        end_x = x - end_x;
    }
    if(y < center_y){
        end_y = y + end_y;
    }
    else{
        end_y = y - end_y;
    }
    
    ctx.beginPath();
    ctx.moveTo(center_x, center_y);
    ctx.lineTo(end_x, end_y);
    
    ctx.stroke();
}
// resolves x any y coordinates based on angle from positive x-axis. -Pi to Pi range
function find_x_and_y(angle) {
    let x;
    let y;
    // if in right top quadrant
    if (angle >= -pi / 2 && angle < 0) {
        angle = Math.abs(angle);
        x = Math.cos(angle) * radius + center_x;
        y = offset * 2 + (radius - Math.sin(angle) * radius);
    }
    // if in right bottom quadrant
    else if (angle >= 0 && angle <= pi / 2) {
        x = Math.cos(angle) * radius + center_x;
        y = offset * 2 + (Math.sin(angle) * radius + radius);
    }
    // if in left top quadrant
    else if (angle < -pi / 2 && angle >= -pi) {
        angle = Math.abs(angle);
        x = center_x + Math.cos(angle) * radius
        
        y = offset * 2 + (radius - Math.sin(angle) * radius);


    }
    // if in left bottom quadrant
    else if(angle > pi/2 && angle <= pi){
        x = center_x + Math.cos(angle) * radius
        y = offset * 2 + (Math.sin(angle) * radius + radius);
    }
    
    return [x, y];


}