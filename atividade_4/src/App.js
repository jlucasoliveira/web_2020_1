import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, Switch, Route }
        from 'react-router-dom';

import Home from './components/Home';
import Create from './components/Create';
import List from './components/List';
import Edit from './components/Edit';
import Delete from './components/Delete';

function App() {
  const appName = "Disciplina CRUD";
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to={'/'} className="navbar-brand">{appName}</Link>
          <div className="collapse navbar-collapse" id="navbarSupportContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={'/'} className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to={'/create'} className="nav-link">Create</Link>
              </li>
              <li className="nav-item">
                <Link to={'/list'} className="nav-link">List</Link>
              </li>
            </ul>
          </div>
        </nav>
        <h2>{appName}</h2>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/create' component={Create}/>
          <Route path='/edit/:id' component={Edit}/>
          <Route path='/list' component={List}/>
          <Route path='/delete/:id' component={Delete}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
