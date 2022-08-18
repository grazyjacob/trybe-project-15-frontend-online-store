import propTypes from 'prop-types';
import React, { Component } from 'react';
import ProductCard from '../components/ProductCard';

export default class ProductDetails extends Component {
  state = {
    email: '',
    review: '',
    radioSelected: '',
    buttonDisabled: false,
  }

  getUrlParams = () => {
    const { location } = this.props;
    const { pathname } = location;
    const urlParams = new URLSearchParams(pathname);
    let item = {};
    if (urlParams.get('productId') !== null) {
      item = {
        id: urlParams.get('productId'),
        price: urlParams.get('price'),
        thumbnail: urlParams.get('img'),
        title: urlParams.get('title'),
      };
      // localStorage.setItem('urlParams', JSON.stringify(item));
      this.setState({
        itemObj: item,
      }, () => {
        const { itemObj: urlObj } = this.state;
        item = urlObj;
      });
    } else {
      const { itemObj: urlObj } = this.state;
      item = urlObj;
    }
    return item;
  }

  onClickCart = () => {
    const { history } = this.props;
    history.push('/carrinho');
  }

  addToCart = (result) => {
    const cart = JSON.parse(localStorage.getItem('productCart'));
    result.quantity = 1;
    if (cart) {
      localStorage
        .setItem('productCart', JSON.stringify([...cart, result]));
    } else {
      localStorage
        .setItem('productCart', JSON.stringify([result]));
    }
  }

  submitReview = (itemObj) => {
    const { email, radioSelected } = this.state;
    if (email.includes('@')
    && email.includes('.com')
    && radioSelected
    ) {
      this.saveEvaluation(itemObj);
      this.setState({
        buttonDisabled: false,
        email: '',
        review: '',
        radioSelected: '',
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  }

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value, buttonDisabled: false });
  };

  onChangeRadio = ({ target: { value } }) => this.setState({ radioSelected: value });

  saveEvaluation = (itemObj) => {
    const { id } = itemObj;
    const { email, review, radioSelected } = this.state;
    const previewState = JSON.parse(localStorage.getItem(('productEvaluation')));
    if (previewState) {
      localStorage.setItem('productEvaluation', JSON
        .stringify([...previewState, { email, review, radioSelected, id }]));
    } else {
      localStorage
        .setItem('productEvaluation', JSON
          .stringify([{ email, review, radioSelected, id }]));
    }
    this.setState({ email: '', review: '', radioSelected: '', buttonDisabled: true });
  }

  render() {
    const itemObj = this.getUrlParams();
    const { email, review, radioSelected, buttonDisabled } = this.state;
    // console.log(itemObj.title);
    const getSavedReviews = JSON
      .parse(localStorage.getItem(('productEvaluation')));
    const savedReviewsForId = getSavedReviews && getSavedReviews.filter((product) => (
      product.id === itemObj.id));
    const listEvaluations = savedReviewsForId
      && savedReviewsForId.map((evaluation, index) => (
        <div key={ index }>
          <h3 data-tesid="review-card-email">{evaluation.email}</h3>
          <h3 data-testid="review-card-rating">
            {evaluation.radioSelected}
          </h3>
          <h4 data-testid="review-card-evaluation">{evaluation.review}</h4>
        </div>
      ));

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
        <form>
          <label htmlFor="inputEmail">
            <input
              type="text"
              data-tesid="review-card-email"
              data-testid="product-detail-email"
              required
              name="email"
              value={ email }
              onChange={ this.onChange }
              placeholder="Email(obrigatório)"
            />
          </label>
          <fieldset>
            <input
              value="radio1"
              checked={ radioSelected === 'radio1' }
              type="radio"
              data-testid="1-rating"
              onChange={ this.onChangeRadio }
            />
            <input
              value="radio2"
              checked={ radioSelected === 'radio2' }
              type="radio"
              data-testid="2-rating"
              onChange={ this.onChangeRadio }
            />
            <input
              value="radio3"
              checked={ radioSelected === 'radio3' }
              type="radio"
              data-testid="3-rating"
              onChange={ this.onChangeRadio }
            />
            <input
              value="radio4"
              checked={ radioSelected === 'radio4' }
              type="radio"
              data-testid="4-rating"
              onChange={ this.onChangeRadio }
            />
            <input
              value="radio5"
              checked={ radioSelected === 'radio5' }
              type="radio"
              data-testid="5-rating"
              onChange={ this.onChangeRadio }
            />
          </fieldset>
          <label htmlFor="reviewInput">
            <input
              type="textarea"
              data-testid="product-detail-evaluation"
              name="review"
              value={ review }
              onChange={ this.onChange }
              placeholder="Mensagem(opcional)"
            />
          </label>
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ () => this.submitReview(itemObj) }
          >
            Avaliar
          </button>
        </form>
        <div>
          { buttonDisabled
          && <h4 data-testid="error-msg">Campos inválidos</h4> }
        </div>
        <div>
          <h3>Avaliações</h3>
          <div>
            {listEvaluations}
          </div>
        </div>
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
