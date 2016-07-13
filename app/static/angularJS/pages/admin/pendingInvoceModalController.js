app.controller('pendingInvoceModalController', function($scope, $window, Bank, InvoceFactory, Invoce, Utils) {

  Bank.getList().then(function(data) {
    $scope.banks = data.data.data
  })

  $scope.content = true;
  $scope.selectedOptionBank;

  $('#payInvoceModal').on('show.bs.modal', function(e) {
    $scope.invoce = InvoceFactory.getInvoce();
    $scope.$apply($scope.invoce)
    console.log($scope.invoce)
  })

  $('#payInvoceModal').on('hide.bs.modal', function(e) {
    $scope.payMethod = ""
    $scope.pendingInvoceModalForm.$setPristine();
    $('.lineaCaptura').remove();
    $scope.content = true;
  })

  $scope.selectedBank = function(bank) {
    $scope.selectedOptionBank = bank;
  }
  $scope.removeModal = function() {
    $('#payInvoceModal').modal('hide')

  }

  $scope.payInvoce = function(idInvoce, idBank, idCompany) {

    if ($scope.payMethod == 1) { // Banco
      Invoce.getUrlReference(idInvoce, idBank, idCompany, $scope.invoce.serie, $scope.invoce.folio, 0, $scope.invoce.idCliente).then(function(data) {
        data = data.data.data
        var x = 1000;
        var y = 600;
        var urlBank = data.url + "?url_resp=" + data.url_redirect + "&convenio=" + data.convenio + "&referencia=" + data.referencia + "&importe=" + data.cantidad;
        $window.open(urlBank, "", "width=" + x + ",height=" + y + ",top=" + (screen.height - y) / 2 + ",left=" + (screen.width - x) / 2 + ",scrollbars=NO");
      })
    } else if ($scope.payMethod == 2) { // Referencia
      $scope.content = false;
      Invoce.getPDFReference(idInvoce, idBank, idCompany, $scope.invoce.serie, $scope.invoce.folio, 0, $scope.invoce.idCliente).then(function(data) {
        var pdf = URL.createObjectURL(new Blob([data.data], {
          type: "application/pdf"
        }))
        $("<object class='lineaCaptura' data='" + pdf + "' width='100%' height='520px' >").appendTo('#pdfReferenceContent');

      })
    }
  }
})
