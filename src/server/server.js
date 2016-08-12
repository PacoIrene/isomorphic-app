import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import morgan from 'morgan';

import moment from 'moment';

import Blog from '../models/blog';

import webpack from 'webpack';
import webpackConfig from '../../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import * as _ from 'lodash';

import routes from './../client/routes';

const app = express();

mongoose.connect('mongodb://localhost:27017/blog');

mongoose.connection.on('error', ()  => {
    console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

app.set('port', process.env.PORT || 3010);
app.use(morgan('dev'));

if (process.env.NODE_ENV !== 'production') {
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    }));
    app.use(webpackHotMiddleware(compiler));
}
else {
    app.use('/static', express.static(__dirname + '/../../dist'));
}

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By', ' 3.2.1');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.get('/api/blogs', (req, res, next) => {
    const pageSize = 10;
    const page = req.query.page || 1;

    let promise = Blog.find().sort({date: -1}).skip((page - 1) * pageSize).limit(pageSize).exec();
    promise.then(
        blog => {
            res.send(blog);
        },
        err => {
            next(err);
        }
    );
});

app.get('/api/blogs/:id', (req, res, next) => {
    const id = req.params.id;

    Blog.findById(id).then(
        blog => {
            res.send(blog ? blog : {});
        },
        err => {
            next(err);
        }
    );
});

app.put('/api/blogs/:id', (req, res, next) => {
    const id = req.params.id;
    let title = req.query.title;
    let content = req.query.content;

    Blog.findByIdAndUpdate(id, {title, content}, {'new': true}, (err, blog) => {
        if (err) {
            return next(err);
        }
        res.send(blog);
    });
});

app.delete('/api/blogs/:id', (req, res, next) => {
    const id = req.params.id;

    Blog.findByIdAndRemove(id).then(
        blog => {
            res.send({
                info: 'successfully removed!'
            });
        },
        err => {
            next(err);
        }
    );
});

app.post('/api/blogs', (req, res, next) => {
    let title = req.query.title;
    let date = new Date();
    let content = req.query.content;

    let blog = new Blog({title, date, content});
    blog.save().then(
        blog => {
            res.send(blog);
        },
        err => {
            next(err);
        }
    );
});

// app.use(function(req, res) {
//     match({ routes: routes, location: req.url }, function(err, redirectLocation, renderProps) {
//         if (err) {
//             res.status(500).send(err.message)
//         } else if (redirectLocation) {
//             res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
//         } else if (renderProps) {
//             var html = ReactDOMServer.renderToString(React.createElement(RouterContext, renderProps));
//             var page = swig.renderFile(__dirname + '/../public/index.html', { html: html });
//             res.writeHeader(200, {"Content-Type": "text/html"});
//             res.write(page);

//             res.end();
//         } else {
//             res.status(404).send('404 Not Found')
//         }
//     });
// });

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.use((req, res) => {
    var path = require('path');
    res.type('html').sendFile(path.resolve(__dirname + '/../public/index.html'));
});

app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});
