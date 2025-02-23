const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // adding entry point for bundler
    entry: {
        index: './src/js/index.js',
    },
    plugins: [
        // adding options for HtmlWebpackPlugin
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body', // where to place scripts
            minify: false,
        }),
    ],
    // adding output point for bundler
    output: {
        // filename: '[name].bundle.js', // [name] for different js files
        filename: 'bundle.js', // [name] for different js files
        path: path.resolve(__dirname, 'dist'),
        clean: true, // deleting unused resources in dist folder
    },
    module: {
        // adding css and images modules
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[hash][ext][query]' //make random names To ensure that browsers load the latest version of a file whenever its content changes.
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]' //retain file names
                }
            },
        ],
    },
};