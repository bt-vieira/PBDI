CREATE DATABASE IF NOT EXISTS farmacia;
DROP TABLE IF EXISTS Produto_comprado;
DROP TABLE IF EXISTS Compra;
DROP TABLE IF EXISTS Fornecimento;
DROP TABLE IF EXISTS Produto;
DROP TABLE IF EXISTS Fabricante;
DROP TABLE IF EXISTS Associacao;
DROP TABLE IF EXISTS Empresa_Conveniada;
DROP TABLE IF EXISTS Empresa;
DROP TABLE IF EXISTS Inscricao;
DROP TABLE IF EXISTS Prescricao;
DROP TABLE IF EXISTS Local_De_Trabalho;
DROP TABLE IF EXISTS Profissional;
DROP TABLE IF EXISTS Trabalha;
DROP TABLE IF EXISTS Horario_Funcionamento;
DROP TABLE IF EXISTS Farmaceutico;
DROP TABLE IF EXISTS Funcionario;
DROP TABLE IF EXISTS Pessoa;
DROP TABLE IF EXISTS Telefone;
DROP TABLE IF EXISTS Endereco;

CREATE TABLE `Endereco`(
	`id_endereco` int unsigned auto_increment NOT NULL,
    `cidade` varchar(72) NOT NULL,
    `rua` varchar(100) NOT NULL,
    `numero` char(5) NOT NULL,
    CEP char(10) NOT NULL,
    PRIMARY KEY(`id_endereco`)
);

CREATE TABLE Telefone(
	`id_telefone` int unsigned auto_increment NOT NULL,
    `numero` varchar(14) NOT NULL,
    PRIMARY KEY(`id_telefone`,`numero`)
);

CREATE TABLE Pessoa(
	CPF varchar(14) NOT NULL,
    nome varchar(255) NOT NULL,
    id_end int unsigned NOT NULL,
    id_tel int unsigned NOT NULL,
    genero char(1) NOT NULL,
    data_nasc DATE NOT NULL,
    PRIMARY KEY(CPF),
    CONSTRAINT `fk_endereco` FOREIGN KEY (`id_end`) REFERENCES `Endereco`(`id_endereco`) ON DELETE RESTRICT,
    CONSTRAINT `fk_tel_pessoa` FOREIGN KEY (`id_tel`) REFERENCES `Telefone`(`id_telefone`) ON DELETE RESTRICT
);


CREATE TABLE Funcionario(
	CPF varchar(14) NOT NULL,
	CTPS varchar(14) NOT NULL ,
    Funcao varchar(60) NOT NULL,
    Salario DECIMAL(7,2) NOT NULL,
    PRIMARY KEY(CPF),
    UNIQUE(CTPS),
    CONSTRAINT `fk_cpf` FOREIGN KEY(`CPF`) REFERENCES `pessoa`(`CPF`) ON DELETE RESTRICT
);

CREATE TABLE Farmaceutico(
	CPF varchar(14) NOT NULL,
    CRF char(5) NOT NULL,
    PRIMARY KEY(CPF),
    UNIQUE(CRF),
    CONSTRAINT `fk_cpf_farm` FOREIGN KEY(`CPF`) REFERENCES `funcionario`(`CPF`) ON DELETE RESTRICT
);

CREATE TABLE Horario_Funcionamento(
	dia_da_semana varchar(15) NOT NULL,
    hora_inicio DECIMAL(2) NOT NULL,
    hora_fim DECIMAL(2) NOT NULL,
    PRIMARY KEY(dia_da_semana,hora_inicio,hora_fim)
);

CREATE TABLE Trabalha(
	CPF varchar(14) NOT NULL,
    dia_da_semana varchar(15) NOT NULL,
    hora_inicio DECIMAL(2) NOT NULL,
    hora_fim DECIMAL(2) NOT NULL,
    PRIMARY KEY(CPF,dia_da_semana,hora_inicio,hora_fim),
    CONSTRAINT `fk_cpf_trab` FOREIGN KEY(`CPF`) REFERENCES `funcionario`(`CPF`) ON DELETE CASCADE,
    CONSTRAINT `fk_escala_trab` foreign key (`dia_da_semana`,`hora_inicio`,`hora_fim`) REFERENCES `horario_funcionamento`(`dia_da_semana`,`hora_inicio`,`hora_fim`)
);

CREATE TABLE Profissional(
	CPF varchar(14) NOT NULL,
    especialidade varchar(40) NOT NULL,
	assinatura varchar(100) NOT NULL,
    registro varchar(13) NOT NULL,
    PRIMARY KEY(CPF),
    UNIQUE(registro),
    CONSTRAINT `fk_cpf_prof` FOREIGN KEY(`CPF`) REFERENCES `Pessoa`(`CPF`) ON DELETE RESTRICT
);

