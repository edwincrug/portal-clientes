app.controller('pendingInvoceModalController', function($scope, $window, Bank, InvoceFactory, Invoce, Utils) {

    Bank.getList().then(function(data) {
        $scope.banks = data.data.data
    })

    $scope.content = true;
    $scope.selectedOptionBank;

    $('#payInvoceModal').on('show.bs.modal', function(e) {
        $scope.invoce = InvoceFactory.getInvoce();
        $scope.$apply($scope.invoce)
            //console.log($scope.invoce)
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

    $scope.payInvoce = function(idInvoce, idBank, idCompany, empresa, sucursal, departamento, documento, serie, folio, cliente, almacen, importe, referencia, nomempresa, nomsucursal, nomdepartamento) {

        if ($scope.payMethod == 1) { // Banco
            Invoce.getUrlReference(idInvoce, idBank, idCompany, empresa, sucursal, departamento, documento, serie, folio, cliente, almacen, importe, referencia, nomempresa, nomsucursal, nomdepartamento).then(function(data) {
                data = data.data.data
                var x = 1000;
                var y = 600;
                var urlBank = "";
                var bankName = "";
                $scope.banks.forEach(function(e) {
                    if (e.idBanco == idBank) {
                        bankName = e.nombre.toLowerCase();
                    }
                })
                if (bankName == "santander") {
                    urlBank = data.url + "?url_resp=" + data.url_redirect + "&convenio=" + data.convenio + "&referencia=" + data.referencia + "&importe=" + data.cantidad;
                    $window.open(urlBank, "", "width=" + x + ",height=" + y + ",top=" + (screen.height - y) / 2 + ",left=" + (screen.width - x) / 2 + ",scrollbars=NO");
                } else if (bankName == "bancomer") {

                    var myForm = $('<form target="_blank" action="' + data.url + '" method="POST">' +
                            '<input type="hidden" name="mp_account" value="' + data.convenio + '">' +
                            '<input type="hidden" name="mp_product" value="' + 1 + '">' +
                            '<input type="hidden" name="mp_order" value="' + data.orderNumber + '">' +
                            '<input type="hidden" name="mp_reference" value="' + data.referencia + '">' +
                            '<input type="hidden" name="mp_node" value="' + 1 + '">' +
                            '<input type="hidden" name="mp_concept" value="' + 1 + '">' +
                            '<input type="hidden" name="mp_amount" value="' + data.cantidad + '">' +
                            '<input type="hidden" name="mp_customername" value="' + "Oscar" + '">' +
                            '<input type="hidden" name="mp_currency" value="' + 1 + '">' +
                            '<input type="hidden" name="mp_signature" value="' + data.codigo + '">' +
                            '<input type="hidden" name="mp_urlsuccess" value="' + data.url_redirect + '">' +
                            '<input type="hidden" name="mp_urlfailure" value="' + data.url_redirect + '">' +
                            '</form>') //.submit();
                    myForm[0].onsubmit = function() {
                        var w = window.open('about:blank', 'Popup_Window', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0, width=' + x + ',height=' + y + ',top=' + (screen.height - y) / 2 + ',left=' + (screen.width - x) / 2);
                        this.target = 'Popup_Window';
                    };
                    myForm.submit()
                }
            })
        } else if ($scope.payMethod == 2) { // Referencia
            $scope.loadingFormatoFactura = true;
            $scope.content = false;
            Invoce.getPDFReference(empresa, sucursal, departamento, documento, serie, folio, cliente, almacen, importe, referencia, nomempresa, nomsucursal, nomdepartamento).then(function(data) {
                //$scope.referencia=data.data;
                //console.log($scope.referencia)
                var pdf = URL.createObjectURL(new Blob([data.data], {
                    type: "application/pdf"
                }))
                //console.log(pdf)
                $("<object class='lineaCaptura' data='" + pdf + "' width='100%' height='520px' >").appendTo('#pdfReferenceContent');
                $scope.loadingFormatoFactura = false;
            })
        }
    }
})

/*
mp_account NUMÉRICO VARIABLE Identificador único cliente -
mp_product NUMERICO 1 1 - Multipagos Avanzado
mp_order TEXTO 1 a 30
mp_reference TEXTO 1 a 30
mp_node TEXTO VARIABLE
mp_concept TEXTO VARIABLE
mp_amount NUMÉRICO (9,2)
mp_customername TEXTO 50
mp_currency NUMÉRICO 1 Pesos (1) o dólares americanos (2)
mp_signature
mp_urlsuccess TEXTO VARIABLE
mp_urlfailure TEXTO VARIABLE
*/
