const express = require('express');
const mysqlConnection = require('../connection');
const Router = express.Router();

Router.get('/', (req, res)=>{
    mysqlConnection.query("select * from produto_comprado, produto where cod_prod = cod_produto;",(err, rows, fields)=>{
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
    mysqlConnection.query("insert into Produto_Comprado\
    values ('"+req.body.nota_fiscal+"', "+req.body.cod_produto+",\
    "+req.body.quantidade+","+req.body.valor+");", function (error, results, fields) {
        if(error) res.status(400).send(JSON.stringify(results));
        res.send(JSON.stringify(results));
    });
});

Router.post('/delete', function(req, res, next) {
    try{
        mysqlConnection.query("DELETE from produto_comprado\
         where nota_fiscal = '"+req.body.nota_fiscal+"' and\
        cod_prod = '"+req.body.cod_prod+"';", function (error, results, fields) {
            if(error) res.status(400).send(JSON.stringify(results));
            res.send(JSON.stringify(results));
        });
    }catch{}
});

module.exports = Router;
