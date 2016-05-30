app.controller('watchInvoceModalController', function($scope, User, Invoce, InvoceFactory, Utils) {

    $scope.loadingOrder = true;
    $('#watchInvoceModal').on('show.bs.modal', function(e) {
        $scope.invoce = InvoceFactory.getInvoce();
        $scope.$apply($scope.invoce)
        Invoce.getPDFInvoce($scope.invoce.rfcEmisor, $scope.invoce.rfcReceptor, $scope.invoce.serie, $scope.invoce.folio).then(function(d) {
            var pdf = URL.createObjectURL(Utils.b64toBlob(d.data.data.arrayBits, "application/pdf"))
            $("<object class='filesInvoce' data='" + pdf + "' width='100%' height='500px' >").appendTo('#pdfInvoceContent');
            $scope.loadingOrder = false;
        })
    })

    $('#watchInvoceModal').on('hidden.bs.modal', function(e) {
            $scope.loadingOrder = true;
            $(".filesInvoce").remove();
        })
})
