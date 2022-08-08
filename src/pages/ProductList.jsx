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
  }

  componentDidMount = async () => {
    const response = await getCategories();

    this.setState({ categories: response });
  }

  onSearchClick = async (event) => {
    event.preventDefault();
    const { categorieId, product } = this.state;
    const resultAPI = await getProductsFromCategoryAndQuery(categorieId, product);
    this.setState({
      apiResponse: resultAPI,
      loading: false,
    });
    console.log(resultAPI);
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      product: value,
    });
  }

  render() {
    const { categories, product, apiResponse, loading } = this.state;
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
        <div>
          <h1>Lista de Categorias</h1>
          { categories.map((category) => (
            <li key={ category.name }>
              <button type="submit" data-testid="category">
                <strong> Categoria: </strong>
                { category.name }
              </button>
            </li>
          ))}
        </div>
        <main className="card-section">
          { loading ? 'Nenhum produto foi encontrado'
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
    );
  }
}

export default ProductList;
