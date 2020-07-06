const express = require('express');
const mysqlConnection = require('../connection');
const Router = express.Router();

Router.get('/', (req, res)=>{
    mysqlConnection.query("select * from fornecimento, produto, empresa where fornecimento.CNPJ = empresa.CNPJ\
    and cod_prod=cod_produto;",(err, rows, fields)=>{
        if(!err)
            res.send(JSON.stringify(rows));
        else
            console.log(err);
    });
});

Router.get('/:nota', (req, res)=>{
    mysqlConnection.query("select * from produto_comprado, produto where nota_fiscal = ? and produto.cod_produto = produto_comprado.cod_prod;",
    req.params.nota,(err, rows, fields)=>{
        if(!err)
            res.send(JSON.stringify(rows));
        else
            console.log(err);
    });
});

Router.post('/', function(req, res, next) {
    mysqlConnection.query("Insert into fornecimento values('"+req.body.CNPJ+"',\
    "+req.body.cod_prod+",'"+req.body.nota_fiscal+"','"+req.body.data_compra+"', "+req.body.valor+", "+req.body.quantidade+");", function (error, results, fields) {
        if(error) res.status(400).send(JSON.stringify(results));
        res.send(JSON.stringify(results));
    });
});

Router.post('/delete', function(req, res, next) {
    try{
        mysqlConnection.query("DELETE from fornecimento\
         where CNPJ = '"+req.body.CNPJ+"' and\
        cod_prod = '"+req.body.cod_prod+"' and\
        nota_fiscal = '"+req.body.nota_fiscal+"';", function (error, results, fields) {
            if(error) res.status(400).send(JSON.stringify(results));
            res.send(JSON.stringify(results));
        });
    }catch{}
});

module.exports = Router;
