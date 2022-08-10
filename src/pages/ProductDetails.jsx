import propTypes from 'prop-types';
import React, { Component } from 'react';
import ProductCard from '../components/ProductCard';

export default class ProductDetails extends Component {
    state = {
      productCart: [],
    }

    onClickCart = () => {
      const { history } = this.props;
      history.push('/carrinho');
    }

    addToCart = (result) => {
      const { price, title, thumbnail, id } = result;
      const { productCart } = this.state;
      const cart = productCart;
      localStorage.setItem('productCart', JSON
        .stringify([...cart, { price, title, thumbnail, id }]));
      this.setState({ productCart: [...cart, {
        price, title, thumbnail, id }] });
    }

    render() {
      const { location } = this.props;
      const { pathname } = location;
      const urlParams = new URLSearchParams(pathname);
      const itemObj = {
        id: urlParams.get('productId'),
        price: urlParams.get('price'),
        thumbnail: urlParams.get('img'),
        title: urlParams.get('title'),
      };
      return (
        <div>
          <ProductCard
            productName={ itemObj.title }
            productImg={ itemObj.thumbnail }
            productPrice={ itemObj.price }
          />
          <button
            type="button"
            data-testid="shopping-cart-button"
            onClick={ this.onClickCart }
          >
            Carrinho
          </button>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => this.addToCart(itemObj) }
          >
            Adicionar ao carrinho
          </button>
        </div>
      );
    }
}

ProductDetails.propTypes = {
  location: propTypes.objectOf(propTypes.shape({
    pathname: propTypes.string.isRequired,
  })).isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};
