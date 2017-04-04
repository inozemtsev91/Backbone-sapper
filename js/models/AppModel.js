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
        this.collection = new CellsCollection();
        this.addCellsInCollection();
        this.cellsWithBombs = this.createArrayOfRandomNumbers(0, (this.get('width') * this.get('height') - 1), this.get('mines'));
        this.addBombs();
    },

    addCellsInCollection: function() {

        this.listOfCells = [];

        for (var i = 0; i < this.attributes.height; i++) {
            for (var j = 0; j < this.attributes.width; j++) {
                var cell = new CellModel({
                    x: j,
                    y: i
                });
                this.listOfCells.push(cell);
            }
        }

        this.collection.add(this.listOfCells)

    },

    // Function for creating array of random numbers
    createArrayOfRandomNumbers: function(min, max, count) {

        var totalNumbers = max - min + 1;
        var arrayTotalNumbers = [];
        var arrayRandomNumbers = [];
        var tempRandomNumber;

        while (totalNumbers--) {
            arrayTotalNumbers.push(totalNumbers + min);
        }

        while (count--) {
            tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
            arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
            arrayTotalNumbers.splice(tempRandomNumber, 1);
        }

        return arrayRandomNumbers;

    },

    addBombs: function () {
        for (var i = 0; i <= this.cellsWithBombs.length - 1; i++) {

            var elementWithBomb = this.listOfCells[this.cellsWithBombs[i]];
            elementWithBomb.set('isMine', true);
        }
    }
});
