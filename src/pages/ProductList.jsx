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
    emptySearch: '',
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
      emptySearch: 'Nenhum produto foi encontrado',
    });
    console.log(resultAPI);
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

  render() {
    const { categories, product, apiResponse, loading, emptySearch } = this.state;
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
            { loading ? <p>{emptySearch}</p>
              : results.map(({ price, title, thumbnail }, index) => (
                <div key={ index }>
                  <ProductCard
                    productName={ title }
                    productImg={ thumbnail }
                    productPrice={ price }
                  />
                </div>
              ))}
          </main>
        </div>
      </div>
    );
  }
}

export default ProductList;
