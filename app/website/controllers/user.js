var request = require('request');
var passport = require('passport');
var Model = require('../dataAccess');
var View = require('../viewPrinter');
var Auth = require('../modules/auth');

var User = function(conf) {
    this.conf = conf || {};
    this.model = new Model(this.conf);
    this.view = new View(this.conf);
    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

User.prototype.post_login = function(req, res, next) {
    var self = this;
    var params = [];

    if (req.body.user && req.body.pass) {
        params.push({
            name: 'user',
            value: req.body.user,
            type: self.model.types.STRING
        })
        params.push({
            name: 'pass',
            value: req.body.pass,
            type: self.model.types.STRING
        })
        this.model.query('SEL_LOGIN_SP', params, function(error, result) {
            if (error) {
                self.view.error(res, {
                    mensaje: "Hubo un problema en su acceso intente de nuevo",
                    status: 401
                });
            } else {
                if (result[0].length > 0) {
                    Auth.saveUser(result[0], self.model, function(err, token) {
                        result[0][0].token = token;
                        self.view.ok(res, {
                            mensaje: "Acceso correcto",
                            data: result[0][0]
                        });
                    });
                } else {
                    self.view.error(res, {
                        mensaje: "RFC o contraseña invalida, intente de nuevo por favor.",
                        status: 401
                    });
                }
            }
        });
    } else {
        self.view.error(res, {
            mensaje: "Hubo un problema en su acceso intente de nuevo",
            status: 401
        });
    }
}

User.prototype.post_signup = function(req, res, next) {
    var self = this;
    var params = [];
    if (req.body.name && req.body.rfc && req.body.email && req.body.pass) {
        params.push({
            name: 'nombre',
            value: req.body.name,
            type: self.model.types.STRING
        })
        params.push({
            name: 'rfc',
            value: req.body.rfc,
            type: self.model.types.STRING
        })
        params.push({
            name: 'correoUsuario',
            value: req.body.email,
            type: self.model.types.STRING
        })
        params.push({
            name: 'contrasena',
            value: req.body.pass,
            type: self.model.types.STRING
        })
        params.push({
            name: 'aPaterno',
            value: '',
            type: self.model.types.STRING
        })
        params.push({
            name: 'aMaterno',
            value: '',
            type: self.model.types.STRING
        })
        this.model.query('INS_USER_SP', params, function(error, result) {

            if (error) {
                self.view.error(res, {
                    mensaje: "Hubo un problema con su registro intente de nuevo"
                });
            } else {
                self.view.see(res, result[0]);
            }
        });
    } else {
        self.view.error(res, {
            mensaje: "Hubo un problema con su registro intente de nuevo",
        });
    }
}

User.prototype.get_me = function(req, res, next) {
    var self = this;
    Auth.getUser(req, res, next, function(error, user) {
        if (error) {
            self.view.error(res, {
                status: 401,
                mensaje: "Hubo un problema con su sesion",
            });
        } else {
            delete user.token
            self.view.ok(res, {
                mensaje: "Usuario",
                data: user
            });
        }
    })
}

User.prototype.get_reactivate = function(req, res, next) {

}

User.prototype.post_validate = function(req, res, next) {
    var self = this;
    var params = [];
    if (req.body.rfc && req.body.token && req.body.option) {
        params.push({
            name: 'rfcCliente',
            value: req.body.rfc,
            type: self.model.types.STRING
        })
        params.push({
            name: 'token',
            value: req.body.token,
            type: self.model.types.STRING
        })
        params.push({
            name: 'opcion',
            value: req.body.option,
            type: self.model.types.INT
        })
        self.model.query('SEL_VALIDALINK_ACTIVACION_SP', params, function(error, result) {
            if (error) {
                self.view.error(res, {
                    mensaje: "Error",
                });
            } else {
                self.view.see(res, result[0]);
            }
        })
    } else {
        self.view.error(res, {
            mensaje: "Error en los parametros",
        });
    }
}

User.prototype.post_activate = function(req, res, next) {
    var self = this;
    var params = [];
    if (req.body.token && req.body.rfc && req.body.option) {
        params.push({
            name: 'rfcCliente',
            value: req.body.rfc,
            type: self.model.types.STRING
        })
        params.push({
            name: 'token',
            value: req.body.token,
            type: self.model.types.STRING
        })
        params.push({
            name: 'opcion',
            value: req.body.option,
            type: self.model.types.INT
        })
        self.model.query('SEL_ACTIVACION_CUENTA_SP', params, function(error, result) {
            if (error) {
                self.view.error(res, {
                    mensaje: "Error",
                });
            } else {
                self.view.see(res, result[0]);
            }
        })
    } else {
        self.view.error(res, {
            mensaje: "Error en los parametros",
        });
    }
}

User.prototype.post_logout = function(req, res, next) {
    var self = this;
    var params = [];
    Auth.getUser(req, res, next, function(error, user) {
        if (error) {
            self.view.error(res, {
                mensaje: "Error",
            });
        } else {

            params.push({
                name: 'idCliente',
                value: user.idCliente,
                type: self.model.types.STRING
            })
            params.push({
                name: 'token',
                value: "",
                type: self.model.types.STRING
            })
            params.push({
                name: 'accion',
                value: 2,
                type: self.model.types.INT
            })
            self.model.query('UPD_USER_SETTOKEN_SP', params, function(error, result) {
                if (error) {
                    self.view.error(res, {
                        mensaje: "Error",
                    });
                } else {
                    self.view.ok(res, {
                        mensaje: "Ok",
                    });
                }
            })
        }
    })
}

User.prototype.post_edit = function(req, res, next) {
    var self = this;
    var params = [];
    if (req.body.idCliente && req.body.valor && req.body.tipo) {
        params.push({
            name: 'idCliente',
            value: req.body.idCliente,
            type: self.model.types.STRING
        })
        params.push({
            name: 'valor',
            value: req.body.valor,
            type: self.model.types.STRING
        })
        params.push({
            name: 'tipo',
            value: req.body.tipo,
            type: self.model.types.INT
        })
        self.model.query('UPD_USER_SP', params, function(error, result) {
            if (error) {
                self.view.error(res, {
                    mensaje: "Error",
                });
            } else {
                self.view.see(res, result[0]);
            }
        })
    } else {
        self.view.error(res, {
            mensaje: "Error en los parametros",
        });
    }
}

/*

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

*/
module.exports = User;
