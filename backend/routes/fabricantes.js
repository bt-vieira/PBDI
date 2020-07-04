const express = require('express');
const mysqlConnection = require('../connection');
const Router = express.Router();

Router.get('/', (req, res)=>{
    mysqlConnection.query('Select empresa.CNPJ, nome_empresa, cidade, endereco.rua, endereco.numero as numero_rua, telefone.numero \
    FROM fabricante, empresa, endereco, telefone\
    Where fabricante.CNPJ = empresa.CNPJ and telefone.id_telefone = empresa.id_tel and endereco.id_endereco = empresa.id_end;',(err, rows, fields)=>{
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
