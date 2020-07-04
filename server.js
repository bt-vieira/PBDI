const express = require('express');
const bodyparser = require('body-parser');
const Cliente = require('./routes/cliente');
const Convenio = require('./routes/convenios');
const Fabricante = require('./routes/fabricantes');
const Farmacia = require('./routes/farmacia');
const Funcionarios = require('./routes/funcionarios');
const Pessoa = require('./routes/pessoas');
const Produto = require('./routes/produtos');
const Profissionais = require('./routes/profissionais');
const Receitas = require('./routes/receitas');
const Vendas = require('./routes/vendas');

var app = express();
app.use(bodyparser.json());

app.use('/farmacia', Farmacia);
app.use('/clientes', Cliente);
app.use('/convenios', Convenio);
app.use('/funcionarios', Funcionarios);
app.use('/fabricantes', Fabricante);
app.use('/pessoas',Pessoa);
app.use('/produtos', Produto);
app.use('/profissionais', Profissionais);
app.use('/receitas', Receitas);
app.use('/vendas', Vendas);

var http = require('http');
module.exports = app;
var server = http.createServer(app);
server.listen(4000);