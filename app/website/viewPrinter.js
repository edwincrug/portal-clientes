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

ViewPrinter.prototype.writeJSON = function(res, data) {
    res.writeHead(200, {
            'Content-Type': 'application/json'
        });
    console.log(JSON.stringify(data));
        res.write(JSON.stringify(data));
        res.end("");
}


module.exports = ViewPrinter;
