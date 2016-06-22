var jwt = require('jsonwebtoken');
var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;
var config = require('../../../conf.json');
var Model = require('../dataAccess');

module.exports = {
        init: function() {
            var self = this;
            model = new Model({
                parameters: {
                    SQL_user: config.SQL_user,
                    SQL_password: config.SQL_password,
                    SQL_server: config.SQL_server,
                    SQL_database: config.SQL_database
                }
            })
            passport.use(new Strategy(function(token, cb) {
                self.verifyUser(token, model, function(user) {
                    if (!user.hasOwnProperty("idCliente")) return cb(null, false);
                    jwt.verify(token, config.secret, function(err, decoded) {
                        if (err) return cb(err)
                        user.token = token
                        return cb(null, user);
                    })
                });
            }));
        },
        saveUser: function(user, model, cb) {
            var params = [];
            jwt.sign(user[0], config.secret, {}, function(err, token) {
                if (err) return cb(err);
                params.push({
                    name: 'idCliente',
                    value: user[0].idCliente,
                    type: model.types.STRING
                })
                params.push({
                    name: 'token',
                    value: token,
                    type: model.types.STRING
                })
                params.push({
                    name: 'accion',
                    value: 1,
                    type: model.types.INT
                })
                model.query('UPD_USER_SETTOKEN_SP', params, function(error, result) {
                    return cb(null, token)
                })
            });
        },
        verifyUser: function(token, model, cb) {
            var params = [];
            if (token) {
                params.push({
                    name: 'token',
                    value: token,
                    type: model.types.STRING
                })
                model.query('SEL_USER_BYTOKEN_SP', params, function(error, result) {
                    if (result[0][0]) cb(result[0][0])
                    else cb({})
                })
            }
        },
        getUser: function(req, res, next, cb) {
            passport.authenticate('bearer', function(err, user, info) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return cb(true)
                }
                cb(null, user)
            })(req, res, next);
        }
    }
    /*



      */
