var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send('Hello do sitea.com');
});

app.listen(8080);
