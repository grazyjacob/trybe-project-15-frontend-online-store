import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import Search from './pages/Search';
import Carrinho from './pages/Carrinho';
import Checkout from './pages/Checkout';
import ProductDetails from './pages/ProductDetails';
import ProductList from './pages/ProductList';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            {/* <Route exact path="/" component={ Search } /> */}
            <Route exact path="/carrinho" component={ Carrinho } />
            <Route exact path="/" component={ ProductList } />
            <Route path="/product-details/:id" component={ ProductDetails } />
            <Route path="/checkout" component={ Checkout } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
