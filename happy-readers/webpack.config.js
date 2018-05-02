const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
    },
    devtool: 'inline-source-map',

    devServer: {
        contentBase: './dist',
        hot: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            SERVICE_ENDPOINT_READERS_API: JSON.stringify(process.env.SERVICE_ENDPOINT_READERS_API || "http://localhost:3000"),
        }),
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([
            { from: 'src/**/*.css', flatten: true },
            { from: 'src/**/*.html', flatten: true },
            { from: 'src/**/*.jpg', flatten: true }
        ]),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    }
};

