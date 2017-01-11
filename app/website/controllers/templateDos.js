var request = require('request');
var passport = require('passport');
var Model = require('../dataAccess');
var View = require('../viewPrinter');
var Auth = require('../modules/auth');
// var JsBarcode = require('jsbarcode');
// var Canvas = require("canvas");



var TemplateDos = function(conf) {
    this.conf = conf || {};
    this.model = new Model(this.conf);
    this.view = new View(this.conf);
    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
    this.middlewares = []
}

TemplateDos.prototype.get_nuevo = function(req, res, next) {
    var self = this;
    //var canvas = new Canvas();
    //console.log(req.query)
    var referencia=req.query;
    //console.log('Soy la referencia',referencia)
    var params = [
        {
            name: 'idReferencia',
            value: req.query.idReferencia,
            type: self.model.types.INT
        }
    ];
    // JsBarcode(canvas, req.query.referencia,{ height: 35,width:1.34,fontSize:12});
    // req.query.barcode =  canvas.toDataURL();
    self.model.query('SEL_DETALLE_REFERENCIA_SP', params, function(error, result) {
       //console.log(result)
       var params2 = [{
           name: 'idEmpresa',
           value: result[0].idEmpresa,
           type: self.model.types.INT
       },{
           name: 'tipoReferencia',
           value: result[0].tipoReferencia,
           type: self.model.types.INT
       }]
       self.model.query('SEL_LEYENDAS_PDF_SP', params2, function (error, leyendas) {
            //console.log(leyendas)
           res.render('comprobanteDos.html',{referencias:result[0], leyendas:leyendas[0]});
       });
   });
}
module.exports = TemplateDos;