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

        this.regions.field.renderWidgets(
            this.model.cells,
            CellView
        );

        return this;
    },

    setFieldSize: function() {
        this.$('._fieldWrapp')
        .width(this.model.get('width') * this.CELL_SIZE)
        .height(this.model.get('height') * this.CELL_SIZE);
    }

});
