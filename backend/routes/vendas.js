const express = require('express');
const mysqlConnection = require('../connection');
const Router = express.Router();

Router.get('/', (req, res)=>{
    mysqlConnection.query("select nota_fiscal, CPF_funcionario, CPF_cliente, a.nome as cliente, b.nome as funcionario,\
    data_compra, valor from compra, pessoa as a, pessoa as b \
    where a.CPF = compra.CPF_cliente and b.CPF = compra.CPF_funcionario;",(err, rows, fields)=>{
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
