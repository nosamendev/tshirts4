import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authCheckState } from './actions';

import Layout from './Layout/Layout';
import Designer from './Layout/Designer/Designer';
import About from './Layout/About/About';
import Order from './Layout/Order/Order';
import Cart from './Layout/Cart/Cart';
import Auth from './Layout/Auth/Auth';
import MyOrders from './Layout/MyOrders/MyOrders';
import Logout from './Layout/Auth/Logout/Logout';

class App extends React.Component {

  componentDidMount(){
    this.props.authCheckState();
  }

  render(){
    let routes = (
      //not authenticated:
      <Switch>
          <Route path="/about" exact component={About} />
          <Route path="/" exact component={Designer} />    
          <Route path="/order" exact component={Order} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/auth" exact component={Auth} />
          <Redirect to="/" />
          <Route render={() => <h1>(404) This file cannot be found</h1>} />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/about" exact component={About} />
          <Route path="/" exact component={Designer} />  
          <Route path="/orders" exact component={MyOrders} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/order" exact component={Order} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/auth" exact component={Auth} />
          <Route render={() => <h1>(404) This file cannot be found</h1>} />
        </Switch>
      );
    }

    return(
      <BrowserRouter>
        <Layout>
          {routes}
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.token !== null
  }
}

export default connect(mapStateToProps, {authCheckState})(App);
