app.controller('pendingInvoceModalController', function($scope, InvoceFactory, Invoce,Utils, $window) {
    $scope.banks = [{
        idBanco: 1,
        id: "banamex",
        url: "https://www.banamex.com/es/index.htm"
    }, {
        idBanco: 2,
        id: "bancomer",
        url: "https://www.bancomer.com/index.jsp"
    }, {
        idBanco: 3,
        id: "santander",
        url: "http://www.santander.com.mx/mx/home/"
    }];

    $scope.selectedOptionBank;

    $('#payInvoceModal').on('show.bs.modal', function(e) {
        $scope.invoce = InvoceFactory.getInvoce();
        $scope.$apply($scope.invoce)
        console.log($scope.invoce)

    })


    $('#payInvoceModal').on('hide.bs.modal', function(e) {
        console.log("Hide")
        $scope.payMethod = ""
        $scope.pendingInvoceModalForm.$setPristine();
    })



    $scope.selectedBank = function(bank) {
        $scope.selectedOptionBank = bank;
    }
    $scope.getReferenceByMethod = function(idFactura, idBanco, idEmpresa, payMethod) {
        $('#payInvoceModal').modal('hide')
        console.log(idFactura, idBanco, idEmpresa, payMethod)
        if (payMethod == 1) { // Banco
            Invoce.getUrlReference(idFactura, idBanco, idEmpresa).then(function(data) {

            })
        } else if (payMethod == 2) { // Referencia
            Invoce.getPDFReference(idFactura, idBanco, idEmpresa).then(function(data) {
              console.log(data.data)
              console.log(URL.createObjectURL(Utils.b64toBlob(data.data,"application/pdf",512,true)));

            })
        }
    }

    $scope.goBankUrl = function() {}
})
