const express = require('express');
const mysqlConnection = require('../connection');
const Router = express.Router();

Router.get('/', (req, res)=>{
    mysqlConnection.query("select *, telefone.numero as telefone, endereco.numero as numero from empresa, endereco, telefone\
    where empresa.id_end = endereco.id_endereco and empresa.id_tel = telefone.id_telefone and\
    empresa.CNPJ!='25.768.496/0001-79';",(err, rows, fields)=>{
        if(!err)
            res.send(JSON.stringify(rows));
        else
            console.log(err);
    });
});

Router.get('/remedios/:CNPJ', (req, res)=>{
    console.log("foi");
    mysqlConnection.query('select * from fornecimento, produto where fornecimento.cod_prod = produto.cod_produto\
    where CNPJ = ?;',[req.params.CNPJ],(err, rows, fields)=>{
        if(!err)
            res.send(JSON.stringify(rows));
        else
            console.log(err);
    });
});

Router.post('/', function(req, res, next) {
    let id_tel, id_end;
    mysqlConnection.query("insert into telefone(numero) values('"+req.body.telefone+"');");
    mysqlConnection.query("select max(id_telefone) as id from telefone;",(err, rows) =>{
        if(!err){
            id_tel = rows[0].id;
            mysqlConnection.query("insert into Endereco(cidade,rua,numero,cep) VALUES('"+req.body.cidade+"',\
            '"+req.body.rua+"',"+req.body.numero+",'"+req.body.CEP+"');");
            mysqlConnection.query("select max(id_endereco) as id from endereco;",(err1, rows1) =>{
                id_end = rows1[0].id;
                mysqlConnection.query("Insert into empresa values('"+req.body.CNPJ+"','"+req.body.nome_empresa+"',"+id_end+","+id_tel+");", function (error, results, fields) {
                    if(error) res.status(400).send(JSON.stringify(results));
                    res.send(JSON.stringify(results));
                });
            })
        }
        
    });
});

Router.put('/edit', function(req, res, next) {
    mysqlConnection.query("update empresa\
     set nome_empresa = '"+req.body.nome_empresa+"'\
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
        mysqlConnection.query("DELETE from empresa where CNPJ = '"+req.body.CNPJ+"';", function (error, results, fields) {
            if(error) res.status(400).send(JSON.stringify(results));
            res.send(JSON.stringify(results));
        });
    }catch{}
});
module.exports = Router;
