var request = require('request');
var passport = require('passport');
var Model = require('../dataAccess');
var View = require('../viewPrinter');
var Auth = require('../modules/auth');
var invoceUtil = require('../modules/invoceUtil');
var soap = require('soap');
var CryptoJS = require("crypto-js")
var parseString = require('xml2js').parseString;
var url2pdf = require("url2pdf");
var path = require("path");
var phantom = require("phantom");


var Invoce = function(conf) {
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

Invoce.prototype.get_pdfInvoce = function(req, res, next) {
    var self = this;
    var url = this.conf.parameters.WSInvoce;
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
                                var arrayBits = result["soap:Envelope"]["soap:Body"][0]["MuestraFacturaResponse"][0]["MuestraFacturaResult"][0]["pdf"][0];
                                var mensaje = result["soap:Envelope"]["soap:Body"][0]["MuestraFacturaResponse"][0]["MuestraFacturaResult"][0]["mensajeresultado"][0];
                                self.view.ok(res, {
                                    mensaje: mensaje,
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
        this.model.query('SEL_FACTURAS_POR_PAGAR_SP', params, function(error, result) {
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

Invoce.prototype.get_listPayed = function(req, res, next) {
    var self = this;

    var params = [];
    if (req.query.idUser) {
        params.push({
            name: 'idCliente',
            value: req.query.idUser,
            type: self.model.types.INT
        })
        //console.log(params)
        this.model.query('SEL_TOTAL_DOC_PAG_DETALLE_SP_TODAS', params, function(error, result) {
            //console.log(result)
            //console.log(error)
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
    //console.log('si entro a la api')
    //console.log(this.conf.parameters.WSReferenceDos)
    //console.log(this.conf.parameters.WSReference, req.query.empresa, req.query.sucursal, req.query.departamento, req.query.documento, req.query.serie, req.query.folio, req.query.cliente, req.query.almacen, req.query.importe, req.query.referencia)
    var self = this;
    var params = [];
    if (req.query.idInvoce, req.query.idBank, req.query.idCompany) {

        getReferenceFromWS(this.conf.parameters.WSReference, req.query.empresa, req.query.sucursal, req.query.departamento, req.query.documento, req.query.serie, req.query.folio, req.query.cliente, req.query.almacen, req.query.importe, req.query.referencia, function(err, data) {
            //console.log(data);

            probando = data;
            //console.log(probando.idReferencia);
            referencia = probando.idReferencia;
            //self.view.writeJSON(res, data);
            params.push({
                name: 'idReferencia',
                value: referencia,
                type: self.model.types.INT
            })
            params.push({
                name: 'idBanco',
                value: req.query.idBank,
                type: self.model.types.INT
            })
            this.model.query('SEL_FACTURA_DATOS_PAGO_SP', params, function(error, result) {
                //console.log(result[0][0])
                self.view.ok(res, {
                    mensaje: "Referencia",
                    data: result[0][0]
                });
            });

        });
        // getReferenceFromWSDos(this.conf.parameters.WSReferenceDos, req.query.serie, req.query.folio, req.query.tipo, req.query.idCliente, function(err, data) {
        //     console.log(data)
        //     this.model.query('SEL_FACTURA_DATOSPAGO_SP', params, function(error, result) {
        //         result[0][0].referencia = data.REFERENCIA;
        //         console.log(result[0][0].referencia)
        //         var codigo = result[0][0].orderNumber + result[0][0].referencia + result[0][0].cantidad
        //         console.log(codigo)
        //         console.log(self.conf.parameters.bancomer_secret)
        //         result[0][0].codigo = CryptoJS.HmacSHA256(codigo, self.conf.parameters.bancomer_secret).toString(CryptoJS.enc.Hex)
        //         console.log(result[0][0])
        //         self.view.ok(res, {
        //             mensaje: "Referencia",
        //             data: result[0][0]
        //         });
        //     });
        // })

    } else {
        self.view.error(res, {
            mensaje: "Hubo un problema intente de nuevo",
        });
    }
}

// Invoce.prototype.get_pdfReference = function(req, res, next) {
//   //console.log("Generar PDF")
//   var self = this;
//   var params = [];
//   if (req.query.idInvoce, req.query.idBank, req.query.idCompany) {
//     params.push({
//       name: 'idFactura',
//       value: req.query.idInvoce,
//       type: self.model.types.STRING
//     })
//     params.push({
//       name: 'idBanco',
//       value: req.query.idBank,
//       type: self.model.types.INT
//     })
//     params.push({
//       name: 'idEmpresa',
//       value: req.query.idCompany,
//       type: self.model.types.INT
//     })
//     getReferenceFromWS(this.conf.parameters.WSReference, req.query.serie, req.query.folio, req.query.tipo, req.query.idCliente, function(err, data) {
//       this.model.query('SEL_FACTURA_DATOSPAGO_SP', params, function(error, result) {
//         //Bancomer
//         result[0][0].referencia = data.REFERENCIA;
//         if (error) {
//           self.view.error(res, {
//             mensaje: "Hubo un problema intente de nuevo",
//           });
//         } else {
//           var query = ""
//           for (key in result[0][0]) {
//             query += encodeURIComponent(key) + "=" + encodeURIComponent(result[0][0][key]) + "&";
//           }
//           //console.log("http://localhost:4500/api/template/comprobante?" + query)
//           url2pdf.renderPdf("http://localhost:4500/api/template/comprobante?" + query, {
//               paperSize: {
//                 format: "A4",
//                 orientation: 'portrait',
//                 margin: '0cm'
//               }
//             })
//             .then(function(path) {
//               //console.log(path)
//               res.sendFile(path);
//             })
//             .catch(function(err) {
//               res.status(500).json(err);
//             })
//         }
//       });
//     });

//   } else {
//     self.view.error(res, {
//       mensaje: "Hubo un problema intente de nuevo",
//     });
//   }
// }

Invoce.prototype.get_pdfReference = function(req, res, next) {
    var self = this;
    var probando = '';
    var referencia = '';
    var params = [];
    getReferenceFromWS(this.conf.parameters.WSReference, req.query.empresa, req.query.sucursal, req.query.departamento, req.query.documento, req.query.serie, req.query.folio, req.query.cliente, req.query.almacen, req.query.importe, req.query.referencia, function(err, data) {
        //console.log(data);

        probando = data;
        //console.log(probando.REFERENCIA);
        referencia = probando.REFERENCIA;
        //self.view.writeJSON(res, data);
        //console.log('1.-estamos aqui en genera PDF() cliente: ' + probando.idReferencia);

        phantom.create().then(function(ph) {
            ph.createPage().then(function(page) {
                //console.log('2.-Mando a llamar a Nuevo');
                //inicia Page.property
                page.property('paperSize', {
                    format: 'A4'
                }).then(function() {
                    page.open("http://localhost:4500/api/templateDos/nuevo?idReferencia=" + probando.idReferencia).then(function(status) {
                        //console.log(status);
                        page.render('Reporte_Lote.pdf').then(function() {
                            //console.log('4.-Regreso y estoy en Page Rendered');
                            page.close();
                            ph.exit();
                            //console.log('5.-Page Rendered2');
                            setTimeout(function() {
                                res.sendFile("Reporte_Lote.pdf", {
                                    root: path.join(__dirname, '../../../')
                                });
                                //console.log('6.-Page Rendered3');
                            }, 10)

                        });
                    });

                }); //Fin Page.property

            });
        });
    });
}




Invoce.prototype.get_pdfReferenceLote = function(req, res, next) {
    var self = this;
    var probando = '';
    var referencia = '';
    var params = [];
    getReferenceFromWS(this.conf.parameters.WSReference, req.query.empresa, req.query.sucursal, req.query.departamento, req.query.documento, req.query.serie, req.query.folio, req.query.cliente, req.query.almacen, req.query.importe, req.query.referencia, function(err, data) {
        //console.log(data);

        probando = data;
        //console.log(probando.REFERENCIA);
        referencia = probando.REFERENCIA;
        self.view.writeJSON(res, data);


    });
}

Invoce.prototype.post_addDetailsReference = function(req, res, next) {
    var self = this;
    var params = [];
    params.push({
        name: 'idReferencia',
        value: req.body.idReferencia,
        type: self.model.types.INT
    })
    params.push({
        name: 'idSucursal',
        value: req.body.idSucursal,
        type: self.model.types.INT
    })
    params.push({
        name: 'idDepartamento',
        value: req.body.idDepartamento,
        type: self.model.types.INT
    })
    params.push({
        name: 'idTipoDocumento',
        value: req.body.idTipoDocumento,
        type: self.model.types.INT
    })
    params.push({
        name: 'serie',
        value: req.body.serie,
        type: self.model.types.STRING
    })
    params.push({
        name: 'folio',
        value: req.body.folio,
        type: self.model.types.STRING
    })
    params.push({
        name: 'idCliente',
        value: req.body.idCliente,
        type: self.model.types.INT
    })
    params.push({
        name: 'idAlma',
        value: req.body.idAlma,
        type: self.model.types.STRING
    })
    params.push({
        name: 'importeDocumento',
        value: req.body.importeDocumento,
        type: self.model.types.DECIMAL
    })
    this.model.query('INS_DETALLE_REFERENCIA_LOTE_SP', params, function(error, result) {
        if (error) {
            self.view.error(res, {
                mensaje: "Hubo un problema al insertar las facturas"
            });
        } else {
            self.view.see(res, {
                error: error,
                result: result[0]
            });
        }
    });
}

Invoce.prototype.get_DetailsReference = function(req, res, next) {
    var self = this;
    //console.log(req.query.idReferencia)
    var params = [];
    params.push({
        name: 'idReferencia',
        value: req.query.idReferencia,
        type: self.model.types.INT
    })
    //console.log('1.-estamos aqui en genera PDF() cliente: ' + req.query.idReferencia);

    phantom.create().then(function(ph) {
        ph.createPage().then(function(page) {
            //console.log('2.-Mando a llamar a Nuevo');
            //inicia Page.property
            page.property('paperSize', {
                format: 'A4'
            }).then(function() {
                page.open("http://localhost:4500/api/templateDos/nuevo?idReferencia=" + req.query.idReferencia).then(function(status) {
                    //console.log(status);
                    page.render('Reporte_Lote.pdf').then(function() {
                        //console.log('4.-Regreso y estoy en Page Rendered');
                        page.close();
                        ph.exit();
                        //console.log('5.-Page Rendered2');
                        setTimeout(function() {
                            res.sendFile("Reporte_Lote.pdf", {
                                root: path.join(__dirname, '../../../')
                            });
                            //console.log('6.-Page Rendered3');
                        }, 10)

                    });
                });

            }); //Fin Page.property

        });
    });

}

function getReferenceFromWS(url, idEmpresa, idSucursal, idDepartamento, idTipoDocumento, serie, folio, idCliente, idAlma, importeDocumento, idTipoReferencia, cb) {
    request.get(url + "?idEmpresa=" + idEmpresa + "&idSucursal=" + idSucursal + "&idDepartamento=" + idDepartamento + "&idTipoDocumento=" + idTipoDocumento + "&serie=" + serie + "&folio=" + folio + "&idCliente=" + idCliente + "&idAlma=" + idAlma + "&importeDocumento=" + importeDocumento + "&idTipoReferencia=" + idTipoReferencia,
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                body = JSON.parse(body);
                //console.log(body)
                cb(null, body);
            } else {
                cb(error)
            }
        })
};

function getReferenceFromWSDos(url, serie, folio, tipo, idCliente, cb) {
    request.get(url + "?serie=" + serie + "&folio=" + folio + "&tipo=" + tipo + "&idCliente=" + idCliente, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body);
            //console.log(body)
            cb(null, body);
        } else {
            cb(error)
        }
    })
}

module.exports = Invoce;
