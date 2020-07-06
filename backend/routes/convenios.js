const express = require('express');
const mysqlConnection = require('../connection');
const Router = express.Router();

Router.get('/', (req, res)=>{
    mysqlConnection.query('select *, telefone.numero as telefone, endereco.numero as numero from empresa, empresa_conveniada, endereco, telefone\
     where empresa.CNPJ = empresa_conveniada.CNPJ and empresa.id_tel = id_telefone\
     and empresa.id_end = id_endereco group by empresa.CNPJ;',(err, rows, fields)=>{
        if(!err)
            res.send(JSON.stringify(rows));
        else
            console.log(err);
    });
});

Router.post('/', function(req, res, next) {
    mysqlConnection.query("insert into empresa_conveniada values('"+req.body.CNPJ+"',"+req.body.porcentagem_desc+");", function (error, results, fields) {
        if(error) res.status(400).send(JSON.stringify(results));
        res.send(JSON.stringify(results));
    });
});

Router.put('/edit', function(req, res, next) {
    mysqlConnection.query("update empresa\
     set nome_empresa = '"+req.body.nome_empresa+"'\
     where CNPJ = '"+req.body.CNPJ+"';\
     update empresa_conveniada\
     set porcentagem_desc = '"+req.body.porcentagem_desc+"'\
     where CNPJ = '"+req.body.CNPJ+"';\
     Update telefone set numero = '"+req.body.telefone+"'\
     where id_telefone = '"+req.body.id_tel+"';\
     Update endereco set rua = '"+req.body.rua+"',\
     numero ='"+req.body.numero+"',\
     cidade = '"+req.body.cidade+"',\
     CEP = '"+req.body.CEP+"'\
     where id_endereco = '"+req.body.id_end+"';", function (error, results, fields) {
        if(error) res.status(400).send(JSON.stringify(results));
        res.send(JSON.stringify(results));
    });
});

Router.post('/delete', function(req, res, next) {
    try{
        mysqlConnection.query("DELETE from empresa_conveniada where CNPJ = '"+req.body.CNPJ+"';", function (error, results, fields) {
            if(error) res.status(400).send(JSON.stringify(results));
            res.send(JSON.stringify(results));
        });
    }catch{}
});

module.exports = Router;
