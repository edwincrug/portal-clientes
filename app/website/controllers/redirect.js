var request = require('request');
var passport = require('passport');
var Model = require('../dataAccess');
var View = require('../viewPrinter');
var Auth = require('../modules/auth');
var jsonxml = require('jsontoxml');

var Redirect = function(conf) {
    this.conf = conf || {};
    this.model = new Model(this.conf);
    this.view = new View(this.conf);
    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
    this.middlewares = []

}
Redirect.prototype.get_santander = function(req, res, next) {
    var self = this;
    var params = [];

    params.push({
        name: 'respuesta',
        value: jsonxml({root:req.query}).toString() || "",
        type: self.model.types.STRING
    })

    this.model.query('INS_RESPUESTA_BANCO_SP', params, function(error, result) {
        console.log(error)
        console.log(result)
        self.view.ok(res, {

            data: result[0]
        });
    });
}

Redirect.prototype.post_bancomer = function(req, res, next) {
    var self = this;
    var params = [];

    console.log(req.params)
    console.log(req.body)
    console.log(req.query)

    params.push({
        name: 'respuesta',
        value: jsonxml({root:req.query}).toString() || "",
        type: self.model.types.STRING
    })

    this.model.query('INS_RESPUESTA_BANCO_SP', params, function(error, result) {
        console.log(error)
        console.log(result)
        self.view.ok(res, {

            data: result[0]
        });
    });
}


module.exports = Redirect;
