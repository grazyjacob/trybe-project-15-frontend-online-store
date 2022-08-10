import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class ProductList extends Component {
  state = {
    categories: [],
    categorieId: '',
    product: '',
    apiResponse: [],
    loading: true,
    productCart: [],
  }

  componentDidMount = async () => {
    const response = await getCategories();
    this.setState({ categories: response });
  }

  onSearchClick = async () => {
    const { categorieId, product } = this.state;
    const resultAPI = await getProductsFromCategoryAndQuery(categorieId, product);
    const isEmpty = resultAPI.results.length === 0;
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
    const { price, title, thumbnail, id } = result;
    const { productCart } = this.state;
    const cart = productCart;
    localStorage.setItem('productCart', JSON
      .stringify([...cart, { price, title, thumbnail, id }]));
    this.setState({ productCart: [...cart, { price, title, thumbnail, id }] });
  }

  render() {
    const { categories,
      product,
      apiResponse,
      loading } = this.state;
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
          Carrinho
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
                    to={ {
                      pathname: `/product-details/?
                      &productId=${result.id}
                      &title=${result.title}
                      &img=${result.thumbnail}
                      &price=${result.price}`,
                      state: result,
                    } }
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
