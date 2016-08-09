import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import morgan from 'morgan';
import swig from 'swig';
import {match, RouterContext} from 'react-router';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import React from 'react';


import webpack from 'webpack';
import webpackConfig from '../../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import * as _ from 'lodash';

import Blog from './../models/blog';

import routes from './../client/routes';

const app = express();

mongoose.connect("mongodb://localhost:27017/blog");
mongoose.connection.on('error', ()  => {
    console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

app.set('port', process.env.PORT || 3010);
app.use(morgan('dev'));

if(process.env.NODE_ENV !== 'production'){
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
    app.use(webpackHotMiddleware(compiler));
}else{
    app.use('/static', express.static(__dirname + '/../../dist'));
}

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use(function(req, res) {
    match({ routes: routes, location: req.url }, function(err, redirectLocation, renderProps) {
        if (err) {
            res.status(500).send(err.message)
        } else if (redirectLocation) {
            res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            var html = ReactDOMServer.renderToString(React.createElement(RouterContext, renderProps));
            var page = swig.renderFile(__dirname + '/../public/index.html', { html: html });
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(page);

            res.end();
        } else {
            res.status(404).send('404 Not Found')
        }
    });
});

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.use(function(req, res) {
//     var path = require('path');
//     res.type('html').sendFile(path.resolve(__dirname + '/../public/index.html'));
// });

app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});
