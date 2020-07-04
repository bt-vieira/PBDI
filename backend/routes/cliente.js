const express = require('express');
const mysqlConnection = require('../connection');
const Router = express.Router();

Router.get('/', (req, res)=>{
    console.log('READ');
    mysqlConnection.query('select distinct \
    CPF, nome, id_end, id_tel, genero, data_nasc, cidade, rua, endereco.numero as numero, CEP, telefone.numero as telefone\
    from compra, pessoa, endereco, telefone\
     where compra.CPF_cliente = pessoa.CPF and pessoa.id_tel = id_telefone and\
     pessoa.id_end = id_endereco;',(err, rows, fields)=>{
        if(!err)
            res.send(JSON.stringify(rows));
        else
            console.log(err);
    });
});
Router.post('/edit', function(req, res, next) {
    console.log('UPDATE');
    mysqlConnection.query("update pessoa\
     set nome = '"+req.body.nome+"', \
     genero = '"+req.body.genero+"', data_nasc= ('"
     +req.body.data_nasc+"' \
     where CPF = '"+req.body.CPF+"';", function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

module.exports = Router;
