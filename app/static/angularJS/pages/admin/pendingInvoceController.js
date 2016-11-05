app.controller('pendingInvoceController', function($scope, $filter,$state, User, Invoce, InvoceFactory) {
    $scope.mostrarTabla = true;
    $scope.mostrarBtnSeleccionar = false;
    $scope.seleccionarFactura = false;
    $scope.mostrarBtnLote = false;
    $scope.mostrarBtnFactura = false;
    $scope.mostrarAlerta=false;
    $scope.mostrarBtnCancelar=false;
    $scope.idinvoce = null;
    $scope.listInvoces = [];
    $scope.selectedOptionBank;
    $scope.companyList = [{
        idEmpresa: 0,
        empresa: "--- Selecciona ---"
    }];
    $scope.branchList = [{
        idSucursal: 0,
        sucursal: "--- Selecciona ---"
    }];
    

    //Carga de datos inicial.
    User.me().then(function(user) {
        $scope.user = user.data.data
        Invoce.getByIdUser($scope.user.idCliente).then(function(r) {
            $scope.listInvoces = r.data.data;
            //console.log($scope.listInvoces)
            $scope.listInvoces.forEach(function(d) {
                //Llenar array de Empresas
                if (!$scope.companyList.find(function(c) {
                        if (d.idEmpresa === c.idEmpresa) {
                            return true;
                        }
                    })) {
                    $scope.companyList.push({
                        idEmpresa: d.idEmpresa,
                        empresa: d.emp_nombre
                    })
                }
                //Llenar array de sucursales
                if (!$scope.branchList.find(function(c) {
                        if (d.idSucursal === c.idSucursal && d.idEmpresa === c.idEmpresa) {
                            return true;
                        }
                    })) {
                    $scope.branchList.push({
                        idEmpresa: d.idEmpresa,
                        idSucursal: d.idSucursal,
                        sucursal: d.suc_nombre
                    })
                }
            })
            $scope.company = $scope.companyList[0];
            totalElements = $scope.listInvoces.length;
        })

    })

    //Order
    $scope.orderId = "";
    $scope.orderSerie = "";
    $scope.orderFolio = "";
    $scope.orderPedido = "";
    $scope.orderCotizacion = "";
    $scope.orderEmpresa = "";
    $scope.orderSucursal = "";
    //$scope.orderDesc = "";
    $scope.orderDep = "";
    $scope.orderFecEmi = "";
    $scope.orderFecVen = "";
    $scope.orderEstatus = "";
    $scope.orderImporte = "";
    $scope.orderSaldo = "";

    $scope.changeOrderId = function() {
        if ($scope.orderId == "") {
            $scope.orderId = "asc";
        } else if ($scope.orderId == "asc") {
            $scope.orderId = "desc";
        } else if ($scope.orderId == "desc") {
            $scope.orderId = "asc";
        }
        orderArrayList("id", $scope.orderId, false, true)
    }

    $scope.changeOrderSerie = function() {
        if ($scope.orderSerie == "") {
            $scope.orderSerie = "asc";
        } else if ($scope.orderSerie == "asc") {
            $scope.orderSerie = "desc";
        } else if ($scope.orderSerie == "desc") {
            $scope.orderSerie = "asc";
        }
        orderArrayList("serie", $scope.orderSerie, false, true)
    }

    $scope.changeOrderFolio = function() {
        if ($scope.orderFolio == "") {
            $scope.orderFolio = "asc";
        } else if ($scope.orderFolio == "asc") {
            $scope.orderFolio = "desc";
        } else if ($scope.orderFolio == "desc") {
            $scope.orderFolio = "asc";
        }
        orderArrayList("folio", $scope.orderFolio, false, true)
    }

    $scope.changeOrderPedido = function() {
        if ($scope.orderPedido == "") {
            $scope.orderPedido = "asc";
        } else if ($scope.orderPedido == "asc") {
            $scope.orderPedido = "desc";
        } else if ($scope.orderPedido == "desc") {
            $scope.orderPedido = "asc";
        }
        orderArrayList("pedido", $scope.orderPedido, false, true)
    }

    $scope.changeOrderCotizacion = function() {
        if ($scope.orderCotizacion == "") {
            $scope.orderCotizacion = "asc";
        } else if ($scope.orderCotizacion == "asc") {
            $scope.orderCotizacion = "desc";
        } else if ($scope.orderCotizacion == "desc") {
            $scope.orderCotizacion = "asc";
        }
        orderArrayList("cotizacion", $scope.orderCotizacion, false, true)
    }

    $scope.changeOrderEmpresa = function() {
        if ($scope.orderEmpresa == "") {
            $scope.orderEmpresa = "asc";
        } else if ($scope.orderEmpresa == "asc") {
            $scope.orderEmpresa = "desc";
        } else if ($scope.orderEmpresa == "desc") {
            $scope.orderEmpresa = "asc";
        }
        orderArrayList("empresa", $scope.orderEmpresa, false, true)
    }

    $scope.changeOrderSucursal = function() {
            if ($scope.orderSucursal == "") {
                $scope.orderSucursal = "asc";
            } else if ($scope.orderSucursal == "asc") {
                $scope.orderSucursal = "desc";
            } else if ($scope.orderSucursal == "desc") {
                $scope.orderSucursal = "asc";
            }
            orderArrayList("sucursal", $scope.orderSucursal, false, true)
        }
        // $scope.changeOrderDesc = function() {
        //   if ($scope.orderDesc == "") {
        //     $scope.orderDesc = "asc";
        //   } else if ($scope.orderDesc == "asc") {
        //     $scope.orderDesc = "desc";
        //   } else if ($scope.orderDesc == "desc") {
        //     $scope.orderDesc = "asc";
        //   }
        //   orderArrayList("descripcion", $scope.orderDesc, false, true)
        // }

    $scope.changeOrderDep = function() {
        if ($scope.orderDep == "") {
            $scope.orderDep = "asc";
        } else if ($scope.orderDep == "asc") {
            $scope.orderDep = "desc";
        } else if ($scope.orderDep == "desc") {
            $scope.orderDep = "asc";
        }
        orderArrayList("departamento", $scope.orderDep, false, true)
    }

    $scope.changeOrderFecEmi = function() {
        if ($scope.orderFecEmi == "") {
            $scope.orderFecEmi = "asc";
        } else if ($scope.orderFecEmi == "asc") {
            $scope.orderFecEmi = "desc";
        } else if ($scope.orderFecEmi == "desc") {
            $scope.orderFecEmi = "asc";
        }
        orderArrayList("fechaEmision", $scope.orderFecEmi, true, false)
    }

    $scope.changeOrderFecVen = function() {
        if ($scope.orderFecVen == "") {
            $scope.orderFecVen = "asc";
        } else if ($scope.orderFecVen == "asc") {
            $scope.orderFecVen = "desc";
        } else if ($scope.orderFecVen == "desc") {
            $scope.orderFecVen = "asc";
        }
        orderArrayList("fechaVencimiento", $scope.orderFecVen, true, false)
    }

    $scope.changeOrderEstatus = function() {
        if ($scope.orderEstatus == "") {
            $scope.orderEstatus = "asc";
        } else if ($scope.orderEstatus == "asc") {
            $scope.orderEstatus = "desc";
        } else if ($scope.orderEstatus == "desc") {
            $scope.orderEstatus = "asc";
        }
        orderArrayList("diasCartera", $scope.orderEstatus, false, false)
    }

    $scope.changeOrderImporte = function() {
        if ($scope.orderImporte == "") {
            $scope.orderImporte = "asc";
        } else if ($scope.orderImporte == "asc") {
            $scope.orderImporte = "desc";
        } else if ($scope.orderImporte == "desc") {
            $scope.orderImporte = "asc";
        }
        orderArrayList("importe", $scope.orderImporte, false, false)
    }

    $scope.changeOrderSaldo = function() {
        if ($scope.orderSaldo == "") {
            $scope.orderSaldo = "asc";
        } else if ($scope.orderSaldo == "asc") {
            $scope.orderSaldo = "desc";
        } else if ($scope.orderSaldo == "desc") {
            $scope.orderSaldo = "asc";
        }
    }
    orderArrayList("saldo", $scope.orderSaldo, false, false)

    function orderArrayList(field, order, date, string) {
        $scope.listInvoces.sort(function(a, b) {
            if (date) {
                //tempDate = a[field].split("/")
                a[field] = new Date(a[field]).getTime();
                b[field] = new Date(b[field]).getTime();
            }
            if (string) {
                var x = "",
                    y = "";
                if (Array.isArray(field)) {
                    x = field.reduce(function(ant, sig) {
                        return ant + " " + a[sig];
                    }, "")
                    y = field.reduce(function(ant, sig) {
                        return ant + " " + b[sig];
                    }, "")
                } else {
                    x = a[field]
                    y = b[field]
                }
                if (order == "asc") {
                    return x > y ? -1 : 1
                } else if (order == "desc") {
                    return y > x ? -1 : 1
                }
            } else {
                if (order == "asc") {
                    return a[field] - b[field]
                } else if (order == "desc") {
                    return b[field] - a[field]
                }
            }

        })
    }

    //Filtros
    function filterApply() {
        totalElements = $filter('filter')($filter('branch')(($filter('company')($scope.listInvoces, $scope.company)), $scope.branch), $scope.filterText).length;
        $scope.currentPage = 0;
    }

    $scope.changeCompany = function(company) {
        if (company.idEmpresa != 0) {
            $scope.branchSelectVisible = true;
            $scope.branchListTemp = $scope.branchList.filter(function(d) {
                if (company.idEmpresa === d.idEmpresa || d.idSucursal === 0) return true
            })
            $scope.branch = $scope.branchListTemp[0];
            filterApply()
            if ($scope.mostrarTabla == false) {
                $scope.mostrarTabla = true;
                $scope.mostrarBtnSeleccionar = true;
                $scope.mostrarBtnFactura = true;
                $scope.mostrarAlerta=false;
            }
        } else {
            filterApply()
            $scope.branchSelectVisible = false;
            $scope.branch = null;
        }
    }

    $scope.changeBranch = function(branch) {
        filterApply();
    }

    $scope.changeFilter = function() {
        filterApply()
    }

    $scope.payInvoce = function(invoce) {
        InvoceFactory.setInvoce(invoce);
    }

    $scope.viewInvoce = function(invoce) {
        InvoceFactory.setInvoce(invoce);
    }

    //Pagination
    $scope.itemsPerPage = 5;
    $scope.currentPage = 0;
    var totalElements;

    $scope.range = function() {
        var rangeSize = 5;
        var ret = [];
        var start;
        if ($scope.currentPage - 2 >= 0) {
            start = $scope.currentPage - 2;
        } else {
            start = 0;
        }
        if (start > $scope.pageCount() - rangeSize) {
            start = $scope.pageCount() - rangeSize + 1;
        }

        for (var i = start; i < start + rangeSize; i++) {
            if (i >= 0)
                ret.push(i);
        }
        return ret;
    };

    $scope.prevPage = function() {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.prevPageDisabled = function() {
        return $scope.currentPage === 0 ? "disabled" : "";
    };

    $scope.pageCount = function() {
        return Math.ceil(totalElements / $scope.itemsPerPage) - 1;
    };

    $scope.nextPage = function() {
        if ($scope.currentPage < $scope.pageCount()) {
            $scope.currentPage++;
        }
    };

    $scope.nextPageDisabled = function() {
        return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
    };

    $scope.setPage = function(n) {
        $scope.currentPage = n;
    };

    $scope.generarLote = function() {
        $scope.mostrarTabla = false;
        $scope.mostrarBtnLote = true;
        $scope.mostrarAlerta=true;
        $scope.mostrarBtnCancelar=true;
    }
    $scope.selFactura = function(idinvoce) {
        $scope.seleccionarFactura = true;
        $scope.idinvoce = idinvoce
    }
    $scope.noSelFactura = function() {
        $scope.seleccionarFactura = false;
    }

    $scope.facturaInvoce = function(invoce) {
        $scope.array = {};
        $scope.conArray = 0;
        angular.forEach(invoce, function(value, key) {
            //alert(value.nombre + 'Seleccionado: ' + value.seleccionado);

            if (value.seleccionada == true) {
                $scope.array[$scope.conArray] = value
                $scope.conArray++;
            }
        });
        InvoceFactory.setInvoce($scope.array);
    }
    $scope.cancelar=function(){
        $state.go($state.current, {}, {reload: true});
    }

})
