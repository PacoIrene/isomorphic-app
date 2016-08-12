import React from 'react';
import {Route} from 'react-router';
import App from './App';
import BlogList from './component/BlogList/BlogList';
import Blog from './component/Blog/Blog';
import About from './component/About/About';

export default (
  <Route component={App}>
    <Route path='/' component={BlogList} />
    <Route path='/blogs' component={BlogList}/>
    <Route path='/blogs/:id' component={Blog}/>
    <Route path='/about' component={About} />
  </Route>
);
