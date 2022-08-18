import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import { PRODUCT_CART } from '../services/constants';

class ProductList extends Component {
  state = {
    categories: [],
    categorieId: '',
    product: '',
    apiResponse: [],
    loading: true,
    cartQuantity: 0,
    // productCart: [],
  }

  componentDidMount = async () => {
    const response = await getCategories();
    const cart = JSON.parse(localStorage.getItem(PRODUCT_CART));
    let carrinhoQtde = 0;
    if (cart) {
      carrinhoQtde = cart.length;
    }
    this.setState({ categories: response, cartQuantity: carrinhoQtde });
  }

  onSearchClick = async () => {
    const { categorieId, product } = this.state;
    const resultAPI = await getProductsFromCategoryAndQuery(categorieId, product);
    const isEmpty = resultAPI.results.length === 0;
    if (!isEmpty) localStorage.setItem('resultAPI', JSON.stringify(resultAPI));
    this.setState({
      apiResponse: resultAPI,
      loading: isEmpty,
    });
  }

  onClickCategory = (categoryId) => {
    this.setState({
      categorieId: categoryId,
    }, () => this.onSearchClick());
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      product: value,
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

  render() {
    const { categories,
      product,
      apiResponse,
      loading,
      cartQuantity } = this.state;
    const { results } = apiResponse;
    return (
      <div>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma
          categoria.
        </p>
        <input
          value={ product }
          type="text"
          data-testid="query-input"
          onChange={ this.handleChange }
        />
        <button
          data-testid="query-button"
          type="button"
          onClick={ this.onSearchClick }
        >
          Buscar
        </button>
        <Link
          to="./carrinho"
          data-testid="shopping-cart-button"
        >
          {/* Carrinho */}
          <div className="carrinho">
            <img src="/images/126510.png" alt="carrinho" width="50px" />
            <figcaption
              data-testid="shopping-cart-size"
            >
              { cartQuantity }

            </figcaption>
          </div>
        </Link>
        <div className="search-page">
          <div>
            <h1>Lista de Categorias</h1>
            { categories.map((category) => (
              <li key={ category.name }>
                <button
                  type="button"
                  data-testid="category"
                  onClick={ () => this.onClickCategory(category.id) }
                >
                  <strong> Categoria: </strong>
                  { category.name }
                </button>
              </li>
            ))}
          </div>
          <main className="card-section">
            { loading ? <p>Nenhum produto foi encontrado</p>
              : results.map((result, index) => (
                <div
                  key={ index }
                  data-testid="product"
                >
                  <ProductCard
                    productName={ result.title }
                    productImg={ result.thumbnail }
                    productPrice={ parseInt(result.price, 10) }
                  />
                  <Link
                    data-testid="product-detail-link"
                    to={ `/product-details/${result.id}` }
                  >
                    Mais detalhes
                  </Link>
                  <button
                    type="button"
                    data-testid="product-add-to-cart"
                    onClick={ () => this.addToCart(result) }
                  >
                    Adicionar ao carrinho
                  </button>
                </div>
              ))}
          </main>
        </div>
      </div>
    );
  }
}

export default ProductList;
