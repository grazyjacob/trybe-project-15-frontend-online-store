import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class ProductList extends Component {
  state = {
    categories: [],
  }

  componentDidMount = async () => {
    const response = await getCategories();

    this.setState({ categories: response });
  }

  render() {
    const { categories } = this.state;

    return (
      <div>
        <input type="text" />
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
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
      </div>
    );
  }
}

export default ProductList;
