app.factory("Order", function($http) {
    var url = "/api/orden/"
    return {
        getPendingByProvider: function(idProvider, rfc, idRol) {
            return $http.get(url + 'pendientes/', {
                params: {
                    idProvider: idProvider,
                    rfc: rfc,
                    idRol
                }
            });
        },
        getEnterByProvider: function(idProvider, rfc, idRol) {
            return $http.get(url + 'ingresadas/' , {
                params: {
                    idProvider: idProvider,
                    rfc: rfc,
                    idRol
                }
            });
        },
        getPaidByProvider: function(idProvider, rfc, idRol) {
            return $http.get(url + 'pagadas/' , {
                params: {
                    idProvider: idProvider,
                    rfc: rfc,
                    idRol
                }
            });
        },
        pendingSeen: function(idOrder) {
            return $http.post(url + 'pendientevista/', {
                idOrder: idOrder
            });
        },
        getDocuments: function(idOrder) {
            return $http.get(url + 'documentos/' + idOrder, {
                idOrder: idOrder
            });
        }

    }
});
