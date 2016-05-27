app.factory("InvoceFactory", function($http) {
    this.invoce = {}
    return {
        setInvoce: function(invoce){
          this.invoce = invoce;
        },
        getInvoce: function(){
          return this.invoce;
        }
    }
});
