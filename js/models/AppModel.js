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
        // this.cells = new CellsCollection({
        //     width: this.get('width'),
        //     height: this.get('height')
        // });
        this.cells = new CellsCollection({});
        this.cellsWithBombs = this.createArrayOfRandomNumbers(this.get('mines'));
        // console.log(this.cells);
        // this.cells.fillCells();
        // this.setBombs();
    },

    

    // Function for creating array of random numbers
    createArrayOfRandomNumbers: function(min, max, count) {

        var MIN = 0;
        var MAX = this.get('width') * this.get('height') - 1;

        var totalNumbers = MAX - MIN + 1;
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

    // setBombs: function () {
    //     for (var i = 0; i <= this.cellsWithBombs.length - 1; i++) {

    //         var elementWithBomb = this.listOfCells[this.cellsWithBombs[i]];
    //         elementWithBomb.set('isMine', true);
    //     }
    // }
});
