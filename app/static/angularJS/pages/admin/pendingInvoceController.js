app.controller('pendingInvoceController', function($scope, User, Invoce, InvoceFactory) {
    var idCliente = 2;
    $scope.listInvoces = [];
    $scope.selectedOptionBank;
    Invoce.getByIdUser(idCliente).then(function(r) {
        $scope.listInvoces = r.data.data;
    })
    $scope.selectedBank = function(bank) {
        console.log(bank)
    }

    $scope.payInvoce = function(invoce) {
        InvoceFactory.setInvoce(invoce);
    }
    $scope.generateReference = function(invoce) {
        console.log(invoce)
        Invoce.getReference(invoce.idFactura).then(function(data) {
            console.log(data)
        })
    }


})
