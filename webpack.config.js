const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
    return {
        entry: {
            index: './src/index.js',
        },
        output: {
            filename: 'js/[name].[hash].js',
            path: path.resolve('./build'),
            chunkFilename: 'js/[name].[chunkhash].js',
        },
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    commons: {
                        chunks: 'initial',
                        minChunks: 1,
                        maxInitialRequests: 5,
                        minSize: 0,
                    },
                    vendor: {
                        test: /node_modules/,
                        chunks: 'initial',
                        name: 'vendor',
                        priority: 10,
                        enforce: true,
                    },
                },
            },
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
        module: {
            rules: [
                {
                    test: /.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-react',
                                '@babel/preset-env',
                            ],
                        },
                    },
                },
            ],
        },
        devServer: {
            contentBase: './public',
            port: 8080,
            proxy: {
                '/dcard': {
                    target: 'https://www.dcard.tw',
                    pathRewrite: { '^/dcard': '' },
                    changeOrigin: true,
                },
            },
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html',
                filename: 'index.html',
            }),
        ],
    };
};
