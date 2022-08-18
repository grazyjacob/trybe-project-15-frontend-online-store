import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProductById } from '../services/api';
import { PRODUCT_CART } from '../services/constants';

export default class ProductDetails extends Component {
  state = {
    email: '',
    review: '',
    radioSelected: '',
    buttonDisabled: false,
    cartQuantity: 0,
    itemObj: {},
  }

  async componentDidMount() {
    const cart = JSON.parse(localStorage.getItem(PRODUCT_CART));
    const { match: { params: { id } } } = this.props;
    let carrinhoQtde = 0;
    if (cart) {
      carrinhoQtde = cart.length;
    }
    const resultAPI = JSON.parse(localStorage.getItem('resultAPI'));
    let product;
    if (resultAPI) {
      product = resultAPI.results.find((result) => result.id === id);
    } else {
      product = await getProductById(id);
    }
    this.setState({ cartQuantity: carrinhoQtde,
      itemObj: {
        id,
        title: product.title,
        thumbnail: product.thumbnail,
        price: product.price,
      },
    });
  }

    addToCart = (result) => {
      const cart = JSON.parse(localStorage.getItem(PRODUCT_CART));
      result.quantity = 1;
      if (cart) {
        localStorage
          .setItem(PRODUCT_CART, JSON.stringify([...cart, result]));
      } else {
        localStorage
          .setItem(PRODUCT_CART, JSON.stringify([result]));
      }
      this.setState((prevState) => ({
        cartQuantity: prevState.cartQuantity + 1,
      }));
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
      const previewState = JSON.parse(localStorage.getItem((id)));
      if (previewState) {
        localStorage.setItem(id, JSON
          .stringify([...previewState,
            { email, text: review, rating: radioSelected, id }]));
      } else {
        localStorage
          .setItem(id, JSON
            .stringify([{ email, text: review, rating: radioSelected, id }]));
      }
      this.setState({ email: '', review: '', radioSelected: '', buttonDisabled: true });
    }

    render() {
      const { match: { params: { id } } } = this.props;
      const { email,
        review, radioSelected, buttonDisabled, cartQuantity, itemObj } = this.state;
      const savedReviewsForId = JSON
        .parse(localStorage.getItem((id)));
      const listEvaluations = (savedReviewsForId)
      && savedReviewsForId.map((evaluation, index) => (
        <div key={ index }>
          <h3 data-testid="review-card-email">{evaluation.email}</h3>
          <h3 data-testid="review-card-rating">
            {evaluation.rating}
          </h3>
          <h4 data-testid="review-card-evaluation">{evaluation.text}</h4>
        </div>
      ));
      return (
        <div>
          <ProductCard
            productName={ itemObj.title }
            productImg={ itemObj.thumbnail }
            productPrice={ Number(itemObj.price) }
          />
          <Link
            to="/carrinho"
            data-testid="shopping-cart-button"
          >
            <div className="carrinho">
              <img
                src="/images/126510.png"
                alt="carrinho"
                width="50px"
              />
              <figcaption
                data-testid="shopping-cart-size"
              >
                { cartQuantity }

              </figcaption>
            </div>
          </Link>
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
