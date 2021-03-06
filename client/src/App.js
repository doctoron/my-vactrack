import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import MenuBar from './components/MenuBar';
import Login from './components/Login/Login';
import PrivateRoute from './components/Auth/PrivateRoute';
import vaccineList from './components/RenderVacs/vaccineList'
import Register from './components/Register';
import Error from './Pages/Error';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isOpen: false,
      authenticated: false,
      private: false,
    }
    this.connectToServer = this.connectToServer.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  connectToServer () {
    fetch('/login');
  }

  componentDidMount () {
    this.connectToServer();
  }

  toggle (e) {
    e.preventDefault();
    console.log('this was clicked');
    this.setState({
      isOpen: !this.state.isOpen,
      authenticated: !this.state.authenticated
    }, () => {
      if (!this.state.authenticated) {
        sessionStorage.removeItem('authenticated');
      }
    });
  }

  render () {
    return (
      <Router basename="/" >
        <div className="container">
          <MenuBar auth={this.state.authenticated} toggle={this.toggle} />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={() => <Login history={this.props.history} showModal={this.state.isOpen} toggle={this.toggle} exact />} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/private" component={vaccineList} />
            <Route component={Error} />
          </Switch>
        </div>
      </Router>

    );
  }
}

export default App;
