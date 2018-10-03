var express = require('express');
var app = express();

var http =  require('http');
var server = http.Server(app);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const consign = require('consign');

consign()
    .include("routes")
    .into(app);


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
    var addr = server.address();
    console.log("Metrozera is running at server ", addr.address + ":" + addr.port);
});