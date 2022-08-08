import propTypes from 'prop-types';
import React, { Component } from 'react';

class ProductCard extends Component {
  render() {
    const { productName, productImg, productPrice } = this.props;
    return (
      <div data-testid="product" className="card-wrapper">
        <span>{productName}</span>
        <img src={ `${productImg}` } alt={ productName } />
        <span>{`Preço: R$ ${productPrice}`}</span>
      </div>
    );
  }
}

ProductCard.propTypes = {
  productName: propTypes.string.isRequired,
  productImg: propTypes.string.isRequired,
  productPrice: propTypes.number.isRequired,
};

export default ProductCard;
