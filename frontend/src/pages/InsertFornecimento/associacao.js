import React from 'react';

export default class Dados extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            CNPJ: '',
            cod_produto: '',
            nota_fiscal: '',
            data_compra: '',
            valor: 0,
            quantidade: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.logChange = this.logChange.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        var data = {
            CNPJ: this.state.CNPJ,
            cod_prod: this.state.cod_produto,
            nota_fiscal: this.state.nota_fiscal,
            data_compra: this.state.data_compra,
            valor: this.state.valor,
            quantidade: this.state.quantidade
        }
        console.log(data)
        fetch("/fornecimento", {
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
        window.location.href = "/fornecimentos";
    }

    logChange(e) {
        this.setState({[e.target.name]: e.target.value});  
    }

    render() {
        return(
            <div>
                <h1>Inserir Fornecimento</h1>
                <form class="pure-form pure-form-stacked" onSubmit = {this.handleSubmit} method="POST">
                    <fieldset>
                    <div class="pure-g">
                        <div class="pure-u-1-3">
                            <label for="cod_produto">Código do Produto</label>
                            <input type="text" id="cod_produto" name="cod_produto" onChange={this.logChange}  class="pure-input-1" required=""/>
                        </div>
                        <div class="pure-u-1-3">
                            <label for="CNPJ">CNPJ</label>
                            <input type="text" id="CNPJ" name="CNPJ" onChange={this.logChange}   class="pure-input-1" required="" />
                        </div>
                        <div class="pure-u-1-3">
                            <label for="nota_fiscal">Nota Fiscal</label>
                            <input type="text" id="nota_fiscal" name="nota_fiscal" onChange={this.logChange}   class="pure-input-1" required="" />
                        </div>
                        <div class="pure-u-1-3">
                            <label for="data_compra">Data da Compra</label>
                            <input type="date" id="data_compra" name="data_compra" onChange={this.logChange}  class="pure-input-1" />
                        </div>
                        <div class="pure-u-1-3">
                            <label for="valor">Valor</label>
                            <input type="text" id="valor" name="valor" onChange={this.logChange}   class="pure-input-1" required="" />
                        </div>
                        <div class="pure-u-1-3">
                            <label for="quantidade">Quantidade</label>
                            <input type="text" id="quantidade" name="quantidade" onChange={this.logChange}   class="pure-input-1" required="" />
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