const express = require('express');
const mysqlConnection = require('../connection');
const Router = express.Router();

Router.get('/', (req, res)=>{
    mysqlConnection.query('select CPF, nome, id_end, id_tel, genero, data_nasc, cidade, rua, endereco.numero as numero, CEP, telefone.numero as telefone\
    from compra, pessoa, endereco, telefone\
     where pessoa.id_tel = id_telefone and\
     pessoa.id_end = id_endereco group by CPF;',(err, rows, fields)=>{
        if(!err)
            res.send(JSON.stringify(rows));
        else
            console.log(err);
    });
});

Router.put('/edit', function(req, res, next) {
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
     where id_endereco = '"+req.body.id_end+"';", function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
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
                mysqlConnection.query("insert into Pessoa Values('"+req.body.CPF+"','"+req.body.nome+"',"+id_end+","+id_tel+",\
                '"+req.body.genero+"','"+req.body.data_nasc+"');", function (error, results, fields) {
                    if(error) throw error;
                    res.send(JSON.stringify(results));
                });
            })
        }
        
    });
});

Router.post('/delete', function(req, res, next) {
    try{
        mysqlConnection.query("DELETE from pessoa where CPF = '"+req.body.CPF+"';", function (error, results, fields) {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
    }catch{}
});

module.exports = Router;
