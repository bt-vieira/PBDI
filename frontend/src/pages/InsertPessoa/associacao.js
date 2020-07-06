import React from 'react';

export default class Dados extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            CPF: '', 
            nome: '',  
            genero: '', 
            data_nasc: '', 
            cidade: '', 
            rua: '', 
            numero: 0, 
            CEP: '', 
            telefone: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        var data = {
            CPF: this.state.CPF, 
            nome: this.state.nome,  
            genero: this.state.genero, 
            data_nasc: this.state.data_nasc, 
            cidade: this.state.cidade, 
            rua: this.state.rua, 
            numero: this.state.numero, 
            CEP: this.state.CEP, 
            telefone: this.state.telefone
        }
        console.log(data)
        fetch("/pessoas", {
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
        window.location.href = "/pessoas";
    }

    handleInputChange(e) {
        this.setState({[e.target.name]: e.target.value});  
    }

    render() {
        return(
            <div>
                <h1>Inserir Pessoa</h1>
                <form class="pure-form pure-form-stacked" onSubmit = {this.handleSubmit} method="POST">
                <fieldset>
                    <div class="pure-g">
                        <div class="pure-u-1-4">
                            <label for="cpf">CPF</label>
                            <input type="text" id="cpf" name="CPF" onChange={this.handleInputChange} class="pure-input-1" />
                        </div>
                        <div class="pure-u-3-4">
                            <label for="nome">Nome</label>
                            <input type="text" id="nome" name="nome" onChange={this.handleInputChange}  class="pure-input-1" />
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
                            <input type="date" id="nasc" name="data_nasc" onChange={this.handleInputChange}  class="pure-input-1" />
                        </div>
                        <div class="pure-u-1 pure-u-md-1-3">
                            <legend class="pure-input-1" >Endereço:</legend>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-3">
                            <div class="pure-u-3-4">
                                <label for="rua">Rua</label>
                                <input type="text" id="rua" name="rua" onChange={this.handleInputChange} class="pure-input-1"  />
                            </div>
                            <div class="pure-u-1-4">
                                <label for="numero">Número</label>
                                <input type="text" id="numero" name="numero" onChange={this.handleInputChange}  class="pure-input-1" />
                            </div>
                            <div class="pure-u-3-4">
                                <label for="cidade">Cidade</label>
                                <input type="text" id="cidade" name="cidade" onChange={this.handleInputChange}  class="pure-input-1" />
                            </div>
                            <div class="pure-u-1-4">
                                <label for="cep">CEP</label>
                                <input type="text" id="cep" name="CEP" onChange={this.handleInputChange}  class="pure-input-1" />
                            </div>
                            
                        </div>
                        <div class="pure-u-1 pure-u-md-1-3">
                            <legend class="pure-input-1" >Número de Telefone:</legend>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-3">
                            <input type="text" id="telefone" name="telefone" onChange={this.handleInputChange}  class="pure-u-1-4" />
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