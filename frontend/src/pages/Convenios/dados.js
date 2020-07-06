import React from 'react';
import MaterialTable from 'material-table';

export default class Dados extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            CNPJ: '',
            nome_empresa: '',
            porcentagem_desc: 0,
            cidade: '',
            rua: '',
            numero: '',
            CEP: '',
            telefone: '',
            id_tel: 0,
            id_end: 0
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
   
    setarVal(rowData,cont){
        if(cont ==1)
        {this.state.CNPJ = rowData.CNPJ; 
        this.state.nome_empresa = rowData.nome_empresa;
        this.state.porcentagem_desc = rowData.porcentagem_desc; 
        this.state.cidade = rowData.cidade;
        this.state.rua = rowData.rua;
        this.state.numero = rowData.numero;
        this.state.CEP = rowData.CEP; 
        this.state.id_end = rowData.id_end;
        this.state.id_tel = rowData.id_tel;
        this.state.telefone = rowData.telefone;}
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value //setting value edited by the admin in state.
        });
    }

    handleEdit(event) {
        event.preventDefault()
        var data = {
            CNPJ: this.state.CNPJ, 
            nome_empresa: this.state.nome_empresa,
            porcentagem_desc: this.state.porcentagem_desc,
            cidade: this.state.cidade,
            rua: this.state.rua,
            numero: this.state.numero,
            CEP: this.state.CEP,
            id_end: this.state.id_end,
            id_tel: this.state.id_tel,
            telefone: this.state.telefone,
        }
        
        fetch("/convenios/edit", {
            
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

    deletar(CNPJ){
        var data = {
            CNPJ: CNPJ
        }
        fetch("/convenios/delete", {
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
        fetch('/convenios', {
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
        let cont=0;
        let eCNPJ;
        return ( 
            <React.Fragment>
                <MaterialTable
                title = 'Empresas Conveniadas'
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
                      onClick: (event) => {window.location.href ="/iconvenio"}
                    }
                  ]}
                detailPanel = {[{
                    tooltip: 'Visualizar',
                    render: rowData => {
                        if(eCNPJ!=rowData.CNPJ)
                            cont =0;
                        eCNPJ = rowData.CNPJ;
                        cont++;
                        this.setarVal(rowData,cont);
                        return (
                        <div>
                            <form class="pure-form pure-form-stacked" onSubmit = {this.handleEdit} method="PUT">
                                <fieldset>
                                <div class="pure-g">
                                    <div class="pure-u-1-4">
                                        <label for="cnpj">CNPJ</label>
                                        <input type="text" id="cnpj" value={rowData.CNPJ} class="pure-input-1" readonly="" />
                                    </div>
                                    <div class="pure-u-3-4">
                                        <label for="nome_empresa">Nome da Empresa</label>
                                        <input type="text" id="nome_empresa" name="nome_empresa" onChange={this.handleInputChange} defaultValue={rowData.nome_empresa} class="pure-input-1" />
                                    </div>
                                    <div class="pure-u-1-8">
                                        <label for="porcentagem">Porcentagem de Desconto</label>
                                        <input type="number" max = '100' id="porcentagem_desc" name="porcentagem_desc" onChange={this.handleInputChange} defaultValue={rowData.porcentagem_desc} class="pure-input-1" />
                                    </div>
                                    <div class="pure-u-1 pure-u-md-1-3">
                                        <legend class="pure-input-1" >Endereço:</legend>
                                    </div>
                                    <div class="pure-u-1 pure-u-md-1-3">
                                        <div class="pure-u-3-4">
                                            <label for="rua">Rua</label>
                                            <input type="text" id="rua" name="rua" onChange={this.handleInputChange} defaultValue={rowData.rua} class="pure-input-1"  />
                                        </div>
                                        <div class="pure-u-1-4">
                                            <label for="numero">Número</label>
                                            <input type="text" id="numero" name="numero" onChange={this.handleInputChange} defaultValue={rowData.numero} class="pure-input-1" />
                                        </div>
                                        <div class="pure-u-3-4">
                                            <label for="cidade">Cidade</label>
                                            <input type="text" id="cidade" name="cidade" onChange={this.handleInputChange} defaultValue={rowData.cidade} class="pure-input-1" />
                                        </div>
                                        <div class="pure-u-1-4">
                                            <label for="cep">CEP</label>
                                            <input type="text" id="cep" name="CEP" onChange={this.handleInputChange} defaultValue={rowData.CEP} class="pure-input-1" />
                                        </div>
                                        
                                    </div>
                                    <div class="pure-u-1 pure-u-md-1-3">
                                        <legend class="pure-input-1" >Número de Telefone:</legend>
                                    </div>
                                    <div class="pure-u-1 pure-u-md-1-3">
                                        <input type="text" id="telefone" name="telefone" onChange={this.handleInputChange} defaultValue={rowData.telefone} class="pure-u-1-4" />
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
                    onRowDelete: oldData => {this.deletar(oldData.CNPJ);}
                }}
                columns = {[
                    {title: 'CNPJ', field: 'CNPJ'},
                    {title: 'Nome da Empresa', field: 'nome_empresa'},
                    {title: 'Porcentagem do Desconto', field: 'porcentagem_desc'},
                ]}
                data = {this.state.users}
                />
            </React.Fragment>
        );
    }
}