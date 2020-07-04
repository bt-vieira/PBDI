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

Router.get('/:cpf', (req, res)=>{
    mysqlConnection.query('SELECT * from funcionario WHERE CPF = ?',
    [req.params.cpf],
    (err, rows, fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    });
});

module.exports = Router;
