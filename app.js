import sha256 from 'crypto-js/sha256';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var catalog = [];

app.get('/catalog', function(req, res) {
    res.send(catalog);
});

app.post('/catalog', function(req, res) {
    var product = req.body;
    /*if(!product.code || catalog.some(p => p.code == product.code)){
        res.status(403).send({message: "Produto não informado ou duplicado"});
    }*/
    product.code = sha256(new Date().toUTCString());
    catalog.push(product);
});

app.delete('/:code/catalog', function(req, res) {
    catalog = catalog.filter(p => p.code == req.params.code);
});

app.listen(8000, function() {
    console.log('Servidor rodando na porta 8000.');
});