CREATE TABLE Local_De_Trabalho(
	CPF varchar(14) NOT NULL,
    id_end int unsigned NOT NULL,
    nome_local varchar(150) NOT NULL,
    PRIMARY KEY(CPF,id_end),
    CONSTRAINT `fk_cpf_local` FOREIGN KEY(`CPF`) REFERENCES `Profissional`(`CPF`) ON DELETE CASCADE,
    CONSTRAINT `fk_end_local` FOREIGN KEY(`id_end`) REFERENCES `endereco`(`id_endereco`) ON DELETE RESTRICT
);

CREATE TABLE Prescricao(
	CPF_prof varchar(14) NOT NULL,
    CPF_pessoa varchar(14) NOT NULL,
    data_prescricao DATE NOT NULL,
    adscricao varchar(255) NOT NULL,
    subscricao varchar(255) NOT NULL,
    PRIMARY KEY(CPF_prof,CPF_pessoa,data_prescricao),
    CONSTRAINT `fk_cpPRIMARYfprof_prescricao` FOREIGN KEY(`CPF_prof`) REFERENCES `Profissional`(`CPF`) ON DELETE CASCADE,
    CONSTRAINT `fk_cpfpessoa_prescricao` FOREIGN KEY(`CPF_pessoa`) REFERENCES `Pessoa`(`CPF`) ON DELETE CASCADE
);

CREATE TABLE Inscricao(
	CPF_prof varchar(14) NOT NULL,
    CPF_pessoa varchar(14) NOT NULL,
    data_pres DATE NOT NULL,
    nome_farmaco varchar(255) NOT NULL,
    forma varchar(255) NOT NULL,
    concentracao varchar(50) NOT NULL,
    PRIMARY KEY(CPF_prof,CPF_pessoa,data_pres,nome_farmaco),
    CONSTRAINT `fk_pres` FOREIGN KEY(`CPF_prof`,`CPF_pessoa`,`data_pres`) REFERENCES `Prescricao`(`CPF_prof`,`CPF_pessoa`,`data_prescricao`) on delete cascade
);

CREATE TABLE Empresa(
	CNPJ varchar(18) NOT NULL,
    nome_empresa varchar(255) NOT NULL,
    id_end int unsigned NOT NULL,
    id_tel int unsigned NOT NULL,
    PRIMARY KEY(CNPJ),
    CONSTRAINT `fk_end_empresa` FOREIGN KEY(`id_end`) REFERENCES `Endereco`(`id_endereco`) ON DELETE RESTRICT,
    CONSTRAINT `fk_tel_empresa` FOREIGN KEY(`id_tel`) REFERENCES `Telefone`(`id_telefone`) ON DELETE RESTRICT
);

CREATE TABLE Empresa_Conveniada(
	CNPJ varchar(18) NOT NULL,
    porcentagem_desc DECIMAL(2,0) NOT NULL,
    PRIMARY KEY(CNPJ),
    CONSTRAINT `fk_cnpj_conv` FOREIGN KEY(`CNPJ`) REFERENCES `Empresa`(`CNPJ`) ON DELETE RESTRICT
);

CREATE TABLE Associacao(
	CPF varchar(14) NOT NULL,
	CNPJ varchar(18) NOT NULL,
    PRIMARY KEY(CPF),
    CONSTRAINT `fk_cpf_as` FOREIGN KEY(`CPF`) REFERENCES `Pessoa`(`CPF`) ON DELETE CASCADE,
    CONSTRAINT `fk_cnpj_as` FOREIGN KEY(`CNPJ`) REFERENCES `Empresa`(`CNPJ`) ON DELETE CASCADE
);

CREATE TABLE Fabricante(
	CNPJ varchar(18) NOT NULL,
    PRIMARY KEY(CNPJ),
    CONSTRAINT `fk_cnpj_fab` FOREIGN KEY(`CNPJ`) REFERENCES `Empresa`(`CNPJ`) ON DELETE RESTRICT
);

CREATE TABLE Produto(
	cod_produto int unsigned auto_increment NOT NULL,
    nome varchar(255) NOT NULL,
    descricao varchar(400) NOT NULL,
    tipo varchar(50) NOT NULL,
    forma varchar(255) NOT NULL,
    preco DECIMAL(5,2) NOT NULL,
    validade DATE NOT NULL,
    PRIMARY KEY(cod_produto),
	UNIQUE(nome)
);

