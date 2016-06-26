/**
 * Created by Gracia on 16/6/22.
 */

// Common lib


// Model
var maze = (function(){
    var cell = [];

    return {

        random: function(num){
            return Math.floor(Math.random() * num);
        }



    }

}());





// Controller
(function(){
    var cell = [],
        cellWalls = [];
        cellStack = [],
        cellPath = [],
        cellVisited,
        cellStart,
        rowCells = 20,
        columnCells = 20,
        cellWidth = 25,
        cellHeight = 25,
        mazeWidth = columnCells * cellWidth,
        mazeHeight = rowCells * cellHeight;

    var canvas = document.getElementById("maze");
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = '#005F6B';
    ctx.fillStyle = '#00B4CC';
    ctx.lineWidth = 2;


    function mazeStart() {
        cellStart = {
            x: maze.random(rowCells),
            y: maze.random(columnCells),
            visited: 1
        };
        return cellStart;
    }

    function mazeInit() {
        for (var row = 0; row < rowCells; row++) {
            cell[row] = [];
            cellWalls[row] = [];
            for (var col = 0; col < columnCells; col++) {
                cell[row][col] = 0;
                cellWalls[row][col] = [1, 1, 1, 1];
            }
        }
    }



    function drawLine(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    function drawAllLines() {
        for (var i = 0; i < rowCells + 1; i++) {
            drawLine(i*cellHeight, 0, i*cellHeight, mazeWidth);
        }
        for (var j = 0; j < columnCells + 1; j++) {
            drawLine(0, j*cellWidth, mazeHeight, j*cellWidth);
        }
    }

    function clearMaze() {
        ctx.clearRect(0, 0, mazeWidth, mazeHeight);
    }

    drawAllLines();


}());