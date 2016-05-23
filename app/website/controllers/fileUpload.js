var request = require('request');
var multer = require('multer')
var uuid = require('uuid');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'app/static/files/')
    },
    filename: function(req, file, cb) {
        cb(null, uuid.v4() + "." + file.mimetype.substring(file.mimetype.indexOf("/") + 1))
    }
})

var upload = multer({
    storage: storage
});


var FileUpload = function(conf) {
    this.conf = conf || {};
    if (conf) {
        this.url = this.conf.parameters.server + "cargaapi/"
    }
    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
    this.middlewares = [
        upload.array('file[]')
    ]
}

FileUpload.prototype.post_files = function(req, res, next) {
    if (req.files.length == 2) {
        if (req.files[0].mimetype != "application/pdf") {
            var temp = req.files[0];
            req.files[0] = req.files[1]
            req.files[1] = temp;
        }
        var msg = [];
        for (var i in req.files) {
            request.post({
                url: this.url + "1",
                form: {
                    dir: "files",
                    folio: req.body.folio[i],
                    proveedor: req.body.provider[i],
                    rfc: req.body.rfc[i],
                    tipo: req.files[i].mimetype.substring(req.files[i].mimetype.indexOf("/") + 1),
                    nombre: req.files[i].filename
                }
            }, function(err, httpResponse, body) {
                msg.push(body)
                if (msg.length == 2) {
                    res.json(JSON.parse(body));
                }
            });
        }
    }
}


FileUpload.prototype.post_logo = function(req, res, next) {
    console.log(req.files)
    res.json({});
    request.post({
        url: this.url + "1",
        form: {
            dir: "files",
            folio: req.body.folio[i],
            proveedor: req.body.provider[i],
            rfc: req.body.rfc[i],
            tipo: req.files[i].mimetype.substring(req.files[i].mimetype.indexOf("/") + 1),
            nombre: req.files[i].filename
        }
    }, function(err, httpResponse, body) {
        msg.push(body)
        if (msg.length == 2) {
            res.json(JSON.parse(body));
        }
    });
        /*if (req.files.length == 2) {
        if (req.files[0].mimetype != "application/pdf") {
            var temp = req.files[0];
            req.files[0] = req.files[1]
            req.files[1] = temp;
        }*/
    /*  var msg = [];
      for (var i in req.files) {
          request.post({
              url: this.url + "1",
              form: {
                  dir: "files",
                  folio: req.body.folio[i],
                  proveedor: req.body.provider[i],
                  rfc: req.body.rfc[i],
                  tipo: req.files[i].mimetype.substring(req.files[i].mimetype.indexOf("/") + 1),
                  nombre: req.files[i].filename
              }
          }, function(err, httpResponse, body) {
              msg.push(body)
              if (msg.length == 2) {
                  res.json(JSON.parse(body));
              }
          });
      }*/
    /*}*/
}

module.exports = FileUpload;
