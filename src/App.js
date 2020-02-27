import React from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';

import AppProvider from './context/AppContext';
import Header from './components/Header/header';
import Home from './components/Home/home';
import Category from './components/Category';
import Shop from './components/Shop';
import Products from './components/Products';
import Cart from './components/Cart';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Checkout from './components/Checkout';
import User from './components/User';
import Footer from './components/Footer';

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

//Css
import './App.scss';

function App() {
  return (
    <AppProvider>
      <Switch>
        <Header />
        <Route path='/' exact component={Home}/>
        <Route path='/category/:id' children={<Category />}/>
        <Route path='/shop/' exact component={Shop}/>
        <Route path='/shop/:id' children={<Shop />}/>
        <Route path='/products/' exact component={Products}/>
        <Route path='/products/:id' children={<Products />}/>
        <Route path='/cart' component={Cart}/>
        <Route path='/register' component={Register}/>
        <Route path='/login' component={Login}/>
        <Route path='/logout' component={Logout}/>
        <Route path='/checkout' component={Checkout}/>
        <Route path='/user' component={User}/>
        <Footer />
      </Switch>
    </AppProvider>
  );
}

export default App;