CREATE TABLE Fornecimento(
	CNPJ varchar(18) NOT NULL,
    cod_prod int unsigned NOT NULL,
    nota_fiscal varchar(44) NOT NULL,
    data_compra DATETIME NOT NULL,
    valor DECIMAL(7,2) NOT NULL,
    quantidade int unsigned NOT NULL,
    PRIMARY KEY(CNPJ,cod_prod,nota_fiscal),
    CONSTRAINT `fk_cnpj_forn` FOREIGN KEY(`CNPJ`) REFERENCES `Fabricante`(`CNPJ`) ON DELETE RESTRICT,
    CONSTRAINT `fk_codprod_forn` FOREIGN KEY(`cod_prod`) REFERENCES `Produto`(`cod_produto`) ON DELETE RESTRICT
);

CREATE TABLE Compra(
	nota_fiscal varchar(44) NOT NULL,
	CPF_funcionario varchar(14) NOT NULL,
    CPF_cliente varchar(14),
    data_compra DATETIME NOT NULL,
    valor DECIMAL(7,2) NOT NULL,
    PRIMARY KEY(nota_fiscal),
    CONSTRAINT `fk_cpffun_compra` FOREIGN KEY(`CPF_funcionario`) REFERENCES `Funcionario`(`CPF`) ON DELETE RESTRICT,
    CONSTRAINT `fk_cpfcli_compra` FOREIGN KEY(`CPF_cliente`) REFERENCES `Pessoa`(`CPF`) ON DELETE RESTRICT
);

CREATE TABLE Produto_Comprado(
	nota_fiscal varchar(44) NOT NULL,
    cod_prod int unsigned NOT NULL,
    quantidade int unsigned NOT NULL,
    valor DECIMAL(5,2) NOT NULL,
    PRIMARY KEY(nota_fiscal,cod_prod),
    CONSTRAINT `fk_nota_prodcom` FOREIGN KEY(`nota_fiscal`) REFERENCES `Compra`(`nota_fiscal`) ON DELETE CASCADE,
    CONSTRAINT `fk_codprod_prodcom` FOREIGN KEY(`cod_prod`) REFERENCES `Produto`(`cod_produto`) ON DELETE RESTRICT
);

INSERT INTO Telefone(numero) VALUES('+5514998888644');
INSERT INTO Telefone(id_telefone,numero) VALUES(1,'+5514997588899');
SELECT last_insert_id();
Select * FROM Telefone;

insert into Endereco(cidade,rua,numero,cep) VALUES('Bauru','Avenida José Henrique Ferraz',471,'17054-115');

Select * FROM Endereco;

insert into Pessoa Values('435.088.088-74','Maurício Scarelli Arantes',1,1,'M','2000-03-03');

Select * from pessoa;

CREATE OR REPLACE VIEW Dados_Pessoais as SELECT Pessoa.cpf,Pessoa.nome,Pessoa.genero,Pessoa.data_nasc,Telefone.numero as 'telefone',endereco.CEP,endereco.cidade,endereco.rua,endereco.numero 
FROM Pessoa, Telefone, Endereco 
WHERE pessoa.id_tel = telefone.id_telefone and pessoa.id_end = endereco.id_endereco;

Select * from Dados_Pessoais;

Update Dados_Pessoais
Set
	CEP ='17054-114'
WHERE
	cpf='435.088.088-74';

Insert Into funcionario values('435.088.088-74',4123213,'Gerente',4520.00);

Insert Into horario_funcionamento values('segunda',8,18);

Insert into trabalha values('435.088.088-74','segunda',8,18);

CREATE OR REPLACE VIEW Escala_de_Trabalho as SELECT f.cpf,p.nome,f.funcao,t.dia_da_semana,t.hora_inicio,t.hora_fim
FROM Pessoa as p, funcionario as f, trabalha as t
WHERE f.cpf = p.cpf and f.cpf = t.cpf;

Select * From Escala_de_trabalho;

insert into Endereco(cidade,rua,numero,cep) VALUES('Bauru','Rua Rosevaldo de Abreu Ribeiro',640,'17056-030');
insert into Endereco(cidade,rua,numero,cep) VALUES('Bauru','Av. Eng. Luís Edmundo Carrijo Coube',1401,'17033-360');
insert into Endereco(cidade,rua,numero,cep) VALUES('Bauru','Rua Rio Branco',2040,'17014-037');
insert into Endereco(cidade,rua,numero,cep) VALUES('São Paulo','Avenida Paulista',1776,'01310-200');
insert into Endereco(cidade,rua,numero,cep) VALUES('Bauru','Avenida Duque de Caxias',1165,'17012-151');
Select * FROM Endereco;

