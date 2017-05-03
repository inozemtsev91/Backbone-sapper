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
        this.fillCells();
        // console.log(this.cells.models);
    },

    fillCells: function() {

        var width = this.get('width');
        var height = this.get('height');
        var MAX = width * height - 1;
        var bombsCount;
        var arr = [];

        for (var x = 0; x < height; x++) {
            for (var y = 0; y < width; y++) {
                this.cells.add({x: x, y: y});
            }
        }

        for(var i = 0; i < this.get('mines'); i++) {
            var randomCell = Math.round(Math.random() * MAX);
            var currentCell = this.cells.at(randomCell); 

            if(!currentCell.get('isMine')) {
                currentCell.set('isMine', true);
            } else {
                i--;
            }
        }

        // console.log(this.cells.models);
        var full = [];
        var part = [];

        for (var k = 0; k < height; k++) {
            for (var l = 0; l < width; l++) {
                full.push(this.cells.models[k * width + l]);
                if (this.cells.models[k * width + l ].get('isMine')) continue;
                arr.push(this.cells.models[k * width + l]);
            }

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
                    part.push(this.cells.models[m * width + n ]);
                    // console.log(start.y, end.y, start.x, end.x );
                    // console.log(start.y, end.y, start.x, end.x );
                    // if(!this.cells.models[m * width + n ]) {
                    //     console.log(start.y, end.y, start.x, end.x );
                    // }
                    if(!this.cells.models[m * width + n ]) continue;
                    if (this.cells.models[m * width + n ].get('isMine')) {
                        bombsCount++;
                    }
                }
            }

            // console.log(this.cells.models[k * width + l ].get('countOfMinesAround'));
            // this.cells.models[k * width + l ].set('countOfMinesAround', 'bombsCount');
            // arr[i][j].node.data('value', bombsCount);
            // if (bombsCount > 0) arr[i][j].node.text(bombsCount);
        }

        console.log(full);
        console.log(part);

        // Function added count of bombs arround cell
        // var bombsCount;

        // for (var i = 0; i < height; i++) {
        //     for (var j = 0; j < width; j++) {
        //         if (arr[i][j]['isBomb']) continue;

        //         bombsCount = 0;

        //         var start = {
        //             y: (i - 1 >= 0) ? i - 1 : i,
        //             x: (j - 1 >= 0) ? j - 1 : j
        //         };
        //         var end = {
        //             y: (i + 1 > width - 1) ? i : i + 1,
        //             x: (j + 1 > width - 1) ? j : j + 1
        //         };

        //         for (var m = start.y; m <= end.y; m++) {
        //             for (var n = start.x; n <= end.x; n++) {
        //                 if (arr[m][n]['isBomb']) {
        //                     bombsCount++
        //                 }
        //             }
        //         }

        //         arr[i][j].node.data('value', bombsCount);
        //         if (bombsCount > 0) arr[i][j].node.text(bombsCount);

        //     }
        // }

    }

});
