app.controller('pendingInvoceController', function($scope, User, Invoce, InvoceFactory) {
    var idCliente = 2;
    $scope.listInvoces = [];
    $scope.selectedOptionBank;
    Invoce.getByIdUser(idCliente).then(function(r) {
        $scope.listInvoces = r.data.data;
    })

    $scope.payInvoce = function(invoce) {
        InvoceFactory.setInvoce(invoce);
    }

    $scope.viewInvoce = function(invoce) {
            InvoceFactory.setInvoce(invoce);
        }
    /*
    $scope.generateReference = function(invoce) {
          Invoce.getReference(invoce.idFactura).then(function(data) {
            console.log(data)
        })
    }
    */


})
