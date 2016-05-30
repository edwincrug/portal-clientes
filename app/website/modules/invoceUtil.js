var PDFDocument = require('pdfkit')

module.exports = {

    pdfGenerator: function(info, res) {
        info = info[0]
        var doc = new PDFDocument({
            size: [500, 350],
            margin: 30
        })
        doc.pipe(res)
        doc.image('app/static/images/bancos/'+info.nombreBanco.toLowerCase()+'_logo.jpg', 335, 15, {width: 150})
            //doc.rect(20, 20, 460, 360).stroke()
        doc.fontSize(20)
        //console.log(info)
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
        doc.text(info.cantidad, 140, xText + 140)

        /*
                lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit" +
                    "purus.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere" +
                    "cubilia Curae;" +
                    "Vivamus nec hendrerit felis.Morbi aliquam facilisis risus eu lacinia." +
                    "Sed eu leo in turpis fringilla hendrerit.Ut nec accumsan nisl."
                doc.fontSize(8)
                doc.text('This text is left aligned. ' + lorem, {
                    width: 410,
                    align: 'left'
                })
                doc.moveDown()
                doc.text('This text is centered. ' + lorem, {
                    width: 410,
                    align: 'center'
                })
                doc.moveDown()
                doc.text('This text is right aligned. ' + lorem, {
                    width: 410,
                    align: 'right'
                })
                doc.moveDown()
                doc.text('This text is justified. ' + lorem, {
                    width: 410,
                    align: 'justify'
                })
          */
        doc.end();
    }
}
