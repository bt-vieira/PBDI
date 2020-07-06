import React from 'react';

export default class Dados extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            nome: '',
            descricao: '',
            tipo: '',
            forma: '',
            validade: '',
            preco: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault()
        var data = {
            nome: this.state.nome,
            descricao: this.state.descricao,
            tipo: this.state.tipo,
            forma: this.state.forma,
            validade: this.state.validade,
            preco: this.state.preco,
        }
        console.log(data)
        fetch("/produtos", {
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
        window.location.href = "/produtos";
    }

    handleInputChange(e) {
        this.setState({[e.target.name]: e.target.value});  
    }

    render() {
        return(
        <div>
            <h1>Inserir Associação</h1>
            <form class="pure-form pure-form-stacked" onSubmit = {this.handleSubmit} method="PUT">
                <fieldset>
                <div class="pure-g">
                    <div class="pure-u-3-4">
                        <label for="nome">Nome do Produto</label>
                        <input type="text" id="nome" name="nome" onChange={this.handleInputChange}  class="pure-input-1" />
                    </div>
                    <div class="pure-u-1-2">
                        <label for="descricao">Descriçao</label>
                        <textarea id="descricao" name="descricao" class="pure-input-1"/>
                    </div>
                    <div class="pure-u-1-4">
                        <label for="tipo">Tipo</label>
                        <input type="text" id="tipo" name="tipo" onChange={this.handleInputChange} class="pure-input-1" />
                    </div>
                    <div class="pure-u-1-4">
                        <label for="forma">Forma Farmacêutica</label>
                        <input type="text" id="forma" name="forma" onChange={this.handleInputChange} class="pure-input-1" />
                    </div>
                    <div class="pure-u-1-4">
                        <label for="preco">Preço</label>
                        <input type="text" id="preco" name="preco" onChange={this.handleInputChange} class="pure-input-1" />
                    </div>
                    <div class="pure-u-1-4">
                        <label for="validade">Validade</label>
                        <input type="date" id="validade" name="validade" onChange={this.handleInputChange}  class="pure-input-1" />
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