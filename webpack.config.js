//entry -> output
//https://webpack.js.org/#bundle-it
const path = require('path');
//https://github.com/webpack-contrib/mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const publicPath = path.join(__dirname, 'public');


//with this we can export the module and can be used in another file
module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new MiniCssExtractPlugin({ filename: 'styles.css' });

    return {
        entry: './src/app.js',
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
                //extract all scss or css and bundle in styles.css                
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]

            }]
        },
        plugins: [
            CSSExtract
        ],
        //set sourcemap to debug where in the files were an error and not show just bundle.js line 22xxx
        //https://webpack.js.org/configuration/devtool/
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        //https://webpack.js.org/configuration/dev-server/
        //replacing for live-server
        devServer: {
            contentBase: publicPath,
            historyApiFallback: true
        }
    };

};



