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
        console.log(this.cells.length);
    },

    fillCells: function() {

        var MAX = this.get('width') * this.get('height') - 1;

        for (var x = 0; x < this.get('height'); x++) {
            for (var y = 0; y < this.get('width'); y++) {
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

        // // Function added count of bombs arround cell
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
