import React from 'react';
import MaterialTable from 'material-table';

export default class Dados extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }

    deletar(nota_fiscal){
        var data = {
            nota_fiscal: nota_fiscal
        }
        fetch("/vendas/delete", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
              alert("Não Foi Possível Excluir a Informação!");
            }
            return response.json();
        }).then(function(data) {
            if(data === "success"){
               this.setState({msg: "User has been deleted."});  
            }
        }).catch(function(err) {
            console.log(err)
        });
        window.location.reload(false);
    }

    componentDidMount() {
        let self = this;
        fetch('/vendas', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({users: data});
        }).catch(err => {
        console.log('caught it!',err);
        })
    }

    render() {
        let cont = 0;
        return ( 
            <React.Fragment>
                <MaterialTable
                title = 'Vendas'
                localization = {{
                    pagination: {
                        labelRowsSelect: 'linhas',
                        labelDisplayedRows: '{count} de {from}-{to}',
                        firstTooltip: 'Primeira página',
                        previousTooltip: 'Página anterior',
                        nextTooltip: 'Próxima página',
                        lastTooltip: 'Última página'
                    },
                    toolbar: {
                        nRowsSelected: '{0} linha(s) selecionadas',
                        searchTooltip: 'Pesquisar',
                        searchPlaceholder: 'Pesquisar'
                    },
                    header: {
                        actions: 'Ações'
                    },
                    body: {
                        emptyDataSourceMessage: 'Sem Registros para Exibir',
                         editRow: {
                             deleteText: 'Tem certeza que deseja deletar?'
                         }
                    },
                }}
                options={{ detailPanelType: "single" }}
                actions={[
                    {
                      icon: 'add',
                      tooltip: 'Add User',
                      isFreeAction: true,
                      onClick: (event) => {window.location.href ="/ivenda"}
                    }
                  ]}
                editable = {{
                    onRowDelete: oldData => {this.deletar(oldData.nota_fiscal);}
                }}
                columns = {[
                    {title: 'Nota Fiscal', field: 'nota_fiscal'},
                    {title: 'Cliente', field: 'cliente'},
                    {title: 'Funcionário', field: 'funcionario'},
                    {title: 'Data da Venda', field: 'data_compra', type: 'date'},
                    {title: 'Valor', field: 'valor', type: 'currency'},
                ]}
                data = {this.state.users}
                />
            </React.Fragment>
        );
    }
}