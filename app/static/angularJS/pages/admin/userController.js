app.controller('userController', function($scope, User, $state, AlertFactory) {

    User.me().then(function(user) {
        $scope.user = user.data.data
        //console.log(user.data.data)
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
              AlertFactory.success(data.mensaje);
              $("#urlImagePerfil").attr("src","images/profile/"+$scope.user.imagen+"?d="+ new Date().getTime());
            }
        });
    });

    $scope.updateEmail = function() {
        User.update($scope.user.idCliente, $scope.newEmail, 2).then(function(data) {
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
        User.update( $scope.user.idCliente, $scope.pass, 1).then(function(data) {
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
