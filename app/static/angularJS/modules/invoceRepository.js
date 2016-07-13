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
        getPDFReference: function(idInvoce, idBank, idCompany,serie,folio,tipo,idCliente ) {
            return $http.get(url + 'pdfReference/', {
                responseType: 'arraybuffer',
                params: {
                    idInvoce: idInvoce,
                    idBank: idBank,
                    idCompany: idCompany,
                    serie:serie,
                    folio:folio,
                    tipo:tipo,
                    idCliente:idCliente
                }
            });
        },
        getUrlReference: function(idInvoce, idBank, idCompany,serie,folio,tipo,idCliente) {
            return $http.get(url + 'urlReference/', {
                params: {
                    idInvoce: idInvoce,
                    idBank: idBank,
                    idCompany: idCompany,
                    serie:serie,
                    folio:folio,
                    tipo:tipo,
                    idCliente:idCliente
                }
            });
        }
    }
});
