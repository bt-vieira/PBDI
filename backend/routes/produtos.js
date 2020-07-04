const express = require('express');
const mysqlConnection = require('../connection');
const Router = express.Router();

Router.get('/', (req, res)=>{
    mysqlConnection.query("SELECT * FROM produto LEFT JOIN (Select cod_prod, sum(quantidade) as total from fornecimento group by cod_prod) as a\
    ON produto.cod_produto = a.cod_prod;",(err, rows, fields)=>{
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
