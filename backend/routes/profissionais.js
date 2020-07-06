const express = require('express');
const mysqlConnection = require('../connection');
const Router = express.Router();

Router.get('/', (req, res)=>{
    mysqlConnection.query("Select *, telefone.numero as telefone, endereco.numero as numero\
    from profissional, pessoa, telefone, endereco where profissional.CPF = pessoa.CPF\
    and pessoa.id_end = endereco.id_endereco \
    and pessoa.id_tel = telefone.id_telefone group by pessoa.CPF;",(err, rows, fields)=>{
        if(!err)
            res.send(JSON.stringify(rows));
        else
            console.log(err);
    });
});

Router.post('/', function(req, res, next) {
    mysqlConnection.query("Insert into profissional values('"+req.body.CPF+"','"+req.body.especialidade+"','"+req.body.registro+"');", function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

Router.put('/edit', function(req, res, next) {
    console.log(req.body.CPF);
    mysqlConnection.query("update pessoa\
     set nome = '"+req.body.nome+"', \
     genero = '"+req.body.genero+"', data_nasc= '"
     +req.body.data_nasc+"' \
     where CPF = '"+req.body.CPF+"';\
     Update telefone set numero = '"+req.body.telefone+"'\
     where id_telefone = '"+req.body.id_tel+"';\
     Update endereco set rua = '"+req.body.rua+"',\
     numero ='"+req.body.numero+"',\
     cidade = '"+req.body.cidade+"',\
     CEP = '"+req.body.CEP+"'\
     where id_endereco = '"+req.body.id_end+"';\
     Update profissional set especialidade = '"+req.body.especialidade+"',\
     registro = '"+req.body.registro+"' where CPF = '"+req.body.CPF+"';", function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

Router.post('/delete', function(req, res, next) {
    try{
        mysqlConnection.query("DELETE from profissional where CPF = '"+req.body.CPF+"';", function (error, results, fields) {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
    }catch{}
});

module.exports = Router;
