const express = require('express');
const mysqlConnection = require('../connection');
const Router = express.Router();

Router.get('/', (req, res)=>{
    mysqlConnection.query("select prescricao.CPF_prof, prescricao.CPF_pessoa, a.nome as paciente, b.nome as profissional,\
    prescricao.data_prescricao, prescricao.adscricao, prescricao.subscricao, inscricao.nome_farmaco, \
    inscricao.forma, inscricao.concentracao from prescricao, inscricao, pessoa as a, pessoa as b \
    where prescricao.CPF_pessoa = inscricao.CPF_pessoa and prescricao.CPF_prof = inscricao.CPF_prof \
    and prescricao.data_prescricao = inscricao.data_pres and a.CPF = prescricao.CPF_pessoa \
    and b.CPF = prescricao.CPF_prof;",(err, rows, fields)=>{
        if(!err)
            res.send(JSON.stringify(rows));
        else
            console.log(err);
    });
});

Router.post('/', function(req, res, next) {
    mysqlConnection.query("Insert into prescricao values('"+req.body.CPF_prof+"','"+req.body.CPF_pessoa+"',\
    '"+req.body.data_prescricao+"','"+req.body.adscricao+"',\
    '"+req.body.subscricao+"');\
    insert into inscricao values('"+req.body.CPF_prof+"','"+req.body.CPF_pessoa+"','"+req.body.data_prescricao+"',\
    '"+req.body.nome_farmaco+"', '"+req.body.forma+"','"+req.body.concentracao+"');", function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

Router.put('/edit', function(req, res, next) {
    mysqlConnection.query("update prescricao set adscricao = '"+req.body.adscricao+"',\
     subscricao = '"+req.body.subscricao+"' \
     where CPF_pessoa = '"+req.body.CPF_pessoa+"'\
     and CPF_prof = '"+req.body.CPF_prof+"'\
     and data_prescricao = '"+req.body.data_prescricao+"';\
    update inscricao set concentracao = '"+req.body.concentracao+"',\
      nome_farmaco = '"+req.body.nome_farmaco+"', forma = '"+req.body.forma+"'\
    where CPF_pessoa = '"+req.body.CPF_pessoa+"' and CPF_prof = '"+req.body.CPF_prof+"'\
     and data_pres = '"+req.body.data_prescricao+"';", function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

Router.post('/delete', function(req, res, next) {
    try{
        mysqlConnection.query("DELETE from prescricao where CPF_pessoa = '"+req.body.CPF_pessoa+"' and CPF_prof = '"+req.body.CPF_prof+"'\
        and data_prescricao = '"+req.body.data_prescricao+"';", function (error, results, fields) {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
    }catch{}
});

module.exports = Router;
