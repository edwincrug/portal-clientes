app.filter('offset', function() {
    return function(input, start) {
        start = parseInt(start, 10);
        return input.slice(start);
    };
});

app.filter('company', function() {
    return function(input, company) {
        if(company && company.emp_idempresa!=0){
          return input.filter(function(e) {
              return e.emp_idempresa===company.emp_idempresa;
          });
        }else{
          return input;
        }
    };
});

app.filter('branch', function() {
    return function(input, branch) {
        if(branch && branch.suc_idsucursal!=0){
          return input.filter(function(e) {
              return e.suc_idsucursal===branch.suc_idsucursal;
          });
        }else{
          return input;
        }
    };
});
/*
app.filter('order', function() {
    return function(input, order) {
        if(order && order.length>0){
          return input.filter(function(e) {
              return e.oce_folioorden.toUpperCase().indexOf(order.toUpperCase())>=0
          });
        }else{
          return input;
        }
    };
});
*/
