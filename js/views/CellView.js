var CellView = Backbone.View.extend({
    className: 'cell',

    render: function() {
        this.$el.html(this.model.get('countOfMinesAround'));
        return this;
      }
});
