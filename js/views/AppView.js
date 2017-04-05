/**
 * Base application view
 */

var AppView = Backbone.View.extend({

    CELL_SIZE: 40,

    regions: {
        controls: '#controls',
        field: '#field'
    },

    render: function() {
        this.$el.html(tpl.render('App'));
        this.regions.controls.render(ControlsView);

        this.setFieldSize();

        this.model.cells.each(function(model) {
            this.regions.field.addWidget(CellView);
        }.bind(this));
        this.regions.field.renderWidgets();

        return this;
    },

    setFieldSize: function() {
        this.$('._fieldWrapp')
        .width(this.model.get('width') * this.CELL_SIZE)
        .height(this.model.get('height') * this.CELL_SIZE);
    }

});
