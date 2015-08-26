var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    devtool: 'inline-source-map',
    debug: true,
    
    // 表示入口文件
    entry: {
          entry1: './src/js/index.js'
        // , entry2: './src/test.js'
    }
    
    // 表示输出文件
    , output: {
        path: __dirname,
        filename: "index.js"
    }
    
    , resolve: {
        extensions: ['', '.js', '.jsx']
    }
    
    // 表示这个依赖项是外部lib，遇到require它不需要编译，
    // 且在浏览器端对应window.React
    , externals: {
      'react'  : 'window.React',
      'zepto'  : 'window.Zepto',
      'jquery' : 'window.jQuery'
      // 'Q'      : 'window.Q',
    }
    
    // 凡是遇到jsx结尾的，都用jsx-loader这个插件来加载，
    // 且启用harmony模式
    , module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_module/,
            loader: 'babel-loader'
        }, {
            test: /\.jsx$/,
            loader: 'babel-loader'
            // loader: 'babel-loader!jsx-loader?harmony'
        }]
    }
    
    // , plugins: [commonsPlugin]
};

