app.controller('pendingInvoceController', function($scope,$filter, User, Invoce, InvoceFactory) {
    $scope.listInvoces = [];
    $scope.selectedOptionBank;
    $scope.itemsPerPage = 5;
    $scope.currentPage = 0;

    User.me().then(function(user) {
        $scope.user = user.data.data
        Invoce.getByIdUser($scope.user.idCliente).then(function(r) {
            $scope.listInvoces = r.data.data;
            totalElements = $scope.listInvoces.length;
        })

    })
    $scope.changeFilter = function() {
      $scope.currentPage = 0;
      totalElements = $filter('filter')( $scope.listInvoces, $scope.filter).length;

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
