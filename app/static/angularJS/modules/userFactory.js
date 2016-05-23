app.factory("User", function($http, $cookies) {
    var url = "/api/usuario/"
    return {
        login: function(rfc, pass) {
            return $http.post(url + 'entrar/', {
                rfc: rfc,
                pass: pass
            });
        },
        signup: function(razon, email, rfc, pass) {
            return $http.post(url + 'registrar/', {
                razon: razon,
                email: email,
                rfc: rfc,
                pass: pass
            });
        },
        update: function(razon, rfc, value, type) {
            return $http.post(url + 'editar/', {
                razon: razon,
                rfc: rfc,
                value: value,
                type: type
            });
        },
        logout: function() {
            return $http.post(url + 'salir/');
        },
        me: function() {
            return $http.get(url + 'me/');
        },
        saveToken: function(token) {
            $cookies.put('andrade-token', token);
        },
        getToken: function() {
            return $cookies.get('andrade-token')
        },
        validate: function(rfc, token, op) {
            return $http.post(url + 'validar/', {
                rfc: rfc,
                token: token,
                option: op
            });
        },
        activate: function(rfc, token, op) {
            return $http.post(url + 'activar/', {
                rfc: rfc,
                token: token,
                option: op
            });
        }
    }
});
