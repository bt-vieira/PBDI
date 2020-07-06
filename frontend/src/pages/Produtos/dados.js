import React from 'react';
import MaterialTable from 'material-table';

export default class Dados extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            cod_produto: 0,
            nome: '',
            descricao: '',
            tipo: '',
            forma: '',
            validade: '',
            preco: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
   
    setarVal(rowData,cont){
        if(cont ==1)
        {this.state.cod_produto = rowData.cod_produto; 
        this.state.nome = rowData.nome;
        this.state.descricao = rowData.descricao;
        this.state.tipo = rowData.tipo;
        this.state.forma = rowData.forma;
        this.state.validade = (rowData.validade).substr(0,10); 
        this.state.preco = rowData.preco;}
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value //setting value edited by the admin in state.
        });
    }

    handleEdit(event) {
        event.preventDefault()
        var data = {
            cod_produto: this.state.cod_produto,
            nome: this.state.nome,
            descricao: this.state.descricao,
            tipo: this.state.tipo,
            forma: this.state.forma,
            validade: this.state.validade,
            preco: this.state.preco,
        }
        
        fetch("/produtos/edit", {
            
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
                alert("Não foi possível conectar-se ao Servidor!");
            }
            return response.json();
        }).then(function(data) {
            console.log(data)
            if (data === "success") {
                this.setState({
                    msg: "User has been edited."
                });
            }
        }).catch(function(err) {
            console.log(err)
        });
        window.location.reload(false);
    }
    deletar(cod_produto){
        var data = {
            cod_produto: cod_produto
        }
        fetch("/produtos/delete", {
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
        fetch('/produtos', {
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
                title = 'Produtos'
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
                actions={[
                    {
                      icon: 'add',
                      tooltip: 'Add User',
                      isFreeAction: true,
                      onClick: (event) => {window.location.href ="/iproduto"}
                    }
                  ]}
                options={{ detailPanelType: "single" }}
                detailPanel = {[{
                    tooltip: 'Visualizar',
                    render: rowData => {
                        cont++;
                        this.setarVal(rowData,cont);
                        return (
                        <div>
                            <form class="pure-form pure-form-stacked" onSubmit = {this.handleEdit} method="PUT">
                                <fieldset>
                                <div class="pure-g">
                                    <div class="pure-u-1-4">
                                        <label for="cod_produto">Código do Produto</label>
                                        <input type="text" id="cod_produto" name="cod_produto" value={rowData.cod_produto} class="pure-input-1" />
                                    </div>
                                    <div class="pure-u-3-4">
                                        <label for="nome">Nome do Produto</label>
                                        <input type="text" id="nome" name="nome" onChange={this.handleInputChange} defaultValue={rowData.nome} class="pure-input-1" />
                                    </div>
                                    <div class="pure-u-1-2">
                                        <label for="descricao">Descriçao</label>
                                        <textarea id="descricao" name="descricao" defaultValue={rowData.descricao} class="pure-input-1"/>
                                    </div>
                                    <div class="pure-u-1-4">
                                        <label for="tipo">Tipo</label>
                                        <input type="text" id="tipo" name="tipo" onChange={this.handleInputChange} defaultValue={rowData.tipo} class="pure-input-1" />
                                    </div>
                                    <div class="pure-u-1-4">
                                        <label for="forma">Forma Farmacêutica</label>
                                        <input type="text" id="forma" name="forma" onChange={this.handleInputChange} defaultValue={rowData.forma} class="pure-input-1" />
                                    </div>
                                    <div class="pure-u-1-4">
                                        <label for="preco">Preço</label>
                                        <input type="text" id="preco" name="preco" onChange={this.handleInputChange} defaultValue={rowData.preco} class="pure-input-1" />
                                    </div>
                                    <div class="pure-u-1-4">
                                        <label for="validade">Validade</label>
                                        <input type="date" id="validade" name="validade" onChange={this.handleInputChange} defaultValue={(rowData.validade).substr(0,10)} class="pure-input-1" />
                                    </div>
                                </div>
                                </fieldset>
                                <div class="pure-button-group" role="group" aria-label="...">
                                    <button type="submit" class="pure-button pure-button-primary">Editar</button>
                                </div>
                            </form>
                            <script>
                                
                            </script>
                        </div>
                        )
                    }
                }]}
                editable = {{
                    onRowDelete: oldData => {this.deletar(oldData.cod_produto);}
                }}
                columns = {[
                    {title: 'Cod. Produto', field: 'cod_produto'},
                    {title: 'Nome', field: 'nome'},
                    {title: 'Tipo', field: 'tipo'},
                    {title: 'Preço', field: 'preco', type: 'currency'},
                    {title: 'Validade', field: 'validade', type: 'date'},
                    {title: 'Em Estoque', field: 'total', type: 'numeric'},
                ]}
                data = {this.state.users}
                />
            </React.Fragment>
        );
    }
}