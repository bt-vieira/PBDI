const express = require('express');
const mysqlConnection = require('../connection');
const Router = express.Router();


Router.get('/', (req, res)=>{
    mysqlConnection.query("select associacao.CPF, associacao.CNPJ, pessoa.nome, empresa.nome_empresa\
    from associacao, pessoa, empresa where associacao.CPF = pessoa.CPF and associacao.CNPJ = empresa.CNPJ;",(err, rows, fields)=>{
        if(!err)
            res.send(JSON.stringify(rows));
        else
            console.log(err);
    });
});

Router.post('/', function(req, res, next) {
    mysqlConnection.query("insert into associacao values('"+req.body.CPF+"','"+req.body.CNPJ+"');", function (error, results, fields) {
        if(error) res.status(400).send(JSON.stringify(results));
        res.send(JSON.stringify(results));
    });
});


Router.post('/delete', function(req, res, next) {
    try{
        mysqlConnection.query("DELETE from associacao where CPF = '"+req.body.CPF+"' and\
        CNPJ = '"+req.body.CNPJ+"';", function (error, results, fields) {
            if(error) res.status(400).send(JSON.stringify(results));
            res.send(JSON.stringify(results));
        });
    }catch{}
});

module.exports = Router;
