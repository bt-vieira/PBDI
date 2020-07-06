import React from 'react';

export default class Dados extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            CPF: '',
            CPTS: '',
            Funcao: '',
            Salario: '',
            CRF: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.logChange = this.logChange.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        var data = {
            CPF: this.state.CPF,
            CPTS: this.state.CPTS,
            Funcao: this.state.Funcao,
            Salario: this.state.Salario,
            CRF: this.state.CRF
        }
        console.log(data)
        fetch("/funcionarios", {
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
        window.location.href ="/funcionarios";

    }

    logChange(e) {
        this.setState({[e.target.name]: e.target.value});  
    }

    render() {
        return(
            <div>
                <h1>Inserir Funcionário</h1>
                <form class="pure-form pure-form-stacked" onSubmit = {this.handleSubmit} method="POST">
                    <fieldset>
                    <div class="pure-g">
                        <div class="pure-u-1-3">
                            <label for="CPF">CPF do Funcionário</label>
                            <input type="text" id="CPF" name="CPF" onChange={this.logChange}  class="pure-input-1" required=""/>
                        </div>
                        <div class="pure-u-2-3">
                            <label for="Funcao">Função</label>
                            <input type="text" id="Funcao" name="Funcao" onChange={this.logChange}  class="pure-input-1" required=""/>
                        </div>
                        <div class="pure-u-1-4">
                            <label for="CPTS">CPTS</label>
                            <input type="text" id="CPTS" name="CPTS" onChange={this.logChange}  class="pure-input-1" required=""/>
                        </div>
                        <div class="pure-u-1-4">
                            <label for="Salario">Salário</label>
                            <input type="text" id="Salario" name="Salario" onChange={this.logChange}  class="pure-input-1" required=""/>
                        </div>
                        <div class="pure-u-1-4">
                            <label for="CRF">CRF</label>
                            <input type="text" id="CRF" name="CRF" onChange={this.logChange}  class="pure-input-1"/>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-3">
                            <button type="submit" class="pure-button pure-button-primary">Inserir</button>
                        </div>
                    </div>
                    </fieldset>
                </form>
            </div>
        )
    }
}