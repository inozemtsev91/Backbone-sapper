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
        this.cellsWithBombs = this.createArrayOfRandomNumbers(this.get('mines'));
        this.fillCells();
        this.setBombs();
    },

    fillCells: function() {

        for (var x = 0; x < this.get('height'); x++) {
            for (var y = 0; y < this.get('width'); y++) {
                this.cells.add({x: x, y: y});
            }
        }
    },

    // Function for creating array of random numbers
    createArrayOfRandomNumbers: function(count) {

        var MIN = 0;
        var MAX = this.get('width') * this.get('height') - 1;

        var totalNumbers = MAX - MIN + 1;
        var arrayTotalNumbers = [];
        var arrayRandomNumbers = [];
        var tempRandomNumber;

        while (totalNumbers--) {
            arrayTotalNumbers.push(totalNumbers + MIN);
        }

        while (count--) {
            tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
            arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
            arrayTotalNumbers.splice(tempRandomNumber, 1);
        }

        return arrayRandomNumbers;

    },

    setBombs: function () {
        for (var i = 0; i <= this.cellsWithBombs.length - 1; i++) {

            var elementWithBomb = this.cells.models[this.cellsWithBombs[i]];
            elementWithBomb.set('isMine', true);
        }
    }
});
