import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Carrinho extends Component {
  state = {
    productCart: [],
  }

  componentDidMount() {
    this.getLocalStorage();
  }

  componentWillUnmount() {
    const { productCart } = this.state;
    localStorage.setItem('productCart', JSON.stringify(productCart));
  }

  getLocalStorage = () => {
    const getSave = JSON.parse(localStorage.getItem('productCart'));
    this.setState({ productCart: getSave });
  }

  updateQuantity = (product, operation) => {
    const { quantity } = product;
    const { productCart } = this.state;
    const cart = productCart;
    let qtde = parseInt(quantity, 10);
    if (operation === '+') {
      qtde += 1;
    } else {
      qtde = qtde === 1 ? qtde : qtde - 1;
    }
    const carrinho = cart.map((prod) => {
      if (prod.id === product.id) {
        prod.quantity = qtde;
      }
      return prod;
    });
    this.setState({
      productCart: carrinho,
    });
  }

  removeProduct = (product) => {
    const { productCart } = this.state;
    const cart = productCart;
    const carrinho = cart.filter((prod) => prod.id !== product.id);
    this.setState({
      productCart: carrinho,
    });
  }

  render() {
    const { productCart } = this.state;
    return (
      <section>
        {productCart === null ? (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>)
          : (
            <div>
              { productCart.map((product) => (
                <div key={ product.id } className="card-wrapper">
                  <p data-testid="shopping-cart-product-name">
                    {product.title}
                  </p>
                  <p>{product.price}</p>
                  <p data-testid="shopping-cart-product-quantity">
                    {
                      product.quantity
                    }

                  </p>
                  <div>
                    <button
                      data-testid="product-decrease-quantity"
                      type="button"
                      onClick={ () => this.updateQuantity(product, '-') }
                    >
                      -
                    </button>

                    <button
                      data-testid="product-increase-quantity"
                      type="button"
                      onClick={ () => this.updateQuantity(product, '+') }
                    >
                      +
                    </button>
                    <button
                      data-testid="remove-product"
                      type="button"
                      onClick={ () => this.removeProduct(product) }
                    >
                      X
                    </button>
                  </div>
                </div>))}
              <Link
                to="/checkout"
              >
                <button data-testid="checkout-products" type="button">Checkout</button>
              </Link>
            </div>)}

      </section>
    );
  }
}
