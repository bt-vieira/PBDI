import React from 'react';

export default class Dados extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            CNPJ: '',
            porcentagem_desc: 0,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.logChange = this.logChange.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        var data = {
            CNPJ: this.state.CNPJ,
            porcentagem_desc: this.state.porcentagem_desc
        }
        console.log(data)
        fetch("/convenios", {
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
        window.location.href = '/convenios';
    }

    logChange(e) {
        this.setState({[e.target.name]: e.target.value});  
    }

    render() {
        return(
            <div>
                <h1>Inserir Convênio</h1>
                <form class="pure-form pure-form-stacked" onSubmit = {this.handleSubmit} method="POST">
                    <fieldset>
                    <div class="pure-g">
                        <div class="pure-u-1-3">
                            <label for="CNPJ">CNPJ</label>
                            <input type="text" id="CNPJ" name="CNPJ" onChange={this.logChange}   class="pure-input-1" required="" />
                        </div>
                        <div class="pure-u-1-3">
                            <label for="porcentagem_desc">Porcentagem do Desconto</label>
                            <input type="number" id="porcentagem_desc" name="porcentagem_desc" onChange={this.logChange}   class="pure-input-1" required="" />
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