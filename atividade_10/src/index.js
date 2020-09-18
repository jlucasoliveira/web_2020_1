import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import StoreConfig from './store/StoreConfig';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.css';


ReactDOM.render(
  <Provider store={StoreConfig}>
    <Home />
  </Provider>,
  document.getElementById('root')
);
