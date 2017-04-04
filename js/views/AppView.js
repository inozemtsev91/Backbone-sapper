/**
 * Base application view
 */

var AppView = Backbone.View.extend({

    regions: {
        controls: '#controls',
        field: '#field'
    },

    initialize: function() {

    },

    render: function() {
        this.$el.html(tpl.render('App', {}));
        this.regions.controls.render(ControlsView, {});

        this.setFieldSize();

        this.model.collection.each(function(model) {
            this.regions.field.addWidget(CellView);
        }.bind(this));
        this.regions.field.renderWidgets();

        return this;
    },

    setFieldSize: function() {
        this.$('._fieldWrapp').width(this.model.get('width') * 40);
        this.$('._fieldWrapp').height(this.model.get('height') * 40);
    }

});
