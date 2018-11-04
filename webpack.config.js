const path = require('path');
const HWP = require('html-webpack-plugin');
const JasmineWebpackPlugin = require('jasmine-webpack-plugin');

let mainConfig = {
    mode: 'production',
    entry: path.join(__dirname, '/src/index.js'),
    output: {
        filename: 'build.js',
        path: path.join(__dirname, '/dist')},
    module:{
        rules:[{
           test: /\.js$/,
           exclude: /node_modules/,
           loader: 'babel-loader'
        }, {
	    test: /\.html$/, use: [ 'html-loader' ]
	}]
    },
    plugins:[
        new HWP(
           {template: path.join(__dirname,'/src/index.html')}
        )
    ]
};

const testConfig = {
    mode: 'production',
    entry: path.join(__dirname, '/src/specRoot.js'),
    output: {
        filename: 'specRoot.js',
        path: path.join(__dirname, '/dist')},
    module:{
        rules:[{
           test: /\.js$/,
           exclude: /node_modules/,
           loader: 'babel-loader'
        }, {
	    test: /\.html$/, use: [ 'html-loader' ]
	}]
    },
    plugins:[
	new JasmineWebpackPlugin()
    ]
};

module.exports = [ mainConfig, testConfig ];
