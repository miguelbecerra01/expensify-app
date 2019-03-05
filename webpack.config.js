//entry -> output
//https://webpack.js.org/#bundle-it
const path = require('path');
const publicPath = path.join(__dirname, 'public');

//with this we can export the module and can be used in another file
module.exports = {
    //entry: './src/app.js',
    entry: './src/playground/redux-101.js',
    output: {
        path: publicPath,
        filename: 'bundle.js'
    },
    //https://webpack.js.org/loaders/#transpiling
    //https://webpack.js.org/loaders/babel-loader/
    //loader
    //import babel to convert from React to ES6
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        },
        //when webpack detects css files run a module
        //https://www.npmjs.com/package/css-loader
        {
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    //set sourcemap to debug where in the files were an error and not show just bundle.js line 22xxx
    //https://webpack.js.org/configuration/devtool/
    devtool: 'cheap-module-eval-source-map',
    //https://webpack.js.org/configuration/dev-server/
    //replacing for live-server
    devServer: {
        contentBase: publicPath,
        historyApiFallback:true
    }

};



