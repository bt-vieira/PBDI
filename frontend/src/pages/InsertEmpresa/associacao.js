import React from 'react';

export default class Dados extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            CNPJ: '',
            nome_empresa: '',
            cidade: '',
            rua: '',
            numero: '',
            CEP: '',
            telefone: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.logChange = this.logChange.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        var data = {
            CNPJ: this.state.CNPJ,
            nome_empresa: this.state.nome_empresa,
            cidade: this.state.cidade,
            rua: this.state.rua,
            numero: this.state.numero,
            CEP: this.state.CEP,
            telefone: this.state.telefone,
        }
        console.log(data)
        fetch("/empresas", {
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
        window.location.href ="/empresas";
    }

    logChange(e) {
        this.setState({[e.target.name]: e.target.value});  
    }

    render() {
        return(
            <div>
                <h1>Inserir Empresa</h1>
                <form class="pure-form pure-form-stacked" onSubmit = {this.handleSubmit} method="POST">
                    <fieldset>
                    <div class="pure-g">
                        <div class="pure-u-1-4">
                            <label for="cnpj">CNPJ</label>
                            <input type="text" id="cnpj" name = "CNPJ" onChange={this.logChange} class="pure-input-1" required=""/>
                        </div>
                        <div class="pure-u-3-4">
                            <label for="nome_empresa">Nome da Empresa</label>
                            <input type="text" id="nome_empresa" name="nome_empresa" onChange={this.logChange}  class="pure-input-1" required=""/>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-3">
                            <legend class="pure-input-1" >Endereço:</legend>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-3">
                            <div class="pure-u-3-4">
                                <label for="rua">Rua</label>
                                <input type="text" id="rua" name="rua" onChange={this.logChange} class="pure-input-1"  />
                            </div>
                            <div class="pure-u-1-4">
                                <label for="numero">Número</label>
                                <input type="text" id="numero" name="numero" onChange={this.logChange} class="pure-input-1" />
                            </div>
                            <div class="pure-u-3-4">
                                <label for="cidade">Cidade</label>
                                <input type="text" id="cidade" name="cidade" onChange={this.logChange} class="pure-input-1" />
                            </div>
                            <div class="pure-u-1-4">
                                <label for="cep">CEP</label>
                                <input type="text" id="cep" name="CEP" onChange={this.logChange} class="pure-input-1" />
                            </div>
                            
                        </div>
                        <div class="pure-u-1 pure-u-md-1-3">
                            <legend class="pure-input-1" >Número de Telefone:</legend>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-3">
                            <input type="text" id="telefone" name="telefone" onChange={this.logChange} class="pure-u-1-4" required=""/>
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