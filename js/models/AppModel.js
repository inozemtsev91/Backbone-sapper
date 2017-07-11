/*
 *@base class App
 */
var AppModel = Backbone.Model.extend({
    test: 8,
    defaults: {
        width: 5,
        height: 5,
        mines: 8,
        openedCellsCount: 0,
        flagsCount: 0,
        wasted: false
    },

    initialize: function() {
        this.cells = new CellsCollection(null, {
            width: this.get('width'),
            height: this.get('height'),
            mines: this.get('mines'),
            app: this
        });
    }

});
