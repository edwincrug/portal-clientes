var PDFDocument = require('pdfkit')
var numeral = require('numeral');

module.exports = {

    pdfGenerator: function(info, res) {
        info = info[0]
       var doc = new PDFDocument({
      /*       size: [800, 1200],
            margin: 30
*/        })
        doc.pipe(res)
        doc.image('app/static/images/bancos/' + info.nombreBanco.toLowerCase() + '_logo.jpg', 335, 15, {
            width: 150
        })
        doc.fontSize(20)
        doc.text(info.nombreProveedor, 20, 70, {
            align: 'center'
        })
        doc.fontSize(14)
        var xText = 120;
        doc.text("Presentar esta ficha al cajero del banco", 30, xText)
        doc.text("Convenio: ", 30, xText + 50)
        doc.text(info.convenio, 140, xText + 50)
        doc.text("Referencia: ", 30, xText + 80)
        doc.text(info.referencia, 140, xText + 80)
        doc.text("Concepto: ", 30, xText + 110)
        doc.text(info.concepto, 140, xText + 110)
        doc.text("Cantidad: ", 30, xText + 140)
        doc.text(numeral(info.cantidad).format('$0,0.00'), 140, xText + 140)

        doc.end();
    }
}
