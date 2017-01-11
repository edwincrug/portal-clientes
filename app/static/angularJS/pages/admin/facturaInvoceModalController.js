app.controller('facturaInvoceModalController', function($scope, $state, User, Invoce, InvoceFactory, Utils) {
    $scope.idReferencia = null;
    $scope.content = true;
    $('#facturaInvoceModal').on('show.bs.modal', function(e) {
        $scope.invoce = InvoceFactory.getInvoce();
        $scope.$apply($scope.invoce)
        //console.log('Hola', $scope.invoce)
    })

    $('#facturaInvoceModal').on('hidden.bs.modal', function(e) {
        //$scope.loadingOrder = true;
        $(".filesInvoce").remove();

        //$scope.reloadPage = function(){$window.location.reload();}
        
        //location.href = '/pendingInvoce';
        $scope.content = true;
        $state.go($state.current, {}, {reload: true});
    })

    $scope.generarReferencia = function() {
        $scope.loadingFormatoFactura = true;
        $scope.content = false;
        Invoce.getPDFReferenceLote($scope.invoce[0].idEmpresa, $scope.invoce[0].idSucursal, $scope.invoce[0].idDepartamento, 1, $scope.invoce[0].serie, $scope.invoce[0].folio, $scope.invoce[0].idCliente, 0, $scope.invoce[0].importe, 2, 0, 0, 0).then(function(data) {
            //console.log(data.data.idReferencia)
            if (data.data.idReferencia) {
                $scope.idReferencia = data.data.idReferencia;
                angular.forEach($scope.invoce, function(value, key) {
                    //alert('Estoy en el for');
                    Invoce.addDetailsReference($scope.idReferencia, value.idSucursal, value.idDepartamento, 1, value.serie, value.folio, value.idCliente, 0, value.importe).then(function(result) {
                        //console.log(result)
                        if (result.data.result.length > 0) {
                            //console.log('Se guardo bien')
                        } else {
                            //console.log('Error al Guardar')
                        }
                    });
                });
                Invoce.getDetailsReference($scope.idReferencia).then(function(data) {
                    //console.log(data)
                    $scope.referencia = data.data;
                    //console.log($scope.referencia)
                    var pdf = URL.createObjectURL(new Blob([data.data], {
                        type: "application/pdf"
                    }))
                    //console.log(pdf)
                    $("<object class='lineaCaptura' data='" + pdf + "' width='100%' height='520px' >").appendTo('#pdfReferenceContentLote');
                    $scope.loadingFormatoFactura = false;
                });

            } else {
                AlertFactory.error("Hubo un error al generar la referencia.")
            }
        })
    }
})
