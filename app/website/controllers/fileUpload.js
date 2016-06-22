var request = require('request');
var multer = require('multer')
var uuid = require('uuid');
var Model = require('../dataAccess');
var View = require('../viewPrinter');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'app/static/images/profile')
    },
    filename: function(req, file, cb) {
        cb(null, req.body.rfc + "." + file.mimetype.substring(file.mimetype.indexOf("/") + 1))
    }
})

var upload = multer({
    storage: storage
});


var FileUpload = function(conf) {
    this.conf = conf || {};
    this.model = new Model(this.conf);
    this.view = new View(this.conf);
    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
    this.middlewares = [
        upload.array('file[]')
    ]
}

FileUpload.prototype.post_logo = function(req, res, next) {
    var self = this;
    var params = [];
    if (req.body.idCliente) {
      params.push({
        name: 'idCliente',
        value: req.body.idCliente,
            type: self.model.types.STRING
        })
        params.push({
            name: 'valor',
            value: req.files[0].filename,
            type: self.model.types.STRING
        })
        params.push({
            name: 'tipo',
            value: 3,
            type: self.model.types.INT
        })
        self.model.query('UPD_USER_SP', params, function(error, result) {
            if (error) {
                self.view.error(res, {
                    mensaje: "Error",
                });
            } else {
                self.view.see(res, result[0][0]);
            }
        })
    } else {
        self.view.error(res, {
            mensaje: "Error en los parametros",
        });
    }
}

module.exports = FileUpload;
