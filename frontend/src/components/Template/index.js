import React from 'react';
import { AppBar, Drawer, Divider, IconButton, Toolbar, Typography } from '@material-ui/core';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import Home from '../../pages/Home';
import Clientes from '../../pages/Clientes';
import Convenios from '../../pages/Convenios';
import Fabricantes from '../../pages/Fabricantes';
import Farmacia from '../../pages/Farmacia';
import Funcionarios from '../../pages/Funcionarios';
import Pessoas from '../../pages/Pessoas';
import Produtos from '../../pages/Produtos';
import Profissionais from '../../pages/Profissionais';
import Receitas from '../../pages/Receitas';
import Vendas from '../../pages/Vendas';
import Sobre from '../../pages/Sobre';
import Associacao from '../../pages/Associacao';
import Fornecimento from '../../pages/Fornecimento';
import ProdutosVendidos from '../../pages/ProdutosVendidos';
import Empresas from '../../pages/Empresas';
import IAssociacao from '../../pages/InsertAssociacao';
import IConvenio from '../../pages/InsertConvenio';
import IFabricante from '../../pages/InsertFabricantes';
import IFornecimento from '../../pages/InsertFornecimento';
import IFuncionario from '../../pages/InsertFuncionario';
import IProduto from '../../pages/InsertProduto';
import IProfissional from '../../pages/InsertProfissional';
import IReceita from '../../pages/InsertReceita';
import IVenda from '../../pages/InsertVenda';
import IPessoa from '../../pages/InsertPessoa';
import IEmpresa from '../../pages/InsertEmpresa';
import IProdVend from '../../pages/InsertProdVenda';

import HeaderItem from '../ListItem';

import useStyles from './useStyles';

import logo from '../../assets/images/logo.png';

const Template = () => {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <AppBar 
          position="fixed"
          className={classes.appBar}
        >
          <Toolbar>
            <Link to="/">
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <img src={logo} alt="" />
              </IconButton>
            </Link>
            <Typography variant="h6" className={classes.title}>
              Farmácia - Projeto de Banco de Dados I
            </Typography>         
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <HeaderItem path="/farmacia" title="Farmácia" />
            <HeaderItem path="/associacao" title="Associações" />
            <HeaderItem path="/clientes" title="Clientes" />
            <HeaderItem path="/empresas" title="Empresas" />
            <HeaderItem path="/convenios" title="Empresas Conveniadas" />
            <HeaderItem path="/fabricantes" title="Fabricantes" />
            <HeaderItem path="/fornecimentos" title="Fornecimentos" />
            <HeaderItem path="/funcionarios" title="Funcionários" />
            <HeaderItem path="/pessoas" title="Pessoas" />
            <HeaderItem path="/produtos" title="Produtos" />
            <HeaderItem path="/produtosvend" title="Produtos Vendidos" />
            <HeaderItem path="/profissionais" title="Profissionais da Saúde" />
            <HeaderItem path="/receitas" title="Receitas" />
            <HeaderItem path="/vendas" title="Vendas" />
            <Divider />
            <HeaderItem path="/sobre" title="Sobre" />
          </div>
        </Drawer>
        <main className={classes.content}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/iprodvend" exact>
              <IProdVend />
            </Route>
            <Route path="/iempresa" exact>
              <IEmpresa />
            </Route>
            <Route path="/empresas" exact>
              <Empresas />
            </Route>
            <Route path="/ipessoa/" exact>
              <IPessoa />
            </Route>
            <Route path="/iassociacao/" exact>
              <IAssociacao />
            </Route>
            <Route path="/iconvenio/" exact>
              <IConvenio />
            </Route>
            <Route path="/ifabricante/" exact>
              <IFabricante />
            </Route>
            <Route path="/ifornecimento/" exact>
              <IFornecimento />
            </Route>
            <Route path="/ifuncionario/" exact>
              <IFuncionario />
            </Route>
            <Route path="/iproduto/" exact>
              <IProduto />
            </Route>
            <Route path="/iprofissional/" exact>
              <IProfissional />
            </Route>
            <Route path="/ireceita/" exact>
              <IReceita />
            </Route>
            <Route path="/ivenda/" exact>
              <IVenda />
            </Route>
            <Route path="/farmacia" exact>
              <Farmacia />
            </Route>
            <Route path="/associacao" exact>
              <Associacao />
            </Route>
            <Route path="/fornecimentos" exact>
              <Fornecimento/>
            </Route>
            <Route path="/produtosvend" exact>
              <ProdutosVendidos />
            </Route>
            <Route path="/clientes" exact>
              <Clientes />
            </Route>
            <Route path="/convenios" exact>
              <Convenios />
            </Route>
            <Route path="/fabricantes" exact>
              <Fabricantes />
            </Route>
            <Route path="/funcionarios" exact>
              <Funcionarios />
            </Route>
            <Route path="/pessoas" exact>
              <Pessoas />
            </Route>
            <Route path="/produtos" exact>
              <Produtos />
            </Route>
            <Route path="/profissionais" exact>
              <Profissionais />
            </Route>
            <Route path="/receitas" exact>
              <Receitas />
            </Route>
            <Route path="/vendas" exact>
              <Vendas />
            </Route>
            <Route path="/sobre" exact>
              <Sobre />
            </Route>
          </Switch>
        </main>
      </div>
      
    </BrowserRouter>
  );
};

export default Template;
