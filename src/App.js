import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import Search from './pages/Search';
import Carrinho from './pages/Carrinho';
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
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
