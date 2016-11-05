app.factory("Invoce", function($http) {
    var url = "/api/invoce/"
    return {
        getByIdUser: function(idUser) {
            return $http.get(url + 'list/', {
                params: {
                    idUser: idUser
                }
            });
        },
        getPayedByIdUser: function(idUser) {
            return $http.get(url + 'listPayed/', {
                params: {
                    idUser: idUser
                }
            });
        },
        getPDFInvoce: function(rfcEmisor, rfcReceptor, serie, folio) {
            return $http.get(url + 'pdfInvoce/', {
                params: {
                    rfcEmisor: rfcEmisor,
                    rfcReceptor: rfcReceptor,
                    serie: serie,
                    folio: folio
                }
            });
        },
        // getPDFReference: function(idInvoce, idBank, idCompany,serie,folio,tipo,idCliente ) {
        //     return $http.get(url + 'pdfReference/', {
        //         responseType: 'arraybuffer',
        //         params: {
        //             idInvoce: idInvoce,
        //             idBank: idBank,
        //             idCompany: idCompany,
        //             serie:serie,
        //             folio:folio,
        //             tipo:tipo,
        //             idCliente:idCliente
        //         }
        //     });
        // },
        getPDFReference: function(empresa, sucursal, departamento, documento, serie, folio, cliente, almacen, importe, referencia, nomempresa, nomsucursal, nomdepartamento) {
            return $http.get(url + 'pdfReference/', {
                responseType: 'arraybuffer',
                params: {
                    empresa: empresa,
                    sucursal: sucursal,
                    departamento: departamento,
                    documento: documento,
                    serie: serie,
                    folio: folio,
                    cliente: cliente,
                    almacen: almacen,
                    importe: importe,
                    referencia: referencia,
                    nomempresa: nomempresa,
                    nomsucursal: nomsucursal,
                    nomdepartamento: nomdepartamento
                }
            });
        },
        getPDFReferenceLote: function(empresa, sucursal, departamento, documento, serie, folio, cliente, almacen, importe, referencia, nomempresa, nomsucursal, nomdepartamento) {
            return $http.get(url + 'pdfReferenceLote/', {
                params: {
                    empresa: empresa,
                    sucursal: sucursal,
                    departamento: departamento,
                    documento: documento,
                    serie: serie,
                    folio: folio,
                    cliente: cliente,
                    almacen: almacen,
                    importe: importe,
                    referencia: referencia,
                    nomempresa: nomempresa,
                    nomsucursal: nomsucursal,
                    nomdepartamento: nomdepartamento
                }
            });
        },
        getUrlReference: function(idInvoce, idBank, idCompany, empresa, sucursal, departamento, documento, serie, folio, cliente, almacen, importe, referencia, nomempresa, nomsucursal, nomdepartamento) {
            return $http.get(url + 'urlReference/', {
                params: {
                    idInvoce: idInvoce,
                    idBank: idBank,
                    idCompany: idCompany,
                    empresa: empresa,
                    sucursal: sucursal,
                    departamento: departamento,
                    documento: documento,
                    serie: serie,
                    folio: folio,
                    cliente: cliente,
                    almacen: almacen,
                    importe: importe,
                    referencia: referencia,
                    nomempresa: nomempresa,
                    nomsucursal: nomsucursal,
                    nomdepartamento: nomdepartamento
                }
            });
        },
        addDetailsReference : function (idReferencia,idSucursal,idDepartamento,idTipoDocumento,serie,folio,idCliente,idAlma,importeDocumento) {
            return $http.post(url + 'addDetailsReference/',{
                    idReferencia: idReferencia,
                    idSucursal: idSucursal,
                    idDepartamento: idDepartamento,
                    idTipoDocumento: idTipoDocumento,
                    serie: serie,
                    folio: folio,
                    idCliente: idCliente,
                    idAlma: idAlma,
                    importeDocumento: importeDocumento
            });
        },
        getDetailsReference: function(idReferencia) {
            return $http.get(url + 'DetailsReference/', {
                responseType: 'arraybuffer',
                params: {
                    idReferencia: idReferencia
                }
            });
        } 
    }
});
