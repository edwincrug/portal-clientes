app.controller('loginController', function($scope, $state, User, AlertFactory, New) {
  $scope.rfc = ""
  $scope.pass = ""

  $scope.submit = function() {
    User.login($scope.rfc, $scope.pass).then(function(d) {
        if (d.data.estatus == "ok") {
          var currentUser = d.data.data;
          if (currentUser.token) {
            User.saveToken(currentUser.token);
            $state.go("admin.pendingInvoce");
          }
        }
        /*New.getNews($scope.rfc).then(function(data) {
            $scope.listNews = data.data;
            var newFlag = false;
            for (var i in $scope.listNews) {
                if ($scope.listNews[i].idEstatus == 1) {
                    newFlag = true;
                    break;
                }
            }
            if (newFlag) {
                $state.go("admin.news");
            } else {
                $state.go("admin.pOrder");
            }

        })*/


      },
      function(error) {
        $scope.pass = ""
        AlertFactory.error("RFC o contraseña incorrecta intenta de nuevo por favor.")
      })
  }

});
