const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
    const env = dotenv.config().parsed;
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

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
                        maxInitialRequests: 5, // The default limit is too small to showcase the effect
                        minSize: 0, // This is example is too small to create commons chunks
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
            new webpack.DefinePlugin(envKeys),
            new HtmlWebpackPlugin({
                // 配置 HTML 模板路徑與生成名稱 (第三步)
                template: './public/index.html',
                filename: 'index.html',
            }),
        ],
    };
};
