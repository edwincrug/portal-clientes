app.controller('userController', function($scope, User, $state, AlertFactory) {

    User.me().then(function(user) {
        $scope.user = user.data
    })
    $('#logoFile').change(function() {
       var formData = new FormData(document.getElementById("uploadLogo"));
        $.ajax({
            url: '/api/fileUpload/logo/',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function(data) {
                alert(data);
            }
        });
    });
    $scope.updateEmail = function() {
        User.update($scope.user.razonSocial, $scope.user.rfc, $scope.newEmail, 1).then(function(data) {
            console.log(data)
            data = data.data[0]
            $scope.newEmail = "";
            if (data.estatus == "ok") {
                AlertFactory.success(data.mensaje);
            } else {
                AlertFactory.error(data.mensaje);
            }
        });
    }
    $scope.updatePassWord = function() {
        User.update($scope.user.razonSocial, $scope.user.rfc, $scope.pass, 2).then(function(data) {
            data = data.data[0]
            $scope.pass = $scope.passConfirm = "";
            if (data.estatus == "ok") {
                AlertFactory.success(data.mensaje);
            } else {
                AlertFactory.error(data.mensaje);
            }
        });
    }

    $scope.salir = function() {
        User.logout().then(function() {
            $state.go("login")
        });
    }
})
