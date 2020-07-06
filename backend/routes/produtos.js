const express = require('express');
const mysqlConnection = require('../connection');
const Router = express.Router();

Router.get('/', (req, res)=>{
    mysqlConnection.query("SELECT * FROM produto LEFT JOIN (Select cod_prod, sum(quantidade) as total from fornecimento group by cod_prod) as a\
    ON produto.cod_produto = a.cod_prod;",(err, rows, fields)=>{
        if(!err)
            res.send(JSON.stringify(rows));
        else
            console.log(err);
    });
});

Router.put('/edit', function(req, res, next) {
    console.log(req.body.cod_produto);
    mysqlConnection.query("update produto set nome ='"+req.body.nome+"',\
    descricao='"+req.body.descricao+"', tipo='"+req.body.tipo+"',\
    forma='"+req.body.forma+"', validade='"+req.body.validade+"',\
    preco = '"+req.body.preco+"' where cod_produto = '"+req.body.cod_produto+"';", function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

Router.post('/', function(req, res, next) {
    mysqlConnection.query("Insert into Produto(nome, descricao, tipo, forma, preco, validade) values('"+req.body.nome+"','"+req.body.descricao+"',\
    '"+req.body.tipo+"','"+req.body.forma+"',"+req.body.preco+",'"+req.body.validade+"');", function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

Router.post('/delete', function(req, res, next) {
    console.log(req.body.cod_produto);

    try{
        mysqlConnection.query("DELETE from produto where cod_produto = '"+req.body.cod_produto+"';", function (error, results, fields) {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
    }catch{}
});

module.exports = Router;
