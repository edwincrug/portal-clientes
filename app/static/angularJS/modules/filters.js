app.filter('offset', function() {
  return function(input, start) {
    start = parseInt(start, 10);
    return input.slice(start);
  };
});

app.filter('company', function() {
  return function(input, company) {
    if (company && company.idEmpresa != 0) {
      return input.filter(function(e) {
        return e.idEmpresa === company.idEmpresa;
      });
    } else {
      return input;
    }
  };
});

app.filter('branch', function() {
  return function(input, branch) {
    if (branch && branch.idSucursal != 0) {
      return input.filter(function(e) {
        return e.idSucursal === branch.idSucursal;
      });
    } else {
      return input;
    }
  };
});
