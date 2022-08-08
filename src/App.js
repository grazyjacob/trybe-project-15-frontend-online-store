import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductList from './pages/ProductList';

class App extends Component {
  render() {
    return (
      <div>
        a
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ ProductList } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
