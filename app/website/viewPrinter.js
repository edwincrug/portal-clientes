var ViewPrinter = function(conf) {
    conf = conf || {};
}

ViewPrinter.prototype.ok = function(res, data) {
    data.estatus = "ok";
    res.json(data);
}

ViewPrinter.prototype.error = function(res, data) {
    data.estatus = "error"
    data.status = data.status || 200;
    res.status().json(data);
}

module.exports = ViewPrinter;
