import React from 'react';

export default class Dados extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            CPF_prof: '',
            CPF_pessoa: '',
            data_prescricao: '',
            adscricao: '',
            subscricao: '',
            nome_farmaco: '',
            forma: '',
            concentracao: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
    }

    handleSubmit(event) {
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
        console.log(data)
        fetch("/receitas", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            console.log(data)    
            if(data == "success"){
               this.setState({msg: "Thanks for registering"});  
            }
        }).catch(function(err) {
            console.log(err)
        });
        window.location.href = "/receitas";
    }

    handleEdit(e) {
        this.setState({[e.target.name]: e.target.value});  
    }

    render() {
        return(
            <div>
                <h1>Inserir Receita</h1>
                <form class="pure-form pure-form-stacked" onSubmit = {this.handleSubmit} method="POST">
                <fieldset>
                    <div class="pure-g">
                        <div class="pure-u-1-3">
                            <label for="CPF_prof">CPF do Profissional</label>
                            <input type="text" id="CPF_prof" name="CPF_prof" onChange={this.handleEdit} class="pure-input-1" />
                        </div>
                        <div class="pure-u-1-3">
                            <label for="CPF_pessoa">CPF do Paciente</label>
                            <input type="text" id="CPF_pessoa" name="CPF_pessoa" onChange={this.handleEdit}  class="pure-input-1" />
                        </div>
                        <div class="pure-u-1-3">
                            <label for="data_prescricao">Data da Prescrição</label>
                            <input type="date" id="data_prescricao" name="data_prescricao" onChange={this.handleEdit}  class="pure-input-1" />
                        </div>
                        <div class="pure-u-1-2">
                            <label for="adscricao">Adscrição</label>
                            <textarea id="adscricao" name="adscricao" onChange={this.handleEdit}  class="pure-input-1" />
                        </div>
                        <div class="pure-u-1-2">
                            <label for="subscricao">Subscrição</label>
                            <input type="text" id="subscricao" name="subscricao" onChange={this.handleEdit} class="pure-input-1" />
                        </div>
                        <div class="pure-u-1 pure-u-md-1-3">
                            <legend class="pure-input-1" >Informações do Fármaco:</legend>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-3">
                            <div class="pure-u-3-4">
                                <label for="nome_farmaco">Nome</label>
                                <input type="text" id="nome_farmaco" name="nome_farmaco" onChange={this.handleEdit} class="pure-input-1"  />
                            </div>
                            <div class="pure-u-1-4">
                                <label for="forma">Forma</label>
                                <input type="text" id="forma" name="forma" onChange={this.handleEdit}  class="pure-input-1" />
                            </div>
                            <div class="pure-u-1-4">
                                <label for="concentracao">Concentração</label>
                                <input type="text" id="concentracao" name="concentracao" onChange={this.handleEdit}  class="pure-input-1" />
                            </div>
                    </div>
                    </div>
                    </fieldset>
                    <div class="pure-button-group" role="group" aria-label="...">
                        <button type="submit" class="pure-button pure-button-primary">Inserir</button>
                    </div>
                </form>
            </div>
        )
    }
}