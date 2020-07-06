import React from 'react';
import MaterialTable from 'material-table';

export default class Dados extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            CPF_prof: '',
            CPF_pessoa: '',
            data_prescricao: '',
            adscricao: '',
            subscricao: '',
            nome_farmaco: '',
            forma: '',
            concentracao: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
   
    setarVal(rowData,cont){
        if(cont ==1)
        {this.state.CPF_prof = rowData.CPF_prof; 
        this.state.CPF_pessoa = rowData.CPF_pessoa;
        this.state.adscricao = rowData.adscricao;
        this.state.subscricao = rowData.subscricao;
        this.state.forma = rowData.forma;
        this.state.data_prescricao = (rowData.data_prescricao).substr(0,10); 
        this.state.nome_farmaco = rowData.nome_farmaco
        this.state.concentracao = rowData.concentracao;}
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value //setting value edited by the admin in state.
        });
    }

    handleEdit(event) {
        event.preventDefault()
        var data = {
            CPF_prof: this.state.CPF_prof,
            CPF_pessoa: this.state.CPF_pessoa,
            adscricao: this.state.adscricao,
            subscricao: this.state.subscricao,
            forma: this.state.forma,
            data_prescricao: this.state.data_prescricao,
            nome_farmaco: this.state.nome_farmaco,
            concentracao: this.state.concentracao
        }
        
        fetch("/receitas/edit", {
            
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
    deletar(rowData){
        var data = {
            CPF_prof: rowData.CPF_prof,
            CPF_pessoa: rowData.CPF_pessoa,
            data_prescricao: (rowData.data_prescricao).substr(0,10)
        }
        fetch("/receitas/delete", {
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
        fetch('/receitas', {
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
                title = 'Receitas'
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
                      onClick: (event) => {window.location.href ="/ireceita"}
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
                                    <div class="pure-u-1-2">
                                        <label for="adscricao">Adscrição</label>
                                        <textarea id="adscricao" name="adscricao" onChange={this.handleInputChange} defaultValue={rowData.adscricao} class="pure-input-1" />
                                    </div>
                                    <div class="pure-u-1-2">
                                        <label for="subscricao">Subscrição</label>
                                        <input type="text" id="subscricao" name="subscricao" onChange={this.handleInputChange} defaultValue={rowData.subscricao} class="pure-input-1" />
                                    </div>
                                    <div class="pure-u-1 pure-u-md-1-3">
                                        <legend class="pure-input-1" >Informações do Fármaco:</legend>
                                    </div>
                                    <div class="pure-u-1 pure-u-md-1-3">
                                        <div class="pure-u-3-4">
                                            <label for="nome_farmaco">Nome</label>
                                            <input type="text" id="nome_farmaco" name="nome_farmaco" onChange={this.handleInputChange} defaultValue={rowData.nome_farmaco} class="pure-input-1"  />
                                        </div>
                                        <div class="pure-u-1-4">
                                            <label for="forma">Forma</label>
                                            <input type="text" id="forma" name="forma" onChange={this.handleInputChange} defaultValue={rowData.forma} class="pure-input-1" />
                                        </div>
                                        <div class="pure-u-1-4">
                                            <label for="concentracao">Concentração</label>
                                            <input type="text" id="concentracao" name="concentracao" onChange={this.handleInputChange} defaultValue={rowData.concentracao} class="pure-input-1" />
                                        </div>
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
                    onRowDelete: oldData => {this.deletar(oldData);}
                }}
                columns = {[
                    {title: 'Paciente', field: 'paciente'},
                    {title: 'Profissional da Saúde', field: 'profissional'},
                    {title: 'Nome do Fármaco', field: 'nome_farmaco'},
                    {title: 'Concentração', field: 'concentracao'},
                    {title: 'Subscrição', field: 'subscricao'},
                    {title: 'Data da Prescrição', field: 'data_prescricao', type: 'date'},
                ]}
                data = {this.state.users}
                />
            </React.Fragment>
        );
    }
}