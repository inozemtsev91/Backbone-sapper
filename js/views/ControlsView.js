/*
*   Controls view
*/

var ControlsView = Backbone.View.extend({

    events: {
        'click #reset': 'reset'
    },

    initialize: function() {
      this.listenTo(this.model.cells, 'change:isOpened', this.render);
      this.listenTo(this.model, 'change:flagsCount', this.render);
    },

    render: function() {
        this.$el.html(tpl.render('Controls', {
            openedCount: this.model.get('openedCellsCount'),
            flagsCount: this.model.get('flagsCount')
        }));
        return this;
    },

    reset: function() {
        this.model.set('openedCellsCount', 0);
        this.model.set('flagsCount', this.model.get('mines'));
        this.stopListening();
        console.log('Controls | stopListening');
        this.model.cells.reset();
        console.log('Controls | reset model');
        this.initialize();
        console.log('Controls | initialize view');
    }
});