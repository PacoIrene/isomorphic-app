import React from 'react';
import ReactDOM from 'react-dom';

import {Route, Router, browserHistory} from 'react-router';

import routes from './routes';

import './styles/main.scss';

ReactDOM.render(
  <Router history={browserHistory}>{routes}</Router>,
  document.getElementById('root')
);
