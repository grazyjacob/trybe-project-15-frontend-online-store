import React, { Component } from 'react';

export default class Carrinho extends Component {
  state = {
    productCart: [],
  }

  componentDidMount() {
    this.getLocalStorage();
  }

  getLocalStorage = () => {
    const getSave = JSON.parse(localStorage.getItem('productCart'));
    this.setState({ productCart: getSave });
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
                  <p data-testid="shopping-cart-product-quantity">1</p>
                </div>))}
            </div>)}

      </section>
    );
  }
}