INSERT INTO Telefone(numero) VALUES('+5514998888888');
INSERT INTO Telefone(numero) VALUES('+5514999876543');
INSERT INTO Telefone(numero) VALUES('+5514991234567');
INSERT INTO Telefone(numero) VALUES('+5514994561237');
INSERT INTO Telefone(numero) VALUES('+5514999999999');
Select * FROM Telefone;

insert into Pessoa Values('938.413.988-20','Martin Gustavo Caleb',1,3,'M','2000-03-03');
insert into Pessoa Values('001.894.540-67','Eduarda Elisa Teresinha Fernandes',2,2,'F','1966-12-01');
insert into Pessoa Values('913.359.220-91','Vinicius Márcio Ramos',1,3,'M','2000-08-06');
insert into Pessoa Values('044.941.340-31','Catarina Sophia Gabrielly Castro',3,4,'F','1999-05-03');
insert into Pessoa Values('411.677.528-21','Fernanda Giovana Aurora Monteiro',4,4,'F','1983-11-11');
insert into Pessoa Values('206.860.420-50','Maria Medi',1,2,'F','1995-12-15');

Insert into profissional values('411.677.528-21','Psiquiatra','','12345');
Insert into profissional values('206.860.420-50','Neurologia','','54404');

Insert Into horario_funcionamento values('terca',8,18);
Insert Into horario_funcionamento values('quarta',8,18);
Insert Into horario_funcionamento values('quinta',8,18);
Insert Into horario_funcionamento values('sexta',8,18);
Insert Into horario_funcionamento values('sabado',8,16);
Insert Into horario_funcionamento values('domingo',8,12);

Insert Into funcionario values('001.894.540-67',1234567,'Caixa',1500.00);
Insert Into funcionario values('913.359.220-91',8912345,'Farmaceutico',3000.00);
Insert Into funcionario values('044.941.340-31',6543210,'Estagiário',1000.00);

insert Into farmaceutico values('913.359.220-91',12345);

Insert into trabalha values('435.088.088-74','terca',8,18);
Insert into trabalha values('435.088.088-74','quarta',8,18);
Insert into trabalha values('001.894.540-67','segunda',8,18);
Insert into trabalha values('001.894.540-67','terca',8,18);
Insert into trabalha values('001.894.540-67','quarta',8,18);
Insert into trabalha values('001.894.540-67','quinta',8,18);
Insert into trabalha values('001.894.540-67','sexta',8,18);
Insert into trabalha values('913.359.220-91','segunda',8,18);
Insert into trabalha values('913.359.220-91','terca',8,18);
Insert into trabalha values('913.359.220-91','quarta',8,18);
Insert into trabalha values('044.941.340-31','sabado',8,16);
Insert into trabalha values('044.941.340-31','domingo',8,12);

Select * From Escala_de_trabalho;

Select * From Pessoa, Funcionario where Pessoa.CPF = Funcionario.CPF;

Insert into Produto(nome, descricao, tipo, forma, preco, validade) values('Diazepam','Produz um efeito calmante','Receituário','Drágea',30.00,'2021-10-01');
Insert into Produto(nome, descricao, tipo, forma, preco, validade) values('Metilfenidato','Estimulante leve do sistema nervoso central','Receituário','Drágea',119.99,'2021-01-01');
Insert into Produto(nome, descricao, tipo, forma, preco, validade) values('Carbonato de lítio','Estabilizador do humor','Receituário','Comprimido',99.99,'2022-02-05');
Insert into Produto(nome, descricao, tipo, forma, preco, validade) values('Amoxicilina','Tratamento de infeções bacterianas causadas por microorganismos susceptíveis','Receituário','Capsula',54.99,'2021-12-21');
Insert into Produto(nome, descricao, tipo, forma, preco, validade) values('Timerosal','Composto organometálico com propriedades antissépticas e antifúngicas','Receituário','Aerosol',10.00,'2021-06-11');
Insert into Produto(nome, descricao, tipo, forma, preco, validade) values('Losartana','Tratamento de hipertensão arterial','OTC','Comprimido',110.00,'2021-06-21');
Insert into Produto(nome, descricao, tipo, forma, preco, validade) values('Metmorfina','Tratamento do diabetes mellitus tipo 2','OTC','Comprimido',219.99,'2020-10-05');
Insert into Produto(nome, descricao, tipo, forma, preco, validade) values('Hidroclorotiazida','Tratamento da hipertensão arterial','OTC','Comprimido',50.00,'2021-05-31');
Insert into Produto(nome, descricao, tipo, forma, preco, validade) values('Acetato de Dexametasona','Anti-inflamatório','Genéricos','Pomada',15.00,'2020-09-09');
Insert into Produto(nome, descricao, tipo, forma, preco, validade) values('Cloridrato de Nafazolina + Sulfato de Zinco','Solução oftalmológica','Genéricos','Colírio',10.00,'2022-01-09');

