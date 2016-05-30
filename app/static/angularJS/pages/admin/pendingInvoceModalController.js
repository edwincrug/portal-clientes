app.controller('pendingInvoceModalController', function($scope, InvoceFactory, Invoce, Utils, $window) {
    $scope.banks = [{
        idBanco: 4,
        id: "banamex",
        url: "https://www.banamex.com/es/index.htm"
    }, {
        idBanco: 1,
        id: "bancomer",
        url: "https://www.bancomer.com/index.jsp"
    }, {
        idBanco: 2,
        id: "santander",
        url: "http://www.santander.com.mx/mx/home/"
    }];

    $scope.selectedOptionBank;

    $('#payInvoceModal').on('show.bs.modal', function(e) {
        $scope.invoce = InvoceFactory.getInvoce();
        $scope.$apply($scope.invoce)

    })


    $('#payInvoceModal').on('hide.bs.modal', function(e) {
        $scope.payMethod = ""
        $scope.pendingInvoceModalForm.$setPristine();
    })

    $scope.selectedBank = function(bank) {
        $scope.selectedOptionBank = bank;
    }
    $scope.removeModal = function() {
        $('#payInvoceModal').modal('hide')
    }

  /*  $scope.setUrl = function() {
        if ($scope.payMethod == 1) { // Banco
            //$scope.urlRedirect =
        } else if ($scope.payMethod == 2) { // Referencia
            $scope.urlRedirect = "api/invoce/pdfReference/?idBank=2&idCompany=4&idInvoce=6"
        }
    }*/
})
