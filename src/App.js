import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import EditStudies from "./components/edit-studies-component";
import MainPage from "./components/mainpage-component";
import CreditPage from "./components/credit-page-component";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Giuliani Arpeggios Helper</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Main</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/credit-page-component" className="nav-link">Credits</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={MainPage} />
          <Route path="/edit/:id" component={EditStudies} />
          <Route path="/credit-page-component" component={CreditPage} />
        </div>
      </Router>
    );
  }
}

export default App;
