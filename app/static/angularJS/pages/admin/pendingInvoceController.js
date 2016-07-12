app.controller('pendingInvoceController', function($scope, $filter, User, Invoce, InvoceFactory) {
  $scope.listInvoces = [];
  $scope.selectedOptionBank;
  $scope.itemsPerPage = 5;
  $scope.currentPage = 0;
  $scope.companyList = [{
    idEmpresa: 0,
    empresa: "--- Selecciona ---"
  }];
  $scope.branchList = [{
    idSucursal: 0,
    sucursal: "--- Selecciona ---"
  }];


  User.me().then(function(user) {
    $scope.user = user.data.data
    Invoce.getByIdUser($scope.user.idCliente).then(function(r) {
      $scope.listInvoces = r.data.data;
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

  function filterApply() {
    totalElements = $filter('filter')($filter('branch')(($filter('company')($scope.listInvoces, $scope.company)), $scope.branch), $scope.filterText).length;
    $scope.currentPage = 0;
  }

  $scope.changeCompany = function(company) {
    if (company.idEmpresa != 0) {
      $scope.branchSelectVisible = true;
      $scope.branchListTemp = $scope.branchList.filter(function(d) {
        if (company.idEmpresa === d.idEmpresa || d.idSucursal===0) return true
      })
      $scope.branch = $scope.branchListTemp[0];
      filterApply()
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

  var totalElements;
  //Pagination
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
})
