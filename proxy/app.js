var httpProxy = require('http-proxy');
var http = require('http');
var https = require('https');
var fs = require('fs');
var proxy = httpProxy.createProxyServer();

// Criamos um server normal para escutar na porta 80
// e u,m server seguro para escutar na porta 443
var server = http.createServer();
var secureServer = https.createServer({
    key : fs.readFileSync('./cert/new.cert.key'),
    cert : fs.readFileSync('./cert/new.cert.cert')
});

// Um objeto com o nome dos domínios que podemos
// redirecionar.
var sites = {
    'a.sitea.com' : 'http://127.0.0.1:8080',
    'sitea.com' : 'http://127.0.0.1:8080',
    'siteb.com' : 'http://127.0.0.1:8081'
};

// Essa função será parassada com o parâmetro do evento
// 'request' no servidor http e https 
var handler = function(req, res){
    var host = req.headers.host;
    
    if(!sites[host]){
        res.writeHead(404, {
            'Content-Type' : 'text/plain; charset=utf-8'
        });
        
        res.write('O site acessado não está aqui...');
        return res.end();
    }

    proxy.web(req, res, {target : sites[host]});
};

// Função responsável pelo proxy de websockets
var wsHandler = function(req, socket, head){
    var host = req.headers.host;

    if(!sites[host]){
        return req.end();
    }

    proxy.ws(req, socket, head, {target : sites[host]});
};

// Request vindo pelo servidor normal, porta 80
server.on('request', handler);

// Request vindo pelo servidor seguro, porta 443
secureServer.on('request', handler);

// Websocket vindo pelo servidor normal
server.on('upgrade', wsHandler);

// Websocket vindo pelo servidor seguro
secureServer.on('upgrade', wsHandler);

// Cada servidor deve escutar em suas respectivas portas
server.listen(80);
secureServer.listen(443);
