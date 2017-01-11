app.controller('activatePendingController', function($scope, $state, $location, User, AlertFactory) {

    $scope.reactivateAcount = function() {
        User.me().then(function(user) {
            User.reactivate(user.rfc).then(function(data) {
              //console.log(data)
                data = data[0];
                if (data.estatus == "ok") {
                    AlertFactory.success(data.mensaje);
                } else {
                    AlertFactory.error(data.mensaje);
                }
            })
        })
    }

})
