app.controller('fileUpdateController', function($scope, File, Utils, Order) {

    $scope.loadingOrder = true;
    $('#fileUpdateModal').on('shown.bs.modal', function(e) {
        $("#fileModalUpdateLabel").text("Orden  " + File.order.folio)
        Order.getDocuments(File.order.folio).then(function(d) {
            console.log(d.data[0])
            var pdf = URL.createObjectURL(Utils.b64toBlob(d.data[0].arrayB, "application/pdf"))
            $("<object class='filesUpdate' data='" + pdf + "' width='100%' height='400px' >").appendTo('#pdfUpdateContent');
            if (d.data[0].pathXML != null)
                $('#xmlInvoceContent').text(d.data[0].pathXML);
            if (d.data[0].pathPDF != null)
                $("<object class='filesUpdate' data='" + d.data[0].pathPDF + "' width='100%' height='400px' >").appendTo('#pdfInvoceContent');

            $scope.loadingOrder = false;
        });
    })
    $scope.uploadButton = false;
    $scope.closeButton = false;

    var dropzone = new Dropzone("#fileUploadUpdate", {
        url: "api/fileUpload/files/",
        uploadMultiple: true,
        autoProcessQueue: false,
        maxFiles: 2,
        dictDefaultMessage: "Selecciona el XML y el PDF",
        dictRemoveFile: "Cancelar",
        dictCancelUpload: "Cancelar subida",
        dictCancelUploadConfirmation: "Estas seguro de cancelar la subida de este archivo?",
        addRemoveLinks: true,
        acceptedFiles: "application/pdf,text/xml",

        init: function() {
            var self = this;
            this.on("addedfile", function(file) {
                if (self.files.length == 2) {
                    $scope.uploadButton = true;
                    $scope.$apply()
                } else if (self.files.length > 2) {
                    self.removeFile(file)
                }
            });
            this.on("removedfile", function(file) {
                if (self.files.length < 2) {
                    $scope.uploadButton = false;
                    $scope.$apply()
                }
            });
            this.on("successmultiple", function(event, res) {
              AlertFactory.info(res[0]+res[1]);
                $scope.uploadButton = false;
                $scope.closeButton = true;
                $scope.$apply()
            });
            this.on("sending", function(file, xhr, formData) {
                formData.append("provider", File.order.provider);
                formData.append("rfc", File.order.rfc);
                formData.append("folio", File.order.folio);
            })
        }
    });

    $scope.uploadInvoice = function() {
        dropzone.processQueue();
    }
    $('#fileUpdateModal').on('hidden.bs.modal', function(e) {
        $scope.loadingOrder = true;
        $scope.uploadButton = false;
        $scope.closeButton = false;
        dropzone.removeAllFiles();
        $(".filesUpdate").remove();

    })
})


//5579 0700 5568 1855
