const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'farmacia',
    multipleStatements: true,
});

mysqlConnection.connect((err) => {
    if(!err)
        console.log("Conexao foi um Sucesso!");
    else
        console.log("Erro de Conexão\n Erro:" + JSON.stringify(err));
}); 

module.exports = mysqlConnection;
