import React from 'react';

export default class Dados extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            cod_produto: '',
            nota_fiscal: '',
            quantidade: 0,
            valor: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value //setting value edited by the admin in state.
        });
    }

    handleSubmit(event) {
        event.preventDefault()
        var data = {
            cod_produto: this.state.cod_produto,
            nota_fiscal: this.state.nota_fiscal,
            quantidade: this.state.quantidade,
            valor:  this.state.valor
        }
        fetch("/vendido", {
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
        window.location.href ="/produtosvend";
    }

    render() {
        return(
            <div>
                <h1>Inserir Produto numa Venda</h1>
                <form class="pure-form pure-form-stacked" onSubmit = {this.handleSubmit} method="POST">
                    <fieldset>
                    <div class="pure-g">
                        <div class="pure-u-1-4">
                            <label for="cod_produto">Código do Produto</label>
                            <input type="text" id="cod_produto" name="cod_produto" onChange={this.handleInputChange}  class="pure-input-1" required=""/>
                        </div>
                        <div class="pure-u-1-2">
                            <label for="nota_fiscal">Nº da Nota Fiscal</label>
                            <input type="text" id="nota_fiscal" name="nota_fiscal" onChange={this.handleInputChange}   class="pure-input-1" required="" />
                        </div>
                        <div class="pure-u-1-4">
                            <label for="quantidade">Quantidade</label>
                            <input type="number" id="quantidade" name="quantidade" onChange={this.handleInputChange}   class="pure-input-1" required="" />
                        </div>
                        <div class="pure-u-1-4">
                            <label for="valor">Valor</label>
                            <input type="text" id="valor" name="valor" onChange={this.handleInputChange}   class="pure-input-1" required="" />
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