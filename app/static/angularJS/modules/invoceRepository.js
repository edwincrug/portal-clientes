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
        getPDFReference: function(idInvoce,idBank,idCompany) {
            return $http.get(url + 'pdfReference/', {
                params: {
                    idInvoce: idInvoce,
                    idBank: idBank,
                    idCompany:idCompany
                }
            });
        },
        getUrlReference: function(idInvoce,idBank,idCompany) {
            return $http.get(url + 'urlReference/', {
                params: {
                    idInvoce: idInvoce,
                    idBank: idBank,
                    idCompany:idCompany
                }
            });
        }

    }
});
