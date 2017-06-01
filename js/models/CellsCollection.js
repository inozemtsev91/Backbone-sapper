/*
 * collection of cells
 */

var CellsCollection = Backbone.Collection.extend({

    model: CellModel,

    initialize: function(models, options) {
        this.width = options.width;
        this.height = options.height;
        this.mines = options.mines;
        this.fillTheField();
        // this.on('change:isOpened', this.checkOpenedCell);
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

    checkOpenedCell: function(model) {
        // this.forEach(function(element, index, list) {
        //     console.log(!!element.get('countOfMinesAround'));
        //     // if (!element.get('countOfMinesAround') && element.get('isOpened')) {
        //     //     this.openSibling(element.get('x'), element.get('y'));
        //     // }
        // }.bind(this));
        if(!model.get('countOfMinesAround') && !model.get('isMine')) {
            this.openSibling
        }
    },

    openNearestCells: function(x, y) {
        var width = this.width;
        var height = this.height;

        // for (var i = -1; i < 2; i++) {
        //     for (var j = -1; j < 2; j++) {

        //         var $temp = $('[data-x=' + (x + i) + '][data-y=' + (y + j) + ']');
        //         if (!$temp.length || $temp.hasClass('is-opened') || $temp.hasClass('is-flag')) continue;
        //         $temp.addClass('is-opened');
        //         if ($temp.data('value') === 0) {
        //             $temp.openNearestCells(); // if field will be really big, this function will work slow
        //         }
        //     }
        // }

        // for (var i = -1; i < 2; i++) {
        //     for (var j = -1; j < 2; j++) {

        //         var currentCell = this.at(i*width + j);

        //         if (!currentCell || currentCell.get('countOfMinesAround')) continue;
        //         currentCell.set('isOpened', true);
        //         if (!currentCell.get('countOfMinesAround')) {
        //             this.openNearestCells(); // if field will be really big, this function will work slow
        //         }
        //     }
        // }

        // var start = {
        //     y: (y - 1 >= 0) ? y - 1 : y,
        //     x: (x - 1 >= 0) ? x - 1 : x
        // };
        // var end = {
        //     y: (y + 1 > width - 1) ? y : y + 1,
        //     x: (x + 1 > width - 1) ? x : x + 1
        // };

        // for (var i = start.x; i <= end.x; i++) {
        //     for (var j = start.y; j <= end.y; j++) {
        //         var currentCell = this.at(i*width + j);
        //         currentCell.set('isOpened', true);
        //         if(!this.at(i*width + j).get('countOfMinesAround')) {
        //             this.openNearestCells(currentCell.get('x'), currentCell.get('y'));
        //         }
        //     }
        // }
    }

});
