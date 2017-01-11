var request = require('request');
var passport = require('passport');
var Model = require('../dataAccess');
var View = require('../viewPrinter');
var Auth = require('../modules/auth');
// var JsBarcode = require('jsbarcode');
// var Canvas = require("canvas");



var Template = function(conf) {
    this.conf = conf || {};
    this.model = new Model(this.conf);
    this.view = new View(this.conf);
    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
    this.middlewares = []
}

Template.prototype.get_comprobante = function(req, res, next) {
    var self = this;
    //var canvas = new Canvas();
    //console.log(req.query)
    // JsBarcode(canvas, req.query.referencia,{ height: 35,width:1.34,fontSize:12});
    // req.query.barcode =  canvas.toDataURL();
    res.render("comprobante.html",req.query)
    /*
    var params = [];
    this.model.query('SEL_BANCOS_SP', params, function(error, result) {
        self.view.ok(res, {
            data: result[0]
        });
    });
    */
}


module.exports = Template;
