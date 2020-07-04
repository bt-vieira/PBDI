const express = require('express');
const mysqlConnection = require('../connection');
const Router = express.Router();

Router.get('/', (req, res)=>{
    mysqlConnection.query("Select * from profissional, pessoa where profissional.CPF = pessoa.CPF;",(err, rows, fields)=>{
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
