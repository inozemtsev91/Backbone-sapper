/*
*   Controls view
*/

var ControlsView = Backbone.View.extend({
    render: function() {
        this.$el.html(tpl.render('Controls'));
        return this;
    }
});