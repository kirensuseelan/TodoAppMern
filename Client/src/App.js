import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateTodo from "./Components/create-todos.component";
import EditTodo from "./Components/edit-todos.component";
import TodosList from "./Components/todos-list.component";

import logo from "./logo.jpg"


class App extends Component {
render() {
  return (
    <Router>
      <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light"  >
              <a className="navbar-brand" href="https://www.google.com" target="_blank">
                <img src={logo} width="30" height="30" alt="Google"></img>
              </a>
              <Link to="/" className="navbar-brand">Mern Stack ToDo APP</Link>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto" >
                  <li className="navbar-item">
                    <Link to="/" className="nav-link">Todos</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/create" className="nav-link">Create Todos</Link>
                  </li>
                </ul>
              </div>
          </nav>


          <Route path="/" exact component={TodosList}></Route>
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
        </div>
        
    </Router>
     );
  }
}

export default App;
