import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from './components/Nav';
import Header from './components/Header';
import Home from './pages/Home';
import HowToInstall from './pages/HowToInstall';
import CreateAcct from './pages/CreateAcct';
import SignIn from './pages/SignIn';
import UserHome from './pages/UserHome';
import MyStores from './pages/MyStores';
// import LoggedInNav from './components/LoggedInNav';
import './App.css';

class App extends Component {

  render() {
    const HomeComponent = localStorage.getItem('userId') !== null ? UserHome : Home;

    return (
      <Router>
        <div>
        <Nav />
          <Route exact path="/" component={HomeComponent}/>
          {/* <Route exact path="/userhome" component={UserHome} /> */}
          <Route exact path="/install" component={HowToInstall} />
          <Route exact path="/mystores" component={MyStores} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/createaccount" component={CreateAcct} />
          <Route exact path='*' component={HomeComponent}/>
          </div>
          </Router>
    );
  }
}

export default App;
