const express = require('express');
const mysqlConnection = require('../connection');
const Router = express.Router();

Router.get('/', (req, res)=>{
    mysqlConnection.query("select nota_fiscal, CPF_funcionario, CPF_cliente, a.nome as cliente, b.nome as funcionario,\
    data_compra, valor from compra, pessoa as a, pessoa as b \
    where a.CPF = compra.CPF_cliente and b.CPF = compra.CPF_funcionario;",(err, rows, fields)=>{
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
    mysqlConnection.query("Insert into compra values('"+req.body.nota_fiscal+"',\
    '"+req.body.CPF_funcionario+"','"+req.body.CPF_cliente+"','"+req.body.data_compra+"',"+req.body.valor+");", function (error, results, fields) {
        if(error) res.status(400).send(JSON.stringify(results));
        res.send(JSON.stringify(results));
    });
});

Router.post('/delete', function(req, res, next) {
    try{
        mysqlConnection.query("DELETE from compra where nota_fiscal = '"+req.body.nota_fiscal+"';", function (error, results, fields) {
            if(error) res.status(400).send(JSON.stringify(results));
            res.send(JSON.stringify(results));
        });
    }catch{}
});

module.exports = Router;
