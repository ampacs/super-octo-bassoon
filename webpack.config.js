const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const config = {
    target: 'web',
    entry: './client/index.js',
    watch: true,
    output: {
        path: path.resolve(__dirname, 'dist/client'),
        filename: 'index.js'
    },
    module: {
        //loaders: [
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        ]
    },
    //optimization: {
    //    minimizer: [new UglifyJsPlugin()],
    //},
    plugins: [
        new UglifyJsPlugin({
            uglifyOptions: {
                warnings: false,
                ie8: false,
                output: {
                    comments: false
                }
            }
        }),
        //new webpack.optimize.UglifyJsPlugin({
        //    compress: {
        //        warnings: false
        //    },
        //    output: {
        //        comments: false
        //    }
        //}),
        new HtmlWebpackPlugin({ template: './client/index.html' })
    ],
    "presets": [
        "@babel/preset-env"
    ]
}

module.exports = config
