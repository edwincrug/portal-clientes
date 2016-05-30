var jwt = require('jsonwebtoken');
var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;
var config = require('../../../conf.json');

module.exports = {
    init: function() {
        var self = this;
        passport.use(new Strategy(function(token, cb) {
            new Auth(config).verifyUser(token, function(exists) {
                if (!exists) return cb(null, false);
                jwt.verify(token, self.config.secret, function(err, decoded) {
                    if (err) return cb(err)
                    decoded.token = token
                    return cb(null, decoded);
                })
            });
        }));
    },
    saveUser: function(user, cb) {
        jwt.sign(user[0], config.secret, {}, function(err, token) {
            console.log(err)
            console.log(token)
            if (err) return cb(err);
            user.token = token;
            return cb(null, token)
        });
    }
}

/*
var Auth = function(config) {
    this.config = config.parameters || {};
    var self = this;

}


Auth.prototype.

Auth.prototype.removeUser = function(user, cb) {
    var self = this;
    Auth.users.forEach(function(u, n) {
        if (u.token === user.token) {
            Auth.users.splice(n, 1)
            return cb(null, true)
        }
        cb(true)
    })
}

Auth.prototype.getUser = function(req, res, next, cb) {
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

Auth.prototype.verifyUser = function(token, cb) {
    cb(Auth.users.find(function(user) {
        return user.token === token;
    }))
}


*/
