/**
 * Created by Gracia on 16/6/22.
 */

// Common lib
var $ = function(id) {
    return document.getElementById(id.substr(1));
};

// Model
var maze = (function(){
    var cell = [];

    return {

        random: function(num) {
            return Math.floor(Math.random() * num);
        }


    }

}());





// Controller
(function(){
    var cell = [],
        cellWalls = [],
        currentCell = [],
        cellStack = [],
        cellPath = [],
        neighbourStack = [],
        visited = 0,
        rowCells = 20,
        columnCells = 20,
        cellWidth = 25,
        cellHeight = 25;

    var canvas = document.getElementById("maze");
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = '#005F6B';
    ctx.fillStyle = '#00B4CC';
    ctx.lineWidth = 2;

    function mazeInit(rowmax, colmax) {
        for (var row = 0; row < rowmax; row++) {
            cell[row] = [];
            cellWalls[row] = [];
            for (var col = 0; col < colmax; col++) {
                cell[row][col] = 0;
                cellWalls[row][col] = [1, 1, 1, 1];
            }
        }
    }

    function cellStart(rowmax, colmax) {
        var row = maze.random(rowmax),
            col = maze.random(colmax);
        cell[row][col] = 1;
        visited ++;
        currentCell = [row, col];
        cellStack.push(currentCell);
        return currentCell;
    }

    function neighbourCells(position) {
        var row = position[0],
            col = position[1];
        neighbourStack = [];
        if (row - 1 >= 0 && cell[row - 1][col] === 0) {
            neighbourStack.push([row - 1, col, 'N']);
        }
        if (col + 1 < columnCells && cell[row][col + 1] === 0) {
            neighbourStack.push([row, col + 1, 'E']);
        }
        if (row + 1 < rowCells && cell[row + 1][col] === 0){
            neighbourStack.push([row + 1, col, 'S']);
        }
        if (col - 1 >= 0 && cell[row][col - 1] === 0){
            neighbourStack.push([row, col - 1, 'W']);
        }
        return neighbourStack;
    }

    function nextCell() {
        var neighbourNum,
            random,
            tempCell;
        if (visited <= rowCells * columnCells) {
            neighbourCells(currentCell);
            neighbourNum = neighbourStack.length;
            if (neighbourNum !== 0) {
                random = maze.random(neighbourNum); // Random number from 0 to neighbourStack.length-1
                tempCell = neighbourStack[random];
                var row = tempCell[0],
                    col = tempCell[1],
                    direction = tempCell[2];
                wallValue(direction, currentCell[0], currentCell[1], row, col);// Change the status of current and next cell wall when neighbour founded.
                cell[row][col] = 1;
                visited ++;
                currentCell = [row, col];
                cellStack.push(currentCell);
            } else {
                cellStack.pop();
                var stackNum = cellStack.length;
                if (stackNum !== 0 ) {
                    currentCell = cellStack[stackNum-1];
                }
            }
        }
    }

    function wallValue(direc, x, y, i, j) {
        var currentWall = cellWalls[x][y],
            nextWall = cellWalls[i][j];
        switch (direc) {
            case 'N':
                currentWall[0] = 0;
                nextWall[2] = 0;
                break;
            case 'E':
                currentWall[1] = 0;
                nextWall[3] = 0;
                break;
            case 'S':
                currentWall[2] = 0;
                nextWall[0] = 0;
                break;
            case 'W':
                currentWall[3] = 0;
                nextWall[1] = 0;
                break;
        }
        cellWalls[x][y] = currentWall;
        cellWalls[i][j] = nextWall;
    }

    function drawLine(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    function drawAllLines(rowmax, colmax, width, height) {
        for (var i = 0; i < rowmax + 1; i++) {
            drawLine(i * height, 0, i * height, colmax * width);
        }
        for (var j = 0; j < colmax + 1; j++) {
            drawLine(0, j * width, rowmax * height, j * width);
        }
    }

    function clearMaze(width, height, rowmax, colmax) {
        ctx.clearRect(0, 0, colmax * width, rowmax * height);
    }

    function drawWalls(wall, width, height, rowmax, colmax) {
        for (var row = 0; row < rowmax; row++){
            for (var col = 0; col < colmax; col++){
                var x = col * width,
                    y = row * height;
                if (wall[row][col][0] === 1) {
                    drawLine(x, y, x + width, y);
                }
                if (wall[row][col][1] === 1) {
                    drawLine(x + width, y, x + width, y + height);
                }
                if (wall[row][col][2] === 1){
                    drawLine(x, y + height, x + width, y + height);
                }
                if (wall[row][col][3] === 1){
                    drawLine(x, y, x, y + height);
                }
            }
        }
    }


/*    drawAllLines(rowCells, columnCells, cellWidth, cellHeight);*/

    $('#creatMaze').addEventListener('click', function(){
        clearMaze(cellWidth, cellHeight, rowCells, columnCells);
        mazeInit(rowCells, columnCells);
        cellStart(rowCells, columnCells);
        nextCell();
        drawWalls(cellWalls, cellWidth, cellHeight, rowCells, columnCells);
    });

}());