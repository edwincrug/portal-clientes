var ViewPrinter = function(conf) {
    conf = conf || {};
}

ViewPrinter.prototype.ok = function(res, data) {
    data.estatus = "ok";
    res.json(data);
}

ViewPrinter.prototype.error = function(res, data) {
    data.estatus = "error"
    status = data.status || 200;
    res.status(status).json(data);
}

ViewPrinter.prototype.see = function(res, data) {
    res.json(data);
}

module.exports = ViewPrinter;
