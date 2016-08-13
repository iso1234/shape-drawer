/* Created by isaac.greene on 9/08/2016. */
$(document).ready(function(){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var clickData = ""; //shapeStarted, shapeFinished
    var shapeData = {
        start: { x: 0, y: 0},
        end: { x: 0, y: 0},
        rad: 0
    };
    
    // Adjust the canvas height according to the window size
    canvas.width = $( window ).height();
    canvas.height = $( window ).height() - 135;

    function drawShape(shape, mouseX, mouseY) {
        // Calculate x and y relative to the canvas offset

        shapeData.end.x = mouseX;
        shapeData.end.y = mouseY;

        if (shape === "drawRectangle") {
            ctx.moveTo(shapeData.start.x, shapeData.start.y);
            ctx.lineTo(shapeData.end.x, shapeData.start.y);
            ctx.lineTo(shapeData.end.x, shapeData.end.y);
            ctx.lineTo(shapeData.start.x, shapeData.end.y);
            ctx.lineTo(shapeData.start.x, shapeData.start.y);
            ctx.stroke();
        } else if (shape === "drawCircle") {
            // Calculate radius
            var radius = Math.sqrt(Math.pow(shapeData.end.x - shapeData.start.x, 2) + Math.pow(shapeData.end.y - shapeData.start.y, 2));

            // Draw circle
            ctx.beginPath();
            ctx.arc(shapeData.start.x, shapeData.start.y, radius, 0, 2 * Math.PI, false);
            //ctx.lineWidth = 5;
            //ctx.strokeStyle = '#003300';
            ctx.stroke();

        }
    }


    $("#myCanvas").mousedown(function(e){
        if (clickData === "shapeStarted") { // Click to finish drawing
            clickData = "shapeFinished";
        } else { // Click to start drawing
            clickData = "shapeStarted";
            // Set the starting co-ords to the shape data object
            var canvasOffset = $(this).offset();
            var x = e.pageX - canvasOffset.left;
            var y = e.pageY - canvasOffset.top;
            shapeData.start.x = x;
            shapeData.start.y = y;
        }
    });


    $("#myCanvas").mousemove(function(e) {
        if (clickData === "shapeStarted") {
            // Clear canvas of previous shape
            canvas.width = canvas.width;

            // Calculate current x and y value of the mouse
            var canvasOffset = $(this).offset();
            var mouseX = e.pageX - canvasOffset.left;
            var mouseY = e.pageY - canvasOffset.top;

            // Draw the shape selected from the drop down menu
            drawShape($("#drpShape").val(), mouseX, mouseY);
        }
    });
});