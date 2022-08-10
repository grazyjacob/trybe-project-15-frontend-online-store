import propTypes from 'prop-types';
import React, { Component } from 'react';

class ProductCard extends Component {
  render() {
    const { productName, productImg, productPrice } = this.props;
    return (
      <div className="card-wrapper">
        <span data-testid="product-detail-name">{productName}</span>
        <img
          data-testid="product-detail-image"
          src={ `${productImg}` }
          alt={ productName }
          className="img-card"
        />
        <span data-testid="product-detail-price">{`Preço: R$ ${productPrice}`}</span>
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
