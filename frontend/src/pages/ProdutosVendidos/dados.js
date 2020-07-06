import React from 'react';
import MaterialTable from 'material-table';

export default class Dados extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }

    deletar(rowData){
        var data = {
            nota_fiscal: rowData.nota_fiscal,
            cod_prod: rowData.cod_prod
        }
        fetch("/vendido/delete", {
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
        fetch('/vendido', {
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
                title = 'Produtos Vendidos'
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
                      tooltip: 'Adicionar',
                      isFreeAction: true,
                      onClick: (event) => {window.location.href ="/iprodvend"}
                    }
                  ]}
                editable = {{
                    onRowDelete: oldData => {this.deletar(oldData);}
                }}
                columns = {[
                    {title: 'Nota Fiscal', field: 'nota_fiscal'},
                    {title: 'Nome do Fármaco', field: 'nome'},
                    {title: 'Quantidade', field: 'quantidade'},
                    {title: 'Valor', field: 'valor', type: 'currency'},
                ]}
                data = {this.state.users}
                />
            </React.Fragment>
        );
    }
}