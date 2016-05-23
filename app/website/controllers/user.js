var request = require('request');
var passport = require('passport');
var Auth = require('../modules/auth');


var User = function(conf) {
    this.conf = conf || {};
    if (conf) {
        this.url = this.conf.parameters.server + "loginapi/"
    }
    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}


User.prototype.post_entrar = function(req, res, next) {
    var self = this;
    if (req.body.rfc && req.body.pass) {
        request.get(this.url + "1|" + req.body.rfc + "|" + req.body.pass, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                body = JSON.parse(body);
                if (!body.length > 0) return res.status(401).send("No autorizado");
                auth = new Auth(self.conf);
                body[0].correo = decodeURIComponent(body[0].correo)
                auth.saveUser(body[0], function(err, token) {
                    if (err) return err;
                    res.json({
                        token: token
                    });
                })
            } else {
                return res.status(401).send("No autorizado");
            }
        })
    } else {
        return res.status(401).send("No autorizado");
    }
}

User.prototype.post_salir = function(req, res, next) {
    var self = this;
    auth = new Auth(self.conf);
    auth.getUser(req, res, next, function(user) {
        auth.removeUser(user, function(err, data) {
            if (err) {
              console.log("err: ")
              console.log(err)
                res.json({
                    response: "error"
                })
            } else {
                res.json({
                    response: "ok"
                })
            }

        })
    })
}

User.prototype.post_registrar = function(req, res, next) {
    var self = this;
    if (req.body.razon && req.body.email && req.body.rfc && req.body.pass) {
        request.post({
                url: this.url + "1",
                form: JSON.stringify({
                    razon: req.body.razon,
                    rfc: req.body.rfc,
                    email: req.body.email,
                    password: req.body.pass
                })
            },
            function(error, response, body) {

                if (!error && response.statusCode == 200) {
                    res.json(JSON.parse(body));

                } else {
                    res.json({});
                }
            })
    }
}

User.prototype.post_editar = function(req, res, next) {
    var self = this;
    if (req.body.razon && req.body.rfc && req.body.value && req.body.type) {
        request.post({
                url: this.url + "2",
                form: JSON.stringify({
                    razon: req.body.razon,
                    rfc: req.body.rfc,
                    email: req.body.value,
                    password: req.body.value,
                    type: req.body.type
                })
            },
            function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    res.json(JSON.parse(body));
                }
            })
    }
}


User.prototype.get_me = function(req, res, next) {
    var self = this;
    auth = new Auth(self.conf);
    auth.getUser(req, res, next, function(user) {
        delete user.token;
        res.json(user);
    })

}


User.prototype.post_validar = function(req, res, next) {
    var self = this;
    if (req.body.rfc && req.body.token && req.body.option) {
        request.post({
                url: this.url + "3",
                form: JSON.stringify({
                    token: req.body.token,
                    rfc: req.body.rfc,
                    opcion: req.body.option
                })
            },
            function(error, response, body) {
                body = JSON.parse(body);
                res.json(body);
            })
    } else {
        res.json({
            estatus: "error",
            mensaje: "Parametros incorrectos"
        });

    }
}
User.prototype.post_activar = function(req, res, next) {
    var self = this;
    if (req.body.token && req.body.rfc && req.body.option) {
        request.post({
                url: this.url + "4",
                form: JSON.stringify({
                    token: req.body.token,
                    rfc: req.body.rfc,
                    opcion: req.body.option
                })
            },
            function(error, response, body) {
                body = JSON.parse(body);
                res.json(body);
            })
    } else {
        res.json({
            estatus: "error",
            mensaje: "Parametros incorrectos"
        });
    }
}




module.exports = User;
