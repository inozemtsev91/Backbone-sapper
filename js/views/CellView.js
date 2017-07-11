var CellView = Backbone.View.extend({
    className: 'cell',

    events: {
        'click': 'onClick',
        'contextmenu': 'checkFlag'
    },

    initialize: function() {
        this.app = this.model.collection.app;
        this.listenTo(this.model, 'change:isOpened', this.openCell);
    },

    render: function() {
        this.$el.html(this.model.get('countOfMinesAround') || '');
        this.$el.toggleClass('is-bomb', this.model.get('isMine'));
        return this;
    },

    onClick: function() {
        if(!this.model.get('isFlag')) {
            this.model.set('isOpened', true);
        }
    },

    openCell: function() {
        if(this.model.get('isMine')) {
            this.$el.toggleClass('is-opened', this.model.get('isOpened'));
            this.$el.addClass('bang');
            this.app.set('wasted', true);
            return;
        }
        this.$el.toggleClass('is-opened', this.model.get('isOpened'));
        if(!this.model.get('countOfMinesAround') && !this.model.get('isMine')) {
            this.model.collection.openNearestCells(this.model.get('x'), this.model.get('y'));
        }
    },

    checkFlag: function(e) {
        e.preventDefault();
        if(this.app.get('flagsCount') > 0 && !this.model.get('isOpened')) {
            this.setFlag(true);
        } else if (this.app.get('flagsCount') == 0 && !this.model.get('isOpened')) {
            this.setFlag(false);
        }
    },

    setFlag: function(arg) {

        if(!this.model.get('isFlag') && arg) {
            this.app.set('flagsCount', this.app.get('flagsCount') - 1);
            this.model.set('isFlag', true);
        } else if(this.model.get('isFlag')) {
            this.app.set('flagsCount', this.app.get('flagsCount') + 1);
            this.model.set('isFlag', false);
        }
        this.$el.toggleClass('is-flag');

        console.log(this.app.get('flagsCount'));
    }
});
