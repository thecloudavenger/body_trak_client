import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import Products from "./components/products";
import Orders from "./components/orders";
import CartManager from ".component/CartManager";

import auth from "./services/authService";


import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <main className="container">
        <NavBar user={user} />
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/products" component={Products} />
            <Route path="/orders" component={Orders} />
            <Route path="/cart" component={CartManager} />
            <Redirect from="/" exact to="/login" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
