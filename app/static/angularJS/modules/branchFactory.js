app.factory("Branch", function($http) {
    var url = "/api/sucursal/"
    return {
        getByCompany: function(idCompany, rfc,idRol) {
            return $http.get(url + 'list/', {
                params: {
                    idCompany: idCompany,
                    rfc: rfc,
                    idRol:idRol
                }
            });
        }
    }
});
