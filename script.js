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
    var cellStack = [],
        cellPath = [],
        cellVisited,
        cellStart,
        mazeRow = 30,
        mazeCol = 30;

    function mazeStart() {
        cellStart = {
            x: maze.random(mazeRow),
            y: maze.random(mazeCol),
            visited: 1
        };
        return cellStart;
    }

    function mazeInit() {
        for (var x = 0; x < mazeRow; x++) {
            for (var y = 0; y < mazeCol; y++) {

            }
        }
    }

    function nextStep() {

    }


    function drowMaze() {
        this.canvas = document.getElementById('maze');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.rowCells = 30;
        this.columnCells = 30;
        this.cellWidth = this.width / this.rowCells;
        this.cellHeight = this.height / this.columnCells;


        var self = this;

        return {
            drawLine: function(x1, y1, x2, y2) {
                self.ctx.beginPath();
                self.ctx.moveTo(x1, y1);
                self.ctx.lineTo(x2, y2);
                self.ctx.stroke();
            },

            drawBorders: function() {
                this.drawLine(0, 0, self.width, 0);
                this.drawLine(0, 0, 0, self.height);
                this.drawLine(0, self.height, self.width, self.height);
                this.drawLine(0, self.width, self.width, self.height);
            }
        }

    }


}());