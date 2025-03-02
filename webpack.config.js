

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: './src/script.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'build.[contenthash].js',
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new CssPlugin({
            filename: 'styles.[contenthash].css',
        }),
        new ImageMinimizerPlugin({
            minimizer: {
                implementation: ImageMinimizerPlugin.imageminGenerate,
                options: {
                    plugins: [
                        ["gifsicle", { interlaced: true }],
                        ["imagemin-mozjpeg", { quality: 75 }],
                        ["optipng", { optimizationLevel: 5 }],
                        ["svgo", {
                            plugins: [{ removeViewBox: false }],
                        },
                        ],
                    ],
                },
            },
        }),
    ],
    optimization: {
        minimizer: [
            '...',
            new CssMinimizerPlugin(),
        ],
    },
    module: {
        rules: [
            // {
            //     test: /\.css$/i,
            //     use: [
            //         CssPlugin.loader,
            //         'css-loader'
            //     ],
            // },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    CssPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset/resource",
            },
        ],
    },
    watchOptions: {
        aggregateTimeout: 300,
        ignored: /node_modules/,
    },
    devServer: {
        port: 9000,
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        open: true,
        hot: true
    },
};
