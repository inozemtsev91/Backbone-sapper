/*
 * collection of cells
 */

var CellsCollection = Backbone.Collection.extend({
    model: CellModel,

    initialize: function(arg) {
        this.defaults = arg;
    },

    fillCells: function() {

        for (var x = 0; x < this.defaults.height; x++) {
            for (var y = 0; y < this.defaults.width; y++) {
                this.add({x: x, y: y});
            }
        }
    }
});
