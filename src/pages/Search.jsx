import React, { Component } from 'react';
import ProductCard from '../components/ProductCard';
import { getProductsFromCategoryAndQuery } from '../services/api';

// MLB1071 - Animais
class Search extends Component {
  state = {
    categorieId: '',
    product: '',
    apiResponse: [],
    loading: true,
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
    const { product, apiResponse, loading } = this.state;
    const { results } = apiResponse;
    return (
      <div>
        <header>
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
          <p
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </header>
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

export default Search;
