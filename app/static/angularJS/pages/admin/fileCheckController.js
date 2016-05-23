app.controller('fileCheckController', function($scope, File, Utils, Order) {

    $scope.loadingOrder = true;
    $('#fileCheckModal').on('shown.bs.modal', function(e) {
        $("#fileModalCheckLabel").text("Orden  " + File.order.folio)
        Order.getDocuments(File.order.folio).then(function(d) {
            console.log(d.data[0])
            var pdf = URL.createObjectURL(Utils.b64toBlob(d.data[0].arrayB, "application/pdf"))
            $("<object class='filesUpdate' data='" + pdf + "' width='100%' height='400px' >").appendTo('#pdfCheckContent');
            if (d.data[0].pathXML != null)
                $('#xmlInvoceCheckContent').text(d.data[0].pathXML);;
            if (d.data[0].pathPDF != null)
                $("<object class='filesUpdate' data='" + d.data[0].pathPDF + "' width='100%' height='400px' >").appendTo('#pdfInvoceCheckContent');

            $scope.loadingOrder = false;
        });
    })
    $scope.uploadButton = false;
    $scope.closeButton = false;


    $scope.uploadInvoice = function() {
        dropzone.processQueue();
    }

    $('#fileCheckModal').on('hidden.bs.modal', function(e) {
        $scope.loadingOrder = true;
        $(".filesUpdate").remove();

    })
})
