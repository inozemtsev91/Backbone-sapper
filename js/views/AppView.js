/**
 * Base application view
 */

var AppView = Backbone.View.extend({

    CELL_SIZE: 40,

    regions: {
        controls: '#controls',
        field: '#field'
    },

    initialize: function() {
        this.listenTo(this.model.cells, 'change:isOpened', this.updateCellsCounter);
        this.listenTo(this.model.cells, 'change:isOpened', this.checkWin);
        this.listenTo(this.model.cells, 'reset', this.isReset);
        this.listenTo(this.model, 'change:wasted', this.endGame);
    },

    render: function() {

        this.$el.html(tpl.render('App'));

        this.regions.controls.render(ControlsView, {
            model: this.model
        });

        this.setFieldSize();

        this.regions.field.renderWidgets(
            this.model.cells,
            CellView
        );

        this.model.set('flagsCount', this.model.get('mines'));

        return this;
    },

    setFieldSize: function() {
        this.$('._fieldWrapp')
        .width(this.model.get('width') * this.CELL_SIZE)
        .height(this.model.get('height') * this.CELL_SIZE);
    },

    updateCellsCounter: function() {
        var openedCellsCount = this.model.get('openedCellsCount') + 1;
        this.model.set('openedCellsCount', openedCellsCount);
    },

    checkWin: function() {
        var cellsWithoutMines = this.model.get('height') * this.model.get('width') - this.model.get('mines');
        if(this.model.get('openedCellsCount') === cellsWithoutMines && !this.model.get('wasted')) {
            this.stopListening(this.model.cells, 'change:isOpened');
            console.log('You win!');
        }
    },

    isReset: function() {
        this.stopListening();
        console.log('AppView | stopListening');
        this.remove();
        console.log('AppView | removed view');
        this.model.initialize();
        console.log('AppView | initialize model');
        this.initialize();
        console.log('AppView | initialize view');
        this.render();
        console.log('AppViwe | render veiw');
    },

    endGame: function() {
        this.model.cells.forEach(function(model) {
            model.set('isOpened', true);
        });
    }

});
