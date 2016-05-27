var PDFDocument = require('pdfkit')

module.exports = {

    pdfGenerator: function(info, res) {
        var doc = new PDFDocument()
        doc.pipe(res)
        doc.circle(100, 50, 50)
            .lineWidth(3)
            .fillOpacity(0.8)
            .fillAndStroke("red", "#900")
      
        doc.moveTo(0, 20)
            .lineTo(100, 160)
            .quadraticCurveTo(130, 200, 150, 120)
            .bezierCurveTo(190, -40, 200, 200, 300, 150)
            .lineTo(400, 90)
            .stroke()


        doc.end();
    }
}
