const express = require('express');
const mysqlConnection = require('../connection');
const Router = express.Router();

Router.get('/', (req, res)=>{
    mysqlConnection.query("select *, telefone.numero as telefone, endereco.numero as numero from empresa, endereco, telefone where empresa.CNPJ = '25.768.496/0001-79'\
    and empresa.id_end = endereco.id_endereco and telefone.id_telefone = empresa.id_tel;",(err, rows, fields)=>{
        if(!err)
            res.send(JSON.stringify(rows));
        else
            console.log(err);
    });
});

Router.put('/edit', function(req, res, next) {
    mysqlConnection.query("update empresa\
     set nome_empresa = '"+req.body.nome_empresa+"'\
     where CNPJ = '25.768.496/0001-79';\
     Update telefone set numero = '"+req.body.telefone+"'\
     where id_telefone = '"+req.body.id_tel+"';\
     Update endereco set rua = '"+req.body.rua+"',\
     numero ='"+req.body.numero+"',\
     cidade = '"+req.body.cidade+"',\
     CEP = '"+req.body.CEP+"'\
     where id_endereco = '"+req.body.id_end+"';", function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

module.exports = Router;
