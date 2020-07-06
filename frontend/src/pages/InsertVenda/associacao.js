import React from 'react';

export default class Dados extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            nota_fiscal: '',
            CPF_cliente: '',
            CPF_funcionario: '',
            data_compra: '',
            valor: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.logChange = this.logChange.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        var data = {
            nota_fiscal: this.state.nota_fiscal,
            CPF_cliente: this.state.CPF_cliente,
            CPF_funcionario: this.state.CPF_funcionario,
            data_compra: this.state.data_compra,
            valor: this.state.valor
        }
        console.log(data)
        fetch("/vendas", {
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
        window.location.href = "/vendas";
    }

    logChange(e) {
        this.setState({[e.target.name]: e.target.value});  
    }

    render() {
        return(
            <div>
                <h1>Inserir Venda</h1>
                <form class="pure-form pure-form-stacked" onSubmit = {this.handleSubmit} method="POST">
                    <fieldset>
                    <div class="pure-g">
                        <div class="pure-u-1-3">
                            <label for="nota_fiscal">Nº da Nota Fiscal</label>
                            <input type="text" id="nota_fiscal" name="nota_fiscal" onChange={this.logChange}  class="pure-input-1" required=""/>
                        </div>
                        <div class="pure-u-1-3">
                            <label for="CPF_cliente">CPF do Cliente</label>
                            <input type="text" id="CPF_cliente" name="CPF_cliente" onChange={this.logChange}  class="pure-input-1" required=""/>
                        </div>
                        <div class="pure-u-1-3">
                            <label for="CPF_funcionario">CPF do Funcionário</label>
                            <input type="text" id="CPF_funcionario" name="CPF_funcionario" onChange={this.logChange}  class="pure-input-1" required=""/>
                        </div>
                        <div class="pure-u-1-3">
                            <label for="data_compra">Data da Venda</label>
                            <input type="date" id="data_compra" name="data_compra" onChange={this.logChange}  class="pure-input-1" />
                        </div>
                        <div class="pure-u-1-4">
                            <label for="valor">Valor</label>
                            <input type="text" id="valor" name="valor" onChange={this.logChange}   class="pure-input-1" required="" />
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