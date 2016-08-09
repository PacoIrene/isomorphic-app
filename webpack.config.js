var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpackConfig = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin()
  ]
};

if (process.env.NODE_ENV === 'production') {

  webpackConfig = _.merge(webpackConfig,{
    devtool: "source-map",
    entry : [
      './src/client/index.js'
    ],
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: __dirname
      },
      { test: /\.(png|jpg|gif|jpeg)$/, loader: 'url-loader?limit=8192'},
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap') }
    ]},
    plugins : [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new ExtractTextPlugin('app.css'),
      new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]  
  });

}else{

  webpackConfig = _.merge(webpackConfig,{
    devtool: 'inline-source-map',
    module: {
      loaders: [{
        test: /\.js?$/,
        loaders: ['react-hot', 'babel?presets[]=react-hmre,presets[]=react,presets[]=es2015'],
        exclude: /node_modules/,
      },
      {test: /\.(png|jpg|gif|jpeg)$/, loader: 'url-loader?limit=8192'},
      {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract(
              "style",
              "css!sass"
          )
      },
      {
        test: /\.(otf|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'url-loader'
      }
    ]},
    entry : [
      'webpack-hot-middleware/client',
      './src/client/index.js'
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins : [
      new ExtractTextPlugin('app.css'),
      new webpack.HotModuleReplacementPlugin()
    ]  
  });
}

module.exports = webpackConfig;
