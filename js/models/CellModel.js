/*
 * @class CellModel
 */

var CellModel = Backbone.Model.extend({
    defaults: {
        isMine: false,
        isOpened: false,
        isFlag: false,
        x: 0,
        y: 0,
        countOfMinesAround: 0
    }
});
