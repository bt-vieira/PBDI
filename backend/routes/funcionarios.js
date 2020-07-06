const express = require('express');
const mysqlConnection = require('../connection');
const Router = express.Router();

Router.get('/', (req, res)=>{
    mysqlConnection.query('Select *, telefone.numero as telefone, endereco.numero as numero From Pessoa, (select funcionario.CPF, CTPS, Funcao, Salario, CRF\
        from funcionario left join farmaceutico on funcionario.CPF = farmaceutico.CPF) as a, endereco, telefone where Pessoa.CPF = a.CPF\
        and pessoa.id_tel = id_telefone and pessoa.id_end = id_endereco group by pessoa.CPF;',(err, rows, fields)=>{
        if(!err)
            res.send(JSON.stringify(rows));
        else
            console.log(err);
    });
});

Router.put('/edit', function(req, res, next) {
    if(req.body.CRF){
        mysqlConnection.query("update pessoa\
        set nome = '"+req.body.nome+"', \
        genero = '"+req.body.genero+"', data_nasc= '"
        +req.body.data_nasc+"' \
        where CPF = '"+req.body.CPF+"';\
        Update funcionario set funcao = '"+req.body.funcao+"', \
        salario = "+req.body.salario+" where CPF='"+req.body.CPF+"';\
        Delete from farmaceutico where CPF = '"+req.body.CPF+"';\
        Insert into farmaceutico values('"+req.body.CPF+"','"+req.body.CRF+"');\
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
    }
    else{
        mysqlConnection.query("update pessoa\
        set nome = '"+req.body.nome+"', \
        genero = '"+req.body.genero+"', data_nasc= '"
        +req.body.data_nasc+"' \
        where CPF = '"+req.body.CPF+"';\
        Update funcionario set funcao = '"+req.body.funcao+"', \
        salario = '"+req.body.salario+"' where CPF='"+req.body.CPF+"';\
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
    }  
});

Router.post('/', function(req, res, next) {
    if(req.body.CRF){
        mysqlConnection.query("Insert Into funcionario values('"+req.body.CPF+"',\
        "+req.body.CPTS+",'"+req.body.Funcao+"',"+req.body.Salario+");\
        Insert into farmaceutico values('"+req.body.CPF+"','"+req.body.CRF+"')", function (error, results, fields) {
            if(error) throw error;
            res.send(JSON.stringify(results));
    });
    }
    else{
        mysqlConnection.query("Insert Into funcionario values('"+req.body.CPF+"',\
        "+req.body.CPTS+",'"+req.body.Funcao+"',"+req.body.Salario+");", function (error, results, fields) {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
    }
});

Router.post('/delete', function(req, res, next) {
    try{
        mysqlConnection.query("DELETE from funcionario where CPF = '"+req.body.CPF+"';\
        DELETE from farmaceutico where CPF = '"+req.body.CPF+"';", function (error, results, fields) {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
    }catch{}
});

module.exports = Router;
