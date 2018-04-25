const env = require('process').env.NODE_ENV || 'dev';
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const plugins = [];
const DefinePlugin = webpack.DefinePlugin;
const srcPath = './src/';


if (env === 'prod') {
    plugins.push(new UglifyJSPlugin({sourceMap: true}));
}
plugins.push(new DefinePlugin({
    PATH_TO_RESOURCE: env === 'dev' ? JSON.stringify('./app/js') : JSON.stringify('/app/js'),
}));



module.exports = {
    output: {
        filename: '*.js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    },
    plugins,
};