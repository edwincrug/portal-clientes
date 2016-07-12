app.factory("User", function($http, $cookies) {
    var url = "/api/user/"
    return {
        login: function(user, pass) {
            return $http.post(url + 'login/', {
                user: user,
                pass: pass
            });
        },
        signup: function(name, email, rfc, pass) {
            return $http.post(url + 'signup/', {
                name: name,
                email: email,
                rfc: rfc,
                pass: pass
            });
        },
        saveToken: function(token) {
            $cookies.put('andrade-token-client', token);
        },
        me: function() {
            return $http.get(url + 'me/');
        },
        validate: function(rfc, token, op) {
            return $http.post(url + 'validate/', {
                rfc: rfc,
                token: token,
                option: op
            });
        },
        activate: function(rfc, token, op) {
            return $http.post(url + 'activate/', {
                rfc: rfc,
                token: token,
                option: op
            });
        },
        logout: function() {
            return $http.post(url + 'logout/');
        },
        reactivate: function(rfc) {
            return $http.post(url + 'reactivate/', {
                rfc: rfc
            });
        },
        update: function(idCliente, valor, tipo) {
            return $http.post(url + 'edit/', {
                idCliente: idCliente,
                valor: valor,
                tipo: tipo
            });
        }

    }

});
