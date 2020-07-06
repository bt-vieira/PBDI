import React, {Component}  from 'react';
import MaterialTable from 'material-table';

export default class Dados extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            CPF: '', 
            nome: '', 
            id_end: 0, 
            id_tel: 0, 
            genero: '', 
            data_nasc: '', 
            cidade: '', 
            rua: '', 
            numero: 0, 
            CEP: '', 
            telefone: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    setarVal(rowData,cont){
        if(cont ==1)
        {this.state.CPF = rowData.CPF; 
        this.state.nome = rowData.nome;
        this.state.id_end = rowData.id_end; 
        this.state.id_tel = rowData.id_tel;
        this.state.genero = rowData.genero;
        this.state.data_nasc = (rowData.data_nasc).substr(0,10);
        this.state.cidade = rowData.cidade; 
        this.state.rua = rowData.rua;
        this.state.numero = rowData.numero;
        this.state.CEP = rowData.CEP;
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
            CPF: this.state.CPF, 
            nome: this.state.nome, 
            id_end: this.state.id_end, 
            id_tel: this.state.id_tel, 
            genero: this.state.genero, 
            data_nasc: this.state.data_nasc, 
            cidade: this.state.cidade, 
            rua: this.state.rua, 
            numero: this.state.numero, 
            CEP: this.state.CEP, 
            telefone: this.state.telefone
        }
        
        fetch("/clientes/edit", {
            
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

    deletar(CPF){
        var data = {
            CPF: CPF
        }
        fetch("/clientes/delete", {
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
        fetch('/clientes', {
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
        let pCPF;
        return ( 
            <React.Fragment>
                <MaterialTable
                title = 'Clientes'
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
                detailPanel = {[{
                    tooltip: 'Visualizar',
                    render: rowData => {
                        if(pCPF!=rowData.CPF)
                            cont =0;
                        pCPF = rowData.CPF;
                        cont++;
                        this.setarVal(rowData,cont);
                        return (
                        <div>
                            <form class="pure-form pure-form-stacked" onSubmit = {this.handleEdit} method="PUT">
                                <fieldset>
                                <div class="pure-g">
                                    <div class="pure-u-1-4">
                                        <label for="cpf">CPF</label>
                                        <input type="text" id="cpf" value={rowData.CPF} class="pure-input-1" readonly="" />
                                    </div>
                                    <div class="pure-u-3-4">
                                        <label for="nome">Nome</label>
                                        <input type="text" id="nome" name="nome" onChange={this.handleInputChange} defaultValue={rowData.nome} class="pure-input-1" />
                                    </div>
                                    <div class="pure-u-1 pure-u-md-1-3">
                                        <legend class="pure-input-1" >Gênero:</legend>
                                    </div>
                                    <div class="pure-u-1-8">
                                        <label for="male">Masculino</label>
                                        <input type="radio" id="male" name="genero" onChange={this.handleInputChange} value="M" class="pure-input-1-3" />
                                    </div>
                                    <div class="pure-u-1-8">    
                                        <label for="female">Feminino</label>
                                        <input type="radio" id="female" name="genero" onChange={this.handleInputChange} value="F" class="pure-input-1-3"/>
                                    </div>
                                    <div class="pure-u-1-8">
                                        <label for="other">Outro</label>
                                        <input type="radio" id="other" name="genero" onChange={this.handleInputChange} value="N" class="pure-input-1-3"/>
                                    </div>
                                    <div class="pure-u-1-4">
                                        <label for="nasc">Data de Nascimento</label>
                                        <input type="date" id="nasc" name="data_nasc" onChange={this.handleInputChange} defaultValue={(rowData.data_nasc).substr(0,10)} class="pure-input-1" />
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
                                            <label for="CEP">CEP</label>
                                            <input type="text" id="CEP" name="CEP" onChange={this.handleInputChange} defaultValue={rowData.CEP} class="pure-input-1" />
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
                onRowClick = {cont => {cont=0}}
                editable = {{
                    onRowDelete: oldData => {this.deletar(oldData.CPF);}
                }}
                columns = {[
                    {title: 'CPF', field: 'CPF'},
                    {title: 'Nome', field: 'nome'},
                    {title: 'Gênero', field: 'genero'},
                    {title: 'Data de Nascimento', field: 'data_nasc', type: 'date'},
                ]}
                data = {this.state.users}
                
                />
            </React.Fragment>
        );
    }
}