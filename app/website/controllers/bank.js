var request = require('request');
var passport = require('passport');
var Model = require('../dataAccess');
var View = require('../viewPrinter');
var Auth = require('../modules/auth');


var Bank = function(conf) {
    this.conf = conf || {};
    this.model = new Model(this.conf);
    this.view = new View(this.conf);
    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
    this.middlewares = [
        passport.authenticate('bearer', {
            session: false
        })
    ]
}

Bank.prototype.get_list = function(req, res, next) {
    var self = this;
    var params = [];
    this.model.query('SEL_BANCOS_SP', params, function(error, result) {
        self.view.ok(res, {
            data: result[0]
        });
    });
}


module.exports = Bank;
