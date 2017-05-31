/*
 *@base class App
 */
var AppModel = Backbone.Model.extend({
    defaults: {
        width: 5,
        height: 5,
        mines: 8,
        openedCellsCount: 0,
        flagsCount: 0
    },

    initialize: function() {
        this.cells = new CellsCollection();
        this.fillTheField();
    },

    fillTheField: function() {

        var width = this.get('width');
        var height = this.get('height');
        var max = width * height - 1;
        var bombsCount;

        // Add cells in collection and set x y coordinates
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                this.cells.add({x: x, y: y});
            }
        }

        // Set mines
        for(var i = 0; i < this.get('mines'); i++) {
            var randomCell = Math.round(Math.random() * max);
            var currentCell = this.cells.at(randomCell); 

            if(!currentCell.get('isMine')) {
                currentCell.set('isMine', true);
            } else {
                i--;
            }
        }

        // Set count of mines around each cell
        for (var k = 0; k < height; k++) {
            for (var l = 0; l < width; l++) {

                if (this.cells.at(k * width + l).get('isMine')) continue;

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
                        if (this.cells.at(m * width + n).get('isMine')) {
                            bombsCount++;
                        }
                    }
                }

                this.cells.at(k * width + l).set('countOfMinesAround', bombsCount);

            }
        }

    }

});
