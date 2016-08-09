import React from 'react';
import {Route} from 'react-router';
import App from './container/App';
import BlogList from './component/BlogList/BlogList';
import Blog from './component/Blog/Blog';

export default (
  <Route component={App}>
    <Route path='/' component={BlogList} />
    <Route path='/blog' component={Blog} />
  </Route>
);
