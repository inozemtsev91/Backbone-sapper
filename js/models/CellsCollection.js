/*
 * collection of cells
 */

var CellsCollection = Backbone.Collection.extend({

    model: CellModel,

    initialize: function(models, options) {
        this.width = options.width;
        this.height = options.height;
        this.mines = options.mines;
        this.app = options.app;
        this.fillTheField();
    },

    fillTheField: function() {

        var width = this.width;
        var height = this.height;
        var max = width * height - 1;
        var bombsCount;

        // Add cells in collection and set x y coordinates
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                this.add({x: x, y: y});
            }
        }

        // Set mines
        for(var i = 0; i < this.mines; i++) {
            var randomCell = Math.round(Math.random() * max);
            var currentCell = this.at(randomCell);

            if(!currentCell.get('isMine')) {
                currentCell.set('isMine', true);
            } else {
                i--;
            }
        }

        // Set count of mines around each cell
        for (var k = 0; k < height; k++) {
            for (var l = 0; l < width; l++) {

                if (this.at(k * width + l).get('isMine')) continue;

                bombsCount = 0;

                var start = {
                    y: (k - 1 >= 0) ? k - 1 : k,
                    x: (l - 1 >= 0) ? l - 1 : l
                };
                var end = {
                    y: (k + 1 > width - 1) ? k : k + 1,
                    x: (l + 1 > width - 1) ? l : l + 1
                };

                for (var m = start.y; m <= end.y; m++) {
                    for (var n = start.x; n <= end.x; n++) {
                        if (this.at(m * width + n).get('isMine')) {
                            bombsCount++;
                        }
                    }
                }

                this.at(k * width + l).set('countOfMinesAround', bombsCount);

            }
        }

    },

    // Open nearest cells if was opened empty cell
    openNearestCells: function(x, y) {
        var width = this.width;
        var height = this.height;

        var start = {
            x: (x - 1 > -1) ? x - 1 : x,
            y: (y - 1 > -1) ? y - 1 : y
        };
        var end = {
            x: (x + 1 >= width) ? x : x + 1,
            y: (y + 1 >= height) ? y : y + 1
        };

        for (var i = start.y; i <= end.y; i++) {
            for (var j = start.x; j <= end.x; j++) {
                this.at(i*width + j).set('isOpened', true);
            }
        }
    }

});
