import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, Switch, Route }
        from 'react-router-dom';
import {connect} from 'react-redux';

import Home from './pages/Home';
import Create from './pages/Create';
import List from './pages/List';
import Edit from './pages/Edit';
import Delete from './pages/Delete';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import {SignOut} from './store/actions/Auth';

function App({user, auth, signOut, message}) {

  const SignOutCallback = () => {
    signOut(() => alert(message));
  }

  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to={'/'} className="navbar-brand">Disciplina CRUD</Link>
          <div className="collapse navbar-collapse" id="navbarSupportContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={'/'} className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to={'/create'} className="nav-link">Criar</Link>
              </li>
              <li className="nav-item">
                <Link to={'/list'} className="nav-link">Listar</Link>
              </li>
              { auth.isLoaded && auth.isEmpty &&
                <>
                  <li className="nav-item">
                    <Link to={'/signin'} className="nav-link">Logar</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/signup'} className="nav-link">Cadastrar-se</Link>
                  </li>
                </>
              }
            </ul>
            {!auth.isEmpty?
              <>
                {auth.email}
                <button className="btn btn-link" onClick={SignOutCallback}>Sair</button>
              </>: ""
            }
          </div>
        </nav>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/signin' component={SignIn}/>
          <Route path='/create' component={Create}/>
          <Route path='/edit/:id' component={Edit}/>
          <Route path='/list' component={List}/>
          <Route path='/delete/:id' component={Delete}/>
        </Switch>
      </div>
    </Router>
  );
}

export default connect(
  (state) => ({
    user: state.AuthReducer.user,
    message: state.AuthReducer.message,
    auth: state.firebaseReducer.auth
  }),
  // map Dispatch to Props
  (dispatch) => ({
    signOut: (callback) => {dispatch(SignOut(callback))}
  })
)(App);
