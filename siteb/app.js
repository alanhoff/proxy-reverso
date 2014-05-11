var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send('Hello do siteb.com');
});

app.listen(8081);