Select * from Produto;

Insert into empresa values('71.514.877/0001-49','Genericas S&A',3,1);
Insert into empresa values('41.970.267/0001-99','Farmais',1,2);
Insert into empresa values('30.906.419/0001-78','Monsant',2,3);
Insert into empresa values('82.123.912/0001-15','Convens',5,4);
Insert into empresa values('57.274.773/0001-83','Payer',4,5);

Select * from empresa;

Insert into fabricante values('71.514.877/0001-49');
Insert into fabricante values('30.906.419/0001-78');
Insert into fabricante values('57.274.773/0001-83');

Insert into fornecimento values('71.514.877/0001-49',10,'000.365.123','2020-07-03', 100.00, 10);
Insert into fornecimento values('71.514.877/0001-49',1,'000.365.456','2020-07-05', 600.00, 5);
Insert into fornecimento values('71.514.877/0001-49',6,'000.365.789','2020-07-01', 220.00, 2);
Insert into fornecimento values('30.906.419/0001-78',10,'000.365.123','2020-05-10', 100.00, 10);
Insert into fornecimento values('30.906.419/0001-78',2,'123.365.123','2020-06-13', 479.96, 4);
Insert into fornecimento values('30.906.419/0001-78',3,'456.365.123','2020-07-03', 299.97, 3);
Insert into fornecimento values('57.274.773/0001-83',4,'000.365.123','2020-07-05', 549.90, 10);

Insert into compra values('123.456.789','001.894.540-67','938.413.988-20','2020-07-02',20.0);
Insert into produto_comprado values('123.456.789',10,2,20.00);

Insert into empresa values('25.768.496/0001-79','Farmacommie',6,6);

Insert into prescricao values('411.677.528-21','435.088.088-74','2020-07-05','Uma vez durante a manhã e antes de dormir',
'30 comprimidos');
insert into inscricao values('411.677.528-21','435.088.088-74','2020-07-05','Diazepam',
'Drágea','10mg');

Insert into empresa_conveniada values('82.123.912/0001-15',10);

/*READ geral de convenios*/
select * from empresa, empresa_conveniada where empresa.CNPJ = empresa_conveniada.CNPJ;

/*READ geral de receitas*/
select prescricao.CPF_prof, prescricao.CPF_pessoa, a.nome as paciente, b.nome as profissional,
prescricao.data_prescricao, prescricao.adscricao, prescricao.subscricao, inscricao.nome_farmaco,
inscricao.forma, inscricao.concentracao from prescricao, inscricao, pessoa as a, pessoa as b 
where prescricao.CPF_pessoa = inscricao.CPF_pessoa and prescricao.CPF_prof = inscricao.CPF_prof 
and prescricao.data_prescricao = inscricao.data_pres and a.CPF = prescricao.CPF_pessoa 
and b.CPF = prescricao.CPF_prof;

/*READ de Farmacia */
select * from empresa, endereco, telefone where empresa.CNPJ = '25.768.496/0001-79' 
and empresa.id_end = endereco.id_endereco and telefone.id_telefone = empresa.id_tel;

/*READ geral de vendas*/
select nota_fiscal, CPF_funcionario, CPF_cliente, a.nome as cliente, b.nome as funcionario,
data_compra, valor from compra, pessoa as a, pessoa as b 
where a.CPF = compra.CPF_cliente and b.CPF = compra.CPF_funcionario;

/*READ geral dos clientes*/
select * from compra, pessoa where compra.CPF_cliente = pessoa.CPF;

/*READ Fabricantes*/
Select empresa.CNPJ, nome_empresa, cidade, endereco.rua, endereco.numero as numero_rua, telefone.numero 
FROM fabricante, empresa, endereco, telefone
Where fabricante.CNPJ = empresa.CNPJ and telefone.id_telefone = empresa.id_tel and endereco.id_endereco = empresa.id_end;
/*READ Produtos*/
SELECT * FROM produto LEFT JOIN (Select cod_prod, sum(quantidade) as total from fornecimento group by cod_prod) as a
ON produto.cod_produto = a.cod_prod;

/*READ geral Medicos*/
Select * from profissional, pessoa where profissional.CPF = pessoa.CPF;