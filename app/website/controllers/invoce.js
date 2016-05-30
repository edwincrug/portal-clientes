var request = require('request');
var passport = require('passport');
var Model = require('../dataAccess');
var View = require('../viewPrinter');
var Auth = require('../modules/auth');
var invoceUtil = require('../modules/invoceUtil');
var soap = require('soap');
var parseString = require('xml2js').parseString;

var Invoce = function(conf) {
    this.conf = conf || {};
    this.model = new Model(this.conf);
    this.view = new View(this.conf);
    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

Invoce.prototype.get_pdfInvoce = function(req, res, next) {
    var self = this;
    var url = 'http://192.168.20.9:8095/Service1.asmx?WSDL';
    console.log(req.query)
    if (req.query.rfcEmisor && req.query.rfcReceptor && req.query.serie && req.query.folio) {
        var args = {
            RFCEMISOR: req.query.rfcEmisor,
            RFCRECEPTOR: req.query.rfcReceptor,
            SERIE: req.query.serie,
            FOLIO: req.query.folio
        };
        soap.createClient(url, function(err, client) {
            if (err) {
                self.view.error(res, {
                    mensaje: "Hubo un problema intente de nuevo",
                });
            } else {
                client.MuestraFactura(args, function(err, result, raw) {
                    if (err) {
                        self.view.error(res, {
                            mensaje: "Hubo un problema intente de nuevo",
                        });
                    } else {
                        parseString(raw, function(err, result) {
                            if (err) {
                                self.view.error(res, {
                                    mensaje: "Hubo un problema intente de nuevo",
                                });
                            } else {
                                var arrayBits = result["soap:Envelope"]["soap:Body"][0]["MuestraFacturaResponse"][0]["MuestraFacturaResult"][0];
                                self.view.ok(res, {
                                    mensaje: "prueba",
                                    data: {
                                        arrayBits: arrayBits
                                    }
                                });
                            }
                        });
                    }

                });
            }
        });
    } else {
        self.view.error(res, {
            mensaje: "Hubo un problema intente de nuevo",
        });
    }
}

Invoce.prototype.get_list = function(req, res, next) {
    var self = this;
    var params = [];
    if (req.query.idUser) {
        params.push({
            name: 'idCliente',
            value: req.query.idUser,
            type: self.model.types.INT
        })
        this.model.query('SEL_FACTURAS_PORPAGAR_SP', params, function(error, result) {
            self.view.ok(res, {
                data: result[0]
            });
        });
    } else {
        self.view.error(res, {
            mensaje: "Hubo un problema intente de nuevo",
        });
    }
}

Invoce.prototype.get_urlReference = function(req, res, next) {
    var self = this;
    var params = [];
    if (req.query.idInvoce, req.query.idBank, req.query.idCompany) {
        params.push({
            name: 'idFactura',
            value: req.query.ididInvoce,
            type: self.model.types.INT
        })
        params.push({
            name: 'idBanco',
            value: req.query.idBank,
            type: self.model.types.INT
        })
        params.push({
            name: 'idEmpresa',
            value: req.query.idCompany,
            type: self.model.types.INT
        })
        this.model.query('SEL_FACTURA_DATOSPAGO_SP', params, function(error, result) {
            self.view.ok(res, {
                mensaje: "prueba",
            });
        });
    } else {
        self.view.error(res, {
            mensaje: "Hubo un problema intente de nuevo",
        });
    }
}

Invoce.prototype.get_pdfReference = function(req, res, next) {
    var self = this;
    var params = [];
    if (req.query.idInvoce, req.query.idBank, req.query.idCompany) {
        params.push({
            name: 'idFactura',
            value: req.query.idInvoce,
            type: self.model.types.INT
        })
        params.push({
            name: 'idBanco',
            value: req.query.idBank,
            type: self.model.types.INT
        })
        params.push({
            name: 'idEmpresa',
            value: req.query.idCompany,
            type: self.model.types.INT
        })
        this.model.query('SEL_FACTURA_DATOSPAGO_SP', params, function(error, result) {
            if (error) {
                self.view.error(res, {
                    mensaje: "Hubo un problema intente de nuevo",
                });
            } else {
                invoceUtil.pdfGenerator(result[0], res)
            }
        });
    } else {
        self.view.error(res, {
            mensaje: "Hubo un problema intente de nuevo",
        });
    }
}




/*request.get(this.url + "1|" + req.body.rfc + "|" + req.body.pass, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        body = JSON.parse(body);
        if (!body.length > 0) return res.status(401).send("No autorizado");
        auth = new Auth(self.conf);
        body[0].correo = decodeURIComponent(body[0].correo)
        auth.saveInvoce(body[0], function(err, token) {
            if (err) return err;
            res.json({
                token: token
            });
        })
    } else {
        return res.status(401).send("No autorizado");
    }
})*/

module.exports = Invoce;
