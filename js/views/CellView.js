var CellView = Backbone.View.extend({
    className: 'cell',

    events: {
        'click': 'onClick'
    },

    initialize: function() {
        this.listenTo(this.model, 'change:isOpened', this.openCell);
    },

    render: function() {
        this.$el.html(this.model.get('countOfMinesAround') || '');
        this.$el.toggleClass('is-bomb', this.model.get('isMine'));
        // console.log(this.model.collection);
        return this;
    },

    onClick: function() {
        this.model.set('isOpened', true);
        console.log(this.model.collection);
        if(!this.model.get('countOfMinesAround') && !this.model.get('isMine')) {
            this.model.collection.openNearestCells(this.model.get('x'), this.model.get('y'));
        }
    },

    openCell: function() {
        this.$el.toggleClass('is-opened', this.model.get('isOpened'));
        console.log(1);
    }
});
