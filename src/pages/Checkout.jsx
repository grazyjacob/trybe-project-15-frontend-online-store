import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class Checkout extends Component {
  state = {
    productCart: [],
    checkoutName: '',
    checkoutCPF: '',
    checkoutEmail: '',
    checkoutFone: '',
    checkoutCEP: '',
    checkoutEndereco: '',
    checkoutPagto: '',
    invalidFields: false,
  }

  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem('productCart'));
    this.setState({
      productCart: cart,
    });
  }

  handleChangeInput = (event) => {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value,
    });
  }

  handleChangeRadio = (event) => {
    const { target: { value } } = event;
    this.setState({
      checkoutPagto: value,
    });
  }

  handleClickButton = (event) => {
    event.preventDefault();
    const {
      checkoutName,
      checkoutCPF,
      checkoutEmail,
      checkoutFone,
      checkoutCEP,
      checkoutEndereco,
      checkoutPagto,
    } = this.state;
    const { history } = this.props;
    const isInvalidFields = checkoutName === '' || checkoutCPF === ''
    || checkoutEmail === '' || checkoutFone === '' || checkoutCEP === ''
    || checkoutEndereco === '' || checkoutPagto === '';
    if (!isInvalidFields) {
      localStorage.removeItem('productCart');
      history.push('/');
    }
    this.setState({
      invalidFields: isInvalidFields,
    });
  }

  render() {
    const {
      productCart,
      checkoutName,
      checkoutCPF,
      checkoutEmail,
      checkoutFone,
      checkoutCEP,
      checkoutEndereco,
      checkoutPagto,
      invalidFields,
    } = this.state;
    const productCartJSX = productCart
      .map((product) => <p key={ product.id }>{product.title}</p>);
    return (
      <div>
        <div>
          <h3>Revise seus produtos</h3>
          <div>{productCartJSX}</div>
        </div>
        <form>
          <h3>Informações do Comprador</h3>
          <input
            type="text"
            placeholder="Nome completo"
            data-testid="checkout-fullname"
            name="checkoutName"
            value={ checkoutName }
            onChange={ this.handleChangeInput }
          />
          <input
            type="text"
            placeholder="CPF"
            data-testid="checkout-cpf"
            name="checkoutCPF"
            value={ checkoutCPF }
            onChange={ this.handleChangeInput }
          />
          <input
            type="text"
            placeholder="E-mail"
            data-testid="checkout-email"
            name="checkoutEmail"
            value={ checkoutEmail }
            onChange={ this.handleChangeInput }
          />
          <input
            type="text"
            placeholder="Telefone"
            data-testid="checkout-phone"
            name="checkoutFone"
            value={ checkoutFone }
            onChange={ this.handleChangeInput }
          />
          <input
            type="text"
            placeholder="CEP"
            data-testid="checkout-cep"
            name="checkoutCEP"
            value={ checkoutCEP }
            onChange={ this.handleChangeInput }
          />
          <input
            type="text"
            placeholder="Endereço"
            data-testid="checkout-address"
            name="checkoutEndereco"
            value={ checkoutEndereco }
            onChange={ this.handleChangeInput }
          />
          <div>
            <label htmlFor="boleto">
              <input
                type="radio"
                name="payment"
                id="boleto"
                data-testid="ticket-payment"
                value="boleto"
                checked={ checkoutPagto === 'boleto' }
                onChange={ this.handleChangeRadio }
              />
              Boleto

            </label>
            <label htmlFor="visa">
              <input
                type="radio"
                name="payment"
                id="visa"
                data-testid="visa-payment"
                value="visa"
                checked={ checkoutPagto === 'visa' }
                onChange={ this.handleChangeRadio }
              />
              Visa

            </label>
            <label htmlFor="master">
              <input
                type="radio"
                name="payment"
                id="master"
                data-testid="master-payment"
                value="master"
                checked={ checkoutPagto === 'master' }
                onChange={ this.handleChangeRadio }
              />
              MasterCard

            </label>
            <label htmlFor="elo">
              <input
                type="radio"
                name="payment"
                id="elo"
                data-testid="elo-payment"
                value="elo"
                checked={ checkoutPagto === 'elo' }
                onChange={ this.handleChangeRadio }
              />
              Elo

            </label>

          </div>
          <button
            type="submit"
            data-testid="checkout-btn"
            onClick={ this.handleClickButton }
          >
            Comprar

          </button>
          { invalidFields && <p data-testid="error-msg">Campos inválidos</p> }
        </form>
      </div>
    );
  }
}

Checkout.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};
