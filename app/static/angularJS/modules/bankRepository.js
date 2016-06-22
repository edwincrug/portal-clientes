app.factory("Bank", function($http) {
    var url = "/api/bank/"
    return {
        getList: function() {
            return $http.get(url + 'list/');
        }
    }
});
