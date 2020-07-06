import React from 'react';

export default class Dados extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            CPF: '',
            especialidade: '',
            registro: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.logChange = this.logChange.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        var data = {
            CPF: this.state.CPF,
            especialidade: this.state.especialidade,
            registro: this.state.registro
        }
        console.log(data)
        fetch("/profissionais", {
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
        window.location.href = '/profissionais';
    }

    logChange(e) {
        this.setState({[e.target.name]: e.target.value});  
    }

    render() {
        return(
            <div>
                <h1>Inserir Profissional</h1>
                <form class="pure-form pure-form-stacked" onSubmit = {this.handleSubmit} method="POST">
                    <fieldset>
                    <div class="pure-g">
                        <div class="pure-u-1-3">
                            <label for="CPF">CPF</label>
                            <input type="text" id="CPF" name="CPF" onChange={this.logChange}  class="pure-input-1" required=""/>
                        </div>
                        <div class="pure-u-1-3">
                            <label for="registro">Registro</label>
                            <input type="text" id="registro" name="registro" onChange={this.logChange}   class="pure-input-1" required="" />
                        </div>
                        <div class="pure-u-1-2">
                            <label for="especialidade">Especialidade</label>
                            <input type="text" id="especialidade" name="especialidade" onChange={this.logChange}   class="pure-input-1" required="" />
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